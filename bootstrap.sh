#!/bin/bash

cd "${PWD}/client-1"
npm install
npm run compile
cd ../

cd "${PWD}/client-2"
npm install
npm run compile
cd ../

cd "${PWD}/server"
npm install
npm run compile
cd ../