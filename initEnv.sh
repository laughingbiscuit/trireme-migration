#!/bin/bash

set -e

# create a KVM
curl -v -f  \
  -X POST \
  -u $APIGEE_USER:$APIGEE_PASS \
  -H 'Content-Type: application/json' \
  -d '{ "name": "trireme", "entry": [{ "name": "myKey", "value": "myValue"}]}' \
  https://api.enterprise.apigee.com/v1/o/$APIGEE_ORG/e/$APIGEE_ENV/keyvaluemaps

# create a vault
curl -v -f \
  -X POST \
  -u $APIGEE_USER:$APIGEE_PASS \
  -H 'Content-Type: application/json' \
  -d '{"name": "trireme"}' \
  https://api.enterprise.apigee.com/v1/o/$APIGEE_ORG/e/$APIGEE_ENV/vaults

# populate vault
curl -v -f \
  -X POST \
  -u $APIGEE_USER:$APIGEE_PASS \
  -H 'Content-Type: application/json' \
  -d '{"name": "mySecret", "value": "mySecretValue"}' \
  https://api.enterprise.apigee.com/v1/o/$APIGEE_ORG/e/$APIGEE_ENV/vaults/trireme/entries
