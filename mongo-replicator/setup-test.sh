#!/usr/bin/env sh

if [ -f /replicated.txt ]; then
  echo "Mongo is already replicated"
else
  echo "Setting up mongo replication"

  # Wait for few seconds until the mongo server is up
  sleep 5

  mongo mongo-test:27017 replicate-test.js

  # Wait for few seconds until the replication is complete
  sleep 5

  touch /replicated.txt

  echo "Replication done"
fi

# To prevent all containers from stopping
# because of the --abort-on-container-exit docker-compose flag
while true; do sleep 1; done
