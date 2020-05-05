#!/bin/bash
rm -rf ./public/assets
mkdir ./public/assets
rm -f bursts-react/build/index.html
mv bursts-react/build/* ./public/assets
