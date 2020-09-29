#!/bin/bash -u

set -e

# / (root)
rimraf server/dist
rimraf client/build

# /client
cd client
yarn build

# /server
cd ../server
nest build

# / (root)
cd ../
cp -R client/build/. server/dist/client/
