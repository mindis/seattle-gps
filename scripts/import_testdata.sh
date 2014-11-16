#/bin/bash

for file in ../test/data/*.json
do
  mongoimport -h localhost:3001 --db meteor --collection posts --file $file --jsonArray
done
