#!/usr/bin/bash env

set -euxo pipefail

ANDROID_DIR=android
IOS_DIR=ios

if [[ "$@" == *"--platform-clean"* ]]; then
  (
    set +e
    echo "Removing ${ANDROID_DIR} and ${IOS_DIR}..."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

if [[ "$@" == *"--clean"* ]]; then
  (
    set +ex
    echo "Performing a full clean build..."
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "Removing ${ANDROID_DIR} and ${IOS_DIR}..."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

yarn install

if [[ ! -d "${ANDROID_DIR}" || ! -d "${IOS_DIR}" ]]; then
  echo "Missing ${ANDROID_DIR} or ${IOS_DIR}. Peforming prebuild..."
  npx expo prebuild
fi
