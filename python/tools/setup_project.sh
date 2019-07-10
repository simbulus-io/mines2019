#!/bin/bash
if [ -z "$1" ] ; then
    echo ueage: create_project.sh DIRECTORY_NAME
    exit -1
else
    TAG=$1
fi

SDIR="$( cd "$(dirname "$0")" ; pwd -P )" # the scripts dir
TDIR="$SDIR/templates"                    # the template dir
PDIR="$SDIR/../$TAG"                      # the project dir
echo "Setting up project $TAG in $( pwd )"

mkdir -p "$PDIR"
cd "$PDIR"

if [ -f ./Dockerfile ]; then
    echo .../Dockerfile already exists... leaving unchanged
else
    cp "$TDIR/dockerfile" ./Dockerfile
fi

if [ -f ./requirements.txt ]; then
    echo .../requirements.txt already exists... leaving unchanged
else
    cp "$TDIR/requirements" ./requirements.txt
fi

if [ -f ./app.py ]; then
    echo .../app.py already exists... leaving unchanged
else
    cp "$TDIR/app.py" ./app.py
fi

if [ -L ./build ] || [ -e ./build ] ; then
    echo .../build already exists... leaving unchanged
else
    ln -s "../tools/build.sh" ./build
fi

if [ -L ./run ] || [ -e ./run ] ; then
    echo .../run already exists... leaving unchanged
else
    ln -s "../tools/run.sh" ./run
fi

# if [ -L ./data ] || [ -e ./data ] ; then
#     echo .../data already exists... leaving unchanged
# else
#     ln -s "../data" ./data
# fi

# if [ -L ./modules ] || [ -e ./modules ] ; then
#     echo .../modules already exists... leaving unchanged
# else
#     ln -s "../modules" ./modules
# fi
