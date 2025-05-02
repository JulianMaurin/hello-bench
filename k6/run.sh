#!/bin/bash
set -e

for file in /scripts/tests/*.js; do
  echo "Running test: $file"
  k6 run --out influxdb=http://influxdb:8086/k6 $file
  sleep 10
done