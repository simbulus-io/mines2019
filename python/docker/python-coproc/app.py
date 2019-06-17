# - - - - - - - -
# Add directory above the directory containing this __file__ to the python system path
def append_root_to_path():
    import os
    import sys
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.append(root)
append_root_to_path()
# - - - - - - - -

Known_Commands = dict()

def command(func):
    """
    Register a function as a known command.
    Prefixing a function definition with an @command decorator will cause the
    function to register by name into Known_Commands[].
    """
    Known_Commands[func.__name__] = func
    return func

# - - - - - - - - - - - - - - - - - - - -

from modules.fetch_content import handle_engageny as handle_eny;

@command
def fetch_engageny_content(*,url=None):
    if url is None:
        return {'status': -1, 'error': 'fetch_engageny_content job did not specify a url'}
    res = handle_eny(url)
    return res

# - - - - - - - - - - - - - - - - - - - -

from PIL import Image

@command
def image_stats(*,file=None):
    if file is None:
        return {'status': -1, 'error': 'image_stats job did not specify a file'}
    im = Image.open(file)
    width, height = im.size
    return {'height': height, 'width': width}

# - - - - - - - - - - - - - - - - - - - -

@command
def xy_segment_image(*,file=None):
    if file is None:
        return {'status': -1, 'error': 'xy_segment_image job did not specify a file'}
    stats = image_stats(file=file)
    return {'cuts': [stats['height']//4, stats['height']//2]}

# - - - - - - - - - - - - - - - - - - - -
# - - - - - - - - - - - - - - - - - - - -

def run(job):
    if not ('command' in job):
        return {'status': -1, 'error': 'job did not specify a command'}
    cmd = job['command']

    if not (cmd in Known_Commands):
        return {'status': -1, 'error': ('Unknown command: %s.\n Known commands are: %s' %
                                        (cmd, ', '.join(Known_Commands)))}
    if 'args' in job:
        return Known_Commands[cmd](**(job['args']))
    else:
        return Known_Commands[cmd]()

import os
import pathlib
import traceback

def do_job(job, jobdir = '/shared/jobs'):
    pwd = os.getcwd()
    try:
        tdname = 'tmp'
        if 'dir' in job:
            tdname = job['dir']
        elif 'name' in job:
            tdname = job['name']
        elif 'job_id' in job:
            tdname = job['job_id']
        tdir = '/'.join([jobdir, tdname])
        pathlib.Path(tdir).mkdir(parents=True, exist_ok=True)
        os.chdir(tdir)
        result = run(job)
        result['status'] = 0
    except Exception as ex:
        template = "An exception of type {0} occurred. Arguments:\n{1!r}"
        e_message = template.format(type(ex).__name__, ex.args)
        result = {'status': -1, 'error': e_message, 'trace': traceback.format_exc()}

    if ('job_id' in job) and not ('job_id' in result):
        result['job_id'] = job['job_id']
    if ('name' in job) and not ('name' in result):
        result['name'] = job['name']
    if result['status'] != 0:
        result['orig_job'] = job
    if not ('jobdir' in result):
        result['jobdir'] = tdir

    os.chdir(pwd)
    return result

# Looks for jobs in the jobs collection, and if found, pulls and runs one
# and populates the results collection
# returns a result blob if a job was found and executed (regardless of the outcome)
# else returns None
def poll_for_jobs(jobs,results):
    # print('polling for jobs from %s at %s' % (mongo_url, time.ctime()) )
    job = jobs.find_one()
    if job!=None:
        jobs.delete_one({'_id': job['_id']})
        print('Got a Job: ', job)
        result = do_job(job)
        results.insert_one(result)
        print('Completed Job and pushed results blob to mongodb.')
        return result
    else:
        return None

# - - - - - - - - - - - - - - - - - - - -

import sys
from time import sleep

def main():
    from pymongo import MongoClient

    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
    # print ('mongo_url = %s' % mongo_url)
    mongo_client = MongoClient(mongo_url)
    db = mongo_client.content
    jobs = db.jobs
    results = db.results

    min_sleep_time = 1
    max_sleep_time = 1
    sleep_time = min_sleep_time

    while True:
        r = poll_for_jobs(jobs, results)
        if r==None:
            sleep(sleep_time)
            if (sleep_time<max_sleep_time):
                sleep_time *= 1.1
        else:
            sys.stdout.flush()
            sleep_time = min_sleep_time

def mock_main():
    jobs = [
        {'name': 'beny1',
         'dir' : 'my_job',
         'command': 'fetch_engageny_content',
         'args': {
           'url':  "https://www.engageny.org/file/61111/download/math-g7-m4-topic-b-lesson-9-student.pdf?token=U5lmuBD4"
         }},
        {'name': 'beny2',
         'dir' : 'my_job',
         'command': 'xy_segment_image',
         'args': {
           'file':  "0d4e3b00.png"
         }},
        # {'name': 'beny3',
        #  'command': 'fetch_engageny_content',
        #  'args': {
        #     'url' : 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3',
        #     }},
        ]
    for job in jobs:
        print('running job %s' % job) 
        sys.stdout.flush()
        res = do_job(job, '/app/jobs')
        print('result: %s' % res) 
        sys.stdout.flush()
        sleep(2)
        

if __name__ == '__main__':
    if "MONGO_URL" in os.environ:
        main()
    else:
        mock_main()
