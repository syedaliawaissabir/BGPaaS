/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/parseURLRequire')
  , policyconfigapi = require('./policyconfig.api')
  ;


if (!module.parent) {
  console.log("Call main app through 'node app'");
  process.exit(1);
}
urlRoutes = module.exports;

/* Default handler for request timeout */
function defHandleReqTimeout (req, res)
{
  var str = "Request timed out: URL::" + req.url;
  if (req.pubChannel) {
    /* Delete the Req Pending Q Entry */
    parseURLReq.cacheApi.deleteCachePendingQueueEntry(req.pubChannel);
  };
  res.req.invalidated = true;
  res.send(parseURLReq.global.HTTP_STATUS_GATEWAY_TIMEOUT, str);
}

urlRoutes.registerURLsToApp = function(app) {
/* Register the URL with callback */
  app.get('/api/tenants/config/policys', policyconfigapi_listPolicys);
  app.get('/api/tenants/config/policy/:id', policyconfigapi_getPolicy);
  app.post('/api/tenants/config/policys', policyconfigapi_createPolicy);
  app.put('/api/tenants/config/policy/:id', policyconfigapi_updatePolicy);
  app.delete('/api/tenants/config/policy/:id', policyconfigapi_deletePolicy);
  app.post('/api/tenants/config/policy/:id/network-policy-entries', policyconfigapi_addPolicyEntry);
  app.delete('/api/tenants/config/policy/:id/network-policy-entries/:ruleid', policyconfigapi_deletePolicyEntry);
  app.put('/api/tenants/config/policy/:id/associated-networks', policyconfigapi_updatePolicyAssociatedNets);


  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policys', 'get', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id', 'get', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policys', 'post', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id', 'put', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id', 'delete', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id/network-policy-entries', 'post', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id/network-policy-entries/:ruleid', 'delete', app.routes, 'policyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/policy/:id/associated-networks', 'put', app.routes, 'policyconfig');
}
policyconfigapi_listPolicys = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.listPolicys);
  }
}
policyconfigapi_getPolicy = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.getPolicy);
  }
}
policyconfigapi_createPolicy = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.createPolicy);
  }
}
policyconfigapi_updatePolicy = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.updatePolicy);
  }
}
policyconfigapi_deletePolicy = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.deletePolicy);
  }
}
policyconfigapi_addPolicyEntry = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.addPolicyEntry);
  }
}
policyconfigapi_deletePolicyEntry = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.deletePolicyEntry);
  }
}
policyconfigapi_updatePolicyAssociatedNets = function(req, res, next) {
  /* Check if this request needs to be added in 
     pendingQ 
   */
  var reqCtx = parseURLReq.longPoll.routeAll(req, res, next);
  if (null == reqCtx) {
    /* either not a valid URL, or unAuthed session */
  } else {
    /* Set the request timeout */
    parseURLReq.timeout(req, res, parseURLReq.global.DFLT_HTTP_REQUEST_TIMEOUT_TIME);
    req.once('timeout', defHandleReqTimeout);
    /* Now process the resuest */
    parseURLReq.longPoll.processPendingReq(reqCtx, next, policyconfigapi.updatePolicyAssociatedNets);
  }
}
