# coding: utf-8

import cv2
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import numpy as np
from itertools import groupby
from statistics import median

# load image function
def load_image(img_str):
    """
    This function takes a string argument that is the true or relative
    path and filename of a valid image file.
    
    The value returned is a openCV2 object containing the image data.
    """
    return cv2.imread(img_str)
    
# Start Preprocess function?
def preprocess_image(img):
    """
    This function takes a openCV2 object containing the image data.
    
    The values returned is a openCV2 object containing the 
    thresholded image data and grayscale image.
    """
    # retain 25% of original pixels
    # downsampled = cv2.resize(CV_img, None, fx=0.25, fy=0.25) 

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    # set threshholding (what is black/white)?
    kernel = cv2.getStructuringElement(cv2.MORPH_CROSS, (3, 3))
    dilated = cv2.dilate(gray, kernel, iterations=1)
    thresh = cv2.adaptiveThreshold(dilated, 1, cv2.ADAPTIVE_THRESH_MEAN_C, cv2.THRESH_BINARY, 5, 10) 
    return gray, thresh

def segment_image(thresh_img, direction='horizontal', whitespace_thresh=5):
    """
    This function takes a openCV2 object containing thresholded image data.
    
    The value returned is a list of row values to cut along.
    """
    # TODO: Fix magic "5" numbers; consider making second param
    
    if direction == 'vertical':
        # rotate image 90 deg clock-wise
        thresh_img = np.rot90(thresh_img, 3)
    
    # reduce matrix to a vector using the sum of all rows (consider removing flatten())
    row_counts = cv2.reduce(thresh_img, 1, cv2.REDUCE_SUM, dtype=cv2.CV_32SC1).flatten()
    height, width = thresh_img.shape;
   
    # white_rows is a binary vector of length height. white_rows[i]=1 if and only if the i'th row
    # in the thresholded image is all white pixels
    white_rows = np.where(row_counts==max(row_counts), 1, 0)
    # from white_rows we build the array white_blocks that contains arrays of the␣form [start,end]
    # with the start and end rows of all-white blocks of rows... i.e. bound on␣vertical whitespace
    white_blocks = []
    pos = 0
    print(white_rows)

    # condensing adjacent equivalencies
    for k,g in groupby(white_rows):
        start = pos
        # The size of the white block + your current position is where the block ends
        end = pos + len(list(g))
        is_margin = start==0 or end==height
        # if a row is white (k==1) and is not a margin then it is a white block
        is_margin = False; #include margins for now
        if k==1 and not is_margin:
            white_blocks.append([start,end-1])
        pos = end
    
    # = = = = = = = = =
    return white_blocks
    # = = = = = = = = =

    # if there are no white blocks found
    if not white_blocks:
        return None
    
    # find the average size of all previous white blocks
    median_size = median([b[1]-b[0] for b in white_blocks])

    # the smallest acceptable size is the larger of 1/5 the median block size OR 5 rows
    min_block_size = max(median_size//5, whitespace_thresh)

    # throw out small blocks of whitespace
    white_blocks = [b for b in white_blocks if (b[1]-b[0]>=min_block_size)]

    # alternate array of only above-median height blocks of whitespace
    big_blocks = [b for b in white_blocks if (b[1]-b[0]>=median_size)] # all blocks larger/= than the avg block

    #  set the threshold for blocks large enough to segment
    only_big = (len(white_blocks) > 5) # true if there are more than 5 blocks

    # if there are more than 5 white blocks then blocks is all blocks  bigger or equal size as the median block size
    # otherwise blocks is all blocks greater than at least five rows 
    blocks = big_blocks if only_big else white_blocks

    # place segmentation breaks within the selected whitespace blocks... near the␣bottom of each
    # Consider using breaks = b[1] only
    row_breaks = [b[1] - min(median_size//5, (b[1]-b[0])//2) for b in blocks]

    # convert row value integers into endpoint coordinates representing segment lines
    # the values are multiplied by 4 to account for downsampling
    if direction == 'horizontal':
        break_coords = [[[4*0, 4*b], [4*width, 4*b]] for b in row_breaks]
    else:
        break_coords = [[[4*b, 4*0], [4*b, 4*width]] for b in row_breaks]
    
    if not break_coords:
        return None
    else:
        return break_coords

def segment_subimages(subimages, break_coords, direction='horizontal'):
    """
    This function takes an iterable of subimages and an iterable of segment coordinates.
    
    It returns an iterable of segmented coordinates including the new segments found in
    the subimages.
    """
    # establish a segmentation line translation value to adjust sub-segmentation lines
    # to fit the original image
    translation = 0
    # perform cuts on all subimages
    for img_num in range(len(subimages)):

        # preprocess subimage
        gray_image, thresh_img = preprocess_image(subimages[img_num])
        # append subsegments to the list of segment coordinates
        new_sub_break = segment_image(thresh_img, direction=direction)

        # if a segment is found in the subimage
        if new_sub_break:
            # translate the cut to its relative location on the original image
            new_sub_break[0][0][1] += translation
            new_sub_break[0][1][1] += translation
            # add it to the list of breaks
            break_coords += new_sub_break 

        # get the x/y-value of the upper bound of the subimage to translate
        # the sub-segmentation line to its relative location in the original image
        translation = break_coords[img_num][0][1]

    return break_coords

def calc_bounds(img, break_coords):
    """
    This function takes a raw openCV image object and
    a list of values indicating where to segment the image.
    
    The value returned is a list of upper/lower bounds for each segment.
    """
    height, _ , _ = img.shape;
    subimage_bounds = []
    pos = 0
    for [(coord1_x, coord1_y), (coord2_x, coord2_y)] in break_coords:
        subimage_bounds.append([pos, coord1_y])
        pos = coord1_y

    subimage_bounds.append([pos,height])
    
    return subimage_bounds
    
def cut_image(CV_img, break_coords):
    """
    This function takes a openCV2 object containing image data & list of
    values indicating where to segment the image.
    
    The value returned is a list of sub-images.
    """
    # using the segmentation cut lines, take a bunch of subimages from the original␣(raw) image array
    subimage_bounds = calc_bounds(CV_img, break_coords)

    # the subimages array will contain an array of len(breaks)+1 non-overlapping␣images taken from raw[]
    # (the raw image was downsampled by 4x in the processing that found the cut␣lines, hence the 4* below.)
    subimages = [CV_img[int(b[0]):int(b[1])-1] for b in subimage_bounds]
   
    return subimages
    
def plot_segmented_image(image, break_coords):
    """
    This function takes an image & list of
    values indicating where to segment the image.
    
    This function displays the image segmented with red lines
    """
    fig1 = plt.figure(figsize=(15, 60))
    ax = fig1.add_subplot(1, 1, 1)
    ax.imshow(image, cmap='gray')
    ax.set_xticks([])
    ax.set_yticks([])

    if break_coords is not None:
        #highlight the cut lines in red:
        for [(coord1_x, coord1_y), (coord2_x, coord2_y)] in break_coords:
            height = coord2_y - coord1_y
            width = coord2_x - coord1_x
            rect = patches.Rectangle((coord1_x, coord1_y), width, height,
                                linewidth=0.25, edgecolor='r', facecolor='none')
            ax.add_patch(rect)

    plt.show()

def y_wspace(*,file):
    image = load_image(file)

    gray_img, thresh_img = preprocess_image(image)
    
    # find vertical segmentation
    break_coords = segment_image(thresh_img, direction='vertical')
    return break_coords

def main(img_str):
    # load the image
    image = load_image(img_str)

    gray_img, thresh_img = preprocess_image(image)
    
    # find vertical segmentation
    break_coords = segment_image(thresh_img, direction='vertical')

    # if vertical segments were identified, find horizontal sub-segmentation
    if break_coords is not None:  
        subimages = cut_image(image, break_coords)
        break_coords += [segment_subimages(subimages, break_coords,
                                           direction='horizontal')]
        
    # otherwise, find horizontal segmentation
    else:
        break_coords = segment_image(thresh_img, direction='horizontal')

    # plot the results
    plot_segmented_image(image, break_coords)
    
    
if __name__ == '__main__':
    main()

