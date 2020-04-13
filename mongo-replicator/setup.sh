#!/usr/bin/env sh

if [ -f /replicated.txt ]; then
  echo "Mongo is already replicated"
else
  echo "Setting up mongo replication"

  # Wait for few seconds until the mongo server is up
  sleep 5

  mongo mongo:27017 --authenticationDatabase "admin" -u "root" -p "root" replicate.js

  # Wait for few seconds until the replication is complete
  sleep 5

  touch /replicated.txt

  echo "Replication done"
fi
