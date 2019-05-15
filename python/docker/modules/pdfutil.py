
import cv2
import io
import numpy as np
from PyPDF2 import PdfFileWriter, PdfFileReader
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
