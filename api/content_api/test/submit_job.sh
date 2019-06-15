#!/bin/sh
curl -d '{"name":"SegmentPhase1"}' \
-H "Content-Type: application/json" \
-X POST localhost:5101/content/v1.0/schedule_job
