var express = require('express')
var apigee = require('apigee-access')
var async = require('async')
var app = express()
var port = 3000


app.get('/read', function (req, res) {
  async.waterfall([

    // getVariable - we will replace with ExtractVariables
    function readVariables(callback) {
      var myVariable = apigee.getVariable(req, 'organization.name')
      callback(null, {variable: myVariable})
    },

    // cache.get - we will replace with LookupCache
    function readFromCache(result, callback) {
      var cache = apigee.getCache('myCache')
      cache.get('myKey', function(error, data) {
        result.cache = data
        callback(error, result)  
      })
    },
    
    // quota.apply - we will replace with Quota
    function applyQuota(result, callback) {
      var quota = apigee.getQuota()
      quota.apply({
        identifier: 'myIdentifier',
        timeUnit: 'hour',
        allow: 9999
      }, function(error, quota) {
        result.quota = quota
        callback(error, result)  
      })
    },
  
    // kvm.get - we will replace with KeyValueMapOperations
    function readFromKeyValueMap(result, callback) {
      var kvm = apigee.getKeyValueMap('trireme', 'environment')
      kvm.get('myKey', function(error, keyValue) {
        result.kvm = keyValue
        callback(error, result)  
      })
    },

    // vault.get - we will replace with Encrypted KeyValueMapOperations
    function readFromVault(result, callback) {
      var vault = apigee.getVault('trireme', 'environment')
      vault.get('mySecret', function(error, secret) {
        result.vault = secret
        callback(error, result)
      })
    }

  ], function (err, result) {
    // return the result of the operations
    if(err) res.json({success: false, err: err})
    res.json({
      success: true,
      result: result
    })
  })
})

app.post('/write', function (req, res) {

  // setVariable - will replace this with AssignMessage 
  apigee.setVariable(req, 'myVariableName', 'myVariableValue')

  // cache.put - will replace with PopulateCache
  var cache = apigee.getCache('myCache')
  cache.put('myKey', 'myCachedValue', 120, function(err) {
    if(err) res.json({setup: false, err: err})
    res.json({
      setup: true,
    })
  })
})

app.listen(port, () => console.log('Example app listening on port' + port))
