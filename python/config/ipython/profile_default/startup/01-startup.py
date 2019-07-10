# - - - - - - - -
# Add root directory to the python system path
def append_root_to_path():
    import sys
    root = '/root'  # assumes we are running dockerized and that, e.g., /root/modules contains modules
    sys.path.append(root)
append_root_to_path()
# - - - - - - - -

import cv2
from matplotlib import pyplot as plt
import numpy as np
import pandas as pd

from IPython import get_ipython
ipython = get_ipython()

# If in ipython, load autoreload extension
if 'ipython' in globals():
    print('\nWelcome to IPython!')
    ipython.magic('load_ext autoreload')
    ipython.magic('autoreload 2')

# Display all cell outputs in notebook
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = 'all'

print('Your favorite libraries have been loaded.')
