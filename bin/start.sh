#!/bin/sh
docker-compose up -d --build

sleep 2

docker exec ship-mongo mongo --eval "
rs.initiate(
  {
    _id : 'ship-rs',
    members: [
      { _id : 0, host : \"mongo:27017\" }
    ]
  }
)
"
