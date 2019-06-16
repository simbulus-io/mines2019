# - - - - - - - -
# Add directory above the directory containing this __file__ to the python system path
def append_root_to_path():
    import os
    import sys
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    sys.path.append(root)
append_root_to_path()
# - - - - - - - -

import os
import sys
import time
import traceback

from PIL import Image
from pymongo import MongoClient

# - - - - - - - - - - - - - - - - - - - -


from modules.fetch_content import handle_engageny as handle_eny;

def fetch_engageny_content(args):
    if not ('url' in args):
        return {'status': -1, 'error': 'fetch_engageny_content job did not specify a url'}
    res = handle_eny(args["url"])
    return res

# - - - - - - - - - - - - - - - - - - - -

def image_stats(args):
    if not ('file' in args):
        return {'status': -1, 'error': 'image_stats job did not specify a file'}
    im = Image.open(args['file'])
    width, height = im.size
    return {'height': height, 'width': width}

# - - - - - - - - - - - - - - - - - - - -

def xy_segment_image(args):
    stats = image_stats(args)
    return {'cuts': [stats['height']//4, stats['height']//2]}

# - - - - - - - - - - - - - - - - - - - -
# - - - - - - - - - - - - - - - - - - - -

def run(job):
    known_commands = {
        'fetch_engageny_content' : fetch_engageny_content,
        'image_stats'            : image_stats,
        'xy_segment_image'       : xy_segment_image,
    }

    if not ('command' in job):
        return {'status': -1, 'error': 'job did not specify a command'}
    cmd = job['command']

    if not (cmd in known_commands):
        return {'status': -1, 'error': 'Unknown command: %s' % cmd}
    if 'args' in job:
        return known_commands[cmd](job['args'])
    else:
        return known_commands[cmd]()

# Looks for jobs in the jobs collection, and if found, pulls and runs one
# and populates the results collection
# returns a result blob if a job was found and executed (regardless of the outcome)
# else returns None
def poll_for_jobs(jobs,results):
    # print('polling for jobs from %s at %s' % (mongo_url, time.ctime()) )
    job = jobs.find_one()
    if job!=None:
        pwd = os.getcwd()
        jobs.delete_one({'_id': job['_id']})
        print('Got a Job: ', job)
        try:
            tdir = ("/shared/jobs/%s" % job['job_id'])
            try:
                os.mkdir(tdir)
            except FileExistsError:
                pass
            os.chdir(tdir)
            result = run(job)
            result['status'] = 0;
        except Exception as ex:
            template = "An exception of type {0} occurred. Arguments:\n{1!r}"
            e_message = template.format(type(ex).__name__, ex.args)
            result = {'status': -1, 'error': e_message, 'trace': traceback.format_exc()}
        try:
            result['job_id'] = job['job_id'];
            if result['status'] != 0:
                result['orig_job'] = job;
        except:
            pass
        os.chdir(pwd)
        results.insert_one(result)
        print('Completed Job and pushed results blob to mongodb.')
        return result
    else:
        return None

# - - - - - - - - - - - - - - - - - - - -

# print(os.environ)
mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
print ('mongo_url = %s' % mongo_url)

mongo_client = MongoClient(mongo_url)
db = mongo_client.content
jobs = db.jobs
results = db.results

try:
    os.mkdir("/shared/jobs")
except FileExistsError:
    pass

sleep_time = 1
while True:
    r = poll_for_jobs(jobs, results)
    if r==None:
        time.sleep(sleep_time)
        if (sleep_time<8):
            sleep_time *= 1.2
    else:
        sys.stdout.flush()
        sleep_time = 1
        if jobs.count()==0:
            time.sleep(sleep_time)
            
        

