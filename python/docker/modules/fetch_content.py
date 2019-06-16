import copy
import cv2
import hashlib
import io
import json
import numpy as np
import os
import re
import subprocess
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
    
    
