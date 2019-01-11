import {takeUntil} from 'rxjs/operators';

declare var require: any;

import {Component, OnDestroy, OnInit} from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import {ChartService} from '../../../../../shared/services';
import {Subject} from 'rxjs';

const HC_map = require('highcharts/modules/map');
const HC_exporting = require('highcharts/modules/exporting');
const HC_ce = require('highcharts-custom-events');

HC_map(Highcharts);
require('../../../../../../../js/world')(Highcharts);
require('../../../../../../../js/us-all')(Highcharts);

HC_exporting(Highcharts);
HC_ce(Highcharts);

Highcharts.setOptions({
    title: {
        style: {
            color: 'orange'
        }
    }
});

@Component({
    selector: 'app-bubble-chart',
    templateUrl: './bubble-chart.component.html',
    styleUrls: ['./bubble-chart.component.scss']
})
export class BubbleChartComponent implements OnInit, OnDestroy {
    Highcharts = Highcharts;
    private chart;
    private ngUnsubscribe = new Subject();

    constructor(private chartService: ChartService) {
    }

    ngOnInit() {
        this.initChart();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    initChart() {
        const map = Highcharts.maps['custom/world'];

        this.chart = Highcharts.mapChart('chart-test-container', {
            title: {
                text: null,
            },
            chart: {
                events: {
                    load: (x) => {
                        this.chartService.chartResizeFix(x.target);
                    }
                },
                className: 'heatmap-chart',
            },
            credits: {
                enabled: false
            },
            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            tooltip: {
                pointFormat:
                    'Lat: {point.lat}<br>' +
                    'Lon: {point.lon}<br>' +
                    'Document count: {point.docCount}'
            },

            xAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },

            yAxis: {
                crosshair: {
                    zIndex: 5,
                    dashStyle: 'dot',
                    snap: false,
                    color: 'gray'
                }
            },

            series: [{
                name: 'Basemap',
                mapData: map,
                borderColor: '#606060',
                nullColor: 'rgba(200, 200, 200, 0.2)',
                showInLegend: false
            }, {
                name: 'Separators',
                type: 'mapline',
                data: Highcharts.geojson(map, 'mapline'),
                color: '#101010',
                enableMouseTracking: false,
                showInLegend: false
            }, {
                type: 'mapbubble',
                name: 'Document count per location',
                data: {},
                maxSize: '12%',
                color: Highcharts.getOptions().colors[0],
            }]
        });

        this.chartService.bubbleMapChartObservable
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(data => {
                this.chart.series[2].setData(data);
            });

        this.chartService.getBubbleMapChartData();
    }

}
