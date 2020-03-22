import * as React from 'react';
import { ICovidService } from '../../services/ICovidService';
import * as moment from 'moment';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import styles from './BarChart.module.scss';

import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { height } from '@amcharts/amcharts4/.internal/core/utils/Utils';



export interface IBarChartProps {
    service: ICovidService;
}

export default function BarChart(props: IBarChartProps) {
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        props.service.getTimeline().then((items: any[]) => {
            setIsLoading(false);
            // Themes begin
            am4core.useTheme(am4themes_animated);
            // Themes end

            let chart = am4core.create("chartdiv", am4charts.XYChart);
            chart.padding(40, 40, 40, 40);

            chart.numberFormatter.bigNumberPrefixes = [
                { "number": 1e+3, "suffix": "K" },
                { "number": 1e+6, "suffix": "M" },
                { "number": 1e+9, "suffix": "B" }
            ];

            let label = chart.plotContainer.createChild(am4core.Label);
            label.x = am4core.percent(97);
            label.y = am4core.percent(95);
            label.horizontalCenter = "right";
            label.verticalCenter = "middle";
            label.dx = -15;
            label.fontSize = 50;

            let playButton = chart.plotContainer.createChild(am4core.PlayButton);
            playButton.x = am4core.percent(97);
            playButton.y = am4core.percent(95);
            playButton.dy = -2;
            playButton.verticalCenter = "middle";
            playButton.events.on("toggled", function (event) {
                if (event.target.isActive) {
                    play();
                }
                else {
                    stop();
                }
            })

            let stepDuration = 200;

            let categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
            categoryAxis.renderer.grid.template.location = 0;
            categoryAxis.dataFields.category = "country";
            categoryAxis.renderer.minGridDistance = 1;
            categoryAxis.renderer.inversed = true;
            // categoryAxis.maxZoomCount = 15;
            categoryAxis.renderer.grid.template.disabled = true;

            let valueAxis = chart.xAxes.push(new am4charts.ValueAxis());
            valueAxis.min = 0;
            valueAxis.rangeChangeEasing = am4core.ease.linear;
            valueAxis.rangeChangeDuration = stepDuration;
            valueAxis.extraMax = 0.1;

            let series = chart.series.push(new am4charts.ColumnSeries());
            series.dataFields.categoryY = "country";
            series.dataFields.valueX = "cases";
            series.tooltipText = "{valueX.value}"
            series.columns.template.strokeOpacity = 0;
            series.columns.template.column.cornerRadiusBottomRight = 5;
            series.columns.template.column.cornerRadiusTopRight = 5;
            series.interpolationDuration = stepDuration;
            series.interpolationEasing = am4core.ease.linear;

            let labelBullet = series.bullets.push(new am4charts.LabelBullet())
            labelBullet.label.horizontalCenter = "right";
            labelBullet.label.text = "{values.valueX.workingValue.formatNumber('#.0as')}";
            labelBullet.label.textAlign = "end";
            labelBullet.label.dx = -10;

            chart.zoomOutButton.disabled = true;

            // as by default columns of the same series are of the same color, we add adapter which takes colors from chart.colors color set
            series.columns.template.adapter.add("fill", function (fill, target) {
                return chart.colors.getIndex(target.dataItem.index);
            });

            let counter = 0;
            label.text = moment("1/22/20", "M/DD/YY").format("M/DD/YY");

            let interval;

            function play() {
                interval = setInterval(function () {
                    nextDay();
                }, stepDuration)
                nextDay();
            }

            function stop() {
                if (interval) {
                    clearInterval(interval);
                }
            }

            function nextDay() {
                counter++;

                if (counter > items.length) {
                    stop();
                }

                let newData = items[counter].countries;
                let itemsWithNonZero = 0;
                for (var i = 0; i < chart.data.length; i++) {
                    chart.data[i].cases = newData[i].cases;
                    if (chart.data[i].cases > 0) {
                        itemsWithNonZero++;
                    }
                }


                series.interpolationDuration = stepDuration;
                valueAxis.rangeChangeDuration = stepDuration;

                chart.invalidateRawData();
                label.text = items[counter].date;

                categoryAxis.zoom({ start: 0, end: 0.15 });
            }


            categoryAxis.sortBySeries = series;

            chart.data = JSON.parse(JSON.stringify(items[counter].countries));
            categoryAxis.zoom({ start: 0, end: 1 / chart.data.length });

            series.events.on("inited", function () {
                setTimeout(function () {
                    playButton.isActive = true; // this starts interval
                }, stepDuration)
            })
        });
    }, []);

    var content = null;
    if (isLoading === true) content = <Spinner size={SpinnerSize.large} />;
    else content = (
        <div id="chartdiv" className={styles.chart}></div>
    );

    return (<div className={styles.barChart}>
        <div className={styles.container}>
            {content}
        </div>
    </div>);
}