/*
   Licensed to the Apache Software Foundation (ASF) under one or more
   contributor license agreements.  See the NOTICE file distributed with
   this work for additional information regarding copyright ownership.
   The ASF licenses this file to You under the Apache License, Version 2.0
   (the "License"); you may not use this file except in compliance with
   the License.  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

   Unless required by applicable law or agreed to in writing, software
   distributed under the License is distributed on an "AS IS" BASIS,
   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   See the License for the specific language governing permissions and
   limitations under the License.
*/
$(document).ready(function() {

    $(".click-title").mouseenter( function(    e){
        e.preventDefault();
        this.style.cursor="pointer";
    });
    $(".click-title").mousedown( function(event){
        event.preventDefault();
    });

    // Ugly code while this script is shared among several pages
    try{
        refreshHitsPerSecond(true);
    } catch(e){}
    try{
        refreshResponseTimeOverTime(true);
    } catch(e){}
    try{
        refreshResponseTimePercentiles();
    } catch(e){}
});


var responseTimePercentilesInfos = {
        getOptions: function() {
            return {
                series: {
                    points: { show: false }
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentiles'
                },
                xaxis: {
                    tickDecimals: 1,
                    axisLabel: "Percentiles",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Percentile value in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : %x.2 percentile was %y ms"
                },
                selection: { mode: "xy" },
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentiles"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesPercentiles"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesPercentiles"), dataset, prepareOverviewOptions(options));
        }
};

/**
 * @param elementId Id of element where we display message
 */
function setEmptyGraph(elementId) {
    $(function() {
        $(elementId).text("No graph series with filter="+seriesFilter);
    });
}

// Response times percentiles
function refreshResponseTimePercentiles() {
    var infos = responseTimePercentilesInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimePercentiles");
        return;
    }
    if (isGraph($("#flotResponseTimesPercentiles"))){
        infos.createGraph();
    } else {
        var choiceContainer = $("#choicesResponseTimePercentiles");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesPercentiles", "#overviewResponseTimesPercentiles");
        $('#bodyResponseTimePercentiles .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimeDistributionInfos = {
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 15.0, "series": [{"data": [[300.0, 1.0], [200.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[600.0, 1.0], [200.0, 12.0], [800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[300.0, 2.0], [200.0, 12.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[700.0, 1.0], [200.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[200.0, 1.0], [400.0, 9.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[200.0, 2.0], [400.0, 8.0], [1800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 2.0], [400.0, 4.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[200.0, 4.0], [400.0, 6.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[200.0, 3.0], [400.0, 8.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[10100.0, 1.0], [11400.0, 1.0], [13500.0, 1.0], [13700.0, 1.0], [15500.0, 1.0], [16900.0, 1.0], [19900.0, 1.0], [20800.0, 1.0], [22700.0, 1.0], [6300.0, 1.0], [25200.0, 1.0], [6900.0, 1.0], [7000.0, 1.0], [7900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[8700.0, 1.0], [9100.0, 1.0], [11000.0, 1.0], [11100.0, 1.0], [14100.0, 1.0], [14600.0, 1.0], [4400.0, 1.0], [1200.0, 1.0], [20700.0, 1.0], [5800.0, 1.0], [1500.0, 1.0], [6200.0, 1.0], [6500.0, 1.0], [7700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[8700.0, 1.0], [10200.0, 1.0], [11800.0, 1.0], [3200.0, 1.0], [17200.0, 1.0], [18000.0, 1.0], [4700.0, 1.0], [5400.0, 1.0], [5700.0, 1.0], [6000.0, 1.0], [6800.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [31300.0, 1.0], [7800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[35400.0, 1.0], [2200.0, 1.0], [9700.0, 1.0], [9300.0, 1.0], [44800.0, 1.0], [14700.0, 1.0], [3800.0, 2.0], [15800.0, 1.0], [4300.0, 1.0], [1100.0, 1.0], [4900.0, 1.0], [6200.0, 1.0], [6300.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8700.0, 1.0], [9800.0, 1.0], [10500.0, 1.0], [12300.0, 1.0], [3200.0, 1.0], [13200.0, 1.0], [13500.0, 1.0], [14000.0, 1.0], [14300.0, 1.0], [14800.0, 1.0], [17300.0, 1.0], [4800.0, 1.0], [5600.0, 1.0], [6300.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[2200.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [12900.0, 1.0], [3300.0, 1.0], [4900.0, 1.0], [1300.0, 1.0], [1600.0, 3.0], [1700.0, 1.0], [7100.0, 1.0], [1800.0, 1.0], [7700.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[600.0, 1.0], [2600.0, 1.0], [3300.0, 1.0], [13800.0, 1.0], [13600.0, 1.0], [900.0, 1.0], [4600.0, 1.0], [18000.0, 1.0], [4800.0, 1.0], [4900.0, 2.0], [1300.0, 1.0], [6900.0, 1.0], [7600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[2100.0, 2.0], [9100.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [16500.0, 1.0], [1200.0, 1.0], [5000.0, 1.0], [1300.0, 1.0], [21200.0, 1.0], [5700.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [7200.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[34600.0, 1.0], [9800.0, 1.0], [15700.0, 1.0], [64200.0, 1.0], [16500.0, 1.0], [17300.0, 1.0], [17600.0, 1.0], [18800.0, 1.0], [20400.0, 1.0], [20600.0, 1.0], [5500.0, 1.0], [22100.0, 1.0], [22400.0, 1.0], [23100.0, 1.0], [23500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[8700.0, 1.0], [4500.0, 1.0], [19400.0, 1.0], [10700.0, 3.0], [5200.0, 1.0], [23800.0, 1.0], [5900.0, 1.0], [7000.0, 1.0], [29300.0, 1.0], [14400.0, 1.0], [14900.0, 2.0], [3900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 2.0], [2900.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 4.0], [1800.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[2300.0, 1.0], [2900.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 6.0], [3800.0, 1.0], [2000.0, 3.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 3.0], [2300.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[600.0, 1.0], [200.0, 5.0], [400.0, 6.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[300.0, 1.0], [200.0, 12.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 8.0], [200.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[300.0, 1.0], [200.0, 11.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [700.0, 1.0], [200.0, 8.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1100.0, 1.0], [400.0, 7.0], [200.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1200.0, 1.0], [200.0, 10.0], [400.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[600.0, 1.0], [400.0, 7.0], [200.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[200.0, 12.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 3.0], [100.0, 11.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[600.0, 1.0], [400.0, 9.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[2500.0, 1.0], [400.0, 10.0], [200.0, 1.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 13.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 10.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 12.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[200.0, 14.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 14.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 14.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[300.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[42800.0, 1.0], [44200.0, 1.0], [45000.0, 1.0], [44300.0, 1.0], [44500.0, 1.0], [45300.0, 1.0], [46900.0, 1.0], [45200.0, 1.0], [46800.0, 1.0], [49200.0, 1.0], [49400.0, 1.0], [53200.0, 1.0], [51200.0, 1.0], [52200.0, 1.0], [70000.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 3.0], [700.0, 1.0], [200.0, 9.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 10.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[200.0, 12.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 13.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[200.0, 14.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[200.0, 14.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[200.0, 3.0], [400.0, 9.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[600.0, 1.0], [400.0, 8.0], [200.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[200.0, 6.0], [400.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[200.0, 3.0], [400.0, 7.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[200.0, 4.0], [400.0, 7.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 3.0], [2300.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [1600.0, 1.0], [1700.0, 2.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[600.0, 1.0], [200.0, 13.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[200.0, 12.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[200.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 12.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[600.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2200.0, 1.0], [2400.0, 2.0], [2900.0, 1.0], [1500.0, 2.0], [1600.0, 1.0], [1700.0, 4.0], [1800.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[300.0, 1.0], [1300.0, 1.0], [200.0, 10.0], [100.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[200.0, 13.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1400.0, 1.0], [200.0, 12.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[42800.0, 1.0], [44200.0, 1.0], [45000.0, 1.0], [44300.0, 1.0], [44500.0, 1.0], [45300.0, 1.0], [46900.0, 1.0], [45200.0, 1.0], [46800.0, 1.0], [49400.0, 1.0], [49200.0, 1.0], [53200.0, 1.0], [51200.0, 1.0], [52200.0, 1.0], [70000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[200.0, 5.0], [400.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[200.0, 9.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[200.0, 6.0], [400.0, 6.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 7.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[600.0, 1.0], [200.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[200.0, 4.0], [400.0, 3.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0], [400.0, 4.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[100.0, 14.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 5.0], [200.0, 1.0], [100.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 5.0], [600.0, 1.0], [10300.0, 1.0], [2800.0, 1.0], [6300.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [7500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[4500.0, 1.0], [600.0, 9.0], [300.0, 1.0], [5000.0, 1.0], [10800.0, 1.0], [700.0, 1.0], [2800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[2300.0, 1.0], [10300.0, 1.0], [10400.0, 1.0], [2600.0, 1.0], [2700.0, 1.0], [2800.0, 1.0], [11300.0, 1.0], [3800.0, 1.0], [16600.0, 1.0], [4200.0, 1.0], [4600.0, 1.0], [4700.0, 1.0], [6100.0, 1.0], [6600.0, 1.0], [7100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[2300.0, 1.0], [2900.0, 1.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 6.0], [3800.0, 1.0], [2000.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 9.0], [100.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[600.0, 1.0], [200.0, 5.0], [400.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[200.0, 7.0], [400.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[200.0, 10.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[200.0, 2.0], [400.0, 9.0], [100.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 12.0], [200.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[4300.0, 1.0], [1100.0, 1.0], [600.0, 5.0], [700.0, 2.0], [1600.0, 1.0], [3200.0, 1.0], [500.0, 3.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[42400.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [13000.0, 1.0], [1000.0, 1.0], [1100.0, 1.0], [1200.0, 2.0], [18500.0, 1.0], [19800.0, 1.0], [5600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [7600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [1400.0, 1.0], [44100.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [100.0, 3.0], [800.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [3800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[600.0, 2.0], [2400.0, 1.0], [9700.0, 1.0], [2500.0, 1.0], [700.0, 1.0], [200.0, 2.0], [3600.0, 1.0], [4200.0, 1.0], [4400.0, 1.0], [1300.0, 1.0], [5600.0, 1.0], [27400.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[35800.0, 1.0], [37700.0, 1.0], [38900.0, 1.0], [40500.0, 1.0], [40000.0, 1.0], [41600.0, 1.0], [43900.0, 1.0], [45400.0, 1.0], [47100.0, 1.0], [47000.0, 1.0], [48200.0, 1.0], [47800.0, 1.0], [50800.0, 1.0], [49700.0, 1.0], [30800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[600.0, 4.0], [9800.0, 1.0], [10100.0, 1.0], [700.0, 3.0], [15900.0, 1.0], [1100.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1600.0, 2.0], [30200.0, 1.0], [30300.0, 1.0], [35200.0, 1.0], [37200.0, 1.0], [38500.0, 1.0], [38400.0, 1.0], [39800.0, 1.0], [42700.0, 1.0], [41000.0, 1.0], [44800.0, 1.0], [46500.0, 2.0], [47500.0, 1.0], [47600.0, 1.0], [50200.0, 1.0], [49200.0, 1.0], [3500.0, 2.0], [4000.0, 1.0], [4300.0, 1.0], [5700.0, 1.0], [7300.0, 1.0], [7500.0, 1.0], [500.0, 3.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[8500.0, 1.0], [600.0, 7.0], [2500.0, 2.0], [700.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [200.0, 3.0], [900.0, 1.0], [4500.0, 1.0], [300.0, 7.0], [1300.0, 1.0], [1400.0, 1.0], [400.0, 3.0], [1600.0, 1.0], [1700.0, 3.0], [7300.0, 1.0], [500.0, 8.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [600.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [200.0, 2.0], [3500.0, 1.0], [1000.0, 3.0], [4200.0, 1.0], [4400.0, 1.0], [1100.0, 1.0], [300.0, 2.0], [5100.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [1700.0, 2.0], [7400.0, 1.0], [1900.0, 2.0], [500.0, 1.0], [8100.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[9200.0, 1.0], [2300.0, 1.0], [10200.0, 1.0], [2900.0, 1.0], [12600.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [4000.0, 1.0], [5000.0, 1.0], [20800.0, 1.0], [5600.0, 1.0], [5900.0, 1.0], [6400.0, 1.0], [1700.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[9600.0, 1.0], [2600.0, 1.0], [2900.0, 1.0], [3000.0, 2.0], [800.0, 1.0], [900.0, 2.0], [17900.0, 1.0], [5900.0, 1.0], [24600.0, 1.0], [6300.0, 1.0], [1700.0, 1.0], [500.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[200.0, 7.0], [400.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[200.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[300.0, 3.0], [200.0, 4.0], [400.0, 4.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 70000.0, "title": "Response Time Distribution"}},
        getOptions: function() {
            var granularity = this.data.result.granularity;
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    barWidth: this.data.result.granularity
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " responses for " + label + " were between " + xval + " and " + (xval + granularity) + " ms";
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimeDistribution"), prepareData(data.result.series, $("#choicesResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshResponseTimeDistribution() {
    var infos = responseTimeDistributionInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeDistribution");
        return;
    }
    if (isGraph($("#flotResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var syntheticResponseTimeDistributionInfos = {
        data: {"result": {"minY": 9.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 911.0, "series": [{"data": [[0.0, 911.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 237.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 358.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 9.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
        getOptions: function() {
            return {
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendSyntheticResponseTimeDistribution'
                },
                xaxis:{
                    axisLabel: "Response times ranges",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                    tickLength:0,
                    min:-0.5,
                    max:3.5
                },
                yaxis: {
                    axisLabel: "Number of responses",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                bars : {
                    show: true,
                    align: "center",
                    barWidth: 0.25,
                    fill:.75
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: function(label, xval, yval, flotItem){
                        return yval + " " + label;
                    }
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var options = this.getOptions();
            prepareOptions(options, data);
            options.xaxis.ticks = data.result.ticks;
            $.plot($("#flotSyntheticResponseTimeDistribution"), prepareData(data.result.series, $("#choicesSyntheticResponseTimeDistribution")), options);
        }

};

// Response time distribution
function refreshSyntheticResponseTimeDistribution() {
    var infos = syntheticResponseTimeDistributionInfos;
    prepareSeries(infos.data, true);
    if (isGraph($("#flotSyntheticResponseTimeDistribution"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        $('#footerSyntheticResponseTimeDistribution .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var activeThreadsOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6639965E12, "maxY": 15.0, "series": [{"data": [[1.6639965E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-49", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-24", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-47", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-69", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.6639965E12, 15.0], [1.66399662E12, 9.705655526992278], [1.66399656E12, 14.945614035087717]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-2", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-73", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-71", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-33", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-77", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-55", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-56", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-12", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-31", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-16", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-13", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-57", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-79", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-35", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-36", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-19", "isController": false}, {"data": [[1.6639965E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-40", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-63", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-85", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-88", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-23", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399662E12, "title": "Active Threads Over Time"}},
        getOptions: function() {
            return {
                series: {
                    stack: true,
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 6,
                    show: true,
                    container: '#legendActiveThreadsOverTime'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                selection: {
                    mode: 'xy'
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : At %x there were %y active threads"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesActiveThreadsOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotActiveThreadsOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewActiveThreadsOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Active Threads Over Time
function refreshActiveThreadsOverTime(fixTimestamps) {
    var infos = activeThreadsOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotActiveThreadsOverTime"))) {
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesActiveThreadsOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotActiveThreadsOverTime", "#overviewActiveThreadsOverTime");
        $('#footerActiveThreadsOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var timeVsThreadsInfos = {
        data: {"result": {"minY": 2.0, "minX": 0.0, "maxY": 48728.666666666664, "series": [{"data": [[10.0, 269.0], [5.0, 248.0], [11.0, 296.2], [12.0, 247.0], [6.0, 236.0], [13.0, 289.0], [14.0, 259.3333333333333], [15.0, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[11.4, 273.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[10.0, 229.0], [5.0, 257.0], [11.0, 244.8], [12.0, 250.0], [6.0, 269.0], [13.0, 706.0], [14.0, 235.0], [15.0, 230.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[11.4, 305.0666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[10.0, 252.0], [5.0, 660.0], [11.0, 238.6], [12.0, 237.0], [6.0, 839.0], [13.0, 628.5], [14.0, 244.33333333333334], [15.0, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[11.4, 362.5333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[10.0, 249.0], [5.0, 341.0], [11.0, 298.4], [12.0, 246.0], [6.0, 239.0], [13.0, 296.0], [14.0, 252.33333333333334], [15.0, 228.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[11.4, 276.2666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[10.0, 229.0], [5.0, 718.0], [11.0, 297.8], [12.0, 270.0], [6.0, 270.0], [13.0, 254.5], [14.0, 224.0], [15.0, 268.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[11.4, 295.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[10.0, 501.0], [5.0, 538.0], [11.0, 497.2], [12.0, 484.0], [6.0, 462.0], [13.0, 534.0], [14.0, 474.6666666666667], [15.0, 240.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[11.4, 480.19999999999993]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[10.0, 465.0], [5.0, 490.0], [11.0, 487.6], [12.0, 509.0], [6.0, 474.0], [13.0, 1159.0], [14.0, 417.0], [15.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[11.4, 546.5333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[10.0, 470.0], [5.0, 751.0], [11.0, 438.4], [12.0, 534.0], [6.0, 336.0], [13.0, 516.0], [14.0, 517.0], [15.0, 258.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[11.4, 474.93333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[10.0, 503.0], [5.0, 598.0], [11.0, 447.2], [12.0, 478.0], [6.0, 246.0], [13.0, 380.0], [14.0, 490.6666666666667], [15.0, 265.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[11.4, 437.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[10.0, 494.0], [5.0, 580.0], [11.0, 437.4], [12.0, 491.0], [6.0, 481.0], [13.0, 486.0], [14.0, 425.0], [15.0, 227.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[11.4, 447.1333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[15.0, 13358.466666666665]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[15.0, 13358.466666666665]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[15.0, 8752.266666666666]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[15.0, 8752.266666666666]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[15.0, 9414.066666666666]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[15.0, 9414.066666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[15.0, 11381.06666666667]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[15.0, 11381.06666666667]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[15.0, 10423.4]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[15.0, 10423.4]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[15.0, 3711.2666666666664]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[15.0, 3711.2666666666664]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[15.0, 6051.133333333334]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[15.0, 6051.133333333334]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[15.0, 5995.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[15.0, 5995.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[15.0, 22198.733333333334]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[15.0, 22198.733333333334]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[15.0, 12312.466666666665]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[15.0, 12312.466666666665]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1771.0], [2.0, 2099.0], [9.0, 1756.0], [10.0, 1567.0], [11.0, 2921.0], [12.0, 2016.0], [3.0, 1852.0], [13.0, 1810.0], [14.0, 1576.0], [15.0, 1614.0], [4.0, 2229.0], [1.0, 2449.0], [5.0, 2462.0], [6.0, 1774.0], [7.0, 1780.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[8.0, 1978.3999999999999]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[11.0, 3800.0], [13.0, 2967.0], [14.0, 1973.0], [15.0, 1963.0833333333333]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[14.533333333333333, 2153.133333333333]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[10.0, 1807.0], [5.0, 2525.0], [11.0, 1932.8], [12.0, 2218.0], [6.0, 2313.0], [13.0, 2506.5], [14.0, 1977.6666666666667], [15.0, 1707.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[11.4, 2078.666666666667]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[11.0, 240.0], [13.0, 666.0], [14.0, 237.0], [15.0, 430.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[14.533333333333333, 420.73333333333335]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[10.0, 229.0], [5.0, 265.0], [11.0, 251.0], [12.0, 465.0], [6.0, 231.0], [13.0, 286.0], [14.0, 238.66666666666666], [15.0, 523.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[11.4, 283.7333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[11.0, 456.0], [13.0, 1480.0], [14.0, 237.0], [15.0, 424.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[14.533333333333333, 484.2666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[10.0, 241.0], [5.0, 535.0], [11.0, 250.8], [12.0, 230.0], [6.0, 237.0], [13.0, 407.5], [14.0, 316.6666666666667], [15.0, 274.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[11.4, 302.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[10.0, 265.0], [5.0, 2.0], [11.0, 337.0], [12.0, 538.0], [6.0, 744.0], [13.0, 290.5], [14.0, 325.6666666666667], [15.0, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[11.4, 337.26666666666665]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[11.0, 507.0], [13.0, 1179.0], [14.0, 454.0], [15.0, 477.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[14.533333333333333, 524.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[11.0, 488.0], [13.0, 1289.0], [14.0, 477.0], [15.0, 285.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[14.533333333333333, 378.73333333333335]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 469.0], [2.0, 512.0], [9.0, 530.0], [10.0, 251.0], [11.0, 494.0], [12.0, 484.0], [3.0, 530.0], [13.0, 521.0], [14.0, 500.0], [15.0, 532.0], [4.0, 485.0], [1.0, 468.0], [5.0, 483.0], [6.0, 663.0], [7.0, 460.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[8.0, 492.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[11.0, 468.0], [13.0, 473.0], [14.0, 228.0], [15.0, 271.5833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[14.533333333333333, 295.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 173.0], [2.0, 61.0], [9.0, 180.0], [10.0, 203.0], [11.0, 180.0], [12.0, 173.0], [3.0, 61.0], [13.0, 56.0], [14.0, 190.0], [15.0, 180.0], [4.0, 164.0], [1.0, 171.0], [5.0, 179.0], [6.0, 161.0], [7.0, 168.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[8.0, 153.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[11.0, 246.0], [13.0, 657.0], [14.0, 486.0], [15.0, 461.41666666666674]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[14.533333333333333, 461.7333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[11.0, 2539.0], [13.0, 865.0], [14.0, 483.0], [15.0, 464.16666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[14.533333333333333, 630.4666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[11.0, 229.0], [13.0, 231.0], [14.0, 230.0], [15.0, 286.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[14.533333333333333, 274.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [2.0, 506.0], [9.0, 227.0], [10.0, 276.0], [11.0, 482.0], [12.0, 250.0], [3.0, 235.0], [13.0, 232.0], [14.0, 254.0], [15.0, 250.0], [4.0, 492.0], [1.0, 254.0], [5.0, 256.0], [6.0, 478.0], [7.0, 477.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[8.0, 327.7333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 239.0], [2.0, 237.0], [9.0, 231.0], [10.0, 236.0], [11.0, 510.0], [12.0, 251.0], [3.0, 235.0], [13.0, 246.0], [14.0, 232.0], [15.0, 232.0], [4.0, 469.0], [1.0, 247.0], [5.0, 256.0], [6.0, 484.0], [7.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[8.0, 290.53333333333336]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[11.0, 243.0], [13.0, 232.0], [14.0, 237.0], [15.0, 266.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[14.533333333333333, 260.26666666666665]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [2.0, 11.0], [9.0, 10.0], [10.0, 14.0], [11.0, 16.0], [12.0, 14.0], [3.0, 22.0], [13.0, 13.0], [14.0, 13.0], [15.0, 14.0], [4.0, 12.0], [1.0, 14.0], [5.0, 37.0], [6.0, 10.0], [7.0, 11.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[8.0, 15.266666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[11.0, 243.0], [13.0, 240.0], [14.0, 250.0], [15.0, 261.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[14.533333333333333, 257.9333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 56.0], [2.0, 72.0], [9.0, 53.0], [10.0, 61.0], [11.0, 70.0], [12.0, 59.0], [3.0, 83.0], [13.0, 55.0], [14.0, 65.0], [15.0, 54.0], [4.0, 57.0], [1.0, 166.0], [5.0, 55.0], [6.0, 57.0], [7.0, 53.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[8.0, 67.73333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 265.0], [2.0, 255.0], [9.0, 269.0], [10.0, 257.0], [11.0, 252.0], [12.0, 277.0], [3.0, 331.0], [13.0, 283.0], [14.0, 276.0], [15.0, 278.0], [4.0, 269.0], [1.0, 270.0], [5.0, 279.0], [6.0, 268.0], [7.0, 275.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[8.0, 273.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[15.0, 48728.666666666664]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[15.0, 48728.666666666664]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 283.0], [2.0, 501.0], [9.0, 294.0], [10.0, 280.0], [11.0, 261.0], [12.0, 292.0], [3.0, 296.0], [13.0, 305.0], [14.0, 302.0], [15.0, 291.0], [4.0, 738.0], [1.0, 997.0], [5.0, 307.0], [6.0, 284.0], [7.0, 293.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[8.0, 381.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [2.0, 499.0], [9.0, 245.0], [10.0, 276.0], [11.0, 492.0], [12.0, 256.0], [3.0, 240.0], [13.0, 259.0], [14.0, 246.0], [15.0, 231.0], [4.0, 478.0], [1.0, 248.0], [5.0, 459.0], [6.0, 502.0], [7.0, 254.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[8.0, 328.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 227.0], [2.0, 481.0], [9.0, 249.0], [10.0, 276.0], [11.0, 226.0], [12.0, 251.0], [3.0, 247.0], [13.0, 246.0], [14.0, 246.0], [15.0, 238.0], [4.0, 246.0], [1.0, 458.0], [5.0, 511.0], [6.0, 246.0], [7.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[8.0, 293.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[11.0, 491.0], [13.0, 233.0], [14.0, 241.0], [15.0, 267.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[14.533333333333333, 278.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[11.0, 248.0], [13.0, 241.0], [14.0, 237.0], [15.0, 271.49999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[14.533333333333333, 265.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[11.0, 532.0], [13.0, 237.0], [14.0, 237.0], [15.0, 244.83333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[14.533333333333333, 262.93333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 486.0], [2.0, 248.0], [9.0, 479.0], [10.0, 509.0], [11.0, 471.0], [12.0, 487.0], [3.0, 487.0], [13.0, 513.0], [14.0, 488.0], [15.0, 248.0], [4.0, 485.0], [1.0, 506.0], [5.0, 475.0], [6.0, 253.0], [7.0, 467.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[8.0, 440.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 238.0], [2.0, 252.0], [9.0, 452.0], [10.0, 509.0], [11.0, 475.0], [12.0, 676.0], [3.0, 457.0], [13.0, 467.0], [14.0, 495.0], [15.0, 514.0], [4.0, 484.0], [1.0, 455.0], [5.0, 475.0], [6.0, 241.0], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[8.0, 428.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 490.0], [2.0, 252.0], [9.0, 465.0], [10.0, 459.0], [11.0, 499.0], [12.0, 466.0], [3.0, 517.0], [13.0, 256.0], [14.0, 242.0], [15.0, 266.0], [4.0, 473.0], [1.0, 465.0], [5.0, 501.0], [6.0, 238.0], [7.0, 239.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[8.0, 388.5333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 463.0], [2.0, 244.0], [9.0, 446.0], [10.0, 237.0], [11.0, 509.0], [12.0, 513.0], [3.0, 495.0], [13.0, 454.0], [14.0, 510.0], [15.0, 267.0], [4.0, 504.0], [1.0, 477.0], [5.0, 459.0], [6.0, 503.0], [7.0, 484.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[8.0, 437.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 504.0], [2.0, 512.0], [9.0, 483.0], [10.0, 248.0], [11.0, 507.0], [12.0, 253.0], [3.0, 504.0], [13.0, 487.0], [14.0, 241.0], [15.0, 256.0], [4.0, 470.0], [1.0, 463.0], [5.0, 455.0], [6.0, 470.0], [7.0, 450.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[8.0, 420.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[10.0, 1807.0], [5.0, 2525.0], [11.0, 1932.8], [12.0, 2218.0], [6.0, 2313.0], [13.0, 2506.5], [14.0, 1977.6666666666667], [15.0, 1707.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[11.4, 2078.666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 234.0], [2.0, 607.0], [9.0, 494.0], [10.0, 240.0], [11.0, 275.0], [12.0, 242.0], [3.0, 254.0], [13.0, 258.0], [14.0, 255.0], [15.0, 272.0], [4.0, 237.0], [1.0, 239.0], [5.0, 246.0], [6.0, 251.0], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[8.0, 289.93333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 254.0], [2.0, 250.0], [9.0, 251.0], [10.0, 251.0], [11.0, 250.0], [12.0, 475.0], [3.0, 494.0], [13.0, 225.0], [14.0, 240.0], [15.0, 546.0], [4.0, 245.0], [1.0, 232.0], [5.0, 241.0], [6.0, 242.0], [7.0, 226.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[8.0, 294.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 232.0], [2.0, 256.0], [9.0, 233.0], [10.0, 248.0], [11.0, 254.0], [12.0, 254.0], [3.0, 238.0], [13.0, 261.0], [14.0, 239.0], [15.0, 240.0], [4.0, 252.0], [1.0, 229.0], [5.0, 230.0], [6.0, 245.0], [7.0, 232.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[8.0, 242.86666666666662]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 241.0], [2.0, 256.0], [9.0, 399.0], [10.0, 256.0], [11.0, 262.0], [12.0, 266.0], [3.0, 260.0], [13.0, 244.0], [14.0, 253.0], [15.0, 256.0], [4.0, 236.0], [1.0, 513.0], [5.0, 228.0], [6.0, 238.0], [7.0, 712.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[8.0, 308.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 234.0], [2.0, 266.0], [9.0, 244.0], [10.0, 249.0], [11.0, 248.0], [12.0, 261.0], [3.0, 254.0], [13.0, 268.0], [14.0, 240.0], [15.0, 256.0], [4.0, 244.0], [1.0, 234.0], [5.0, 237.0], [6.0, 235.0], [7.0, 603.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[8.0, 271.53333333333336]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1771.0], [2.0, 2099.0], [9.0, 1756.0], [10.0, 1567.0], [11.0, 2921.0], [12.0, 2016.0], [3.0, 1852.0], [13.0, 1810.0], [14.0, 1576.0], [15.0, 1614.0], [4.0, 2229.0], [1.0, 2449.0], [5.0, 2462.0], [6.0, 1774.0], [7.0, 1780.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[8.0, 1978.3999999999999]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 233.0], [2.0, 309.0], [9.0, 166.0], [10.0, 243.0], [11.0, 1391.0], [12.0, 516.0], [3.0, 287.0], [13.0, 244.0], [14.0, 245.0], [15.0, 291.0], [4.0, 243.0], [1.0, 235.0], [5.0, 908.0], [6.0, 261.0], [7.0, 232.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[8.0, 386.9333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 244.0], [2.0, 261.0], [9.0, 243.0], [10.0, 260.0], [11.0, 262.0], [12.0, 265.0], [3.0, 271.0], [13.0, 448.0], [14.0, 247.0], [15.0, 241.0], [4.0, 245.0], [1.0, 228.0], [5.0, 939.0], [6.0, 250.0], [7.0, 225.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[8.0, 308.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 491.0], [2.0, 249.0], [9.0, 248.0], [10.0, 273.0], [11.0, 1439.0], [12.0, 262.0], [3.0, 260.0], [13.0, 234.0], [14.0, 236.0], [15.0, 254.0], [4.0, 239.0], [1.0, 234.0], [5.0, 955.0], [6.0, 250.0], [7.0, 236.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[8.0, 390.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[15.0, 48728.666666666664]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[15.0, 48728.666666666664]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[11.0, 482.0], [13.0, 562.0], [14.0, 478.0], [15.0, 388.5833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[14.533333333333333, 412.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[11.0, 480.0], [13.0, 237.0], [14.0, 239.0], [15.0, 341.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[14.533333333333333, 337.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[11.0, 461.0], [13.0, 541.0], [14.0, 511.0], [15.0, 367.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[14.533333333333333, 395.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[11.0, 240.0], [13.0, 1168.0], [14.0, 480.0], [15.0, 358.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[14.533333333333333, 412.53333333333336]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[11.0, 265.0], [13.0, 254.0], [14.0, 265.0], [15.0, 299.25000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[14.533333333333333, 291.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[11.0, 515.0], [13.0, 518.0], [14.0, 500.0], [15.0, 423.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[14.533333333333333, 441.0666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[11.0, 557.0], [13.0, 620.0], [14.0, 473.0], [15.0, 458.50000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[14.533333333333333, 476.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[11.0, 199.0], [13.0, 173.0], [14.0, 167.0], [15.0, 176.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[14.533333333333333, 177.26666666666665]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[11.0, 19.0], [13.0, 22.0], [14.0, 15.0], [15.0, 18.833333333333336]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[14.533333333333333, 18.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[11.0, 169.0], [13.0, 194.0], [14.0, 172.0], [15.0, 130.08333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[14.533333333333333, 139.73333333333335]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[15.0, 2594.933333333333]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[15.0, 2594.933333333333]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[15.0, 2020.6666666666672]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[15.0, 2020.6666666666672]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[15.0, 6462.466666666666]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[15.0, 6462.466666666666]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[11.0, 3800.0], [13.0, 2967.0], [14.0, 1973.0], [15.0, 1963.0833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[14.533333333333333, 2153.133333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[10.0, 64.0], [5.0, 54.0], [11.0, 95.6], [12.0, 188.0], [6.0, 54.0], [13.0, 109.5], [14.0, 137.0], [15.0, 55.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[11.4, 101.53333333333332]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[10.0, 452.0], [5.0, 632.0], [11.0, 343.8], [12.0, 471.0], [6.0, 475.0], [13.0, 502.5], [14.0, 405.3333333333333], [15.0, 236.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[11.4, 413.7333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[10.0, 508.0], [5.0, 514.0], [11.0, 405.6], [12.0, 486.0], [6.0, 246.0], [13.0, 389.0], [14.0, 325.6666666666667], [15.0, 224.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[11.4, 384.0666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[10.0, 246.0], [5.0, 511.0], [11.0, 351.4], [12.0, 231.0], [6.0, 458.0], [13.0, 238.5], [14.0, 345.6666666666667], [15.0, 249.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[11.4, 331.06666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[10.0, 457.0], [5.0, 575.0], [11.0, 441.4], [12.0, 474.0], [6.0, 468.0], [13.0, 484.0], [14.0, 373.6666666666667], [15.0, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[11.4, 435.1333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[10.0, 171.0], [5.0, 166.0], [11.0, 190.8], [12.0, 180.0], [6.0, 58.0], [13.0, 175.0], [14.0, 174.0], [15.0, 165.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[11.4, 171.06666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[10.0, 11.0], [5.0, 12.0], [11.0, 23.4], [12.0, 15.0], [6.0, 12.0], [13.0, 13.5], [14.0, 21.333333333333332], [15.0, 12.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[11.4, 18.000000000000004]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[15.0, 1258.6000000000001]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[15.0, 1258.6000000000001]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[15.0, 8240.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[15.0, 8240.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[15.0, 4101.8]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[15.0, 4101.8]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[15.0, 4816.666666666666]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[15.0, 4816.666666666666]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[15.0, 43053.26666666667]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[15.0, 43053.26666666667]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 24781.666666666668], [15.0, 1400.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[4.999999999999999, 16987.999999999996]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 1230.333333333333], [15.0, 1540.8]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[4.999999999999999, 1333.8222222222228]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 1574.4666666666667], [15.0, 2842.6]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[7.500000000000002, 2208.5333333333338]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[15.0, 6775.4]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[15.0, 6775.4]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[15.0, 5956.133333333333]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[15.0, 5956.133333333333]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[10.0, 486.0], [5.0, 269.0], [11.0, 295.2], [12.0, 498.0], [6.0, 461.0], [13.0, 476.0], [14.0, 391.6666666666667], [15.0, 230.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[11.4, 369.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[10.0, 272.0], [5.0, 294.0], [11.0, 281.2], [12.0, 250.0], [6.0, 264.0], [13.0, 255.0], [14.0, 260.0], [15.0, 275.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[11.4, 270.0666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[10.0, 322.0], [5.0, 522.0], [11.0, 383.0], [12.0, 481.0], [6.0, 509.0], [13.0, 379.5], [14.0, 418.3333333333333], [15.0, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[11.4, 402.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 15.0, "title": "Time VS Threads"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    axisLabel: "Number of active threads",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response times in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: { noColumns: 2,show: true, container: '#legendTimeVsThreads' },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s: At %x.2 active threads, Average response time was %y.2 ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesTimeVsThreads"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotTimesVsThreads"), dataset, options);
            // setup overview
            $.plot($("#overviewTimesVsThreads"), dataset, prepareOverviewOptions(options));
        }
};

// Time vs threads
function refreshTimeVsThreads(){
    var infos = timeVsThreadsInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTimeVsThreads");
        return;
    }
    if(isGraph($("#flotTimesVsThreads"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTimeVsThreads");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTimesVsThreads", "#overviewTimesVsThreads");
        $('#footerTimeVsThreads .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var bytesThroughputOverTimeInfos = {
        data : {"result": {"minY": 2280.983333333333, "minX": 1.6639965E12, "maxY": 769038.65, "series": [{"data": [[1.6639965E12, 83567.56666666667], [1.66399662E12, 18999.5], [1.66399656E12, 769038.65]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6639965E12, 2280.983333333333], [1.66399662E12, 22681.9], [1.66399656E12, 18605.65]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399662E12, "title": "Bytes Throughput Over Time"}},
        getOptions : function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity) ,
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Bytes / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendBytesThroughputOverTime'
                },
                selection: {
                    mode: "xy"
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y"
                }
            };
        },
        createGraph : function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesBytesThroughputOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotBytesThroughputOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewBytesThroughputOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Bytes throughput Over Time
function refreshBytesThroughputOverTime(fixTimestamps) {
    var infos = bytesThroughputOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotBytesThroughputOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesBytesThroughputOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotBytesThroughputOverTime", "#overviewBytesThroughputOverTime");
        $('#footerBytesThroughputOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var responseTimesOverTimeInfos = {
        data: {"result": {"minY": 12.0, "minX": 1.6639965E12, "maxY": 48728.666666666664, "series": [{"data": [[1.66399662E12, 274.07142857142856], [1.66399656E12, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399662E12, 310.42857142857144], [1.66399656E12, 230.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399662E12, 369.35714285714283], [1.66399656E12, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399662E12, 279.7142857142857], [1.66399656E12, 228.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399662E12, 296.92857142857144], [1.66399656E12, 268.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399662E12, 497.35714285714283], [1.66399656E12, 240.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399662E12, 567.5], [1.66399656E12, 253.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399662E12, 490.4285714285714], [1.66399656E12, 258.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399662E12, 449.5], [1.66399656E12, 265.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399662E12, 462.85714285714283], [1.66399656E12, 227.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639965E12, 6737.333333333334], [1.66399656E12, 17772.555555555555]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639965E12, 6008.333333333333], [1.66399656E12, 10581.555555555555]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639965E12, 5676.000000000001], [1.66399656E12, 12684.875]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639965E12, 4923.5], [1.66399656E12, 15686.111111111113]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399656E12, 10423.4]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639965E12, 4388.5], [1.66399656E12, 3607.0769230769224]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639965E12, 2580.666666666667], [1.66399656E12, 6918.75]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.6639965E12, 1590.0], [1.66399656E12, 6673.076923076924]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639965E12, 7741.0], [1.66399656E12, 24423.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639965E12, 7654.0], [1.66399656E12, 13029.153846153846]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399662E12, 2004.4285714285718], [1.66399656E12, 1614.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399656E12, 2153.133333333333]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399662E12, 2145.3333333333335], [1.66399656E12, 2034.2222222222222]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399662E12, 381.0], [1.66399656E12, 430.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399662E12, 266.64285714285717], [1.66399656E12, 523.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399662E12, 724.3333333333334], [1.66399656E12, 424.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399662E12, 304.42857142857144], [1.66399656E12, 274.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399662E12, 342.2857142857143], [1.66399656E12, 267.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399662E12, 713.3333333333334], [1.66399656E12, 477.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399662E12, 751.3333333333334], [1.66399656E12, 285.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399662E12, 492.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399662E12, 389.6666666666667], [1.66399656E12, 271.5833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399662E12, 151.42857142857144], [1.66399656E12, 180.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399662E12, 463.0], [1.66399656E12, 461.41666666666674]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399662E12, 1295.6666666666665], [1.66399656E12, 464.16666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399662E12, 230.0], [1.66399656E12, 286.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399662E12, 333.2857142857143], [1.66399656E12, 250.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399662E12, 294.71428571428567], [1.66399656E12, 232.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399662E12, 237.33333333333334], [1.66399656E12, 266.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399662E12, 15.357142857142856], [1.66399656E12, 14.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399662E12, 244.33333333333334], [1.66399656E12, 261.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399662E12, 68.71428571428572], [1.66399656E12, 54.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399662E12, 273.2857142857142], [1.66399656E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399656E12, 48728.666666666664]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399662E12, 388.0714285714286], [1.66399656E12, 291.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399662E12, 335.7857142857143], [1.66399656E12, 231.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399662E12, 297.35714285714283], [1.66399656E12, 238.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399662E12, 321.6666666666667], [1.66399656E12, 267.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399662E12, 242.0], [1.66399656E12, 271.49999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399662E12, 335.3333333333333], [1.66399656E12, 244.83333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399662E12, 440.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399662E12, 428.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399662E12, 388.5333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399662E12, 437.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399662E12, 431.92857142857144], [1.66399656E12, 256.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399662E12, 2105.214285714286], [1.66399656E12, 1707.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399662E12, 289.93333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399662E12, 294.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399662E12, 242.86666666666662]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399662E12, 308.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399662E12, 271.53333333333336]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399662E12, 1978.3999999999999]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399662E12, 386.9333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399662E12, 308.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399662E12, 390.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399656E12, 48728.666666666664]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399662E12, 507.3333333333333], [1.66399656E12, 388.5833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399662E12, 318.6666666666667], [1.66399656E12, 341.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399662E12, 504.3333333333333], [1.66399656E12, 367.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399662E12, 629.3333333333334], [1.66399656E12, 358.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399662E12, 261.3333333333333], [1.66399656E12, 299.25000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399662E12, 511.0], [1.66399656E12, 423.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399662E12, 550.0], [1.66399656E12, 458.50000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399662E12, 179.66666666666666], [1.66399656E12, 176.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399662E12, 18.666666666666668], [1.66399656E12, 18.833333333333336]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399662E12, 178.33333333333334], [1.66399656E12, 130.08333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639965E12, 4189.0], [1.66399656E12, 2349.6923076923076]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639965E12, 2624.0], [1.66399656E12, 1927.8461538461538]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399656E12, 6462.466666666666]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399662E12, 2913.3333333333335], [1.66399656E12, 1963.0833333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399662E12, 104.85714285714286], [1.66399656E12, 55.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399662E12, 426.4285714285714], [1.66399656E12, 236.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399662E12, 395.5], [1.66399656E12, 224.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399662E12, 336.92857142857144], [1.66399656E12, 249.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399662E12, 447.8571428571429], [1.66399656E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399662E12, 171.49999999999997], [1.66399656E12, 165.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399662E12, 18.428571428571427], [1.66399656E12, 12.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.6639965E12, 1152.3846153846155], [1.66399656E12, 1949.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639965E12, 3522.1], [1.66399656E12, 17676.8]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.6639965E12, 1068.9166666666665], [1.66399656E12, 16233.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639965E12, 3261.8333333333335], [1.66399656E12, 11036.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399656E12, 43053.26666666667]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6639965E12, 2400.3599999999997], [1.66399656E12, 35222.54999999999]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6639965E12, 1367.9565217391305], [1.66399656E12, 1298.1363636363637]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639965E12, 2337.6190476190477], [1.66399656E12, 1907.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639965E12, 5601.545454545455], [1.66399656E12, 10003.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639965E12, 2641.7272727272725], [1.66399656E12, 15070.75]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399662E12, 379.7857142857143], [1.66399656E12, 230.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399662E12, 269.7142857142857], [1.66399656E12, 275.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399662E12, 411.64285714285717], [1.66399656E12, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399662E12, "title": "Response Time Over Time"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average response time was %y ms"
                }
            };
        },
        createGraph: function() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Times Over Time
function refreshResponseTimeOverTime(fixTimestamps) {
    var infos = responseTimesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyResponseTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimesOverTime"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimesOverTime", "#overviewResponseTimesOverTime");
        $('#footerResponseTimesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var latenciesOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6639965E12, "maxY": 10485.4, "series": [{"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639965E12, 865.8333333333334], [1.66399656E12, 2238.444444444445]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639965E12, 557.8333333333334], [1.66399656E12, 1767.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639965E12, 787.7142857142858], [1.66399656E12, 2279.25]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639965E12, 1079.3333333333333], [1.66399656E12, 2018.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399656E12, 2332.9333333333334]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639965E12, 939.5], [1.66399656E12, 1920.3076923076926]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639965E12, 1120.6666666666665], [1.66399656E12, 3899.25]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.6639965E12, 511.5], [1.66399656E12, 2346.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639965E12, 336.0], [1.66399656E12, 3430.3846153846152]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639965E12, 343.5], [1.66399656E12, 1254.6923076923078]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399662E12, 388.0714285714286], [1.66399656E12, 291.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399656E12, 441.0666666666667]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399662E12, 361.5], [1.66399656E12, 429.55555555555554]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399662E12, 159.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399662E12, 272.3571428571429], [1.66399656E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399656E12, 1400.4666666666665]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399662E12, 388.0714285714286], [1.66399656E12, 291.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399662E12, 411.64285714285717], [1.66399656E12, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399662E12, 381.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399656E12, 1400.4666666666665]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399662E12, 261.0], [1.66399656E12, 262.41666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399662E12, 511.0], [1.66399656E12, 423.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639965E12, 1724.0], [1.66399656E12, 2195.153846153846]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639965E12, 2624.0], [1.66399656E12, 1581.6923076923076]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399656E12, 2446.4666666666667]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399662E12, 511.0], [1.66399656E12, 423.58333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.6639965E12, 1152.3076923076924], [1.66399656E12, 1414.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639965E12, 875.2999999999998], [1.66399656E12, 10485.4]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.6639965E12, 454.0], [1.66399656E12, 1590.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639965E12, 1451.8333333333333], [1.66399656E12, 9950.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399656E12, 910.9333333333332]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6639965E12, 1370.4400000000003], [1.66399656E12, 1207.9]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6639965E12, 1110.0434782608693], [1.66399656E12, 932.0454545454545]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639965E12, 1566.7142857142856], [1.66399656E12, 1467.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639965E12, 1596.1818181818182], [1.66399656E12, 2520.25]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639965E12, 1431.0], [1.66399656E12, 2394.25]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399662E12, 269.7142857142857], [1.66399656E12, 275.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399662E12, 411.64285714285717], [1.66399656E12, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399662E12, "title": "Latencies Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average response latencies in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendLatenciesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average latency was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesLatenciesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotLatenciesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewLatenciesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Latencies Over Time
function refreshLatenciesOverTime(fixTimestamps) {
    var infos = latenciesOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyLatenciesOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotLatenciesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesLatenciesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotLatenciesOverTime", "#overviewLatenciesOverTime");
        $('#footerLatenciesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var connectTimeOverTimeInfos = {
        data: {"result": {"minY": 0.0, "minX": 1.6639965E12, "maxY": 9749.333333333334, "series": [{"data": [[1.66399662E12, 17.214285714285715], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399662E12, 70.92857142857143], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399662E12, 18.35714285714286], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399662E12, 50.14285714285714], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399662E12, 246.07142857142856], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399662E12, 209.85714285714283], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399662E12, 230.42857142857142], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399662E12, 174.57142857142858], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399662E12, 192.78571428571428], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639965E12, 369.5], [1.66399656E12, 38.22222222222222]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639965E12, 42.33333333333333], [1.66399656E12, 686.5555555555554]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639965E12, 93.99999999999999], [1.66399656E12, 522.75]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639965E12, 100.5], [1.66399656E12, 509.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 61.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 1786.5833333333333]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 2082.692307692308]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 107.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399662E12, 40.57142857142857], [1.66399656E12, 0.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399656E12, 174.19999999999996]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399662E12, 82.66666666666666], [1.66399656E12, 156.88888888888886]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399662E12, 116.0], [1.66399656E12, 185.33333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399662E12, 16.857142857142858], [1.66399656E12, 266.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399662E12, 488.33333333333337], [1.66399656E12, 182.91666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399662E12, 53.71428571428572], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399662E12, 107.64285714285715], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399662E12, 254.66666666666666], [1.66399656E12, 227.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399662E12, 160.66666666666666], [1.66399656E12, 39.24999999999999]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399662E12, 241.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399662E12, 156.0], [1.66399656E12, 21.333333333333336]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399662E12, 93.21428571428571], [1.66399656E12, 127.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399662E12, 190.66666666666669], [1.66399656E12, 219.16666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399662E12, 161.0], [1.66399656E12, 219.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 42.58333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399662E12, 86.64285714285714], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399662E12, 52.142857142857146], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 20.750000000000004]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399662E12, 0.35714285714285715], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 19.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399662E12, 8.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399656E12, 963.8666666666666]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399662E12, 40.57142857142857], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399662E12, 86.85714285714285], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399662E12, 51.64285714285714], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399662E12, 82.66666666666667], [1.66399656E12, 20.166666666666668]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 22.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399662E12, 82.66666666666667], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399662E12, 194.13333333333335]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399662E12, 187.39999999999998]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399662E12, 142.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399662E12, 192.26666666666668]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399662E12, 187.57142857142856], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399662E12, 136.28571428571428], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399662E12, 33.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399662E12, 49.26666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399662E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399662E12, 63.599999999999994]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399662E12, 24.266666666666662]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399662E12, 37.86666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399662E12, 35.13333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399662E12, 15.066666666666674]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399662E12, 34.73333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399656E12, 963.8666666666666]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399662E12, 237.66666666666666], [1.66399656E12, 143.41666666666669]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399662E12, 79.66666666666667], [1.66399656E12, 100.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399662E12, 237.0], [1.66399656E12, 121.08333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399662E12, 164.66666666666669], [1.66399656E12, 121.83333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399662E12, 239.66666666666666], [1.66399656E12, 157.83333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399662E12, 265.3333333333333], [1.66399656E12, 208.58333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399662E12, 125.0], [1.66399656E12, 121.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399662E12, 6.666666666666667], [1.66399656E12, 3.333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399662E12, 123.0], [1.66399656E12, 72.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 748.3846153846154]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639965E12, 0.0], [1.66399656E12, 689.3076923076922]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399656E12, 811.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399662E12, 239.66666666666666], [1.66399656E12, 157.83333333333331]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399662E12, 40.99999999999999], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399662E12, 182.5], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399662E12, 145.78571428571428], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399662E12, 92.64285714285715], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399662E12, 225.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399662E12, 116.35714285714286], [1.66399656E12, 113.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399662E12, 2.0714285714285716], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.6639965E12, 476.1538461538462], [1.66399656E12, 829.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639965E12, 728.0999999999999], [1.66399656E12, 8954.6]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.6639965E12, 314.08333333333337], [1.66399656E12, 1116.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639965E12, 1168.8333333333333], [1.66399656E12, 9749.333333333334]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399656E12, 283.1333333333333]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6639965E12, 653.9599999999999], [1.66399656E12, 359.79999999999995]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6639965E12, 285.52173913043475], [1.66399656E12, 568.2272727272727]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639965E12, 426.6666666666667], [1.66399656E12, 846.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639965E12, 585.4545454545455], [1.66399656E12, 502.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639965E12, 565.1818181818181], [1.66399656E12, 501.74999999999994]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399662E12, 134.92857142857144], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399662E12, 0.0], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399662E12, 136.28571428571428], [1.66399656E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399662E12, "title": "Connect Time Over Time"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getConnectTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Average Connect Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendConnectTimeOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Average connect time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesConnectTimeOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotConnectTimeOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewConnectTimeOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Connect Time Over Time
function refreshConnectTimeOverTime(fixTimestamps) {
    var infos = connectTimeOverTimeInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyConnectTimeOverTime");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotConnectTimeOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesConnectTimeOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotConnectTimeOverTime", "#overviewConnectTimeOverTime");
        $('#footerConnectTimeOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var responseTimePercentilesOverTimeInfos = {
        data: {"result": {"minY": 9.0, "minX": 1.6639965E12, "maxY": 53213.0, "series": [{"data": [[1.6639965E12, 14621.0], [1.66399662E12, 3800.0], [1.66399656E12, 53213.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6639965E12, 7553.3], [1.66399662E12, 534.8000000000001], [1.66399656E12, 23219.60000000002]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6639965E12, 13414.670000000013], [1.66399662E12, 2378.2800000000025], [1.66399656E12, 49884.38000000001]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6639965E12, 9791.649999999998], [1.66399662E12, 1172.3999999999996], [1.66399656E12, 44143.8]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6639965E12, 18.0], [1.66399662E12, 10.0], [1.66399656E12, 9.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6639965E12, 1770.5], [1.66399662E12, 263.0], [1.66399656E12, 504.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399662E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true,
                        fill: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Response Time in ms",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: '#legendResponseTimePercentilesOverTime'
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s : at %x Response time was %y ms"
                }
            };
        },
        createGraph: function () {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesResponseTimePercentilesOverTime"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotResponseTimePercentilesOverTime"), dataset, options);
            // setup overview
            $.plot($("#overviewResponseTimePercentilesOverTime"), dataset, prepareOverviewOptions(options));
        }
};

// Response Time Percentiles Over Time
function refreshResponseTimePercentilesOverTime(fixTimestamps) {
    var infos = responseTimePercentilesOverTimeInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotResponseTimePercentilesOverTime"))) {
        infos.createGraph();
    }else {
        var choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimePercentilesOverTime", "#overviewResponseTimePercentilesOverTime");
        $('#footerResponseTimePercentilesOverTime .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var responseTimeVsRequestInfos = {
    data: {"result": {"minY": 194.0, "minX": 1.0, "maxY": 67155.5, "series": [{"data": [[2.0, 7445.5], [35.0, 264.0], [37.0, 258.0], [36.0, 250.0], [40.0, 265.5], [41.0, 253.0], [45.0, 261.5], [3.0, 5767.0], [51.0, 250.0], [62.0, 269.0], [4.0, 7804.0], [5.0, 867.5], [6.0, 1911.5], [7.0, 1734.0], [8.0, 1591.5], [9.0, 1754.0], [10.0, 1961.5], [11.0, 555.0], [12.0, 475.0], [13.0, 620.0], [14.0, 659.5], [15.0, 469.0], [16.0, 489.0], [1.0, 47593.0], [18.0, 454.5], [19.0, 263.0], [20.0, 282.0], [21.0, 254.5], [22.0, 266.5], [23.0, 260.5], [24.0, 255.5], [26.0, 360.5], [27.0, 242.0], [29.0, 249.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 67155.5], [35.0, 1869.0], [19.0, 1263.5], [45.0, 194.0], [51.0, 399.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Response Time Vs Request"}},
    getOptions: function() {
        return {
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Response Time in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: {
                noColumns: 2,
                show: true,
                container: '#legendResponseTimeVsRequest'
            },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median response time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesResponseTimeVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotResponseTimeVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewResponseTimeVsRequest"), dataset, prepareOverviewOptions(options));

    }
};

// Response Time vs Request
function refreshResponseTimeVsRequest() {
    var infos = responseTimeVsRequestInfos;
    prepareSeries(infos.data);
    if (isGraph($("#flotResponseTimeVsRequest"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesResponseTimeVsRequest");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotResponseTimeVsRequest", "#overviewResponseTimeVsRequest");
        $('#footerResponseRimeVsRequest .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};


var latenciesVsRequestInfos = {
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 2091.0, "series": [{"data": [[2.0, 332.0], [35.0, 0.0], [37.0, 0.0], [36.0, 0.0], [40.0, 0.0], [41.0, 0.0], [45.0, 0.0], [3.0, 906.5], [51.0, 0.0], [62.0, 0.0], [4.0, 697.0], [5.0, 536.5], [6.0, 621.5], [7.0, 410.5], [8.0, 736.0], [9.0, 669.0], [10.0, 736.5], [11.0, 327.5], [12.0, 0.0], [13.0, 0.0], [14.0, 349.5], [15.0, 0.0], [16.0, 0.0], [1.0, 2091.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [26.0, 0.0], [27.0, 0.0], [29.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[2.0, 1156.0], [35.0, 328.0], [19.0, 261.0], [45.0, 0.0], [51.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 62.0, "title": "Latencies Vs Request"}},
    getOptions: function() {
        return{
            series: {
                lines: {
                    show: false
                },
                points: {
                    show: true
                }
            },
            xaxis: {
                axisLabel: "Global number of requests per second",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            yaxis: {
                axisLabel: "Median Latency in ms",
                axisLabelUseCanvas: true,
                axisLabelFontSizePixels: 12,
                axisLabelFontFamily: 'Verdana, Arial',
                axisLabelPadding: 20,
            },
            legend: { noColumns: 2,show: true, container: '#legendLatencyVsRequest' },
            selection: {
                mode: 'xy'
            },
            grid: {
                hoverable: true // IMPORTANT! this is needed for tooltip to work
            },
            tooltip: true,
            tooltipOpts: {
                content: "%s : Median Latency time at %x req/s was %y ms"
            },
            colors: ["#9ACD32", "#FF6347"]
        };
    },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesLatencyVsRequest"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotLatenciesVsRequest"), dataset, options);
        // setup overview
        $.plot($("#overviewLatenciesVsRequest"), dataset, prepareOverviewOptions(options));
    }
};

// Latencies vs Request
function refreshLatenciesVsRequest() {
        var infos = latenciesVsRequestInfos;
        prepareSeries(infos.data);
        if(isGraph($("#flotLatenciesVsRequest"))){
            infos.createGraph();
        }else{
            var choiceContainer = $("#choicesLatencyVsRequest");
            createLegend(choiceContainer, infos);
            infos.createGraph();
            setGraphZoomable("#flotLatenciesVsRequest", "#overviewLatenciesVsRequest");
            $('#footerLatenciesVsRequest .legendColorBox > div').each(function(i){
                $(this).clone().prependTo(choiceContainer.find("li").eq(i));
            });
        }
};

var hitsPerSecondInfos = {
        data: {"result": {"minY": 4.9, "minX": 1.6639965E12, "maxY": 12.516666666666667, "series": [{"data": [[1.6639965E12, 4.9], [1.66399662E12, 12.516666666666667], [1.66399656E12, 7.833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399662E12, "title": "Hits Per Second"}},
        getOptions: function() {
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of hits / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendHitsPerSecond"
                },
                selection: {
                    mode : 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y.2 hits/sec"
                }
            };
        },
        createGraph: function createGraph() {
            var data = this.data;
            var dataset = prepareData(data.result.series, $("#choicesHitsPerSecond"));
            var options = this.getOptions();
            prepareOptions(options, data);
            $.plot($("#flotHitsPerSecond"), dataset, options);
            // setup overview
            $.plot($("#overviewHitsPerSecond"), dataset, prepareOverviewOptions(options));
        }
};

// Hits per second
function refreshHitsPerSecond(fixTimestamps) {
    var infos = hitsPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if (isGraph($("#flotHitsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesHitsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotHitsPerSecond", "#overviewHitsPerSecond");
        $('#footerHitsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
}

var codesPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6639965E12, "maxY": 10.983333333333333, "series": [{"data": [[1.6639965E12, 2.716666666666667], [1.66399662E12, 1.0666666666666667], [1.66399656E12, 4.716666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6639965E12, 0.25], [1.66399662E12, 0.5166666666666667], [1.66399656E12, 0.23333333333333334]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66399662E12, 10.983333333333333], [1.66399656E12, 4.683333333333334]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}, {"data": [[1.66399662E12, 0.06666666666666667]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399662E12, "title": "Codes Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of responses / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendCodesPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "Number of Response Codes %s at %x was %y.2 responses / sec"
                }
            };
        },
    createGraph: function() {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesCodesPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotCodesPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewCodesPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Codes per second
function refreshCodesPerSecond(fixTimestamps) {
    var infos = codesPerSecondInfos;
    prepareSeries(infos.data);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotCodesPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesCodesPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotCodesPerSecond", "#overviewCodesPerSecond");
        $('#footerCodesPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var transactionsPerSecondInfos = {
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.6639965E12, "maxY": 0.4166666666666667, "series": [{"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.6639965E12, 0.4166666666666667], [1.66399656E12, 0.3333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66399662E12, 0.21666666666666667], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.6639965E12, 0.18333333333333332], [1.66399656E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "Dashboard-failure", "isController": true}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-failure", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.6639965E12, 0.2], [1.66399656E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66399662E12, 0.2], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66399656E12, 0.23333333333333334]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.6639965E12, 0.11666666666666667], [1.66399656E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66399662E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-failure", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.6639965E12, 0.38333333333333336], [1.66399656E12, 0.36666666666666664]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66399656E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.6639965E12, 0.21666666666666667], [1.66399656E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-failure", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-14-failure", "isController": false}, {"data": [[1.66399662E12, 0.03333333333333333]], "isOverall": false, "label": "Teplate-failure", "isController": true}, {"data": [[1.66399656E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66399662E12, 0.21666666666666667], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66399656E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.6639965E12, 0.1], [1.66399656E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66399656E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66399656E12, 0.25]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-failure", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.6639965E12, 0.35], [1.66399656E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.6639965E12, 0.16666666666666666], [1.66399656E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66399662E12, 0.06666666666666667], [1.66399656E12, 0.15]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.6639965E12, 0.1], [1.66399656E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.6639965E12, 0.03333333333333333], [1.66399656E12, 0.21666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-failure", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66399662E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.6639965E12, 0.18333333333333332], [1.66399656E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66399662E12, 0.21666666666666667], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.6639965E12, 0.1], [1.66399656E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.6639965E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-failure", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.6639965E12, 0.2], [1.66399656E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66399662E12, 0.05], [1.66399656E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66399662E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66399662E12, 0.23333333333333334], [1.66399656E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399662E12, "title": "Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTransactionsPerSecond"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                }
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTransactionsPerSecond"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTransactionsPerSecond"), dataset, options);
        // setup overview
        $.plot($("#overviewTransactionsPerSecond"), dataset, prepareOverviewOptions(options));
    }
};

// Transactions per second
function refreshTransactionsPerSecond(fixTimestamps) {
    var infos = transactionsPerSecondInfos;
    prepareSeries(infos.data);
    if(infos.data.result.series.length == 0) {
        setEmptyGraph("#bodyTransactionsPerSecond");
        return;
    }
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTransactionsPerSecond"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTransactionsPerSecond");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTransactionsPerSecond", "#overviewTransactionsPerSecond");
        $('#footerTransactionsPerSecond .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

var totalTPSInfos = {
        data: {"result": {"minY": 0.05, "minX": 1.6639965E12, "maxY": 12.8, "series": [{"data": [[1.6639965E12, 2.966666666666667], [1.66399662E12, 12.8], [1.66399656E12, 10.266666666666667]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66399662E12, 0.16666666666666666], [1.66399656E12, 0.05]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399662E12, "title": "Total Transactions Per Second"}},
        getOptions: function(){
            return {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    mode: "time",
                    timeformat: getTimeFormat(this.data.result.granularity),
                    axisLabel: getElapsedTimeLabel(this.data.result.granularity),
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20,
                },
                yaxis: {
                    axisLabel: "Number of transactions / sec",
                    axisLabelUseCanvas: true,
                    axisLabelFontSizePixels: 12,
                    axisLabelFontFamily: 'Verdana, Arial',
                    axisLabelPadding: 20
                },
                legend: {
                    noColumns: 2,
                    show: true,
                    container: "#legendTotalTPS"
                },
                selection: {
                    mode: 'xy'
                },
                grid: {
                    hoverable: true // IMPORTANT! this is needed for tooltip to
                                    // work
                },
                tooltip: true,
                tooltipOpts: {
                    content: "%s at %x was %y transactions / sec"
                },
                colors: ["#9ACD32", "#FF6347"]
            };
        },
    createGraph: function () {
        var data = this.data;
        var dataset = prepareData(data.result.series, $("#choicesTotalTPS"));
        var options = this.getOptions();
        prepareOptions(options, data);
        $.plot($("#flotTotalTPS"), dataset, options);
        // setup overview
        $.plot($("#overviewTotalTPS"), dataset, prepareOverviewOptions(options));
    }
};

// Total Transactions per second
function refreshTotalTPS(fixTimestamps) {
    var infos = totalTPSInfos;
    // We want to ignore seriesFilter
    prepareSeries(infos.data, false, true);
    if(fixTimestamps) {
        fixTimeStamps(infos.data.result.series, 21600000);
    }
    if(isGraph($("#flotTotalTPS"))){
        infos.createGraph();
    }else{
        var choiceContainer = $("#choicesTotalTPS");
        createLegend(choiceContainer, infos);
        infos.createGraph();
        setGraphZoomable("#flotTotalTPS", "#overviewTotalTPS");
        $('#footerTotalTPS .legendColorBox > div').each(function(i){
            $(this).clone().prependTo(choiceContainer.find("li").eq(i));
        });
    }
};

// Collapse the graph matching the specified DOM element depending the collapsed
// status
function collapse(elem, collapsed){
    if(collapsed){
        $(elem).parent().find(".fa-chevron-up").removeClass("fa-chevron-up").addClass("fa-chevron-down");
    } else {
        $(elem).parent().find(".fa-chevron-down").removeClass("fa-chevron-down").addClass("fa-chevron-up");
        if (elem.id == "bodyBytesThroughputOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshBytesThroughputOverTime(true);
            }
            document.location.href="#bytesThroughputOverTime";
        } else if (elem.id == "bodyLatenciesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesOverTime(true);
            }
            document.location.href="#latenciesOverTime";
        } else if (elem.id == "bodyCustomGraph") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCustomGraph(true);
            }
            document.location.href="#responseCustomGraph";
        } else if (elem.id == "bodyConnectTimeOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshConnectTimeOverTime(true);
            }
            document.location.href="#connectTimeOverTime";
        } else if (elem.id == "bodyResponseTimePercentilesOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimePercentilesOverTime(true);
            }
            document.location.href="#responseTimePercentilesOverTime";
        } else if (elem.id == "bodyResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeDistribution();
            }
            document.location.href="#responseTimeDistribution" ;
        } else if (elem.id == "bodySyntheticResponseTimeDistribution") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshSyntheticResponseTimeDistribution();
            }
            document.location.href="#syntheticResponseTimeDistribution" ;
        } else if (elem.id == "bodyActiveThreadsOverTime") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshActiveThreadsOverTime(true);
            }
            document.location.href="#activeThreadsOverTime";
        } else if (elem.id == "bodyTimeVsThreads") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTimeVsThreads();
            }
            document.location.href="#timeVsThreads" ;
        } else if (elem.id == "bodyCodesPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshCodesPerSecond(true);
            }
            document.location.href="#codesPerSecond";
        } else if (elem.id == "bodyTransactionsPerSecond") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTransactionsPerSecond(true);
            }
            document.location.href="#transactionsPerSecond";
        } else if (elem.id == "bodyTotalTPS") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshTotalTPS(true);
            }
            document.location.href="#totalTPS";
        } else if (elem.id == "bodyResponseTimeVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshResponseTimeVsRequest();
            }
            document.location.href="#responseTimeVsRequest";
        } else if (elem.id == "bodyLatenciesVsRequest") {
            if (isGraph($(elem).find('.flot-chart-content')) == false) {
                refreshLatenciesVsRequest();
            }
            document.location.href="#latencyVsRequest";
        }
    }
}

/*
 * Activates or deactivates all series of the specified graph (represented by id parameter)
 * depending on checked argument.
 */
function toggleAll(id, checked){
    var placeholder = document.getElementById(id);

    var cases = $(placeholder).find(':checkbox');
    cases.prop('checked', checked);
    $(cases).parent().children().children().toggleClass("legend-disabled", !checked);

    var choiceContainer;
    if ( id == "choicesBytesThroughputOverTime"){
        choiceContainer = $("#choicesBytesThroughputOverTime");
        refreshBytesThroughputOverTime(false);
    } else if(id == "choicesResponseTimesOverTime"){
        choiceContainer = $("#choicesResponseTimesOverTime");
        refreshResponseTimeOverTime(false);
    }else if(id == "choicesResponseCustomGraph"){
        choiceContainer = $("#choicesResponseCustomGraph");
        refreshCustomGraph(false);
    } else if ( id == "choicesLatenciesOverTime"){
        choiceContainer = $("#choicesLatenciesOverTime");
        refreshLatenciesOverTime(false);
    } else if ( id == "choicesConnectTimeOverTime"){
        choiceContainer = $("#choicesConnectTimeOverTime");
        refreshConnectTimeOverTime(false);
    } else if ( id == "choicesResponseTimePercentilesOverTime"){
        choiceContainer = $("#choicesResponseTimePercentilesOverTime");
        refreshResponseTimePercentilesOverTime(false);
    } else if ( id == "choicesResponseTimePercentiles"){
        choiceContainer = $("#choicesResponseTimePercentiles");
        refreshResponseTimePercentiles();
    } else if(id == "choicesActiveThreadsOverTime"){
        choiceContainer = $("#choicesActiveThreadsOverTime");
        refreshActiveThreadsOverTime(false);
    } else if ( id == "choicesTimeVsThreads"){
        choiceContainer = $("#choicesTimeVsThreads");
        refreshTimeVsThreads();
    } else if ( id == "choicesSyntheticResponseTimeDistribution"){
        choiceContainer = $("#choicesSyntheticResponseTimeDistribution");
        refreshSyntheticResponseTimeDistribution();
    } else if ( id == "choicesResponseTimeDistribution"){
        choiceContainer = $("#choicesResponseTimeDistribution");
        refreshResponseTimeDistribution();
    } else if ( id == "choicesHitsPerSecond"){
        choiceContainer = $("#choicesHitsPerSecond");
        refreshHitsPerSecond(false);
    } else if(id == "choicesCodesPerSecond"){
        choiceContainer = $("#choicesCodesPerSecond");
        refreshCodesPerSecond(false);
    } else if ( id == "choicesTransactionsPerSecond"){
        choiceContainer = $("#choicesTransactionsPerSecond");
        refreshTransactionsPerSecond(false);
    } else if ( id == "choicesTotalTPS"){
        choiceContainer = $("#choicesTotalTPS");
        refreshTotalTPS(false);
    } else if ( id == "choicesResponseTimeVsRequest"){
        choiceContainer = $("#choicesResponseTimeVsRequest");
        refreshResponseTimeVsRequest();
    } else if ( id == "choicesLatencyVsRequest"){
        choiceContainer = $("#choicesLatencyVsRequest");
        refreshLatenciesVsRequest();
    }
    var color = checked ? "black" : "#818181";
    if(choiceContainer != null) {
        choiceContainer.find("label").each(function(){
            this.style.color = color;
        });
    }
}
