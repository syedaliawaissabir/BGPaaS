/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/parseURLRequire')
  , securitygroupconfigapi = require('./securitygroupconfig.api')
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
  app.get('/api/tenants/config/securitygroup', securitygroupconfigapi_listSecurityGroup);
  app.get('/api/tenants/config/securitygroup-details', securitygroupconfigapi_getSecurityGroupDetails);
  app.post('/api/tenants/config/securitygroup', securitygroupconfigapi_createSecurityGroup);
  app.put('/api/tenants/config/securitygroup/:uuid', securitygroupconfigapi_updateSecurityGroup);
  app.delete('/api/tenants/config/securitygroup/:uuid', securitygroupconfigapi_deleteSecurityGroup);


  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/securitygroup', 'get', app.routes, 'securitygroupconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/securitygroup-details', 'get', app.routes, 'securitygroupconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/securitygroup', 'post', app.routes, 'securitygroupconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/securitygroup/:uuid', 'put', app.routes, 'securitygroupconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/securitygroup/:uuid', 'delete', app.routes, 'securitygroupconfig');
}
securitygroupconfigapi_listSecurityGroup = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, securitygroupconfigapi.listSecurityGroup);
  }
}
securitygroupconfigapi_getSecurityGroupDetails = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, securitygroupconfigapi.getSecurityGroupDetails);
  }
}
securitygroupconfigapi_createSecurityGroup = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, securitygroupconfigapi.createSecurityGroup);
  }
}
securitygroupconfigapi_updateSecurityGroup = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, securitygroupconfigapi.updateSecurityGroup);
  }
}
securitygroupconfigapi_deleteSecurityGroup = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, securitygroupconfigapi.deleteSecurityGroup);
  }
}
