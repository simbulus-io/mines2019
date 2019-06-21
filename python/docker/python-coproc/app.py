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

from modules.fetch_content import fetch_and_hash as fetch_and_hash

@command
def fetch_content(*,url=None):
    if url is None:
        print('fetch_content job did not specify a url')
        return {'status': -1, 'error': 'fetch_content job did not specify a url'}
    res = fetch_and_hash(**locals())
    return res

# - - - - - - - - - - - - - - - - - - - -

from modules.fetch_content import pdf_to_image as _pdf_to_image

@command
def pdf_to_image(*, src=None, tgt=None, crop_rect=[0.0, 0.0, 1.0, 1.0], pages='-', dpi=108, concatenate=True):
    if src is None:
        print('pdf_to_image job did not specify a src file as args.src')
        return {'status': -1, 'error': 'pdf_to_image job did not specify a src'}
    if tgt is None:
        print('pdf_to_image job did not specify a tgt file as args.tgt')
        if concatenate:
            print('... assuming png and deriving from args.src')
            tgt = src.split('.')[0] + '.png'
        else:
            tgt = '%03d.png'
            print('... assuming png and setting tgt = "%s"' % tgt)
    return _pdf_to_image(**locals())

# - - - - - - - - - - - - - - - - - - - -

from modules.fetch_content import handle_engageny as handle_eny;

@command
def fetch_engageny_content(*,url=None):
    if url is None:
        print('fetch_engageny_content job did not specify a url')
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

from modules.task_level_segment import y_wspace as y_wspace;

@command
def y_segment_image(*,file=None):
    if file is None:
        return {'status': -1, 'error': 'xy_segment_image job did not specify a file'}
    stats = image_stats(file=file)
    yw = y_wspace(file=file)
    return {'white_space_rows': yw}

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

import datetime
import io
import os
import pathlib
import sys
import time
import traceback
from contextlib import redirect_stdout
from threading import Thread



def t_run(job, res):
    capture = io.StringIO()
    with redirect_stdout(capture):
        try:
            res[0] = run(job);
        except Exception as ex:
            res[0] = ex
            res[2] = traceback.format_exc()
    res[1] = capture.getvalue()

def run_w_t_out(job,timeout):
    res = [Exception('job timeout of %s seconds was exceeded' % timeout), '', None]
    t = Thread(target=t_run, args=(job, res))
    t.start()
    t.join(timeout)
    return res

def do_job(job, jobdir = '/shared/jobs'):
    pwd = os.getcwd()
    log = ''
    result = {}
    try:
        tdname = 'tmp'
        if 'dir' in job:
            tdname = job['dir']
        elif 'name' in job:
            tdname = job['name']
        elif 'job_id' in job:
            tdname = job['job_id']
        tdir = '%s/%s' % (jobdir, tdname)
        pathlib.Path(tdir).mkdir(parents=True, exist_ok=True)
        os.chdir(tdir)
        timeout = 60.0
        if 'timeout' in job:
            try:
                timeout = float(job['timeout'])
            except ValueError:
                raise Exception('expected number for value of "timeout" but was passed %s' % job['timeout'])
        result,log,trace = run_w_t_out(job,timeout)
        if isinstance(result, Exception):
            # result = {'status': -1, 'error': '\n'.join(result.args)}
            error = "%s: %s" % (type(result).__name__, result.args[-1])
            result = {'status': -1, 'error': error, 'trace': trace}
        if not 'status' in result:
            result['status'] = 0
    except Exception as ex:
        error = "%s: %s" % (type(ex).__name__, ex.args[-1])
        result = {'status': -1, 'error': error, 'trace': traceback.format_exc()}

    os.chdir(pwd)
    return result,log

def poll_for_jobs(jobs,worker='unknown'):
    '''
    Looks for jobs in the jobs collection, and if found, pulls and runs one
    and populates the results data.
    Returns a result blob if a job was found and executed (regardless of the outcome)
    else returns None.
    '''
    # print('polling for jobs from %s at %s' % (mongo_url, time.ctime()) )
    potential_job = jobs.find_one({'status': 'new'})
    if potential_job is None:
        return None
    # We found a potential job in the jobs collection. Make an atomic test to see if
    # it is still in the 'new' state and if so (atomically) modify it so as to lock it 
    stat = jobs.update_one({ '_id': potential_job['_id'], 'status': 'new' },
                           {'$set': {'status': 'processing',
                                     'worker': worker,
                                     'start_time': datetime.datetime.utcnow()} })
    if stat.modified_count==0:
        return poll_for_jobs(jobs,worker) #someone beat us to the potential_job -- try again
    # Got the lock on potential_job
    job = potential_job;
    print('Got a Job: ', job)
    start_time = time.time()
    result,log = do_job(job)
    elapsed_time = time.time() - start_time
    jobs.update_one({ '_id': job['_id']},
                    {'$set': {'status': 'finished',
                              'elapsed_time': elapsed_time,
                              'finish_time': datetime.datetime.utcnow(),
                              'log': log,
                              'result': result}})
    print('Completed Job and updated mongodb with results blob.')
    return result

# - - - - - - - - - - - - - - - - - - - -

def main():
    from pymongo import MongoClient

    mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
    # print ('mongo_url = %s' % mongo_url)
    mongo_client = MongoClient(mongo_url)
    db = mongo_client.content
    jobs = db.jobs
    worker_name = os.getenv('HOSTNAME', 'unknown')

    min_sleep_time = 1
    max_sleep_time = 1
    sleep_time = min_sleep_time

    while True:
        r = poll_for_jobs(jobs, worker_name)
        if r==None:
            time.sleep(sleep_time)
            if (sleep_time<max_sleep_time):
                sleep_time *= 1.1
        else:
            sys.stdout.flush()
            sleep_time = min_sleep_time

def mock_main():
    
    other_jobs = [
        {'name'          : 'beny0',
         'dir'           : 'my_job',
         'command'       : 'fetch_content',
         'args'          : {
           'url'         : 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3',
         }},
        {'name'          : 'beny1',
         'dir'           : 'my_job/thumbs',
         'command'       : 'pdf_to_image',
         'args'          : {
           'src'         :  "../23d0d29406f.pdf",
           'crop_rect'   : [0.0, 0.0, 1.0, 1.0],
           'dpi'         : 30,
           'pages'       : '-',
           'concatenate' : False,
         }},
        {'name'        : 'beny1',
         'dir'         : 'my_job',
         'command'     : 'pdf_to_image',
         'args'        : {
           'src'       :  "23d0d29406f.pdf",
           'tgt'       :  "should-not-exist.png",
           'pages'     : '37-',
         }},
        {'name'        : 'beny1',
         'dir'         : 'my_job',
         'command'     : 'pdf_to_image',
         'args'        : {
           'src'       :  "23d0d29406f.pdf",
           'tgt'       :  "23d0d29406f-thumb.png",
           'crop_rect' : [0.0, 0.0, 1.0, 1.0],
           'dpi'       : 30,
           'pages'     : '1',
         }},
        {'name'        : 'beny1',
         'dir'         : 'my_job',
         'command'     : 'pdf_to_image',
         'args'        : {
           'src'       :  "23d0d29406f.pdf",
           'crop_rect' : [0.03, 0.10, 0.93, 0.90],
           'dpi'       : 108,
           'pages'     : '1-3',
         }},
        {'name'        : 'beny1',
         'dir'         : 'my_job',
         'command'     : 'pdf_to_image',
         'args'        : {
           'src'       :  "23d0d29406f.pdf",
           'tgt'       :  "23d0d29406f-hi-res.png",
           'crop_rect' : [0.03, 0.10, 0.93, 0.90],
           'dpi'       : 4*108,
           'pages'     : '-2',
         }},
        
        ]
    
    jobs = [
        {'name': 'beny2',
         'dir' : 'my_job',
         'command': 'y_segment_image',
         'args': {
           'file':  "23d0d29406f.png"
         }},
        # {'name': 'beny1',
        #  'dir' : 'my_job',
        #  'command': 'fetch_engageny_content',
        #  'args': {
        #    'url' : 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3',
        #  }},
        # {'name': 'beny3',
        #  'command': 'fetch_engageny_content',
        #  'args': {
        #     'url' : 'https://www.engageny.org/file/54411/download/algebra-i-m4-topic-b-lesson-13-student.pdf?token=GdUwqCM3',
        #     }},
        ]
    for idx, job in enumerate(jobs):
        # if idx>0:
        #     time.sleep(2)
        print('running job %s' % job) 
        sys.stdout.flush()
        res,log = do_job(job, '/app/jobs')
        print('log: %s' % log)
        print('result: %s' % res) 
        sys.stdout.flush()
        

if __name__ == '__main__':
    if "MONGO_URL" in os.environ:
        main()
    else:
        mock_main()
