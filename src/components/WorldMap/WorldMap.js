
import React, { useEffect } from "react";



function WorldMap() {
    useEffect(() => {
        if (window.am5 && window.am5themes_Animated) {
            /**
 * ---------------------------------------
 * This demo was created using amCharts 5.
 * 
 * For more information visit:
 * https://www.amcharts.com/
 * 
 * Documentation is available at:
 * https://www.amcharts.com/docs/v5/
 * ---------------------------------------
 */

            // Create root element
            // https://www.amcharts.com/docs/v5/getting-started/#Root_element
            // eslint-disable-next-line no-undef
            var root = am5.Root.new("chartdiv");


            // Set themes
            // https://www.amcharts.com/docs/v5/concepts/themes/
            // eslint-disable-next-line no-undef
            root.setThemes([
                // eslint-disable-next-line no-undef
                am5themes_Animated.new(root)
            ]);


            // Create the map chart
            // https://www.amcharts.com/docs/v5/charts/map-chart/
            // setting rotationX to -154.8 makes the map Pacific-centered
            // eslint-disable-next-line no-undef
            var chart = root.container.children.push(am5map.MapChart.new(root, {
                panX: "rotateX",
                panY: "none",
                // eslint-disable-next-line no-undef
                projection: am5map.geoNaturalEarth1(),
                rotationX: -154.8
            }));


            // Create main polygon series for countries
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-polygon-series/
            // eslint-disable-next-line no-undef
            var polygonSeries = chart.series.push(am5map.MapPolygonSeries.new(root, {
                // eslint-disable-next-line no-undef
                geoJSON: am5geodata_worldLow
            }));

            polygonSeries.mapPolygons.template.setAll({
                tooltipText: "{name}",
                fillOpacity: 0.8
            });

            // eslint-disable-next-line no-undef
            var colorSet = am5.ColorSet.new(root, {});

            var i = 0;
            polygonSeries.mapPolygons.template.adapters.add("fill", function (fill, target) {
                if (i < 10) {
                    i++;
                }
                else {
                    i = 0;
                }
                var dataContext = target.dataItem.dataContext;
                if (!dataContext.colorWasSet) {
                    dataContext.colorWasSet = true;
                    // eslint-disable-next-line no-undef
                    var color = am5.Color.saturate(colorSet.getIndex(i), 0.3);
                    target.setRaw("fill", color);
                    return color;
                }
                else {
                    return fill;
                }
            })

            polygonSeries.mapPolygons.template.states.create("hover", { fillOpacity: 1 });

            // eslint-disable-next-line no-undef
            var graticuleSeries = chart.series.push(am5map.GraticuleSeries.new(root, {}));
            graticuleSeries.mapLines.template.setAll({
                stroke: root.interfaceColors.get("alternativeBackground"),
                strokeOpacity: 0.1
            });

            // Add zoom control
            // https://www.amcharts.com/docs/v5/charts/map-chart/map-pan-zoom/#Zoom_control
            // eslint-disable-next-line no-undef
            chart.set("zoomControl", am5map.ZoomControl.new(root, {}));


            // Set clicking on "water" to zoom out
            chart.chartContainer.get("background").events.on("click", function () {
                chart.goHome();
            })


            // Make stuff animate on load
            chart.appear(1000, 100);


        }



    }, []);



    return (
        <div>
            <div
                id="chartdiv"
                style={{ width: "100%", height: "700px" }}
            ></div>
        </div>
    );

}

export default WorldMap;


