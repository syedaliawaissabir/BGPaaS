/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

/* This file is automatically generated from the parseURL.xml at
   Sun Nov 20 2016 01:02:58 GMT+0000 (UTC)
   Please do not edit this file.
 */

var parseURLReq = require(process.mainModule.exports["corePath"] + '/src/serverroot/common/parseURLRequire')
  , portsconfigapi = require('./portsconfig.api')
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
  app.get('/api/tenants/config/ports', portsconfigapi_readPorts);
  app.post('/api/tenants/config/ports', portsconfigapi_createPort);
  app.put('/api/tenants/config/ports/:uuid', portsconfigapi_updatePorts);
  app.delete('/api/tenants/config/ports/:uuid', portsconfigapi_deletePorts);
  app.get('/api/tenants/config/listVirtualMachines', portsconfigapi_listVirtualMachines);
  app.get('/api/tenants/config/get-virtual-machines-ips', portsconfigapi_getVMIAndInstIPDetails);
  app.get('/api/tenants/config/get-virtual-machine-details', portsconfigapi_getVMIDetails);
  app.delete('/api/tenants/config/delete-all-ports', portsconfigapi_deleteAllPorts);
  app.post('/api/tenants/config/get-virtual-machine-details-paged', portsconfigapi_getVMIDetailsPaged);


  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/ports', 'get', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/ports', 'post', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/ports/:uuid', 'put', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/ports/:uuid', 'delete', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/listVirtualMachines', 'get', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/get-virtual-machines-ips', 'get', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/get-virtual-machine-details', 'get', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/delete-all-ports', 'delete', app.routes, 'portconfig');
  parseURLReq.rbac.setFeatureByURL('/api/tenants/config/get-virtual-machine-details-paged', 'post', app.routes, 'portconfig');
}
portsconfigapi_readPorts = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.readPorts);
  }
}
portsconfigapi_createPort = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.createPort);
  }
}
portsconfigapi_updatePorts = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.updatePorts);
  }
}
portsconfigapi_deletePorts = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.deletePorts);
  }
}
portsconfigapi_listVirtualMachines = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.listVirtualMachines);
  }
}
portsconfigapi_getVMIAndInstIPDetails = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.getVMIAndInstIPDetails);
  }
}
portsconfigapi_getVMIDetails = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.getVMIDetails);
  }
}
portsconfigapi_deleteAllPorts = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.deleteAllPorts);
  }
}
portsconfigapi_getVMIDetailsPaged = function(req, res, next) {
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
    parseURLReq.longPoll.processPendingReq(reqCtx, next, portsconfigapi.getVMIDetailsPaged);
  }
}
