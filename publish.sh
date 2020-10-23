#!/bin/sh

baseDir=$(pwd)

npm run build

cp "$baseDir/package.json" "$baseDir/dist"
cp "$baseDir/README.md" "$baseDir/dist"
cp "$baseDir/LICENSE" "$baseDir/dist"

cd "$baseDir/dist"
npm config set '//registry.npmjs.org/:_authToken' "${NPM_TOKEN}"
npm publish --access public
