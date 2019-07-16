# Gester - Internal Content Ingestion Tool - User Guide #
a user guide for the gester tool & all of its features
## Getting Started ##
The left-hand side of the page contains the tree view of all content in the database by lesson. This tree view can highlight various lessons using the 'Highlight On' input. When a highlight input is given, the applicable nesting folders and lessons will be highlighted when that lesson matches the highlight input.
## Lesson Ingestion ##
### Ingestion Properties ###
Each lesson has the following properties:
* **status** - the state of ingestion for that lesson (editable)
* **notes** - interesting details found by users during content ingestion (editable)
* **keywords** - tags that describe the lesson's content (editable)
* **standards** - applicable common core education standards
### Content Ingestion ###
In addition to the properties of each lesson, one of the main features of this tool is collecting individual tasks from PDFs. This is done in a 4-stage process: selection, segmentation, whitespace editing, and uploading. 
Here we will cover the main features of each stage:
#### Selection ####
Begin this stage by selecting 'Load' under the URL input bar. This will load the URL found the input box; this box is autofilled from the database, but it can be changed manually if it is incorrect. 
Loading the content takes a minute the first time, but when this is complete each page of the PDF will be rendered as an image thumbnail. To continue on to the next step, select the pages with applicable content to process.
This can be done in a variety of ways:
1. Inputting the page #s via the text input box as comma separated values (ex. 1, 3) and/or page ranges (ex. 5-9).
2. Selecting/Deselecting individual page thumbnails by clicking them
3. Selecting/Deseclting page ranges by clicking a page, then holding shift + clicking another page to select/deselect that range of pages.
* note that options 2 and 3 will change the input text box automatically *
#### Segmentation ####
After selecting the desired pages to segment, hit the button labeled 'Process' to bring you to the segmentation page. This is where you will select the individual tasks/pieces of content within each page you selected in the previous stage. To segement tasks click on where the task begins and drag to where the task ends. An individual task will be all the sections of the same color. If you do not select all sections of a task correctly at first, you can add sections to a task by clicking a section already in the task and dragging.
Once you have all the tasks highlighted, hit 'Continue to Stage 2' to edit the whitespace of these tasks.
#### White Space Editing ####
Drag the blue lines within each task to add/eliminate excess whitespace. Once you have done this for all tasks, click 'Upload'
#### Uploading ####
TBD
