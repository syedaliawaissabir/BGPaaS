/*
 * Copyright (c) 2015 Juniper Networks, Inc. All rights reserved.
 */

define([
    'underscore',
    'contrail-view',
    'monitor-storage-basedir/js/models/PoolListModel'
], function (_, ContrailView, PoolListModel) {
    var PoolListView = ContrailView.extend({
        el: $(contentContainer),

        render: function () {
            var self = this,
                viewConfig = self.attributes.viewConfig,
                poolName = viewConfig['pool'],
                poolListModel = new PoolListModel(poolName);
                self.renderView4Config(self.$el, poolListModel, getPoolListViewConfig());
        }
    });

    function getPoolListViewConfig() {
        return {
            elementId: cowu.formatElementId([swl.MONITOR_POOL_LIST_ID]),
            view: "SectionView",
            viewConfig: {
                rows: [
                    {
                        columns: [
                            {
                                elementId: swl.POOL_SCATTER_CHART_ID,
                                title: swl.TITLE_POOLS,
                                view: "ZoomScatterChartView",
                                viewConfig: {
                                    loadChartInChunks: true,
                                    chartOptions: {
                                        xLabel: 'Usage %',
                                        xLabelFormat: d3.format(".03f"),
                                        //forceX: [0, 10],
                                        //forceY: [0, 10],
                                        yLabel: 'Objects',
                                        yLabelFormat: function (yValue) {
                                            var formattedValue = swu.addUnits2Number(yValue, false, false, 2);
                                            return formattedValue;
                                        },
                                        dataParser: function (response) {
                                            return response;
                                        },
                                        tooltipConfigCB: getPoolTooltipConfig,
                                        clickCB: function (){ return; },
                                        sizeFieldName: 'y',
                                        margin: {left: 65, right:15},
                                        noDataMessage: "Unable to get pool data."
                                    }
                                }
                            },
                        ]
                    },
                    {
                        columns: [
                            {
                                elementId: swl.MONITOR_POOLS_ID,
                                title: swl.TITLE_POOLS,
                                view: "PoolGridView",
                                app: cowc.APP_CONTRAIL_STORAGE,
                                viewConfig: {
                                    pool: null,
                                    parentType: 'storageCluster',
                                    pagerOptions: {options: {pageSize: 10, pageSizeSelect: [10, 50, 100]}}
                                }
                            }
                        ]
                    }
                ]
            }
        }
    };

    function onScatterChartClick(chartConfig) {
        var diskFQN = chartConfig['name'],
            storagenodeFQN = chartConfig['host'];
        swcc.setDiskURLHashParams(null, {fqName: diskFQN, fqHost: storagenodeFQN}, true);
    };

    function getPoolTooltipConfig(data) {
        var poolFQNObj = data.name.split(':');

        return {
            title: {
                name: poolFQNObj[0],
                type: swl.TITLE_CHART_ELEMENT_POOL
            },
            content: {
                iconClass: false,
                info: [
                    {label: 'Used', value: data['used']},
                    {label: 'Max Available', value: data['max_avail']},
                    {label: 'Objects', value: formatNumberByCommas(data['y'])}
                ],
                actions: []
            },
            dimension: {
                width: 350
            }
        };
    };

    return PoolListView;
});
