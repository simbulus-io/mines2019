import copy
import cv2
import hashlib
import io
import json
import mimetypes
import numpy as np
import os
import re
import requests
import subprocess
import tempfile
import yaml

from io import BytesIO
from PyPDF2 import PdfFileWriter, PdfFileReader
from urllib.request import Request, urlopen
from wand.color import Color
from wand.image import Image

def nparray_from_page(page,resolution=144):
    dst_pdf = PdfFileWriter()
    dst_pdf.addPage(page)
    pdf_bytes = io.BytesIO()
    dst_pdf.write(pdf_bytes)
    pdf_bytes.seek(0)
    img = Image(file = pdf_bytes, resolution=resolution)
    img.background_color = Color('white')
    img.format        = 'tif'
    img.alpha_channel = 'remove'
    img_buffer=np.asarray(bytearray(img.make_blob()), dtype=np.uint8)
    if img_buffer is not None:
        rval = cv2.imdecode(img_buffer, cv2.IMREAD_UNCHANGED)
    return rval

def crop_image(img,bounds):
    h = img.shape[0]
    w = img.shape[1]
    x0 = int(bounds[0]*w)
    y0 = int(bounds[1]*h)
    x1 = int(bounds[2]*w)
    y1 = int(bounds[3]*h)
    return img[y0:y1, x0:x1]

def scale_down(img,factor):
    h = img.shape[0]
    w = img.shape[1]
    return cv2.resize(img, (w//factor, h//factor),  interpolation = cv2.INTER_AREA)

def get_page_indices(expression, np):
    '''
    convert expression describing page ranges to a set of pages,
    adjust to zero indices, e.g:
    "1, 3-4, 7-9" --> {0, 2, 3, 6, 7, 8}
    '''
    plist = set()
    for tok in expression.split(','):
        r = tok.split('-')
        if len(r) == 1:
            r = r+r
        else:
            if r[0].strip()=='':
                r[0] = 1
            if r[1].strip()=='':
                r[1] = np
        for p in range(int(r[0])-1,int(r[1])):
           if p>=0 and p <np:
               plist.add(p)
    return plist

def fetch_and_hash(*,url):
    response = requests.get(url)
    response.raise_for_status()
    content_type = response.headers['content-type']
    extension = mimetypes.guess_extension(content_type)

    md5 = hashlib.md5(response.content).hexdigest()
    fname = '%s%s' % (md5[0:11], extension)

    if type(response.content)=='str':
        file = open(fname, "w")
    else:
        file = open(fname, "wb")
    file.write(response.content)
    file.close()

    results = {'md5': md5, 'src_url': url, 'fname': fname}
    if content_type=='application/pdf':
        results['npages'] = PdfFileReader(fname).getNumPages()
    return results
        

def pdf_to_image(*,src,tgt,crop_rect,pages,dpi=108):
    input = PdfFileReader(src)
    npages = input.getNumPages()
    page_list = get_page_indices(pages,npages)
    resample = 2 if dpi<=200 else 1
    img = None
    for i in page_list:
        page = input.getPage(i)
        pg_img = nparray_from_page(page, dpi*resample);
        pg_img = crop_image(pg_img, crop_rect)
        if resample>1:
            pg_img = scale_down(pg_img, resample)
        if img is None:
            img = pg_img
        else:
            img = np.concatenate((img,pg_img), axis=0)
    if img is None or (0 == img.shape[0]*img.shape[1]):
        raise(Exception('Image is empty - no file written'))
    cv2.imwrite(tgt, img)
    return {'shape': img.shape}

    
def handle_engageny(url):
    subprocess.run(["wget", "-O", "src.pdf", url])
    md5 = hashlib.md5(open('src.pdf','rb').read()).hexdigest()
    fname = md5[0:8]
    pdf_file = '%s.pdf' % fname
    os.rename('src.pdf', pdf_file)
    input = PdfFileReader(pdf_file)

    npages = input.getNumPages()

    img = None
    hi_res_img = None
    for i in range(npages):
        page = input.getPage(i)
        crop_rect = [0.03, 0.10, 0.93, 0.90]

        final_dpi = 108
        resample = 2
        pg_img = nparray_from_page(page, final_dpi*resample);
        pg_img = crop_image(pg_img, crop_rect)
        pg_img = scale_down(pg_img, resample)
        if img is None:
            img = pg_img
        else:
            img = np.concatenate((img,pg_img), axis=0)
            
        final_dpi = 4*108
        hi_res_pg_img = nparray_from_page(page, final_dpi);
        hi_res_pg_img = crop_image(hi_res_pg_img, crop_rect)

        if hi_res_img is None:
            hi_res_img = hi_res_pg_img
        else:
            hi_res_img = np.concatenate((hi_res_img,hi_res_pg_img), axis=0)

    results = {'md5': md5, 'src_url': url, 'n_pages': npages, 'fname': fname}
    
    if img is not None:
        npix = img.shape[0] * img.shape[1]
        if npix>0:
            f = "%s.png" % (fname)
            cv2.imwrite(f, img)
            results['lo_res'] = f
    if hi_res_img is not None:
        npix = hi_res_img.shape[0] * hi_res_img.shape[1]
        if npix>0:
            f = "%s_hi_res.png" % (fname)
            cv2.imwrite(f, hi_res_img)
            results['hi_res'] = f

    return results
    
    
