#!/bin/sh


# docker-compose.yml is set to map :80 to nginx container
HOST=localhost

# this should succeed
curl -d '{
 "name":"SegmentPhase1", \
 "dir": "my_job", \
 "command": "fetch_engageny_content", \
 "args": { \
  "url": "https://www.engageny.org/file/61111/download/math-g7-m4-topic-b-lesson-9-student.pdf?token=U5lmuBD4" \
}}' \
-H "Content-Type: application/json" -X POST \
$HOST/content/v1.0/job/schedule

echo "---"

# this will fail - args needs to be an object
curl -d '{"name":"SegmentPhase1", "args":"this_wont_work"}' \
-H "Content-Type: application/json" -X POST \
$HOST/content/v1.0/job/schedule

echo "---"
