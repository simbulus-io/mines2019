#!/bin/sh
# this should succeed
curl -d '{"name":"SegmentPhase1", "args":{"filename":"a_file_to_process.png"}}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/schedule_job

# this will pass - don't care about extra data as long data matches schema
curl -d '{"name":"SegmentPhase1", "args":{"filename":"a_file_to_process.png"}, "not_in_the_schema":"blah blah blah"}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/schedule_job

# this will fail - args needs to be an object
curl -d '{"name":"SegmentPhase1", "args":"this_wont_work"}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/schedule_job
