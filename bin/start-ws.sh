#!/bin/zsh

scriptdir=$0:a:h
echo $scriptdir

cd $scriptdir/../..
python -m SimpleHTTPServer 9000&
