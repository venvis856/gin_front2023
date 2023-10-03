#!/bin/bash

project_name="React-Proj"
pack_name="${project_name}.zip"

if [ -f "$pack_name" ]; then
  rm "$pack_name"
fi

if [[ $1 == "dev" ]]; then
  npm run build:dev
elif [[ $1 == "test" ]]; then
  npm run build:test
elif [[ $1 == "pre-release" ]]; then
  npm run build:pre-release
else
  npm run build
fi

if type 7z 2>/dev/null; then
    7z a -tZip ${pack_name} build -mx0
else
    zip -q -r ${pack_name} build
fi
