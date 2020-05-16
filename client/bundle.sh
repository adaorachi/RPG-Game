#!/bin/bash
npm run build
rm -rf ../server/public/
mkdir ../server/public
cp -R dist/assets ../server/public/assets/
cp -R dist/css ../server/public/css/
cp dist/index.html ../server/public/index.html
cp dist/main.js ../server/public/main.js
