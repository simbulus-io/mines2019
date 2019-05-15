#!/bin/sh
export GITROOT=`git rev-parse --show-toplevel`
export BRANCH_NAME=`git symbolic-ref HEAD 2>/dev/null | cut -d"/" -f 3`
export OUTPUT_PATH="$GITROOT"/ci/reports/ts
export HTML_OUTPUT="$OUTPUT_PATH"/smokes_branch_"$BRANCH_NAME".html
export JSON_OUTPUT="$OUTPUT_PATH"/smokes_branch_"$BRANCH_NAME".json
export JEST_HTML_REPORTER_OUTPUT_PATH=$HTML_OUTPUT
export JEST_HTML_REPORTER_PAGE_TITLE=Smoke\ Tests\ \-\-\ "$BRANCH_NAME"\ branch
yarn test test/*.smoke.ts --silent --runInBand --json --outputFile $JSON_OUTPUT
true