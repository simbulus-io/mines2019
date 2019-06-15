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

from pymongo import MongoClient

from PIL import Image

def image_stats(args):
    if not ('file' in args):
        return {'status': -1, 'error': 'image_stats job did not specify a file'}
    im = Image.open(args['file'])
    width, height = im.size
    return {'height': height, 'width': width}

def xy_segment_image(args):
    stats = image_stats(args)
    return {'cuts': [stats['height']//4, stats['height']//2]}

def run(job):
    known_commands = {
        'image_stats': image_stats,
        'xy_segment_image': xy_segment_image,
    }
    if not ('command' in job):
        return {'status': -1, 'error': 'job did not specify a command'}
    cmd = job['command']
    if not (cmd in known_commands):
        return {'status': -1, 'error': 'Unknown command: %s' % cmd}
    return known_commands[cmd](job)

def poll_for_jobs(jobs,results):
    # print('polling for jobs from %s at %s' % (mongo_url, time.ctime()) )
    job = jobs.find_one()
    if job!=None:
        jobs.delete_one({'_id': job['_id']})
        print('Got a Job: ', job)
        try:
            result = run(job)
            result['status'] = 0;
        except:
            result = {'status': -1, 'trace': traceback.format_exc()}
        try:
            result['job_id'] = job['job_id'];
            if result['status'] != 0:
                result['orig_job'] = job;
        except:
            pass
        results.insert_one(result)
        print('Completed Job and pushed results blob to mongodb.')

# print(os.environ)
mongo_url = os.getenv('MONGO_URL', 'mongodb://localhost:27017/')
print ('mongo_url = %s' % mongo_url)

mongo_client = MongoClient(mongo_url)
db = mongo_client.content
jobs = db.jobs
results = db.results


while True:
    sys.stdout.flush()
    poll_for_jobs(jobs, results)
    time.sleep(1)

