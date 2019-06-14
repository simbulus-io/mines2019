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

from pymongo import MongoClient

def run(job):
    time.sleep(2)
    return {'status': 0, 'data': 3.1415, 'job_id': job['job_id']}

def poll_for_jobs(jobs,results):
    # print('polling for jobs from %s at %s' % (mongo_url, time.ctime()) )
    job = jobs.find_one()
    if job!=None:
        jobs.delete_one({'_id': job['_id']})
        print('Got a Job: ', job)
        result = run(job)
        results.insert_one(result)
        print('Completed Job (id:%s) and pushed results blob to mongodb.' % job['job_id'])
    # else:
    #     print('no work to be found...')

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

