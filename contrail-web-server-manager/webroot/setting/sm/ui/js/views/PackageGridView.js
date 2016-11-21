/*
 * Copyright (c) 2014 Juniper Networks, Inc. All rights reserved.
 */

define([
    "underscore",
    "contrail-view",
    "sm-basedir/setting/sm/ui/js/models/PackageModel",
    "sm-basedir/setting/sm/ui/js/views/PackageEditView"
], function (_, ContrailView, PackageModel, PackageEditView) {
    var gridElId = "#" + smwl.SM_PACKAGE_GRID_ID;

    var PackageGridView = ContrailView.extend({
        render: function () {
            var self = this,
                viewConfig = this.attributes.viewConfig,
                pagerOptions = viewConfig.pagerOptions;

            self.renderView4Config(self.$el, self.model, getPackageGridViewConfig(pagerOptions));
        }
    });

    function getPackageGridViewConfig(pagerOptions) {
        return {
            elementId: cowu.formatElementId([smwl.SM_PACKAGE_GRID_SECTION_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: smwl.SM_PACKAGE_GRID_ID,
                                title: smwl.TITLE_PACKAGES,
                                view: "GridView",
                                viewConfig: {
                                    elementConfig: getPackageGridConfig(pagerOptions)
                                }
                            }
                        ]
                    }
                ]
            }
        };
    }

    function getRowActionConfig() {
        return [
            smwgc.getDeleteAction(function (rowIndex) {
                var dataItem = $(gridElId).data("contrailGrid")._dataView.getItem(rowIndex),
                    packageModel = new PackageModel(dataItem),
                    checkedRow = dataItem,
                    title = smwl.TITLE_DELETE_PACKAGE + " ("+ dataItem.id +")",
                    packageEditView = new PackageEditView();

                packageEditView.model = packageModel;
                packageEditView.renderDeletePackage({"title": title, checkedRows: checkedRow, callback: function () {
                    var dataView = $(gridElId).data("contrailGrid")._dataView;
                    dataView.refreshData();
                }});
            })
        ];
    }

    function getHeaderActionConfig() {
        return [
            {
                "type": "link",
                "title": smwl.TITLE_ADD_PACKAGE,
                "iconClass": "fa fa-plus",
                "onClick": function () {
                    var packageModel = new PackageModel(),
                        packageEditView = new PackageEditView();

                    packageEditView.model = packageModel;
                    packageEditView.render({"title": smwl.TITLE_ADD_PACKAGE, callback: function () {
                        var dataView = $(gridElId).data("contrailGrid")._dataView;
                        dataView.refreshData();
                    }});
                }
            }
        ];
    }

    function getPackageGridConfig(pagerOptions) {
        var gridElementConfig = {
            header: {
                title: {
                    text: smwl.TITLE_PACKAGES
                },
                advanceControls: getHeaderActionConfig()
            },
            columnHeader: {
                columns: smwgc.PACKAGE_COLUMNS
            },
            body: {
                options: {
                    actionCell: getRowActionConfig(),
                    checkboxSelectable: {
                        onNothingChecked: function(){
                            $("#btnDeleteRepos").addClass("disabled-link");
                        },
                        onSomethingChecked: function(){
                            $("#btnDeleteRepos").removeClass("disabled-link");
                        }
                    },
                    fixedRowHeight: 30,
                    detail: {
                        template: cowu.generateDetailTemplateHTML(smwdt.getImageDetailsTemplate(), cowc.APP_CONTRAIL_SM)
                    }
                },
                dataSource: {
                    remote: {
                        ajaxConfig: {
                            url: smwu.getObjectDetailUrl(smwc.IMAGE_PREFIX_ID, "filterInPackages")
                        }
                    },
                    cacheConfig: {
                        ucid: smwc.UCID_ALL_PACKAGE_LIST
                    }
                }
            },
            footer: {
                pager: contrail.handleIfNull(pagerOptions, {
                    options: {
                        pageSize: 5,
                        pageSizeSelect: [5, 10, 50, 100]
                    }
                })
            }
        };

        return gridElementConfig;
    }

    return PackageGridView;
});
