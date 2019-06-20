import io

from os import environ
from json import loads
from google.protobuf.json_format import MessageToJson
from google.cloud import vision

def get_subsegment_bounds(img_path, api_key_path):
    """
    Detects document features in an image.
    
    Takes an file path + name as a string.
    
    Returns a list of coordinates for the bounding box of each paragraph.
    """
    environ["GOOGLE_APPLICATION_CREDENTIALS"] = api_key_path
    
    client = vision.ImageAnnotatorClient()

    with io.open(path, 'rb') as image_file:
        content = image_file.read()

    image = vision.types.Image(content=content)

    response = client.document_text_detection(image=image)
    
    serialized = MessageToJson(response)
    
    data_dict = loads(serialized)
    
    blocks = data_dict['fullTextAnnotation']['pages'][0]['blocks']
    
    bounding_boxes = []
    for block in blocks:
        paragraphs = block['paragraphs']
        for paragraph in paragraphs:
            bounding_box = paragraph['boundingBox']['vertices']
            bounding_boxes += [bounding_box]
            
    return bounding_boxes