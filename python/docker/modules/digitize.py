import base64
import requests
import json
from sys import argv

def mathpix(source_img):
    # generate encoded string of source image data
    image_uri = "data:image/jpg;base64," + base64.b64encode(open(source_img, "rb").read()).decode()
    # make POST request
    r = requests.post("https://api.mathpix.com/v3/latex",
                      data=json.dumps({'src': image_uri,
                                       'formats': ['mathml']}),
                      headers={"dantearcuri_mymail_mines_edu": "trial",
                               "app_key": "b9bdc0a8b9b5422ac701",
                               "Content-type": "application/json"})
    
    return json.dumps(json.loads(r.text), indent=4, sort_keys=True)


if __name__ == '__main__':
    # receive command line argument for source image filename
    source_img = str(argv[1])
    
    # make call to API
    results = mathpix(source_img)
    print('MathPix results:')
    print(results)