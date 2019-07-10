# coding: utf-8


import task_level_segment as tls
from sys import argv
import cv2
from os.path import join, exists
from os import mkdir
from skimage.segmentation import felzenszwalb
from scipy.ndimage import label
from skimage.measure import regionprops
from datetime import datetime


def save_subimages(subimages, path):
    """
    This function takes an iterable of subimages and an iterable of
    segment coordinates.
    
    Then saves each subimage in the file-path specified.
    """
    date = datetime.now().strftime('%d%b%y')
    time = datetime.now().strftime('%X')
    
    iter_ascii = 65 #'A'
    for image in subimages:
        image_name = "{time}_{date}_{itr}.{ext}".format(
                                            time=str(time),
                                            date=str(date),
                                            itr=chr(iter_ascii),
                                            ext="png"
                                            )
        
        # Create target Directory if doesn't exist
        if not exists(path):
            mkdir(path)
        
        cv2.imwrite(join(path, image_name), image)
        iter_ascii += 1

def label_subimages(subimages):
    """
    This function takes in an iterable of subimage arrays.
    
    It returns labeled subimage arrays.
    """
    labeled_subimages = []
    
    for image in subimages:
        FZ = felzenszwalb(image, 1)
        labeled_subimage, _ = label(FZ)
        
        labeled_subimages.append(labeled_subimage)
        
    return labeled_subimages

def cut_subtasks(image, labeled_subimage):
    """
    This function takes in an openCV image object and a labeled subimage.
    
    It returns a list of image arrays that were contained inside the
    labeled subimage.
    """
    redboxs = []
    
    # crop all of the sub-task bounding boxes from the labeled subimage
    for region in regionprops(labeled_subimage):
        minY, minX, maxY, maxX  = region.bbox
        crop_img = image[minY:maxY, minX:maxX]
        redboxs.append(crop_img)
        
    return redboxs

def main(source_img, destination_path):
    img = tls.load_image(source_img)
    
    gray_img, thresh_img = tls.preprocess_image(img)
    
    # find vertical segmentation
    break_coords = tls.segment_image(thresh_img, direction='vertical')

    # if vertical segmentation is identified, find horizontal
    # sub-segmentation
    if break_coords is not None:
        subimages = tls.cut_image(img, break_coords)
        break_coords += (tls.segment_subimages(
                                               subimages,
                                               break_coords,
                                               direction='horizontal'
                                              ))
        
    # otherwise, find horizontal segmentation
    else:
        break_coords = tls.segment_image(
                                         thresh_img,
                                         direction='horizontal'
                                        )
        subimages = tls.cut_image(img, break_coords)
    
    # save the task-level segments
    task_dest_path = join(destination_path, 'tasks')
    save_subimages(subimages, task_dest_path)
    
    # label the subtasks
    labeled_subimages = label_subimages(subimages)
    
    # cut the subtasks from the subimages
    subtasks = cut_subtasks(img, labeled_subimages[0])
    
    # save the subtask images
    subtask_dest_path = join(destination_path, 'subtasks')
    save_subimages(subtasks, subtask_dest_path)

    
if __name__ == '__main__':
    # receive command line arguments for source image filename
    source_img = str(argv[1])
    # and destination path strings
    destination_path = str(argv[2])

    main(source_img, destination_path)





