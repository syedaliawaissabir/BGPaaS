/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/parseURLRequire')
  , stconfigapi = require('./servicetemplateconfig.api')
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
  app.get('/api/tenants/config/service-templates', stconfigapi_listServiceTemplates);
  app.post('/api/tenants/config/service-templates', stconfigapi_createServiceTemplate);
  app.delete('/api/tenants/config/service-template/:id', stconfigapi_deleteServiceTemplate);
  app.get('/api/tenants/config/service-template-images', stconfigapi_listServiceTemplateImages);
  app.get('/api/tenants/config/system-flavors', stconfigapi_getSystemFlavors);


  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/service-templates', 'get', app.routes, 'stconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/service-templates', 'post', app.routes, 'stconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/service-template/:id', 'delete', app.routes, 'stconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/service-template-images', 'get', app.routes, 'stconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/system-flavors', 'get', app.routes, 'stconfig');
}
stconfigapi_listServiceTemplates = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, stconfigapi.listServiceTemplates);
  }
}
stconfigapi_createServiceTemplate = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, stconfigapi.createServiceTemplate);
  }
}
stconfigapi_deleteServiceTemplate = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, stconfigapi.deleteServiceTemplate);
  }
}
stconfigapi_listServiceTemplateImages = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, stconfigapi.listServiceTemplateImages);
  }
}
stconfigapi_getSystemFlavors = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, stconfigapi.getSystemFlavors);
  }
}
