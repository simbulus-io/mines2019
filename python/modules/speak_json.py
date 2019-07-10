from json import load, dump

def read(filename):
    """
    This function takes in a filename (with true or relative path and
    file extension) string of a file that contains json data to be read.

    It returns a python dictionary containing the json data contained
    within the argument file.
    """
    with open(filename) as json_infile:
        data = load(json_infile)

    return data

def write(json_dict, filename):
    """
    This function takes in a python dictionary and a filename (with
    true or relative path and file extension) string.

    The function writes the dictionary (argument 1) to specified file
    (argument 2) as JSON data.
    """
    with open(filename, 'w') as json_outfile:
        dump(json_dict, json_outfile)

