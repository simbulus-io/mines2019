
import cv2
import io
import numpy as np
from PyPDF2 import PdfFileWriter, PdfFileReader
import subprocess
from wand.image import Image
from wand.color import Color

def page_from_file(filename,idx):
    input = PdfFileReader(open(filename, "rb"))
    n = input.getNumPages()
    if idx<0 or idx>=n:
        return None
    return input.getPage(idx)
    
def image_from_page(page,resolution=72):
    dst_pdf = PdfFileWriter()
    dst_pdf.addPage(page)
    pdf_bytes = io.BytesIO()
    dst_pdf.write(pdf_bytes)
    pdf_bytes.seek(0)
    img = Image(file = pdf_bytes, resolution=resolution)
    return img

def nparray_from_image(img):
    img.background_color = Color('white')
    img.format        = 'tif'
    img.alpha_channel = False
    img_buffer=np.asarray(bytearray(img.make_blob()), dtype=np.uint8)
    rval = None
    if img_buffer is not None:
        rval = cv2.imdecode(img_buffer, cv2.IMREAD_UNCHANGED)
    return rval
        
def strings_from_page(page):
    strings = page.extractText().split('\n')
    strings = [s for s in strings if s.strip()!=""]
    return strings


import xml.etree.ElementTree as ET 
import yaml

def s2vec(s,delim=','):
    return [float(w) for w in s.split(delim)]

def fontspec(attr, incl_mods=False):
    if not 'font' in attr:
        return None
    f = attr['font']
    sz = float(attr['size'])
    is_bold = 'bold' in f.lower()
    is_ital = 'italic' in f.lower()
    f = f.split(',')[0]
    f = f.split('+')[-1]
    f = f.replace('Bold','').replace('Italic','').strip()
    desc = [f, '%d'%round(sz)]
    if incl_mods:
        if is_bold:  desc.push('Bold')
        if is_ital:  desc.push('Ital')
    return ';'.join(desc)
    

def mine_strings(filename):

    cmd = "pdf2txt.py '%s' -t xml" % filename
    d = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE).stdout.read()
    pages = ET.fromstring(d)
    # tree = ET.parse('foo.xml')
    # pages = tree.getroot()

    desc = []
    for pg in pages.findall('./page'):
        pg_desc = {}
        pg_desc['bbox'] = s2vec(pg.attrib['bbox'])
        strings = []
        for bx in pg.findall('./textbox'):
            for ln in bx.findall('./textline'):
                # bbox = print(ln.attrib['bbox'])
                bbox = s2vec(ln.attrib['bbox'])
                text = ''
                fonts = set()
                for t in ln.findall('./text'):
                    atr = t.attrib
                    text += t.text
                    fs = fontspec(atr)
                    if not fs is None:
                        fonts.add(fs)
                if text.strip()!='':
                    strings.append({'bbox': bbox, 'text': text.strip(), 'fonts': list(fonts)})
        pg_desc['strings'] = strings
        desc.append(pg_desc)

    return desc
