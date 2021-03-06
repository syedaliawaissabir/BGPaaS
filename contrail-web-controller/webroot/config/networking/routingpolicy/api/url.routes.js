/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/parseURLRequire')
  , routingpolicyconfigapi = require('./routingpolicyconfig.api')
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
  app.get('/api/tenants/config/routingpolicy/:id', routingpolicyconfigapi_listDetailRoutingPolicy);
  app.post('/api/tenants/config/routingpolicy', routingpolicyconfigapi_createRoutingPolicy);
  app.put('/api/tenants/config/routingpolicy/:uuid', routingpolicyconfigapi_updateRoutingPolicy);
  app.delete('/api/tenants/config/routingpolicy/:uuid', routingpolicyconfigapi_deleteRoutingPolicy);


  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/routingpolicy/:id', 'get', app.routes, 'routingpolicyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/routingpolicy', 'post', app.routes, 'routingpolicyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/routingpolicy/:uuid', 'put', app.routes, 'routingpolicyconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/routingpolicy/:uuid', 'delete', app.routes, 'routingpolicyconfig');
}
routingpolicyconfigapi_listDetailRoutingPolicy = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, routingpolicyconfigapi.listDetailRoutingPolicy);
  }
}
routingpolicyconfigapi_createRoutingPolicy = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, routingpolicyconfigapi.createRoutingPolicy);
  }
}
routingpolicyconfigapi_updateRoutingPolicy = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, routingpolicyconfigapi.updateRoutingPolicy);
  }
}
routingpolicyconfigapi_deleteRoutingPolicy = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, routingpolicyconfigapi.deleteRoutingPolicy);
  }
}
