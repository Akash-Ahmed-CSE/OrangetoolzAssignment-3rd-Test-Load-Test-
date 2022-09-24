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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 15.0, "series": [{"data": [[300.0, 3.0], [200.0, 10.0], [800.0, 1.0], [1600.0, 1.0], [400.0, 1.0], [900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [600.0, 1.0], [2500.0, 1.0], [200.0, 11.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [200.0, 12.0], [400.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 1.0], [300.0, 1.0], [200.0, 13.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [1300.0, 1.0], [200.0, 12.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [2900.0, 1.0], [200.0, 5.0], [400.0, 2.0], [500.0, 6.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [600.0, 1.0], [1400.0, 1.0], [400.0, 3.0], [200.0, 1.0], [1700.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[600.0, 6.0], [400.0, 4.0], [200.0, 1.0], [500.0, 6.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[600.0, 6.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [200.0, 2.0], [400.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 4.0], [700.0, 1.0], [1400.0, 1.0], [200.0, 3.0], [800.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[8600.0, 1.0], [33600.0, 1.0], [32900.0, 1.0], [9600.0, 1.0], [10800.0, 1.0], [49200.0, 1.0], [13300.0, 1.0], [17400.0, 1.0], [16600.0, 1.0], [17900.0, 2.0], [22000.0, 1.0], [23000.0, 1.0], [24500.0, 1.0], [23600.0, 1.0], [25000.0, 1.0], [27300.0, 1.0], [28800.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[9300.0, 1.0], [11000.0, 1.0], [11700.0, 1.0], [3100.0, 1.0], [15000.0, 1.0], [17000.0, 2.0], [4400.0, 1.0], [18000.0, 2.0], [19400.0, 1.0], [21300.0, 1.0], [5400.0, 1.0], [25300.0, 1.0], [6600.0, 1.0], [27400.0, 1.0], [27100.0, 1.0], [7000.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[9700.0, 1.0], [2700.0, 1.0], [44100.0, 1.0], [11300.0, 1.0], [12400.0, 1.0], [13300.0, 1.0], [14700.0, 1.0], [3800.0, 1.0], [4100.0, 1.0], [4200.0, 1.0], [4400.0, 1.0], [18600.0, 1.0], [5200.0, 2.0], [22200.0, 1.0], [5500.0, 1.0], [6300.0, 1.0], [26400.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[34600.0, 1.0], [8700.0, 1.0], [9300.0, 1.0], [10600.0, 1.0], [11400.0, 1.0], [3100.0, 2.0], [12900.0, 1.0], [13300.0, 1.0], [13700.0, 1.0], [3500.0, 1.0], [14200.0, 1.0], [4600.0, 1.0], [74500.0, 1.0], [5200.0, 1.0], [5300.0, 1.0], [6400.0, 1.0], [6700.0, 1.0], [32700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8700.0, 1.0], [9700.0, 1.0], [9900.0, 1.0], [10800.0, 1.0], [46200.0, 1.0], [12300.0, 1.0], [14400.0, 1.0], [15600.0, 1.0], [16500.0, 1.0], [16400.0, 2.0], [18000.0, 1.0], [18300.0, 1.0], [4500.0, 1.0], [21000.0, 1.0], [6200.0, 1.0], [24900.0, 1.0], [7000.0, 1.0], [28900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[9700.0, 1.0], [10600.0, 1.0], [11900.0, 1.0], [12300.0, 1.0], [3200.0, 1.0], [13800.0, 2.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [1000.0, 1.0], [4600.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [6300.0, 1.0], [1700.0, 1.0], [7400.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[2300.0, 1.0], [9600.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [3000.0, 1.0], [3400.0, 1.0], [14800.0, 1.0], [3800.0, 1.0], [4200.0, 1.0], [17600.0, 1.0], [1300.0, 2.0], [6100.0, 1.0], [25500.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[9100.0, 1.0], [10600.0, 1.0], [2900.0, 2.0], [12300.0, 1.0], [12500.0, 1.0], [13400.0, 1.0], [14300.0, 1.0], [3900.0, 1.0], [17600.0, 1.0], [5100.0, 1.0], [4900.0, 1.0], [5500.0, 1.0], [6000.0, 1.0], [1600.0, 1.0], [6600.0, 1.0], [1700.0, 1.0], [111200.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[34500.0, 1.0], [32900.0, 1.0], [33300.0, 1.0], [35500.0, 1.0], [41600.0, 1.0], [43100.0, 1.0], [10800.0, 1.0], [11100.0, 1.0], [46400.0, 1.0], [51300.0, 1.0], [16900.0, 1.0], [17600.0, 1.0], [22100.0, 1.0], [23500.0, 1.0], [24300.0, 1.0], [23700.0, 1.0], [24200.0, 1.0], [29900.0, 1.0], [31800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[8800.0, 1.0], [9500.0, 1.0], [3000.0, 1.0], [12600.0, 1.0], [12700.0, 2.0], [13000.0, 1.0], [13600.0, 1.0], [15400.0, 1.0], [16200.0, 1.0], [16800.0, 2.0], [17000.0, 1.0], [22600.0, 1.0], [24500.0, 1.0], [24300.0, 1.0], [6300.0, 1.0], [7000.0, 1.0], [7200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2100.0, 1.0], [3300.0, 2.0], [3400.0, 1.0], [3600.0, 1.0], [3900.0, 2.0], [4000.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [4800.0, 1.0], [5100.0, 1.0], [5300.0, 1.0], [5400.0, 1.0], [1500.0, 3.0], [1600.0, 1.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [35500.0, 1.0], [2900.0, 1.0], [11700.0, 1.0], [45900.0, 1.0], [3500.0, 1.0], [14400.0, 1.0], [3600.0, 1.0], [5300.0, 1.0], [6100.0, 1.0], [24800.0, 1.0], [6600.0, 1.0], [6500.0, 1.0], [6800.0, 1.0], [7800.0, 1.0], [8100.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[8500.0, 1.0], [2200.0, 1.0], [11200.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3700.0, 1.0], [4000.0, 1.0], [4200.0, 1.0], [4100.0, 1.0], [5200.0, 1.0], [5300.0, 1.0], [5500.0, 1.0], [1400.0, 1.0], [5800.0, 1.0], [24500.0, 1.0], [6600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1100.0, 2.0], [300.0, 1.0], [600.0, 2.0], [1400.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [400.0, 3.0], [1600.0, 1.0], [200.0, 1.0], [1900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[300.0, 5.0], [1300.0, 2.0], [200.0, 11.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[4400.0, 1.0], [9400.0, 1.0], [600.0, 2.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [3000.0, 1.0], [200.0, 4.0], [400.0, 2.0], [3500.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[300.0, 5.0], [200.0, 10.0], [400.0, 1.0], [900.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[300.0, 3.0], [600.0, 2.0], [700.0, 1.0], [200.0, 9.0], [800.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 4.0], [1400.0, 1.0], [400.0, 5.0], [1600.0, 3.0], [3700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[300.0, 8.0], [200.0, 5.0], [3400.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [1600.0, 1.0], [400.0, 2.0], [200.0, 3.0], [3700.0, 1.0], [3600.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[300.0, 5.0], [600.0, 2.0], [1300.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [200.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 3.0], [600.0, 1.0], [300.0, 1.0], [200.0, 2.0], [400.0, 2.0], [100.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [2500.0, 1.0], [1300.0, 3.0], [700.0, 3.0], [1500.0, 1.0], [400.0, 1.0], [200.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [300.0, 2.0], [2700.0, 1.0], [1400.0, 1.0], [2800.0, 1.0], [700.0, 1.0], [200.0, 4.0], [400.0, 2.0], [30700.0, 1.0], [500.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[0.0, 1.0], [2200.0, 1.0], [300.0, 6.0], [1500.0, 2.0], [200.0, 7.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[2100.0, 1.0], [300.0, 3.0], [600.0, 1.0], [200.0, 9.0], [400.0, 2.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[300.0, 4.0], [2400.0, 1.0], [3100.0, 1.0], [200.0, 10.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1200.0, 1.0], [300.0, 5.0], [2800.0, 1.0], [200.0, 5.0], [1600.0, 2.0], [400.0, 1.0], [900.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 15.0], [300.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[300.0, 7.0], [2500.0, 1.0], [1300.0, 1.0], [200.0, 6.0], [1000.0, 1.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 11.0], [100.0, 5.0], [200.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[2600.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [1600.0, 3.0], [200.0, 9.0], [1700.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[179400.0, 1.0], [55900.0, 1.0], [57500.0, 1.0], [64200.0, 1.0], [73300.0, 1.0], [76400.0, 1.0], [78800.0, 1.0], [81000.0, 1.0], [80900.0, 1.0], [82500.0, 1.0], [85800.0, 1.0], [87200.0, 1.0], [89100.0, 1.0], [88200.0, 1.0], [89200.0, 1.0], [86100.0, 1.0], [88900.0, 1.0], [91700.0, 1.0], [127700.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 8.0], [1200.0, 1.0], [400.0, 2.0], [200.0, 4.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 10.0], [400.0, 2.0], [3300.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [2400.0, 1.0], [200.0, 9.0], [3300.0, 1.0], [400.0, 1.0], [900.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 1.0], [300.0, 5.0], [600.0, 1.0], [200.0, 7.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 1.0], [300.0, 5.0], [2800.0, 1.0], [400.0, 1.0], [200.0, 6.0], [3700.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 6.0], [600.0, 1.0], [1600.0, 2.0], [200.0, 7.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[600.0, 4.0], [300.0, 2.0], [1600.0, 1.0], [200.0, 5.0], [1700.0, 1.0], [1000.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 3.0], [2700.0, 1.0], [1500.0, 1.0], [200.0, 6.0], [1600.0, 1.0], [400.0, 3.0], [100.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 4.0], [600.0, 2.0], [1500.0, 1.0], [400.0, 2.0], [200.0, 6.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [300.0, 3.0], [200.0, 7.0], [400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 3.0], [2400.0, 1.0], [2600.0, 1.0], [1600.0, 2.0], [400.0, 3.0], [200.0, 4.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[8500.0, 1.0], [2200.0, 1.0], [11200.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [3200.0, 1.0], [3700.0, 1.0], [4000.0, 1.0], [4200.0, 1.0], [4100.0, 1.0], [5200.0, 1.0], [5300.0, 1.0], [5500.0, 1.0], [1400.0, 1.0], [5800.0, 1.0], [24500.0, 1.0], [6600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[300.0, 7.0], [200.0, 8.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 5.0], [1200.0, 1.0], [200.0, 9.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[300.0, 6.0], [400.0, 1.0], [200.0, 8.0], [800.0, 1.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[300.0, 5.0], [600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [200.0, 7.0], [900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[300.0, 7.0], [1200.0, 1.0], [1400.0, 1.0], [200.0, 7.0], [1800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2100.0, 1.0], [3300.0, 2.0], [3400.0, 1.0], [3600.0, 1.0], [3900.0, 2.0], [4000.0, 1.0], [4400.0, 1.0], [4700.0, 1.0], [4800.0, 1.0], [5100.0, 1.0], [5300.0, 1.0], [5400.0, 1.0], [1500.0, 3.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [1200.0, 1.0], [200.0, 11.0], [1600.0, 1.0], [3200.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[300.0, 4.0], [600.0, 1.0], [1200.0, 1.0], [200.0, 9.0], [2000.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 5.0], [200.0, 11.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[179400.0, 1.0], [55900.0, 1.0], [57500.0, 1.0], [64200.0, 1.0], [73300.0, 1.0], [76400.0, 1.0], [78800.0, 1.0], [81000.0, 1.0], [80900.0, 1.0], [82500.0, 1.0], [85800.0, 1.0], [87200.0, 1.0], [89100.0, 1.0], [88200.0, 1.0], [89200.0, 1.0], [86100.0, 1.0], [88900.0, 1.0], [91700.0, 1.0], [127700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 4.0], [2600.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [400.0, 5.0], [1600.0, 1.0], [1700.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 1.0], [600.0, 2.0], [700.0, 1.0], [1500.0, 2.0], [400.0, 2.0], [200.0, 2.0], [1600.0, 2.0], [1700.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[600.0, 3.0], [300.0, 2.0], [5300.0, 1.0], [700.0, 1.0], [200.0, 4.0], [400.0, 2.0], [1600.0, 1.0], [3600.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[4600.0, 1.0], [300.0, 4.0], [600.0, 2.0], [1400.0, 1.0], [700.0, 2.0], [1500.0, 1.0], [400.0, 2.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[4300.0, 1.0], [300.0, 3.0], [1400.0, 1.0], [10800.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [200.0, 8.0], [3200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [5300.0, 1.0], [700.0, 2.0], [1500.0, 3.0], [1600.0, 2.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[300.0, 1.0], [600.0, 5.0], [1200.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [44800.0, 1.0], [5500.0, 1.0], [400.0, 5.0], [3700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[600.0, 1.0], [1200.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [200.0, 3.0], [100.0, 6.0], [800.0, 1.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 12.0], [1100.0, 1.0], [200.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1200.0, 2.0], [21400.0, 1.0], [21500.0, 1.0], [5600.0, 1.0], [700.0, 1.0], [200.0, 5.0], [100.0, 5.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 8.0], [600.0, 4.0], [5300.0, 1.0], [700.0, 1.0], [6200.0, 1.0], [3300.0, 1.0], [7200.0, 1.0], [7300.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[8200.0, 1.0], [2200.0, 1.0], [300.0, 2.0], [4800.0, 1.0], [600.0, 7.0], [700.0, 1.0], [2900.0, 1.0], [5900.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[8400.0, 1.0], [8900.0, 2.0], [9400.0, 1.0], [10100.0, 1.0], [11200.0, 1.0], [2800.0, 1.0], [11300.0, 1.0], [12800.0, 1.0], [16100.0, 1.0], [4600.0, 1.0], [4800.0, 1.0], [5000.0, 1.0], [4900.0, 2.0], [6700.0, 1.0], [6900.0, 1.0], [8000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[2100.0, 1.0], [2200.0, 1.0], [35500.0, 1.0], [2900.0, 1.0], [11700.0, 1.0], [45900.0, 1.0], [3500.0, 1.0], [14400.0, 1.0], [3600.0, 1.0], [5300.0, 1.0], [6100.0, 1.0], [24800.0, 1.0], [6600.0, 1.0], [6500.0, 1.0], [6800.0, 1.0], [7800.0, 1.0], [8100.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 10.0], [1400.0, 1.0], [100.0, 4.0], [200.0, 1.0], [1900.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[300.0, 3.0], [600.0, 2.0], [2400.0, 1.0], [2500.0, 1.0], [200.0, 6.0], [400.0, 2.0], [1600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1100.0, 1.0], [600.0, 2.0], [300.0, 2.0], [2500.0, 1.0], [200.0, 8.0], [400.0, 2.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[300.0, 3.0], [600.0, 1.0], [200.0, 6.0], [400.0, 1.0], [1700.0, 1.0], [900.0, 3.0], [1000.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[300.0, 1.0], [600.0, 4.0], [1300.0, 1.0], [1400.0, 2.0], [2700.0, 1.0], [5800.0, 1.0], [400.0, 2.0], [200.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [21200.0, 1.0], [700.0, 1.0], [400.0, 2.0], [800.0, 1.0], [100.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 10.0], [600.0, 1.0], [300.0, 1.0], [100.0, 4.0], [400.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[4100.0, 3.0], [600.0, 7.0], [5100.0, 1.0], [400.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [2000.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[2200.0, 1.0], [9400.0, 1.0], [2500.0, 1.0], [2700.0, 2.0], [2800.0, 1.0], [11100.0, 1.0], [3000.0, 2.0], [3200.0, 1.0], [13700.0, 1.0], [14000.0, 1.0], [3800.0, 1.0], [21200.0, 1.0], [22400.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 3.0], [2600.0, 1.0], [41800.0, 1.0], [11000.0, 1.0], [2800.0, 1.0], [900.0, 2.0], [1200.0, 1.0], [82900.0, 1.0], [5400.0, 1.0], [100.0, 1.0], [6700.0, 1.0], [1800.0, 3.0], [7600.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[2100.0, 1.0], [600.0, 2.0], [2500.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [55000.0, 1.0], [15000.0, 1.0], [3800.0, 1.0], [1000.0, 1.0], [4400.0, 1.0], [1100.0, 1.0], [300.0, 1.0], [1500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[175400.0, 1.0], [50000.0, 1.0], [54500.0, 1.0], [54700.0, 1.0], [62800.0, 1.0], [71900.0, 1.0], [70600.0, 2.0], [71000.0, 1.0], [72700.0, 1.0], [77300.0, 1.0], [76000.0, 1.0], [74200.0, 1.0], [81400.0, 1.0], [78100.0, 1.0], [78600.0, 1.0], [83400.0, 1.0], [84100.0, 1.0], [90100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[8700.0, 1.0], [600.0, 5.0], [9300.0, 1.0], [10600.0, 1.0], [700.0, 4.0], [11400.0, 1.0], [17300.0, 1.0], [1300.0, 2.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 5.0], [2000.0, 1.0], [2100.0, 1.0], [2800.0, 1.0], [48300.0, 1.0], [3000.0, 1.0], [53000.0, 1.0], [3300.0, 2.0], [54200.0, 1.0], [3500.0, 1.0], [61100.0, 1.0], [4100.0, 1.0], [71300.0, 1.0], [70100.0, 2.0], [70500.0, 1.0], [4400.0, 1.0], [72200.0, 1.0], [76600.0, 2.0], [75500.0, 1.0], [4700.0, 1.0], [73800.0, 1.0], [80800.0, 1.0], [78100.0, 1.0], [82900.0, 1.0], [83500.0, 1.0], [5400.0, 1.0], [7600.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[8600.0, 1.0], [8900.0, 1.0], [600.0, 3.0], [700.0, 1.0], [800.0, 1.0], [900.0, 2.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [1700.0, 5.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 2.0], [2100.0, 3.0], [2200.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2900.0, 1.0], [200.0, 3.0], [3200.0, 1.0], [4200.0, 1.0], [300.0, 4.0], [4800.0, 1.0], [400.0, 6.0], [7700.0, 1.0], [500.0, 6.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[600.0, 1.0], [11100.0, 1.0], [700.0, 1.0], [800.0, 1.0], [900.0, 1.0], [14900.0, 1.0], [1000.0, 3.0], [17200.0, 1.0], [16500.0, 1.0], [1100.0, 1.0], [1200.0, 1.0], [1400.0, 2.0], [1700.0, 2.0], [1800.0, 1.0], [1900.0, 1.0], [2100.0, 1.0], [2300.0, 1.0], [2400.0, 2.0], [39300.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [200.0, 1.0], [57200.0, 1.0], [4200.0, 1.0], [4400.0, 1.0], [300.0, 4.0], [5000.0, 1.0], [4900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[2200.0, 1.0], [11300.0, 1.0], [12100.0, 1.0], [3100.0, 1.0], [12700.0, 1.0], [12600.0, 1.0], [3200.0, 1.0], [800.0, 1.0], [14900.0, 1.0], [1000.0, 1.0], [16900.0, 1.0], [4200.0, 2.0], [20900.0, 1.0], [1300.0, 1.0], [21700.0, 1.0], [6200.0, 1.0], [1700.0, 1.0], [6800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[8400.0, 1.0], [9200.0, 1.0], [9500.0, 1.0], [10200.0, 1.0], [10300.0, 1.0], [10600.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [3000.0, 3.0], [14100.0, 1.0], [900.0, 1.0], [14500.0, 1.0], [4100.0, 1.0], [4600.0, 1.0], [5700.0, 1.0], [1500.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 5.0], [2400.0, 1.0], [200.0, 5.0], [400.0, 2.0], [900.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[2500.0, 1.0], [700.0, 1.0], [2700.0, 1.0], [2900.0, 1.0], [800.0, 2.0], [200.0, 6.0], [3500.0, 1.0], [1000.0, 1.0], [300.0, 1.0], [6100.0, 1.0], [1700.0, 1.0], [1900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1100.0, 2.0], [300.0, 6.0], [1300.0, 1.0], [5500.0, 1.0], [200.0, 3.0], [400.0, 1.0], [1600.0, 1.0], [3500.0, 1.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 179400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 16.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 806.0, "series": [{"data": [[0.0, 806.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 422.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 603.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 16.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399674E12, "maxY": 19.28571428571429, "series": [{"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0], [1.66399674E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-48", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-27", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-25", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-109", "isController": false}, {"data": [[1.66399698E12, 0.0], [1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-47", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.66399686E12, 16.79603729603729], [1.66399698E12, 3.0], [1.6639968E12, 19.28571428571429], [1.66399692E12, 7.696236559139786], [1.66399674E12, 19.024999999999995]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-4", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-104", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-103", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-124", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-121", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-91", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-73", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-52", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-71", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-11", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-55", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-31", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-98", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-76", "isController": false}, {"data": [[1.6639968E12, 0.0], [1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-59", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-35", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-14", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-119", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-39", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-114", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-112", "isController": false}, {"data": [[1.66399692E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-111", "isController": false}, {"data": [[1.66399686E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-110", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-81", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-84", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.66399674E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-61", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-44", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-23", "isController": false}, {"data": [[1.6639968E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-86", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399698E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 179439.0, "series": [{"data": [[16.0, 739.0], [17.0, 257.0], [18.0, 578.0], [19.0, 243.0], [20.0, 272.5], [5.0, 259.0], [12.0, 314.0], [3.0, 245.0], [13.0, 278.0], [7.0, 360.5], [15.0, 1609.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[13.66666666666667, 470.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[16.0, 1137.0], [17.0, 235.0], [18.0, 1075.0], [19.0, 240.0], [20.0, 279.0], [5.0, 241.0], [12.0, 576.6666666666667], [3.0, 245.0], [13.0, 242.0], [7.0, 248.0], [15.0, 370.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[13.66666666666667, 551.0000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[16.0, 339.6666666666667], [17.0, 230.0], [18.0, 1052.5], [19.0, 245.0], [20.0, 267.0], [5.0, 235.0], [12.0, 558.3333333333334], [3.0, 229.0], [13.0, 256.0], [7.0, 230.5], [15.0, 1273.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[13.66666666666667, 459.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[16.0, 890.0], [17.0, 258.0], [18.0, 464.5], [19.0, 246.0], [20.0, 279.5], [5.0, 228.0], [12.0, 517.0], [3.0, 228.0], [13.0, 235.0], [7.0, 255.5], [15.0, 1715.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[13.66666666666667, 507.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[16.0, 252.33333333333334], [17.0, 235.0], [18.0, 288.0], [19.0, 245.0], [20.0, 312.0], [5.0, 236.0], [12.0, 654.0], [3.0, 245.0], [13.0, 245.0], [7.0, 371.5], [15.0, 1174.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[13.66666666666667, 391.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[16.0, 259.0], [17.0, 229.0], [18.0, 602.0], [19.0, 507.0], [20.0, 600.5], [5.0, 495.0], [12.0, 1552.0], [3.0, 245.0], [13.0, 518.0], [7.0, 486.5], [15.0, 2026.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[13.66666666666667, 712.8333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[16.0, 511.3333333333333], [17.0, 529.0], [18.0, 938.0], [19.0, 485.0], [20.0, 435.0], [5.0, 504.0], [12.0, 1240.0], [3.0, 254.0], [13.0, 472.0], [7.0, 514.0], [15.0, 353.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[13.66666666666667, 645.8333333333335]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[16.0, 553.0], [17.0, 532.0], [18.0, 635.5], [19.0, 484.0], [20.0, 614.0], [5.0, 508.0], [12.0, 663.3333333333334], [3.0, 232.0], [13.0, 478.0], [7.0, 474.5], [15.0, 2074.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[13.66666666666667, 633.6111111111111]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[16.0, 593.6666666666666], [17.0, 627.0], [18.0, 1081.0], [19.0, 564.0], [20.0, 468.0], [5.0, 473.0], [12.0, 1151.6666666666667], [3.0, 219.0], [13.0, 503.0], [7.0, 482.5], [15.0, 667.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[13.66666666666667, 686.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[16.0, 772.6666666666667], [17.0, 608.0], [18.0, 1434.0], [19.0, 814.0], [20.0, 443.5], [5.0, 539.0], [12.0, 981.0], [3.0, 247.0], [13.0, 467.0], [7.0, 513.5], [15.0, 690.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[13.66666666666667, 744.8888888888887]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[20.0, 22702.70588235294], [5.0, 32952.0], [15.0, 16649.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[18.94736842105263, 22923.526315789473]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[20.0, 13747.941176470587], [5.0, 11774.0], [15.0, 27130.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[18.94736842105263, 14348.368421052632]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[20.0, 11931.647058823532], [5.0, 3857.0], [15.0, 9708.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[18.94736842105263, 11389.63157894737]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[20.0, 15644.294117647056], [5.0, 3113.0], [15.0, 5302.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[18.94736842105263, 14440.421052631576]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[20.0, 16540.470588235294], [5.0, 8722.0], [15.0, 16449.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[18.94736842105263, 16124.15789473684]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[20.0, 6490.705882352941], [5.0, 4634.0], [15.0, 7505.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[18.94736842105263, 6446.368421052632]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[20.0, 6368.117647058824], [5.0, 2886.0], [15.0, 2688.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[18.94736842105263, 5991.157894736843]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[20.0, 7595.764705882354], [5.0, 10612.0], [15.0, 111240.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[18.94736842105263, 13209.473684210529]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[20.0, 28508.23529411765], [5.0, 24228.0], [15.0, 46418.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[18.94736842105263, 29225.578947368424]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[20.0, 13543.70588235294], [5.0, 13600.0], [15.0, 17062.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[18.94736842105263, 13731.842105263157]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[9.0, 4568.0], [10.0, 4889.0], [11.0, 4029.0], [12.0, 5412.0], [3.0, 1578.0], [13.0, 3376.0], [14.0, 3336.0], [15.0, 3910.0], [16.0, 4452.0], [4.0, 1527.0], [17.0, 4737.0], [18.0, 3649.0], [19.0, 3419.0], [20.0, 5338.0], [5.0, 1547.0], [6.0, 1604.0], [7.0, 2113.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[11.555555555555555, 3558.4444444444457]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[17.0, 24866.0], [18.0, 3596.0], [9.0, 6613.0], [19.0, 6147.0], [20.0, 6853.777777777777], [3.0, 6545.0], [14.0, 35598.0], [7.0, 45919.0], [15.0, 8056.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[16.666666666666664, 11256.666666666668]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[16.0, 3414.3333333333335], [17.0, 5233.0], [18.0, 7200.5], [19.0, 3012.0], [20.0, 2973.5], [5.0, 1866.0], [12.0, 11477.666666666668], [3.0, 1433.0], [13.0, 5302.0], [7.0, 5418.0], [15.0, 11200.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[13.66666666666667, 5772.555555555556]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[17.0, 512.0], [18.0, 591.5], [9.0, 2749.0], [19.0, 720.0], [20.0, 732.6666666666666], [3.0, 243.0], [14.0, 1924.0], [7.0, 612.0], [15.0, 1671.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[16.666666666666664, 900.4444444444445]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[16.0, 315.3333333333333], [17.0, 267.0], [18.0, 265.5], [19.0, 246.0], [20.0, 297.5], [5.0, 262.0], [12.0, 643.6666666666667], [3.0, 218.0], [13.0, 1338.0], [7.0, 239.5], [15.0, 349.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[13.66666666666667, 397.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[17.0, 229.0], [18.0, 1080.0], [9.0, 3584.0], [19.0, 650.0], [20.0, 1542.4444444444443], [3.0, 491.0], [14.0, 3006.0], [7.0, 1375.0], [15.0, 4443.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[16.666666666666664, 1656.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[16.0, 524.0], [17.0, 267.0], [18.0, 609.0], [19.0, 255.0], [20.0, 280.5], [5.0, 492.0], [12.0, 311.6666666666667], [3.0, 245.0], [13.0, 299.0], [7.0, 266.0], [15.0, 336.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[13.66666666666667, 372.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[16.0, 627.0], [17.0, 664.0], [18.0, 1091.0], [19.0, 241.0], [20.0, 280.0], [5.0, 544.0], [12.0, 314.0], [3.0, 270.0], [13.0, 273.0], [7.0, 249.5], [15.0, 670.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[13.66666666666667, 484.7777777777778]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[17.0, 496.0], [18.0, 1056.0], [9.0, 1637.0], [19.0, 678.0], [20.0, 653.7777777777778], [3.0, 491.0], [14.0, 3704.0], [7.0, 1121.0], [15.0, 1698.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[16.666666666666664, 990.0555555555555]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[17.0, 3422.0], [18.0, 337.0], [9.0, 351.0], [19.0, 344.0], [20.0, 325.3333333333333], [3.0, 528.0], [14.0, 329.0], [7.0, 964.0], [15.0, 365.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[16.666666666666664, 550.2777777777778]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[9.0, 548.5], [10.0, 507.0], [11.0, 642.0], [12.0, 331.0], [3.0, 299.0], [13.0, 528.0], [14.0, 494.0], [15.0, 670.0], [16.0, 3638.0], [4.0, 514.0], [17.0, 3718.0], [18.0, 521.0], [19.0, 652.0], [20.0, 1654.0], [5.0, 282.0], [6.0, 235.0], [7.0, 487.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[11.555555555555555, 903.8333333333331]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[17.0, 348.0], [18.0, 1067.5], [9.0, 358.0], [19.0, 342.0], [20.0, 299.22222222222223], [3.0, 246.0], [14.0, 1366.0], [7.0, 619.0], [15.0, 1514.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[16.666666666666664, 534.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[9.0, 175.5], [10.0, 163.0], [11.0, 300.0], [12.0, 461.0], [3.0, 192.0], [13.0, 187.0], [14.0, 87.0], [15.0, 449.0], [16.0, 55.0], [4.0, 172.0], [17.0, 685.0], [18.0, 228.0], [19.0, 211.0], [20.0, 64.0], [5.0, 198.0], [6.0, 195.0], [7.0, 186.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[11.555555555555555, 232.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[17.0, 352.0], [18.0, 927.0], [9.0, 722.0], [19.0, 1342.0], [20.0, 996.4444444444445], [3.0, 267.0], [14.0, 567.0], [7.0, 792.0], [15.0, 716.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[16.666666666666664, 865.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[17.0, 2870.0], [18.0, 455.5], [9.0, 352.0], [19.0, 1472.0], [20.0, 725.2222222222222], [3.0, 532.0], [14.0, 30754.0], [7.0, 787.0], [15.0, 2006.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[16.666666666666664, 2567.2777777777774]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[17.0, 259.0], [18.0, 277.5], [9.0, 1530.0], [19.0, 336.0], [20.0, 637.2222222222222], [3.0, 270.0], [14.0, 303.0], [7.0, 16.0], [15.0, 1045.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[16.666666666666664, 558.2777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[9.0, 369.0], [10.0, 249.0], [11.0, 1040.0], [12.0, 341.0], [3.0, 255.0], [13.0, 239.0], [14.0, 246.0], [15.0, 346.0], [16.0, 2161.0], [4.0, 242.0], [17.0, 454.0], [18.0, 253.0], [19.0, 600.0], [20.0, 331.0], [5.0, 258.0], [6.0, 241.0], [7.0, 479.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[11.555555555555555, 470.7222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[9.0, 365.0], [10.0, 257.0], [11.0, 2496.0], [12.0, 330.0], [3.0, 241.0], [13.0, 246.0], [14.0, 242.0], [15.0, 332.0], [16.0, 335.0], [4.0, 240.0], [17.0, 3110.0], [18.0, 246.0], [19.0, 294.0], [20.0, 353.0], [5.0, 251.0], [6.0, 263.0], [7.0, 474.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[11.555555555555555, 580.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[17.0, 1645.0], [18.0, 928.0], [9.0, 2870.0], [19.0, 351.0], [20.0, 635.0], [3.0, 266.0], [14.0, 358.0], [7.0, 348.0], [15.0, 362.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[16.666666666666664, 765.0555555555555]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[9.0, 19.0], [10.0, 11.0], [11.0, 21.0], [12.0, 111.0], [3.0, 32.0], [13.0, 14.0], [14.0, 120.0], [15.0, 334.0], [16.0, 10.0], [4.0, 27.0], [17.0, 32.0], [18.0, 13.0], [19.0, 13.0], [20.0, 13.0], [5.0, 14.0], [6.0, 15.0], [7.0, 20.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[11.555555555555555, 46.55555555555556]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[17.0, 2599.0], [18.0, 319.5], [9.0, 358.0], [19.0, 327.0], [20.0, 514.0], [3.0, 270.0], [14.0, 301.0], [7.0, 326.0], [15.0, 2033.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[16.666666666666664, 637.7222222222224]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[9.0, 56.5], [10.0, 54.0], [11.0, 244.0], [12.0, 158.0], [3.0, 66.0], [13.0, 55.0], [14.0, 154.0], [15.0, 150.0], [16.0, 53.0], [4.0, 162.0], [17.0, 190.0], [18.0, 61.0], [19.0, 73.0], [20.0, 64.0], [5.0, 60.0], [6.0, 55.0], [7.0, 207.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[11.555555555555555, 106.61111111111113]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[9.0, 2097.5], [10.0, 259.0], [11.0, 271.0], [12.0, 1690.0], [3.0, 275.0], [13.0, 1697.0], [14.0, 1739.0], [15.0, 970.0], [16.0, 278.0], [4.0, 293.0], [17.0, 520.0], [18.0, 755.0], [19.0, 273.0], [20.0, 1620.0], [5.0, 286.0], [6.0, 272.0], [7.0, 298.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[11.555555555555555, 871.7222222222221]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[20.0, 79844.88235294117], [5.0, 179439.0], [15.0, 127790.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[18.94736842105263, 87610.1052631579]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[9.0, 367.5], [10.0, 268.0], [11.0, 553.0], [12.0, 400.0], [3.0, 295.0], [13.0, 405.0], [14.0, 384.0], [15.0, 369.0], [16.0, 304.0], [4.0, 286.0], [17.0, 304.0], [18.0, 1232.0], [19.0, 543.0], [20.0, 393.0], [5.0, 307.0], [6.0, 295.0], [7.0, 544.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[11.555555555555555, 423.16666666666663]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[9.0, 248.5], [10.0, 230.0], [11.0, 1721.0], [12.0, 360.0], [3.0, 255.0], [13.0, 273.0], [14.0, 249.0], [15.0, 969.0], [16.0, 3319.0], [4.0, 261.0], [17.0, 455.0], [18.0, 245.0], [19.0, 618.0], [20.0, 326.0], [5.0, 269.0], [6.0, 250.0], [7.0, 474.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[11.555555555555555, 598.388888888889]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[9.0, 355.0], [10.0, 232.0], [11.0, 2495.0], [12.0, 3319.0], [3.0, 241.0], [13.0, 1051.0], [14.0, 242.0], [15.0, 342.0], [16.0, 1997.0], [4.0, 242.0], [17.0, 994.0], [18.0, 246.0], [19.0, 649.0], [20.0, 332.0], [5.0, 258.0], [6.0, 257.0], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[11.555555555555555, 769.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[17.0, 1135.0], [18.0, 299.0], [9.0, 322.0], [19.0, 229.0], [20.0, 707.4444444444445], [3.0, 270.0], [14.0, 281.0], [7.0, 260.0], [15.0, 689.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[16.666666666666664, 563.9444444444445]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[17.0, 1123.0], [18.0, 294.5], [9.0, 320.0], [19.0, 300.0], [20.0, 1010.5555555555555], [3.0, 237.0], [14.0, 279.0], [7.0, 502.0], [15.0, 1014.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[16.666666666666664, 747.7222222222222]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[17.0, 314.0], [18.0, 302.0], [9.0, 1171.0], [19.0, 249.0], [20.0, 641.2222222222222], [3.0, 234.0], [14.0, 306.0], [7.0, 245.0], [15.0, 1041.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[16.666666666666664, 551.9444444444445]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[9.0, 578.5], [10.0, 617.0], [11.0, 345.0], [12.0, 654.0], [3.0, 503.0], [13.0, 264.0], [14.0, 249.0], [15.0, 652.0], [16.0, 1718.0], [4.0, 241.0], [17.0, 329.0], [18.0, 1081.0], [19.0, 1667.0], [20.0, 644.0], [5.0, 255.0], [6.0, 258.0], [7.0, 521.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[11.555555555555555, 619.7222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[9.0, 187.0], [10.0, 2707.0], [11.0, 1190.0], [12.0, 325.0], [3.0, 249.0], [13.0, 495.0], [14.0, 461.0], [15.0, 1663.0], [16.0, 1008.0], [4.0, 244.0], [17.0, 1589.0], [18.0, 293.0], [19.0, 339.0], [20.0, 336.0], [5.0, 266.0], [6.0, 264.0], [7.0, 492.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[11.555555555555555, 683.0555555555555]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[9.0, 474.5], [10.0, 271.0], [11.0, 346.0], [12.0, 333.0], [3.0, 255.0], [13.0, 524.0], [14.0, 446.0], [15.0, 677.0], [16.0, 331.0], [4.0, 242.0], [17.0, 1978.0], [18.0, 1110.0], [19.0, 1560.0], [20.0, 327.0], [5.0, 266.0], [6.0, 270.0], [7.0, 497.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[11.555555555555555, 576.7777777777779]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[9.0, 389.0], [10.0, 274.0], [11.0, 326.0], [12.0, 344.0], [3.0, 255.0], [13.0, 522.0], [14.0, 494.0], [15.0, 644.0], [16.0, 319.0], [4.0, 244.0], [17.0, 562.0], [18.0, 277.0], [19.0, 1101.0], [20.0, 640.0], [5.0, 231.0], [6.0, 230.0], [7.0, 516.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[11.555555555555555, 430.9444444444445]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[9.0, 393.5], [10.0, 607.0], [11.0, 2666.0], [12.0, 2492.0], [3.0, 270.0], [13.0, 474.0], [14.0, 465.0], [15.0, 657.0], [16.0, 626.0], [4.0, 240.0], [17.0, 591.0], [18.0, 1123.0], [19.0, 1647.0], [20.0, 1616.0], [5.0, 237.0], [6.0, 527.0], [7.0, 484.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[11.555555555555555, 861.6111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[16.0, 3414.3333333333335], [17.0, 5233.0], [18.0, 7200.5], [19.0, 3012.0], [20.0, 2973.5], [5.0, 1866.0], [12.0, 11477.666666666668], [3.0, 1433.0], [13.0, 5302.0], [7.0, 5418.0], [15.0, 11200.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[13.66666666666667, 5772.555555555556]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[9.0, 363.0], [10.0, 351.0], [11.0, 239.0], [12.0, 346.0], [3.0, 244.0], [13.0, 263.0], [14.0, 236.0], [15.0, 325.0], [16.0, 327.0], [4.0, 249.0], [17.0, 535.0], [18.0, 406.0], [19.0, 242.0], [20.0, 339.0], [5.0, 263.0], [6.0, 472.0], [7.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[11.555555555555555, 323.5000000000001]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[9.0, 328.0], [10.0, 356.0], [11.0, 248.0], [12.0, 1239.0], [3.0, 257.0], [13.0, 251.0], [14.0, 521.0], [15.0, 339.0], [16.0, 1116.0], [4.0, 265.0], [17.0, 271.0], [18.0, 425.0], [19.0, 226.0], [20.0, 336.0], [5.0, 239.0], [6.0, 259.0], [7.0, 232.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[11.555555555555555, 402.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[9.0, 327.5], [10.0, 332.0], [11.0, 228.0], [12.0, 331.0], [3.0, 219.0], [13.0, 249.0], [14.0, 249.0], [15.0, 327.0], [16.0, 891.0], [4.0, 267.0], [17.0, 265.0], [18.0, 447.0], [19.0, 946.0], [20.0, 326.0], [5.0, 232.0], [6.0, 513.0], [7.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[11.555555555555555, 373.88888888888886]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[9.0, 499.5], [10.0, 1349.0], [11.0, 1032.0], [12.0, 330.0], [3.0, 240.0], [13.0, 246.0], [14.0, 265.0], [15.0, 326.0], [16.0, 1444.0], [4.0, 230.0], [17.0, 964.0], [18.0, 357.0], [19.0, 958.0], [20.0, 324.0], [5.0, 264.0], [6.0, 239.0], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[11.555555555555555, 545.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[9.0, 318.5], [10.0, 350.0], [11.0, 1482.0], [12.0, 345.0], [3.0, 252.0], [13.0, 238.0], [14.0, 247.0], [15.0, 319.0], [16.0, 1293.0], [4.0, 237.0], [17.0, 1001.0], [18.0, 352.0], [19.0, 1874.0], [20.0, 317.0], [5.0, 242.0], [6.0, 236.0], [7.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[11.555555555555555, 536.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[9.0, 4568.0], [10.0, 4889.0], [11.0, 4029.0], [12.0, 5412.0], [3.0, 1578.0], [13.0, 3376.0], [14.0, 3336.0], [15.0, 3910.0], [16.0, 4452.0], [4.0, 1527.0], [17.0, 4737.0], [18.0, 3649.0], [19.0, 3419.0], [20.0, 5338.0], [5.0, 1547.0], [6.0, 1604.0], [7.0, 2113.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[11.555555555555555, 3558.4444444444457]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[9.0, 1124.5], [10.0, 3220.0], [11.0, 245.0], [12.0, 1682.0], [3.0, 265.0], [13.0, 251.0], [14.0, 270.0], [15.0, 1206.0], [16.0, 264.0], [4.0, 231.0], [17.0, 285.0], [18.0, 358.0], [19.0, 246.0], [20.0, 330.0], [5.0, 238.0], [6.0, 262.0], [7.0, 267.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[11.555555555555555, 659.3888888888888]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[9.0, 770.5], [10.0, 1028.0], [11.0, 241.0], [12.0, 332.0], [3.0, 234.0], [13.0, 249.0], [14.0, 247.0], [15.0, 340.0], [16.0, 546.0], [4.0, 260.0], [17.0, 606.0], [18.0, 347.0], [19.0, 242.0], [20.0, 2027.0], [5.0, 241.0], [6.0, 233.0], [7.0, 239.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[11.555555555555555, 497.38888888888886]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[9.0, 672.0], [10.0, 346.0], [11.0, 228.0], [12.0, 333.0], [3.0, 250.0], [13.0, 238.0], [14.0, 248.0], [15.0, 1164.0], [16.0, 339.0], [4.0, 236.0], [17.0, 266.0], [18.0, 273.0], [19.0, 226.0], [20.0, 334.0], [5.0, 263.0], [6.0, 235.0], [7.0, 233.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[11.555555555555555, 364.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[20.0, 79844.82352941175], [5.0, 179439.0], [15.0, 127790.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[18.94736842105263, 87610.05263157893]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[17.0, 1637.0], [18.0, 1380.5], [9.0, 1704.0], [19.0, 695.0], [20.0, 793.0], [3.0, 453.0], [14.0, 2629.0], [7.0, 508.0], [15.0, 584.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[16.666666666666664, 1006.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[17.0, 1507.0], [18.0, 616.0], [9.0, 622.0], [19.0, 689.0], [20.0, 1047.6666666666667], [3.0, 255.0], [14.0, 1691.0], [7.0, 503.0], [15.0, 573.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[16.666666666666664, 916.7222222222222]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[17.0, 3698.0], [18.0, 602.0], [9.0, 249.0], [19.0, 348.0], [20.0, 640.4444444444445], [3.0, 501.0], [14.0, 5389.0], [7.0, 253.0], [15.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[16.666666666666664, 980.4444444444445]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[17.0, 4624.0], [18.0, 277.0], [9.0, 605.0], [19.0, 708.0], [20.0, 694.2222222222222], [3.0, 505.0], [14.0, 328.0], [7.0, 503.0], [15.0, 584.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[16.666666666666664, 814.3888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[0.0, 267.0], [17.0, 2914.0], [18.0, 260.5], [9.0, 525.0], [19.0, 3245.0], [20.0, 2341.0], [3.0, 258.0], [14.0, 312.0], [7.0, 273.0], [15.0, 1520.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[15.789473684210524, 1626.5263157894738]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[0.0, 5310.0], [17.0, 544.0], [18.0, 935.5], [9.0, 1676.0], [19.0, 716.0], [20.0, 770.5555555555555], [3.0, 500.0], [14.0, 1610.0], [7.0, 528.0], [15.0, 1519.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[15.789473684210524, 1116.2631578947369]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[17.0, 460.0], [18.0, 604.5], [9.0, 672.0], [19.0, 669.0], [20.0, 1130.3333333333333], [3.0, 5577.0], [14.0, 666.0], [7.0, 44883.0], [15.0, 1258.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[16.666666666666664, 3642.6111111111113]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[17.0, 1494.0], [18.0, 358.5], [9.0, 162.0], [19.0, 442.0], [20.0, 636.5555555555554], [3.0, 188.0], [14.0, 448.0], [7.0, 221.0], [15.0, 187.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[16.666666666666664, 532.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[17.0, 221.0], [18.0, 31.5], [9.0, 19.0], [19.0, 88.0], [20.0, 200.55555555555554], [3.0, 18.0], [14.0, 220.0], [7.0, 15.0], [15.0, 28.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[16.666666666666664, 137.6111111111111]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[17.0, 21405.0], [18.0, 233.5], [9.0, 162.0], [19.0, 407.0], [20.0, 1142.333333333333], [3.0, 206.0], [14.0, 21547.0], [7.0, 233.0], [15.0, 185.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[16.666666666666664, 3049.611111111111]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[20.0, 2174.3529411764703], [5.0, 683.0], [15.0, 335.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[18.94736842105263, 1999.0526315789473]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[20.0, 2447.7647058823527], [5.0, 655.0], [15.0, 670.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[18.94736842105263, 2259.842105263158]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[20.0, 8310.117647058822], [5.0, 8476.0], [15.0, 4935.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[18.94736842105263, 8141.210526315788]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[17.0, 24866.0], [18.0, 3596.0], [9.0, 6613.0], [19.0, 6147.0], [20.0, 6853.777777777777], [3.0, 6545.0], [14.0, 35598.0], [7.0, 45919.0], [15.0, 8056.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[16.666666666666664, 11256.666666666668]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[16.0, 388.0], [17.0, 181.0], [18.0, 107.5], [19.0, 156.0], [20.0, 101.0], [5.0, 55.0], [12.0, 1157.0], [3.0, 57.0], [13.0, 270.0], [7.0, 61.5], [15.0, 63.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[13.66666666666667, 330.9444444444444]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[16.0, 407.3333333333333], [17.0, 448.0], [18.0, 457.5], [19.0, 351.0], [20.0, 276.5], [5.0, 251.0], [12.0, 1547.3333333333333], [3.0, 235.0], [13.0, 247.0], [7.0, 508.5], [15.0, 2408.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[13.66666666666667, 682.7222222222222]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[16.0, 566.3333333333333], [17.0, 448.0], [18.0, 463.0], [19.0, 335.0], [20.0, 455.0], [5.0, 253.0], [12.0, 1537.6666666666667], [3.0, 244.0], [13.0, 515.0], [7.0, 254.0], [15.0, 290.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[13.66666666666667, 596.7222222222222]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[16.0, 404.3333333333333], [17.0, 977.0], [18.0, 607.0], [19.0, 1014.0], [20.0, 289.0], [5.0, 257.0], [12.0, 515.6666666666666], [3.0, 247.0], [13.0, 466.0], [7.0, 509.0], [15.0, 1768.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[13.66666666666667, 572.1666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[16.0, 569.3333333333334], [17.0, 602.0], [18.0, 932.5], [19.0, 1471.0], [20.0, 453.0], [5.0, 470.0], [12.0, 1585.3333333333333], [3.0, 250.0], [13.0, 475.0], [7.0, 3159.5], [15.0, 639.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[13.66666666666667, 1081.1666666666665]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[16.0, 248.33333333333334], [17.0, 1193.0], [18.0, 316.0], [19.0, 807.0], [20.0, 235.5], [5.0, 182.0], [12.0, 7383.0], [3.0, 219.0], [13.0, 167.0], [7.0, 202.5], [15.0, 168.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[13.66666666666667, 1507.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[16.0, 124.33333333333334], [17.0, 457.0], [18.0, 62.0], [19.0, 648.0], [20.0, 60.0], [5.0, 41.0], [12.0, 79.33333333333333], [3.0, 15.0], [13.0, 242.0], [7.0, 15.0], [15.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[13.66666666666667, 127.88888888888894]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[20.0, 1722.1176470588234], [5.0, 1927.0], [15.0, 5108.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[18.94736842105263, 1911.1052631578948]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[20.0, 5979.823529411765], [5.0, 22410.0], [15.0, 1523.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[18.94736842105263, 6610.0]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[20.0, 7615.35294117647], [5.0, 41861.0], [15.0, 903.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[18.94736842105263, 9064.473684210527]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[20.0, 5754.352941176471], [5.0, 1189.0], [15.0, 2971.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[18.94736842105263, 5367.578947368422]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[20.0, 72478.05882352943], [5.0, 175404.0], [15.0, 70652.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[18.94736842105263, 77799.10526315791]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 35886.91666666665], [20.0, 1862.1764705882354], [5.0, 712.0], [15.0, 1700.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[6.545454545454545, 24109.054545454546]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 1478.8333333333335], [20.0, 2691.764705882353], [5.0, 1795.0], [15.0, 686.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[6.545454545454545, 1845.0727272727272]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 5978.631578947368], [20.0, 5633.235294117647], [5.0, 335.0], [15.0, 1763.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[9.473684210526315, 5564.6578947368425]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[20.0, 8682.470588235294], [5.0, 6883.0], [15.0, 4270.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[18.94736842105263, 8355.526315789473]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[20.0, 6098.470588235295], [5.0, 9571.0], [15.0, 4167.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[18.94736842105263, 6179.578947368422]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[16.0, 301.6666666666667], [17.0, 979.0], [18.0, 299.5], [19.0, 970.0], [20.0, 291.0], [5.0, 267.0], [12.0, 1020.6666666666666], [3.0, 237.0], [13.0, 515.0], [7.0, 488.5], [15.0, 2461.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[13.66666666666667, 641.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[16.0, 309.0], [0.0, 243.0], [17.0, 2912.0], [18.0, 4353.5], [19.0, 727.0], [20.0, 936.5], [5.0, 276.0], [12.0, 1372.3333333333335], [3.0, 258.0], [13.0, 1978.0], [7.0, 1017.5], [15.0, 3595.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[12.947368421052635, 1455.157894736842]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[16.0, 725.6666666666667], [0.0, 5575.0], [17.0, 280.0], [18.0, 369.0], [19.0, 374.0], [20.0, 745.0], [5.0, 283.0], [12.0, 827.3333333333334], [3.0, 266.0], [13.0, 951.0], [7.0, 844.0], [15.0, 3532.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[12.947368421052635, 1044.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 20.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1866.4333333333334, "minX": 1.66399674E12, "maxY": 536499.2, "series": [{"data": [[1.66399686E12, 380414.26666666666], [1.66399698E12, 27110.866666666665], [1.6639968E12, 536499.2], [1.66399692E12, 48541.61666666667], [1.66399674E12, 109655.28333333334]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66399686E12, 26912.3], [1.66399698E12, 1866.4333333333334], [1.6639968E12, 9745.933333333332], [1.66399692E12, 11370.883333333333], [1.66399674E12, 3083.9]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399698E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 15.0, "minX": 1.66399674E12, "maxY": 179439.0, "series": [{"data": [[1.66399686E12, 556.5], [1.66399698E12, 245.0], [1.6639968E12, 320.0], [1.66399692E12, 307.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399686E12, 698.1666666666667], [1.66399698E12, 245.0], [1.6639968E12, 302.0], [1.66399692E12, 248.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399686E12, 566.5833333333333], [1.66399698E12, 229.0], [1.6639968E12, 306.0], [1.66399692E12, 232.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399686E12, 636.0833333333335], [1.66399698E12, 228.0], [1.6639968E12, 287.0], [1.66399692E12, 245.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399686E12, 436.50000000000006], [1.66399698E12, 245.0], [1.6639968E12, 327.0], [1.66399692E12, 308.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399686E12, 827.4166666666666], [1.66399698E12, 245.0], [1.6639968E12, 636.0], [1.66399692E12, 505.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399686E12, 742.8333333333333], [1.66399698E12, 254.0], [1.6639968E12, 331.0], [1.66399692E12, 531.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399686E12, 699.1666666666667], [1.66399698E12, 232.0], [1.6639968E12, 655.0], [1.66399692E12, 532.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399686E12, 725.25], [1.66399698E12, 219.0], [1.6639968E12, 653.0], [1.66399692E12, 694.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399686E12, 769.0833333333334], [1.66399698E12, 247.0], [1.6639968E12, 654.0], [1.66399692E12, 819.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639968E12, 25311.200000000004], [1.66399674E12, 13969.75]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639968E12, 17396.428571428572], [1.66399674E12, 5813.8]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639968E12, 20684.166666666668], [1.66399674E12, 7099.846153846153]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639968E12, 21350.666666666668], [1.66399674E12, 8221.199999999999]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.6639968E12, 16124.15789473684]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639968E12, 6594.388888888889], [1.66399674E12, 3782.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639968E12, 6845.071428571428], [1.66399674E12, 3600.2]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399686E12, 111240.0], [1.6639968E12, 8070.400000000001], [1.66399674E12, 6228.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639968E12, 30245.555555555555], [1.66399674E12, 10866.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639968E12, 13635.6875], [1.66399674E12, 14244.666666666666]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399686E12, 4256.909090909091], [1.66399698E12, 1578.0], [1.66399692E12, 2608.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399686E12, 12217.461538461539], [1.6639968E12, 9312.0], [1.66399692E12, 6545.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399686E12, 5284.333333333333], [1.66399698E12, 1433.0], [1.6639968E12, 2973.5], [1.66399692E12, 11038.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399686E12, 847.9230769230769], [1.6639968E12, 731.0], [1.66399692E12, 1496.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399686E12, 469.16666666666663], [1.66399698E12, 218.0], [1.6639968E12, 344.0], [1.66399692E12, 242.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399686E12, 1865.5384615384614], [1.6639968E12, 497.66666666666663], [1.66399692E12, 2037.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399686E12, 408.08333333333337], [1.66399698E12, 245.0], [1.6639968E12, 306.0], [1.66399692E12, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399686E12, 570.3333333333334], [1.66399698E12, 270.0], [1.6639968E12, 317.0], [1.66399692E12, 323.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399686E12, 1067.3846153846155], [1.6639968E12, 605.6666666666666], [1.66399692E12, 1064.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399686E12, 630.2307692307692], [1.6639968E12, 277.6666666666667], [1.66399692E12, 439.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399686E12, 1484.375], [1.66399698E12, 299.0], [1.66399692E12, 455.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399686E12, 625.7692307692308], [1.6639968E12, 294.0], [1.66399692E12, 302.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399686E12, 245.75], [1.66399698E12, 192.0], [1.66399692E12, 225.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399686E12, 858.5384615384615], [1.6639968E12, 1143.3333333333333], [1.66399692E12, 494.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399686E12, 3357.846153846154], [1.6639968E12, 558.3333333333334], [1.66399692E12, 442.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399686E12, 466.076923076923], [1.6639968E12, 730.0], [1.66399692E12, 900.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399686E12, 578.75], [1.66399698E12, 255.0], [1.66399692E12, 398.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399686E12, 644.75], [1.66399698E12, 241.0], [1.66399692E12, 560.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399686E12, 571.5384615384615], [1.6639968E12, 1068.3333333333333], [1.66399692E12, 1568.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399686E12, 68.625], [1.66399698E12, 32.0], [1.66399692E12, 28.555555555555557]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399686E12, 629.8461538461537], [1.6639968E12, 887.6666666666666], [1.66399692E12, 314.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399686E12, 100.0], [1.66399698E12, 66.0], [1.66399692E12, 117.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399686E12, 981.5], [1.66399698E12, 275.0], [1.66399692E12, 840.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399686E12, 91532.40000000001], [1.6639968E12, 71228.62499999999], [1.66399692E12, 179439.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399686E12, 491.75000000000006], [1.66399698E12, 295.0], [1.66399692E12, 376.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399686E12, 806.7500000000001], [1.66399698E12, 255.0], [1.66399692E12, 451.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399686E12, 731.625], [1.66399698E12, 241.0], [1.66399692E12, 862.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399686E12, 483.69230769230774], [1.6639968E12, 1090.3333333333333], [1.66399692E12, 296.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399686E12, 698.3846153846154], [1.6639968E12, 1274.3333333333333], [1.66399692E12, 278.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399686E12, 450.69230769230774], [1.6639968E12, 890.3333333333334], [1.66399692E12, 702.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399686E12, 825.5], [1.66399698E12, 503.0], [1.66399692E12, 449.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399686E12, 773.0], [1.66399698E12, 249.0], [1.66399692E12, 651.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399686E12, 869.125], [1.66399698E12, 255.0], [1.66399692E12, 352.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399686E12, 569.875], [1.66399698E12, 255.0], [1.66399692E12, 327.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399686E12, 899.875], [1.66399698E12, 270.0], [1.66399692E12, 893.3333333333335]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399686E12, 5201.363636363636], [1.66399698E12, 1433.0], [1.6639968E12, 3706.0], [1.66399692E12, 8310.4]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399686E12, 334.12500000000006], [1.66399698E12, 244.0], [1.66399692E12, 322.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399686E12, 435.625], [1.66399698E12, 257.0], [1.66399692E12, 388.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399686E12, 462.49999999999994], [1.66399698E12, 219.0], [1.66399692E12, 312.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399686E12, 610.5], [1.66399698E12, 240.0], [1.66399692E12, 520.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399686E12, 705.1249999999999], [1.66399698E12, 252.0], [1.66399692E12, 418.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399686E12, 4027.125], [1.66399698E12, 1578.0], [1.66399692E12, 3361.8888888888887]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399686E12, 401.25], [1.66399698E12, 265.0], [1.66399692E12, 932.6666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399686E12, 575.5000000000001], [1.66399698E12, 234.0], [1.66399692E12, 457.2222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399686E12, 386.0], [1.66399698E12, 250.0], [1.66399692E12, 357.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399686E12, 91532.30000000002], [1.6639968E12, 71228.62499999999], [1.66399692E12, 179439.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399686E12, 1014.3076923076923], [1.6639968E12, 921.6666666666667], [1.66399692E12, 1078.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399686E12, 996.3846153846154], [1.6639968E12, 890.3333333333333], [1.66399692E12, 438.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399686E12, 1157.769230769231], [1.6639968E12, 615.6666666666666], [1.66399692E12, 375.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399686E12, 847.1538461538462], [1.6639968E12, 845.3333333333334], [1.66399692E12, 555.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399686E12, 1008.0769230769232], [1.66399698E12, 267.0], [1.6639968E12, 5583.0], [1.66399692E12, 391.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399686E12, 923.3076923076923], [1.66399698E12, 5310.0], [1.6639968E12, 573.3333333333334], [1.66399692E12, 1088.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399686E12, 904.5], [1.66399698E12, 5577.0], [1.6639968E12, 1193.6666666666667], [1.66399692E12, 22777.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399686E12, 580.4615384615385], [1.6639968E12, 564.0], [1.66399692E12, 175.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399686E12, 154.9230769230769], [1.6639968E12, 142.0], [1.66399692E12, 18.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399686E12, 3643.692307692308], [1.6639968E12, 2385.6666666666665], [1.66399692E12, 184.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639968E12, 1815.6666666666665], [1.66399674E12, 5300.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639968E12, 2259.842105263158]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.6639968E12, 8141.210526315788]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399686E12, 9426.333333333334], [1.66399698E12, 6545.0], [1.6639968E12, 10142.333333333334], [1.66399692E12, 26266.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399686E12, 345.1666666666667], [1.66399698E12, 57.0], [1.6639968E12, 147.0], [1.66399692E12, 402.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399686E12, 735.5833333333333], [1.66399698E12, 235.0], [1.6639968E12, 321.0], [1.66399692E12, 726.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399686E12, 620.25], [1.66399698E12, 244.0], [1.6639968E12, 664.0], [1.66399692E12, 597.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399686E12, 675.6666666666667], [1.66399698E12, 247.0], [1.6639968E12, 326.0], [1.66399692E12, 404.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399686E12, 780.4166666666667], [1.66399698E12, 250.0], [1.6639968E12, 327.0], [1.66399692E12, 2379.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399686E12, 358.1818181818182], [1.66399698E12, 219.0], [1.6639968E12, 417.0], [1.66399692E12, 4512.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399686E12, 162.07692307692307], [1.66399698E12, 15.0], [1.6639968E12, 109.0], [1.66399692E12, 23.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399674E12, 1911.1052631578948]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639968E12, 17895.0], [1.66399674E12, 3600.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399686E12, 82968.0], [1.6639968E12, 24771.5], [1.66399674E12, 2482.1250000000005]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639968E12, 55092.0], [1.66399674E12, 2605.1111111111113]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399686E12, 77890.55555555556], [1.6639968E12, 66862.66666666667], [1.66399692E12, 175404.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399686E12, 75869.125], [1.6639968E12, 48457.61538461539], [1.66399674E12, 2620.4705882352946]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399686E12, 492.5], [1.6639968E12, 1603.214285714286], [1.66399674E12, 2275.575757575757]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639968E12, 17418.875], [1.66399674E12, 2403.5333333333324]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639968E12, 15697.6], [1.66399674E12, 5733.357142857143]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639968E12, 12586.0], [1.66399674E12, 5425.882352941177]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399686E12, 781.4166666666666], [1.66399698E12, 237.0], [1.6639968E12, 345.0], [1.66399692E12, 398.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399686E12, 1828.230769230769], [1.66399698E12, 258.0], [1.6639968E12, 1069.0], [1.66399692E12, 638.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399686E12, 838.3846153846154], [1.66399698E12, 266.0], [1.6639968E12, 1125.0], [1.66399692E12, 1886.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399698E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399674E12, "maxY": 52734.0, "series": [{"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639968E12, 2981.7333333333336], [1.66399674E12, 771.25]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639968E12, 1643.857142857143], [1.66399674E12, 678.6]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639968E12, 777.0], [1.66399674E12, 1203.3846153846155]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639968E12, 1672.222222222222], [1.66399674E12, 1108.5]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.6639968E12, 1998.1578947368425]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639968E12, 2874.0], [1.66399674E12, 850.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639968E12, 2350.785714285714], [1.66399674E12, 1057.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399686E12, 687.0], [1.6639968E12, 3255.466666666667], [1.66399674E12, 2429.3333333333335]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639968E12, 1763.6111111111113], [1.66399674E12, 339.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639968E12, 1269.625], [1.66399674E12, 847.6666666666666]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399686E12, 477.1818181818182], [1.66399698E12, 295.0], [1.66399692E12, 345.3333333333333]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399686E12, 936.1538461538461], [1.6639968E12, 807.0], [1.66399692E12, 500.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399686E12, 930.9166666666666], [1.66399698E12, 266.0], [1.6639968E12, 745.0], [1.66399692E12, 444.6666666666667]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 1159.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399686E12, 310.0], [1.66399698E12, 275.0], [1.66399692E12, 584.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399686E12, 2558.6], [1.6639968E12, 970.5], [1.66399692E12, 712.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399686E12, 491.625], [1.66399698E12, 295.0], [1.66399692E12, 376.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399686E12, 911.3636363636364], [1.66399698E12, 266.0], [1.6639968E12, 1125.0], [1.66399692E12, 569.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399686E12, 491.625], [1.66399698E12, 295.0], [1.66399692E12, 376.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399686E12, 2558.6], [1.6639968E12, 970.5], [1.66399692E12, 712.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399686E12, 582.5384615384614], [1.66399698E12, 267.0], [1.6639968E12, 1900.6666666666667], [1.66399692E12, 391.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399686E12, 923.3076923076923], [1.66399698E12, 465.0], [1.6639968E12, 573.3333333333334], [1.66399692E12, 1087.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 465.0], [1.6639968E12, 0.0], [1.66399692E12, 951.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639968E12, 1490.0], [1.66399674E12, 5300.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639968E12, 1836.1052631578946]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.6639968E12, 2761.947368421053]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399686E12, 956.25], [1.66399698E12, 500.0], [1.6639968E12, 573.3333333333334], [1.66399692E12, 1101.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 120.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399674E12, 1860.1052631578946]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639968E12, 2157.25], [1.66399674E12, 1120.6]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399686E12, 355.0], [1.6639968E12, 1705.0], [1.66399674E12, 885.25]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639968E12, 52734.0], [1.66399674E12, 1742.4999999999998]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399686E12, 1622.0], [1.6639968E12, 1533.888888888889], [1.66399692E12, 838.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399686E12, 1792.125], [1.6639968E12, 1324.9999999999998], [1.66399674E12, 1498.4705882352941]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399686E12, 492.5], [1.6639968E12, 1398.8571428571427], [1.66399674E12, 1196.9393939393938]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639968E12, 2758.5], [1.66399674E12, 1171.5666666666664]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639968E12, 2549.2], [1.66399674E12, 1090.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639968E12, 6520.5], [1.66399674E12, 2210.5294117647054]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399686E12, 1069.6923076923076], [1.66399698E12, 258.0], [1.6639968E12, 376.0], [1.66399692E12, 290.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399686E12, 838.3846153846154], [1.66399698E12, 266.0], [1.6639968E12, 1125.0], [1.66399692E12, 613.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399698E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399674E12, "maxY": 23933.0, "series": [{"data": [[1.66399686E12, 108.08333333333333], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 60.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399686E12, 135.08333333333331], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399686E12, 19.83333333333333], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399686E12, 164.66666666666666], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 62.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399686E12, 252.33333333333334], [1.66399698E12, 0.0], [1.6639968E12, 328.0], [1.66399692E12, 266.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399686E12, 409.08333333333337], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 276.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399686E12, 269.0833333333333], [1.66399698E12, 0.0], [1.6639968E12, 324.0], [1.66399692E12, 259.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399686E12, 364.66666666666674], [1.66399698E12, 0.0], [1.6639968E12, 327.0], [1.66399692E12, 267.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399686E12, 306.8333333333333], [1.66399698E12, 0.0], [1.6639968E12, 330.0], [1.66399692E12, 531.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.6639968E12, 954.6666666666667], [1.66399674E12, 161.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.6639968E12, 549.8571428571429], [1.66399674E12, 128.8]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.6639968E12, 0.0], [1.66399674E12, 457.99999999999994]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.6639968E12, 485.8888888888889], [1.66399674E12, 204.3]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.6639968E12, 368.2105263157894]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.6639968E12, 915.4444444444446], [1.66399674E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.6639968E12, 843.0714285714284], [1.66399674E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 473.26666666666677], [1.66399674E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.6639968E12, 327.11111111111114], [1.66399674E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.6639968E12, 21.812500000000004], [1.66399674E12, 105.66666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399686E12, 45.63636363636364], [1.66399698E12, 0.0], [1.66399692E12, 41.5]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399686E12, 429.76923076923083], [1.6639968E12, 460.25], [1.66399692E12, 235.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399686E12, 259.1666666666667], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 166.33333333333331]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399686E12, 387.0000000000001], [1.6639968E12, 186.33333333333334], [1.66399692E12, 178.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399686E12, 27.083333333333336], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399686E12, 607.1538461538462], [1.6639968E12, 222.33333333333331], [1.66399692E12, 803.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 61.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399686E12, 79.08333333333334], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 64.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399686E12, 745.2307692307693], [1.6639968E12, 307.0], [1.66399692E12, 257.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399686E12, 38.0], [1.6639968E12, 0.0], [1.66399692E12, 130.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399686E12, 1066.1249999999998], [1.66399698E12, 0.0], [1.66399692E12, 175.7777777777778]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399686E12, 163.84615384615384], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399686E12, 135.5], [1.66399698E12, 126.0], [1.66399692E12, 147.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399686E12, 327.53846153846155], [1.6639968E12, 284.6666666666667], [1.66399692E12, 179.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399686E12, 346.8461538461538], [1.6639968E12, 0.0], [1.66399692E12, 132.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 641.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399686E12, 33.50000000000001], [1.66399698E12, 0.0], [1.66399692E12, 55.111111111111114]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 202.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399686E12, 123.53846153846155], [1.6639968E12, 447.6666666666667], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 2.7777777777777772]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399686E12, 167.30769230769232], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 42.44444444444444]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399686E12, 924.7], [1.6639968E12, 417.5], [1.66399692E12, 335.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399686E12, 31.25], [1.66399698E12, 0.0], [1.66399692E12, 55.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399686E12, 34.875], [1.66399698E12, 0.0], [1.66399692E12, 177.88888888888886]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399686E12, 36.625], [1.66399698E12, 0.0], [1.66399692E12, 174.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399686E12, 26.692307692307693], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399686E12, 314.8461538461539], [1.6639968E12, 113.33333333333334], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399686E12, 54.76923076923078], [1.6639968E12, 553.3333333333334], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399686E12, 153.125], [1.66399698E12, 249.0], [1.66399692E12, 153.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399686E12, 390.125], [1.66399698E12, 0.0], [1.66399692E12, 69.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399686E12, 337.875], [1.66399698E12, 0.0], [1.66399692E12, 62.888888888888886]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399686E12, 274.375], [1.66399698E12, 0.0], [1.66399692E12, 55.222222222222236]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399686E12, 412.875], [1.66399698E12, 0.0], [1.66399692E12, 187.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399686E12, 282.72727272727275], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 99.8]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399686E12, 33.50000000000001], [1.66399698E12, 0.0], [1.66399692E12, 26.666666666666668]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399686E12, 140.00000000000003], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399686E12, 67.875], [1.66399698E12, 0.0], [1.66399692E12, 28.77777777777778]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399686E12, 45.0], [1.66399698E12, 0.0], [1.66399692E12, 35.22222222222222]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 137.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399686E12, 31.25], [1.66399698E12, 0.0], [1.66399692E12, 55.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399686E12, 69.5], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399686E12, 924.7], [1.6639968E12, 417.5], [1.66399692E12, 335.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399686E12, 420.5384615384615], [1.6639968E12, 638.0], [1.66399692E12, 242.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399686E12, 377.8461538461538], [1.6639968E12, 224.66666666666669], [1.66399692E12, 129.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399686E12, 652.0769230769231], [1.6639968E12, 322.0], [1.66399692E12, 127.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399686E12, 483.3846153846154], [1.6639968E12, 531.0], [1.66399692E12, 254.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399686E12, 420.9230769230769], [1.66399698E12, 222.0], [1.6639968E12, 201.33333333333331], [1.66399692E12, 793.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399686E12, 368.49999999999994], [1.66399698E12, 222.0], [1.6639968E12, 516.6666666666666], [1.66399692E12, 292.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399686E12, 453.2307692307692], [1.6639968E12, 231.0], [1.66399692E12, 113.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399686E12, 113.4615384615385], [1.6639968E12, 67.0], [1.66399692E12, 6.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399686E12, 3532.7692307692305], [1.6639968E12, 2266.6666666666665], [1.66399692E12, 121.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.6639968E12, 388.33333333333337], [1.66399674E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.6639968E12, 380.3157894736843]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.6639968E12, 407.47368421052636]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399686E12, 435.0], [1.66399698E12, 235.0], [1.6639968E12, 201.33333333333331], [1.66399692E12, 802.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399686E12, 120.99999999999999], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 211.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399686E12, 202.08333333333331], [1.66399698E12, 0.0], [1.6639968E12, 333.0], [1.66399692E12, 82.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399686E12, 158.5], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 130.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399686E12, 372.41666666666663], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 519.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399686E12, 272.7272727272727], [1.66399698E12, 129.0], [1.6639968E12, 283.0], [1.66399692E12, 4372.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399674E12, 1065.2631578947367]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.6639968E12, 1405.5], [1.66399674E12, 740.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399686E12, 105.0], [1.6639968E12, 1121.0], [1.66399674E12, 462.125]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.6639968E12, 23933.0], [1.66399674E12, 1436.1666666666665]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399686E12, 72.66666666666667], [1.6639968E12, 183.66666666666666], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399686E12, 81.75000000000001], [1.6639968E12, 127.15384615384613], [1.66399674E12, 555.1764705882351]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399686E12, 247.625], [1.6639968E12, 932.9999999999999], [1.66399674E12, 337.2121212121211]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6639968E12, 1573.625], [1.66399674E12, 803.5666666666668]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.6639968E12, 1071.6], [1.66399674E12, 420.07142857142856]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.6639968E12, 5365.0], [1.66399674E12, 595.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399686E12, 227.58333333333331], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 125.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399686E12, 0.0], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399686E12, 258.1538461538462], [1.66399698E12, 0.0], [1.6639968E12, 0.0], [1.66399692E12, 124.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399698E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66399674E12, "maxY": 89200.0, "series": [{"data": [[1.66399686E12, 89200.0], [1.66399698E12, 6545.0], [1.6639968E12, 82588.0], [1.66399692E12, 24551.0], [1.66399674E12, 20929.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66399686E12, 2596.400000000001], [1.66399698E12, 1154.0000000000027], [1.6639968E12, 41187.800000000025], [1.66399692E12, 1630.6], [1.66399674E12, 9700.0]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66399686E12, 84007.73999999999], [1.66399698E12, 6545.0], [1.6639968E12, 80949.3], [1.66399692E12, 6648.280000000002], [1.66399674E12, 18344.750000000004]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66399686E12, 5337.099999999999], [1.66399698E12, 5403.449999999999], [1.6639968E12, 60754.69999999992], [1.66399692E12, 2731.899999999999], [1.66399674E12, 12939.149999999998]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66399686E12, 10.0], [1.66399698E12, 15.0], [1.6639968E12, 16.0], [1.66399692E12, 11.0], [1.66399674E12, 14.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66399686E12, 474.0], [1.66399698E12, 247.0], [1.6639968E12, 6250.0], [1.66399692E12, 298.0], [1.66399674E12, 2249.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399698E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 16.0, "minX": 1.0, "maxY": 119515.0, "series": [{"data": [[2.0, 4132.5], [35.0, 649.0], [36.0, 456.0], [39.0, 270.0], [3.0, 1705.0], [51.0, 344.0], [4.0, 5697.5], [5.0, 994.0], [6.0, 1381.0], [7.0, 2052.0], [8.0, 3177.0], [9.0, 1628.0], [10.0, 1513.0], [11.0, 1695.0], [12.0, 321.0], [13.0, 506.0], [14.0, 491.0], [15.0, 523.0], [1.0, 385.0], [16.0, 329.0], [17.0, 312.0], [18.0, 370.0], [19.0, 447.0], [21.0, 325.0], [22.0, 341.5], [24.0, 605.0], [26.0, 271.0], [27.0, 273.0], [28.0, 391.5]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 12913.5], [9.0, 44883.0], [19.0, 119515.0], [12.0, 91758.0], [26.0, 118.0], [27.0, 16.0], [28.0, 4888.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 51.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 1614.0, "series": [{"data": [[2.0, 648.5], [35.0, 0.0], [36.0, 0.0], [39.0, 0.0], [3.0, 544.0], [51.0, 0.0], [4.0, 689.0], [5.0, 0.0], [6.0, 0.0], [7.0, 644.0], [8.0, 832.5], [9.0, 668.0], [10.0, 363.5], [11.0, 436.0], [12.0, 0.0], [13.0, 0.0], [14.0, 0.0], [15.0, 255.0], [1.0, 367.5], [16.0, 0.0], [17.0, 0.0], [18.0, 0.0], [19.0, 0.0], [21.0, 0.0], [22.0, 0.0], [24.0, 0.0], [26.0, 0.0], [27.0, 0.0], [28.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 1614.0], [9.0, 528.0], [19.0, 1193.5], [12.0, 712.0], [26.0, 0.0], [27.0, 0.0], [28.0, 186.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 51.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.8166666666666667, "minX": 1.66399674E12, "maxY": 13.5, "series": [{"data": [[1.66399686E12, 13.5], [1.66399698E12, 0.8166666666666667], [1.6639968E12, 3.95], [1.66399692E12, 5.883333333333334], [1.66399674E12, 6.633333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399698E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399674E12, "maxY": 11.5, "series": [{"data": [[1.66399686E12, 1.6666666666666667], [1.66399698E12, 0.13333333333333333], [1.6639968E12, 4.566666666666666], [1.66399692E12, 0.5833333333333334], [1.66399674E12, 3.7]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66399686E12, 0.5666666666666667], [1.66399698E12, 0.03333333333333333], [1.6639968E12, 0.06666666666666667], [1.66399692E12, 0.23333333333333334], [1.66399674E12, 0.31666666666666665]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66399686E12, 11.5], [1.66399698E12, 0.7], [1.6639968E12, 1.4], [1.66399692E12, 5.183333333333334]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}, {"data": [[1.66399686E12, 0.05], [1.66399692E12, 0.03333333333333333], [1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399698E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399674E12, "maxY": 0.5666666666666667, "series": [{"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.05], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.6639968E12, 0.21666666666666667], [1.66399674E12, 0.5666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-failure", "isController": false}, {"data": [[1.6639968E12, 0.03333333333333333], [1.66399674E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-failure", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66399686E12, 0.03333333333333333], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "Dashboard-failure", "isController": true}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.6639968E12, 0.016666666666666666], [1.66399674E12, 0.3]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.6639968E12, 0.3], [1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.6639968E12, 0.25], [1.66399674E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-failure", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66399686E12, 0.16666666666666666], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.6639968E12, 0.11666666666666667]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.6639968E12, 0.1], [1.66399674E12, 0.2]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-17-failure", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.05], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-failure", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.6639968E12, 0.23333333333333334], [1.66399674E12, 0.55]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.6639968E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-failure", "isController": false}, {"data": [[1.66399674E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66399686E12, 0.03333333333333333], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-failure", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-failure", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-failure", "isController": true}, {"data": [[1.66399686E12, 0.13333333333333333], [1.6639968E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-9-failure", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66399686E12, 0.16666666666666666], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.1]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66399686E12, 0.13333333333333333], [1.6639968E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66399686E12, 0.18333333333333332], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.6639968E12, 0.15], [1.66399674E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.6639968E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.6639968E12, 0.3], [1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.6639968E12, 0.06666666666666667], [1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666]], "isOverall": false, "label": "Form Numbers-failure", "isController": true}, {"data": [[1.6639968E12, 0.13333333333333333], [1.66399674E12, 0.48333333333333334]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.6639968E12, 0.26666666666666666], [1.66399674E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-2-failure", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.6639968E12, 0.06666666666666667], [1.66399674E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66399686E12, 0.18333333333333332], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.03333333333333333], [1.66399692E12, 0.05]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.6639968E12, 0.25], [1.66399674E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.6639968E12, 0.3], [1.66399674E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-failure", "isController": false}, {"data": [[1.6639968E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66399686E12, 0.18333333333333332], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.6639968E12, 0.08333333333333333], [1.66399674E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.6639968E12, 0.23333333333333334], [1.66399674E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.6639968E12, 0.23333333333333334], [1.66399674E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66399686E12, 0.016666666666666666], [1.6639968E12, 0.03333333333333333], [1.66399674E12, 0.26666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66399686E12, 0.21666666666666667], [1.6639968E12, 0.05], [1.66399692E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66399686E12, 0.13333333333333333], [1.66399698E12, 0.016666666666666666], [1.66399692E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66399692E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.66399698E12, 0.016666666666666666], [1.6639968E12, 0.016666666666666666], [1.66399692E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399698E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66399674E12, "maxY": 14.366666666666667, "series": [{"data": [[1.66399686E12, 14.366666666666667], [1.66399698E12, 0.9], [1.6639968E12, 6.233333333333333], [1.66399692E12, 6.116666666666666], [1.66399674E12, 4.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66399686E12, 0.2], [1.6639968E12, 0.03333333333333333], [1.66399692E12, 0.11666666666666667], [1.66399674E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399698E12, "title": "Total Transactions Per Second"}},
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
