#!/bin/sh
# this should succeed
curl -d '{"name":"SegmentPhase1", "command":"run_seg_1.py", "args":{"file":"a_file_to_process.png"}}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/job/schedule
echo
# this will pass - don't care about extra data as long data matches schema
curl -d '{"name":"SegmentPhase2", "command":"run_seg_2", "args":{"file":"a_file_to_process.png"}, "not_in_the_schema":"blah blah blah"}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/job/schedule
echo
# this will fail - args needs to be an object
curl -d '{"name":"SegmentPhase1", "args":"this_wont_work"}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/job/schedule
echo