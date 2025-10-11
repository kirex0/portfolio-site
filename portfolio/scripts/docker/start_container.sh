#!/bin/bash

container_name="portfolio_dev"

# https://stackoverflow.com/a/43723174
if [ "$(docker inspect -f '{{.State.Running}}' $container_name 2>&1)" = "true" ]
then
    echo "Container already running."
    exit 0
else
    echo "Starting container."
fi

# Change to the directory of the script
cd "$(dirname "$0")"

docker build ../../ -t portfolio_dev

docker run -it --rm \
    --name $container_name \
    -p 4200:4200 \
    -v "$(pwd)/../../src:/app/src" \
    -v "$(pwd)/../../public:/app/public" \
    portfolio_dev