/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([], function () {
    var SMUtils = function () {

        this.getObjectDetailUrl = function (objectName, postProcessor) {
            var url = smwc.URL_OBJ_DETAILS + objectName;
            url += (postProcessor != null) ? ("?postProcessor=" + postProcessor) : "";
            return url;
        };

        this.getServerSensorsUrl = function (server) {
            var url = smwc.URL_SERVER_IPMI_INFO + server;
            return url;
        };

        this.getObjectUrl = function (objectName) {
            return smwc.URL_OBJECTS + objectName;
        };

        this.getTagsUrl = function (qs) {
            var url = smwc.URL_TAG_VALUES;
            url += (qs != null) ? qs : "";
            return url;
        };

        this.getTagValueUrl = function (value) {
            return smwc.URL_TAG_VALUES + value;
        };

        this.removeRolesFromServers = function(serversObj) {
            var servers = serversObj[smwc.SERVER_PREFIX_ID],
                server;
            for (var i = 0; i < servers.length; i++) {
                server = servers[i];
                server.roles = [];
            }
        };

        this.getQueryString4ServersUrl = function(hashParams) {
            var queryString = "", tagKey, tagQueryArray = [];

            if (hashParams.cluster_id != null) {
                queryString += "?cluster_id=" + hashParams.cluster_id;
            }

            if (hashParams.tag != null) {
                for (tagKey in hashParams.tag) {
                    tagQueryArray.push(tagKey + "=" + hashParams.tag[tagKey]);
                }
                queryString += "?tag=" + tagQueryArray.join(",");
            }
            return queryString;
        };

        this.handleChassisId = function (params) {
            if (contrail.checkIfExist(params.storage_chassis_id_input)) {
                if (params.storage_chassis_id_input != "") {
                    params.storage_chassis_id = params.storage_chassis_id_input;
                }
                delete params.storage_chassis_id_input;
            }
            return params;
        };

        this.renderView = function (renderConfig, renderCallback) {
            var parentElement = renderConfig.parentElement,
                viewName = renderConfig.viewName,
                viewPathPrefix, viewPath,
                model = renderConfig.model,
                viewAttributes = renderConfig.viewAttributes,
                modelMap = renderConfig.modelMap,
                rootView = renderConfig.rootView,
                onAllViewsRenderCompleteCB = renderConfig.onAllViewsRenderCompleteCB,
                onAllRenderCompleteCB = renderConfig.onAllRenderCompleteCB,
                lazyRenderingComplete  = renderConfig.lazyRenderingComplete,
                elementView;

            /**
             * if views are dynamically loaded using viewPathPrefix in a viewConfig, the path should prefix
             * with 'core-basedir' as depending on the env, the root dir from which the files are served changes.
             */
            if (contrail.checkIfExist(renderConfig.viewPathPrefix)) {
                viewPathPrefix = renderConfig.viewPathPrefix;
                // If viewPathPrefix doesn't start with core-basedir or sm-basedir add sm-basedir
                if (!(viewPathPrefix.slice(0, "core-basedir".length) === "core-basedir") &&
                    !(viewPathPrefix.slice(0, "sm-basedir".length) === "sm-basedir")) {
                    viewPathPrefix = "sm-basedir/" + viewPathPrefix;
                }
            } else {
                viewPathPrefix = "sm-basedir/setting/sm/ui/js/views/";
            }
            viewPath = viewPathPrefix + viewName;
            require([viewPath], function(ElementView) {
                elementView = new ElementView({el: parentElement, model: model, attributes: viewAttributes, rootView: rootView, onAllViewsRenderCompleteCB: onAllViewsRenderCompleteCB, onAllRenderCompleteCB: onAllRenderCompleteCB});
                elementView.viewName = viewName;
                elementView.modelMap = modelMap;
                elementView.beginMyViewRendering();
                elementView.render();
                if(contrail.checkIfFunction(renderCallback)) {
                    renderCallback(elementView);
                }

                if(lazyRenderingComplete == null || !lazyRenderingComplete) {
                    elementView.endMyViewRendering();
                }
            });
        };
    };

    return SMUtils;
});
