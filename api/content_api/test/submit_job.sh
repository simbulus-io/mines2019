#!/bin/sh


# docker-compose.yml is set to map :80 to nginx container
HOST=localhost

# -curl -d '{"name":"SegmentPhase1", "command":"run_seg_1.py", "args":{"file":"a_file_to_process.png"}}' \
# --H "Content-Type: application/json" \
# --X POST localhost:5101/content/v1.0/job/schedule
# -echo

# this should succeed
curl -d '{
 "name":"SegmentPhase1", "dir": "my_job", "timeout": 30.0, "command": "fetch_engageny_content", "args": { "url": "https://www.engageny.org/file/61111/download/math-g7-m4-topic-b-lesson-9-student.pdf?token=U5lmuBD4"}}' \
-H "Content-Type: application/json" -X POST \
$HOST/content/v1.0/job/schedule

printf "\n---\n"

# this will fail - fetch_engageny_content expects args: {url: ...}
curl -d '{
 "name":"SegmentPhase1", "dir": "my_job", "command": "fetch_engageny_content"}' \
-H "Content-Type: application/json" -X POST \
$HOST/content/v1.0/job/schedule

printf "\n---\n"

curl -H "Content-Type: application/json"  $HOST/content/v1.0/job/results

printf "\n- - - zzz...\n"
sleep 10

curl -H "Content-Type: application/json"  $HOST/content/v1.0/job/results

printf "\n- - - zzz...\n"
sleep 10

curl -H "Content-Type: application/json"  $HOST/content/v1.0/job/results
