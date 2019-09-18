#!/bin/bash
curl -X POST -d '' -f https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/trireme/v1/write || echo "Failed"
curl -f https://$APIGEE_ORG-$APIGEE_ENV.apigee.net/trireme/v1/read || echo "Failed"
