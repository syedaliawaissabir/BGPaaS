/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require('./parseURLRequire')
  , sshapi = require('./sshcommand.api')
  , proxyapi = require('./proxy.api')
  , alarmsApi = require('./alarms.api.js')
  , configServerUtils = require('./configServer.utils.js')
  , discoveryClientApi = require('./discoveryclient.api.js')
  , authApi = require('./auth.api.js')
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
  app.post('/api/service/networking/device-status/:ip', sshapi_getServiceStatus);
  app.get('/proxy', proxyapi_forwardProxyRequest);
  app.get('/api/tenant/monitoring/alarms', alarmsApi_getAlarms);
  app.get('/api/tenant/monitoring/alarmtypes', alarmsApi_getAlarmTypes);
  app.post('/api/tenant/monitoring/ackalarms', alarmsApi_ackAlarms);
  app.get('/api/tenants/get-project-role', configServerUtils_getProjectRole);
  app.get('/api/tenant/monitoring/discovery-service-list', discoveryClientApi_getDiscServiceRespDataList);
  app.get('/api/tenant/get-region-list', authApi_getRegionList);
  app.get('/api/getRoles', configServerUtils_getRoles);


  parseURLReq.rbac.setFeatureByURL('/api/service/networking/device-status/:ip', 'post', app.routes, 'monitoring');
  parseURLReq.rbac.setFeatureByURL('/proxy', 'get', app.routes, 'proxy');
  parseURLReq.rbac.setFeatureByURL('/api/tenant/monitoring/alarms', 'get', app.routes, 'alarms');
  parseURLReq.rbac.setFeatureByURL('/api/tenant/monitoring/alarmtypes', 'get', app.routes, 'alarms');
  parseURLReq.rbac.setFeatureByURL('/api/tenant/monitoring/ackalarms', 'post', app.routes, 'alarms');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/get-project-role', 'get', app.routes, 'orchestration');
  parseURLReq.rbac.setFeatureByURL('/api/tenant/monitoring/discovery-service-list', 'get', app.routes, 'discoveryclient');
  parseURLReq.rbac.setFeatureByURL('/api/tenant/get-region-list', 'get', app.routes, 'orchestration');
  parseURLReq.rbac.setFeatureByURL('/api/getRoles', 'get', app.routes, 'orchestration');
}
sshapi_getServiceStatus = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, sshapi.getServiceStatus);
  }
}
proxyapi_forwardProxyRequest = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, proxyapi.forwardProxyRequest);
  }
}
alarmsApi_getAlarms = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, alarmsApi.getAlarms);
  }
}
alarmsApi_getAlarmTypes = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, alarmsApi.getAlarmTypes);
  }
}
alarmsApi_ackAlarms = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, alarmsApi.ackAlarms);
  }
}
configServerUtils_getProjectRole = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, configServerUtils.getProjectRole);
  }
}
discoveryClientApi_getDiscServiceRespDataList = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, discoveryClientApi.getDiscServiceRespDataList);
  }
}
authApi_getRegionList = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, authApi.getRegionList);
  }
}
configServerUtils_getRoles = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, configServerUtils.getRoles);
  }
}
