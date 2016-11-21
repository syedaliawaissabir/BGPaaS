/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/ServerModel",
    "sm-basedir/setting/sm/ui/js/views/ServerEditView",
    "json-model", "json-edit-view",
    "text!sm-basedir/setting/sm/ui/js/schemas/server.json",
    "text!sm-basedir/setting/sm/ui/js/schemas/server.clone.schema.json"
], function (_, ContrailView, ServerModel, ServerEditView, JsonModel, JsonEditView, Schema, ServerCloneSchema) {

    var prefixId = smwc.SERVER_PREFIX_ID,
        gridElId = "#" + smwl.SM_SERVER_GRID_ID,
        serverSchema = JSON.parse(Schema),
        serverCloneSchema = JSON.parse(ServerCloneSchema);

    var ServerGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig;

            self.renderView4Config(self.$el, self.model, getServerGridViewConfig(viewConfig));
        }
    });

    // ServerFilter: OR within the category, AND across the category
    function serverTagGridFilter(item, args) {
        var returnFlag = true;
        if (args.checkedRows.length != 0) {
            var returnObj = {};
            $.each(args.checkedRows, function (checkedRowKey, checkedRowValue) {
                var checkedRowValueObj = $.parseJSON(unescape($(checkedRowValue).val()));
                if (!contrail.checkIfExist(returnObj[checkedRowValueObj.parent])){
                    returnObj[checkedRowValueObj.parent] = false;
                }
                returnObj[checkedRowValueObj.parent] = returnObj[checkedRowValueObj.parent] || (item.tag[checkedRowValueObj.parent] == checkedRowValueObj.value);
            });

            $.each(returnObj, function(returnObjKey, returnObjValue) {
                returnFlag = returnFlag && returnObjValue;
            });
        }
        return returnFlag;
    }

    function applyServerTagFilter() {
        var checkedRows = $("#tagsCheckedMultiselect").data("contrailCheckedMultiselect").getChecked();
        $(gridElId).data("contrailGrid")._dataView.setFilterArgs({
            checkedRows: checkedRows
        });
        $(gridElId).data("contrailGrid")._dataView.setFilter(serverTagGridFilter);
    }

    function formatData4Ajax(response) {
        var filterServerData = [];
        $.each(response, function (key, value) {
            var childrenData = [],
                children = value;
            $.each(children, function (k, v) {
                childrenData.push({"id": v, "text": v});
            });
            filterServerData.push({"id": key, "text": smwl.get(key), children: childrenData});
        });
        return filterServerData;
    }

    function getHeaderActionConfig(queryString, showAssignRoles) {
        var headerActionConfig, dropdownActions;
        dropdownActions = [
            {
                "iconClass": "fa fa-edit",
                "title": smwl.TITLE_EDIT_CONFIG,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows(),
                        serverEditView = new ServerEditView();

                    serverEditView.model = serverModel;
                    serverEditView.renderConfigureServers({"title": smwl.TITLE_EDIT_CONFIG, checkedRows: checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            },
            {
                "iconClass": "fa fa-tags",
                "title": smwl.TITLE_EDIT_TAGS,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows(),
                        serverEditView = new ServerEditView();

                    serverEditView.model = serverModel;
                    serverEditView.renderTagServers({
                        "title": smwl.TITLE_EDIT_TAGS,
                        "checkedRows": checkedRows,
                        callback: function () {
                            var dataView = $(gridElId).data("contrailGrid")._dataView;
                            dataView.refreshData();
                            $("#tagsCheckedMultiselect").data("contrailCheckedMultiselect").refresh();
                        },
                        lockEditingByDefault: true
                    });
                }
            }
        ];
        if (showAssignRoles) {
            dropdownActions.push({
                "iconClass": "fa fa-check-square-o",
                "title": smwl.TITLE_ASSIGN_ROLES,
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        checkedRows = $(gridElId).data("contrailGrid").getCheckedRows(),
                        serverEditView = new ServerEditView();

                    serverEditView.model = serverModel;
                    serverEditView.renderAssignRoles({"title": smwl.TITLE_ASSIGN_ROLES, "checkedRows": checkedRows, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            });
        }
        dropdownActions.push({
            "iconClass": "fa fa-sign-in",
            "title": smwl.TITLE_REIMAGE,
            divider: true,
            "onClick": function () {
                var serverModel = new ServerModel(),
                    checkedRows = $(gridElId).data("contrailGrid").getCheckedRows(),
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderReimage({"title": smwl.TITLE_REIMAGE, checkedRows: checkedRows, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        });
        dropdownActions.push({
            "iconClass": "fa fa-cloud-upload",
            "title": smwl.TITLE_PROVISION,
            "onClick": function () {
                var serverModel = new ServerModel(),
                    checkedRows = $(gridElId).data("contrailGrid").getCheckedRows(),
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": smwl.TITLE_PROVISION_SERVERS, "checkedRows": checkedRows, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }
        });
        headerActionConfig = [
            {
                "type": "dropdown",
                "iconClass": "fa fa-cog",
                "linkElementId": "btnActionServers",
                "disabledLink": true,
                "actions": dropdownActions
            }
        ];

        headerActionConfig = headerActionConfig.concat([
            {
                "type": "link",
                "title": smwl.TITLE_ADD_SERVER,
                "iconClass": "fa fa-plus",
                "onClick": function () {
                    var serverModel = new ServerModel(),
                        serverEditView = new ServerEditView();

                    serverEditView.model = serverModel;
                    serverEditView.renderAddServer({"title": smwl.TITLE_ADD_SERVER, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }, {
                type: "checked-multiselect",
                iconClass: "fa fa-filter",
                placeholder: "Filter Servers",
                elementConfig: {
                    elementId: "tagsCheckedMultiselect",
                    dataTextField: "text",
                    dataValueField: "id",
                    noneSelectedText: smwl.FILTER_TAGS,
                    filterConfig: {
                        placeholder: smwl.SEARCH_TAGS
                    },
                    parse: formatData4Ajax,
                    minWidth: 150,
                    height: 250,
                    emptyOptionText: "No Tags found.",
                    dataSource: {
                        type: "GET",
                        url: smwu.getTagsUrl(queryString)
                    },
                    click: applyServerTagFilter,
                    optgrouptoggle: applyServerTagFilter,
                    control: false
                }
            }
        ]);
        return headerActionConfig;
    }

    function getServerGridViewConfig(viewConfig) {
        return {
            elementId: cowu.formatElementId([smwl.SM_SERVER_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_SERVER_GRID_ID,
                                title: smwl.TITLE_SERVERS,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getServerGridConfig(viewConfig)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

    function getRowActionConfig(showAssignRoles) {
        var rowActionConfig = [
            smwgc.getConfigureAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_CONFIG + (contrail.checkIfExist(dataItem.id) ? (" ("+ dataItem.id +")") : ""),
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderConfigure({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getConfigureJSONAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex);

                var oAttributes = cowu.getAttributes4Schema(dataItem, serverSchema),
                    jsonModel = new JsonModel({json: oAttributes, schema: serverSchema}),
                    checkedRow = [oAttributes],
                    title = smwl.TITLE_EDIT_JSON + (contrail.checkIfExist(oAttributes.id) ? (" (" + oAttributes.id + ")") : ""),
                    jsonEditView = new JsonEditView();
                jsonEditView.model = jsonModel;
                jsonEditView.renderEditor({
                    title: title,
                    checkedRows: checkedRow,
                    type: smwc.SERVER_PREFIX_ID,
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }
                });
            }),
            smwgc.getCloneServerAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    customJSON = [{
                        "id": "",
                        "ipmi_address": "",
                        "network": {
                            "management_interface": "eth1",
                            "interfaces": [{
                                "type": "physical",
                                "name": "eth1",
                                "default_gateway": "",
                                "dhcp": true,
                                "mac_address": "",
                                "ip_address": ""
                            }]
                        }
                    }];

                var oAttributes = cowu.getAttributes4Schema(dataItem, serverSchema),
                    jsonModel = new JsonModel({
                        customJSON: customJSON,
                        json: oAttributes,
                        schema: serverCloneSchema
                    }),
                    checkedRow = [oAttributes],
                    title = smwl.TITLE_EDIT_JSON + (contrail.checkIfExist(oAttributes.id) ? (" (" + oAttributes.id + ")") : ""),
                    jsonEditView = new JsonEditView(),
                    modalId = 'configure-' + prefixId;

                jsonEditView.model = jsonModel;
                jsonEditView.renderEditor({
                    title: title,
                    checkedRows: checkedRow,
                    type: smwc.SERVER_PREFIX_ID,
                    onSave: function () {
                        var cloneServerList = [];
                        for (var i = 0; i < jsonModel.model().attributes.length; i++ ) {
                            var attributes = jsonModel.model().attributes[i],
                                newInterfaces = attributes.network.interfaces;

                            var newServerAttrs = $.extend(true, {}, oAttributes, attributes);
                            newServerAttrs.network.interfaces = newInterfaces;
                            cloneServerList.push(newServerAttrs);
                        }

                        jsonModel.configure(null, {
                            init: function () {
                                cowu.enableModalLoading(modalId);
                            },
                            success: function () {
                                var dataView = $(gridElId).data("contrailGrid")._dataView;
                                dataView.refreshData();
                                $("#" + modalId).modal('hide');
                            },
                            error: function (error) {
                                cowu.disableModalLoading(modalId, function () {});
                            }
                        }, smwc.SERVER_PREFIX_ID, cloneServerList);
                    },
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }
                });
            }),
            smwgc.getTagAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_EDIT_TAGS + " ("+ dataItem.id +")",
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderTagServers({
                    "title": title,
                    checkedRows: checkedRow,
                    callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                        $("#tagsCheckedMultiselect").data("contrailCheckedMultiselect").refresh();
                    },
                    lockEditingByDefault: false
                });
            })
        ];

        if (showAssignRoles) {
            rowActionConfig.push(smwgc.getAssignRoleAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = [dataItem],
                    title = smwl.TITLE_ASSIGN_ROLES + " ("+ dataItem.id +")",
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderAssignRoles({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }));
        }
        rowActionConfig = rowActionConfig.concat([smwgc.getReimageAction(function (rowIndex) {
            var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                serverModel = new ServerModel(dataItem),
                checkedRow = dataItem,
                title = smwl.TITLE_REIMAGE + " ("+ dataItem.id +")",
                serverEditView = new ServerEditView();

            serverEditView.model = serverModel;
            serverEditView.renderReimage({"title": title, checkedRows: checkedRow, callback: function () {
                var dataView = $(gridElId).data("contrailGrid")._dataView;
                dataView.refreshData();
            }});
        }, true),
            smwgc.getProvisionAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_PROVISION_SERVER + " ("+ dataItem.id +")",
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderProvisionServers({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getRunInventoryAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_REFRESH_INVENTORY + " ("+ dataItem.id +")",
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderRunInventory({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }),
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    serverModel = new ServerModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DEL_SERVER + " ("+ dataItem.id +")",
                    serverEditView = new ServerEditView();

                serverEditView.model = serverModel;
                serverEditView.renderDeleteServer({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            }, true)
        ]);

        return rowActionConfig;
    }

    function getServerGridConfig(viewConfig) {
        var pagerOptions = viewConfig.pagerOptions,
            serverColumnsType = viewConfig.serverColumnsType,
            showAssignRoles = viewConfig.showAssignRoles,
            queryString = smwu.getQueryString4ServersUrl(viewConfig.hashParams),
            hashParams = viewConfig.hashParams;

        var listModelConfig = {
            remote: {
                ajaxConfig: {
                    url: smwu.getObjectDetailUrl(prefixId) + queryString
                }
            }
        };

        if(queryString == "") {
            listModelConfig.cacheConfig = {
                ucid: smwc.UCID_ALL_SERVER_LIST
            };
        } else if(hashParams.cluster_id != null && hashParams.tag == null) {
            listModelConfig.cacheConfig = {
                ucid: smwc.get(smwc.UCID_CLUSTER_SERVER_LIST, hashParams.cluster_id)
            };
        }

        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_SERVERS
                },
                advanceControls: getHeaderActionConfig(queryString, showAssignRoles)
            },
            columnHeader: {
                columns: smwgc.getServerColumns(serverColumnsType)
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(showAssignRoles),
                    checkboxSelectable: {
                        onNothingChecked: function () {
                            $("#btnActionServers").addClass("disabled-link").removeAttr("data-toggle");
                            $("#btnActionServers").parent().removeClass("open");
                        },
                        onSomethingChecked: function () {
                            $("#btnActionServers").removeClass("disabled-link").attr("data-toggle", "dropdown");
                        }
                    },
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getServerDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: listModelConfig
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, { options: { pageSize: 5, pageSizeSelect: [5, 10, 50, 100] } })
            }
        };

        return gridElementConfig;
    }

    return ServerGridView;
});
