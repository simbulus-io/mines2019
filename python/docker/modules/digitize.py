import base64
import requests
import io
from json import loads, dumps
from os import environ
from sys import argv
from google.cloud import vision
from google.protobuf.json_format import MessageToJson

def mathpix(source_img):
    # generate encoded string of source image data
    image_uri = "data:image/jpg;base64," + base64.b64encode(open(source_img, "rb").read()).decode()
    # make POST request
    r = requests.post("https://api.mathpix.com/v3/latex",
                      data=dumps({'src': image_uri,
                                       'formats': ['mathml']}),
                      headers={"dantearcuri_mymail_mines_edu": "trial",
                               "app_key": "b9bdc0a8b9b5422ac701",
                               "Content-type": "application/json"})
    
    return json.dumps(loads(r.text), indent=4, sort_keys=True)

def google_vision(image_path, api_key_path):
    """
    Detects document words in an image.

    Takes a file path + name as a string & the path/name of a key to google api.

    Returns a string reprisentation of the words in the image.
    """
    environ["GOOGLE_APPLICATION_CREDENTIALS"] = api_key_path
    client = vision.ImageAnnotatorClient()

    with io.open(image_path, 'rb') as image_file:
        content = image_file.read()
        
    image = vision.types.Image(content=content) 
    
    #contains the full response from google API
    response = client.document_text_detection(image=image) 
    
    serialized = MessageToJson(response)
    data_dict = loads(serialized)
    
    received_text = data_dict['textAnnotations'][0]['description'] # string representation of image

    return received_text

if __name__ == '__main__':
    # receive command line argument for source image filename
    source_img = str(argv[1])
    
    # make call to API
    results = mathpix(source_img)
    print('MathPix results:')
    print(results)
