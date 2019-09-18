# Trireme Migration Example

Here is an example of a simple Trireme project that has common integrations with
Apigee. These include:
- Context Variables
- Quota
- KVM
- Cache
- Secure Vault 

This project will show you how to migrate a proxy like this to a combination of
Apigee out-of-the-box policies and a Google Cloud Function.

## Setup

Prerequisites
- Install Node JS
- Install Curl
- Obtain an Apigee Organization

Set our variables

```
export APIGEE_USER=someone@example.com
export APIGEE_PASS=xxxx
export APIGEE_ORG=someone-eval
export APIGE_ENV=test
```

Set up the required KVMs and Vault (one time setup)

```
npm run init
```

Deploy our Trireme proxy

```
npm run deploy
```

Check that our Trireme proxy works correctly

```
npm test
```
