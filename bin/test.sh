#!/bin/sh
docker-compose -f docker-compose.test.yml up --abort-on-container-exit --exit-code-from api-test
