
from bs4 import BeautifulSoup as Bsoup
import csv
import os
import re
import requests

from dataclasses import dataclass, field

@dataclass
class Lesson:
    subj: str = None
    module_num: int = 0
    lesson_num: int = 0
    url: str = None
    student_docx: str = None
    student_pdf: str = None
    teacher_docx: str = None
    teacher_pdf: str = None
    status: str = None
    notes: str = ""
    keywords: set = field(default_factory=lambda: set())

def process_spreadsheet(fname = '../data/EngageNY/content.tsv'):
    lessons = []
    subjects = set()
    lsn = None
    with open(fname) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter='\t')
        line_count = 0
        for row in csv_reader:
            if line_count == 0:
                # print(f'Column names are {", ".join(row)}')
                line_count += 1
            else:
                a = row[0].strip()
                b = row[1].strip()
                c = row[2].strip()
                d = row[3].strip()
                g = row[6].strip()
                h = row[7].strip()
                i = row[8].strip()
                # if len(a)>0:
                #     modules.append(a)
                if len(b)>0:
                    if lsn is not None:
                        lessons.append(lsn)
                        # if len(lsn.keywords) > 0:
                        #     print(lsn)
                    lsn = Lesson(url=b)
                    # print(f'\t{b}')
                if len(d)>0:
                    if lsn.subj is None:
                        # print(f"\t<<{d}>>")
                        subj, _ = d.split(' Module ')
                        subj = subj.replace(' Mathematics', '').strip()
                        if subj=='Precalculus and Advanced Topics':
                            subj = 'Precalculus'
                        subjects.add(subj)
                        lsn.subj = subj
                        mod_id = re.match(r".*Module ([0-9]+).*",d).group(1)
                        lsn.module_num = int(mod_id)
                        les_id = re.match(r".* Lesson ([0-9]+).*",d).group(1)
                        # print (les_id)
                        lsn.lesson_num = int (les_id)
                        # print(lsn.subj,'--',lsn.module_num,'--',lsn.lesson_num)
                if len(c)>0:
                    is_pdf = bool (re.search(r"\.pdf", c))
                    is_docx = bool (re.search(r"\.docx", c))
                    is_teacher = bool (re.search(r"-teacher\.", c))
                    if is_teacher:
                        if is_pdf:
                            lsn.teacher_pdf = c
                        if is_docx:
                            lsn.teacher_docx = c
                    else:
                        if is_pdf:
                            lsn.student_pdf = c
                        if is_docx:
                            lsn.student_docx = c
                if len(g)>0:
                    lsn.status = g.lower()
                if len(h)>0:
                    if (len(lsn.notes)>0): 
                        lsn.notes += " "
                    lsn.notes += h
                if len(i)>0:
                    lsn.keywords = lsn.keywords.union( set(re.split('[,;] ', i)) )             

                line_count += 1
        if lsn is not None:
            lessons.append(lsn)
            
        print(f'Processed {line_count} lines, {len(lessons)} lessons.') 

        return lessons, subjects
    
std_refs = {}

def scan_engage_lesson(url):
    r  = requests.get(url)
    soup = Bsoup(r.text, 'html.parser')
    desc = None
    stds = set()
    title = soup.title.text
    div_w_sum = soup.find_all('div', {"class": "field-type-text-with-summary"})
    for d in div_w_sum:
        desc = d.text.strip()
        break
        
    std_ref = re.compile("^([A -Z0-9a-d]+\.){2,5}[A-Z0-9a-d]+$")        
    links = soup.find_all('a')
    for l in links:
        t = l.text.strip()
        if std_ref.search(t):
            stds.add(t);
            std_refs[t] = f'https://www.engageny.org{l["href"]}'
    return title,desc,stds
 
    


def nlp_v_np(txt):
    import spacy
    # Load English tokenizer, tagger, parser, NER and word vectors
    nlp = spacy.load("en_core_web_sm")
    
    doc = nlp(txt)
    np = [chunk.text for chunk in doc.noun_chunks]
    v = [token.lemma_ for token in doc if token.pos_ == "VERB"]
    
    # print("Noun phrases:\n\t-", '\n\t- '.join())
    # print("Verbs:\n\t-", '\n\t- '.join())
    return v, np

def scan_std(url):
    r  = requests.get(url)
    soup = Bsoup(r.text, 'html.parser')
    desc = None
    stds = set()
    title = soup.title.text
    dl = soup.find('dl')
    dt = dl.find_all('dt')
    dd = dl.find_all('dd')
    desc = {}
    for i in range(len(dt)):
        key = dt[i].text.strip()
        key = re.sub(r"[:.]$", "", key)
        if not key in ['Category', 'State Standard', 'Sub-Category']:
            raise (f"Unexpected key {key}")
        desc[key] = dd[i].text.strip()

    v, np = nlp_v_np(desc['State Standard'])
        
    return desc, v, np


