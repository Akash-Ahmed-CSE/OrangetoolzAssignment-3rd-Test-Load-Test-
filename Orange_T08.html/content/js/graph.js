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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 13.0, "series": [{"data": [[300.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[200.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1400.0, 1.0], [400.0, 1.0], [200.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[200.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[400.0, 3.0], [900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0], [400.0, 1.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[4700.0, 1.0], [5700.0, 1.0], [11300.0, 1.0], [3100.0, 1.0], [3400.0, 1.0], [3900.0, 2.0], [4000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[2400.0, 1.0], [2500.0, 1.0], [1300.0, 1.0], [2800.0, 1.0], [2700.0, 2.0], [1700.0, 1.0], [3500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1100.0, 2.0], [1200.0, 3.0], [1300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[4800.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [3500.0, 1.0], [1900.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[4300.0, 1.0], [4400.0, 1.0], [5100.0, 1.0], [2500.0, 1.0], [10700.0, 1.0], [5200.0, 1.0], [5700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1400.0, 1.0], [700.0, 1.0], [3000.0, 1.0], [6500.0, 1.0], [800.0, 2.0], [1000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1100.0, 2.0], [2200.0, 1.0], [2600.0, 1.0], [1000.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[4700.0, 1.0], [2500.0, 1.0], [2800.0, 1.0], [800.0, 1.0], [1700.0, 1.0], [4000.0, 1.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[8600.0, 1.0], [9300.0, 1.0], [5600.0, 1.0], [11200.0, 1.0], [5500.0, 1.0], [12800.0, 1.0], [6700.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[4200.0, 1.0], [4800.0, 2.0], [10400.0, 1.0], [5300.0, 1.0], [6200.0, 1.0], [3300.0, 1.0], [3600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[4100.0, 1.0], [2400.0, 1.0], [5800.0, 1.0], [1800.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[4200.0, 2.0], [2300.0, 1.0], [2800.0, 1.0], [2700.0, 3.0], [3000.0, 1.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2100.0, 3.0], [4800.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[600.0, 1.0], [400.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[200.0, 7.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [700.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[300.0, 1.0], [200.0, 6.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[600.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[700.0, 1.0], [1500.0, 1.0], [200.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [200.0, 3.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 1.0], [2500.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [200.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[200.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 2.0], [300.0, 1.0], [200.0, 2.0], [100.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 5.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[300.0, 4.0], [1400.0, 1.0], [200.0, 1.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1500.0, 2.0], [800.0, 1.0], [400.0, 1.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 6.0], [900.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 6.0], [200.0, 1.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 3.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[40600.0, 1.0], [24400.0, 1.0], [29200.0, 1.0], [29500.0, 1.0], [31500.0, 1.0], [31400.0, 1.0], [31700.0, 1.0], [31900.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 3.0], [1300.0, 1.0], [200.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[300.0, 2.0], [1400.0, 1.0], [200.0, 3.0], [1600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [600.0, 1.0], [400.0, 1.0], [200.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1100.0, 1.0], [700.0, 1.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[200.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[200.0, 5.0], [800.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1200.0, 1.0], [2400.0, 1.0], [200.0, 3.0], [900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [200.0, 3.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[600.0, 1.0], [300.0, 3.0], [1700.0, 1.0], [500.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[300.0, 2.0], [2500.0, 1.0], [1400.0, 1.0], [200.0, 1.0], [1600.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[600.0, 3.0], [300.0, 1.0], [2500.0, 1.0], [2900.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2100.0, 3.0], [4800.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[300.0, 1.0], [200.0, 5.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[600.0, 2.0], [200.0, 5.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1500.0, 1.0], [200.0, 5.0], [500.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1100.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[4100.0, 1.0], [2400.0, 1.0], [5800.0, 1.0], [1800.0, 1.0], [3600.0, 1.0], [3700.0, 1.0], [3800.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[300.0, 2.0], [600.0, 1.0], [200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[300.0, 1.0], [200.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[40600.0, 1.0], [24400.0, 1.0], [29200.0, 1.0], [29500.0, 1.0], [31500.0, 1.0], [31400.0, 1.0], [31700.0, 1.0], [31900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[600.0, 2.0], [200.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [600.0, 1.0], [200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[300.0, 1.0], [200.0, 5.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 2.0], [700.0, 1.0], [800.0, 2.0], [200.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[300.0, 5.0], [1400.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[200.0, 3.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[300.0, 2.0], [200.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 6.0], [300.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[2900.0, 1.0], [200.0, 5.0], [800.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[2600.0, 1.0], [200.0, 1.0], [800.0, 3.0], [7800.0, 1.0], [1000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[4500.0, 1.0], [2500.0, 1.0], [2600.0, 1.0], [3000.0, 2.0], [3100.0, 1.0], [1600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[4200.0, 2.0], [2300.0, 1.0], [2800.0, 1.0], [2700.0, 3.0], [3000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 2.0], [1200.0, 1.0], [200.0, 1.0], [100.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[600.0, 2.0], [200.0, 3.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0], [400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [100.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 7.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[600.0, 1.0], [1800.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1300.0, 1.0], [400.0, 6.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[100.0, 6.0], [400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[800.0, 1.0], [200.0, 6.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[39300.0, 1.0], [22900.0, 1.0], [27800.0, 1.0], [28200.0, 1.0], [30600.0, 1.0], [30200.0, 2.0], [30300.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[600.0, 3.0], [38100.0, 1.0], [700.0, 1.0], [800.0, 5.0], [900.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [22400.0, 1.0], [26700.0, 1.0], [27700.0, 1.0], [29600.0, 1.0], [30000.0, 1.0], [29800.0, 1.0], [29900.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[300.0, 13.0], [1200.0, 1.0], [700.0, 1.0], [200.0, 4.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[300.0, 7.0], [200.0, 5.0], [400.0, 1.0], [1900.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1100.0, 2.0], [2400.0, 1.0], [1200.0, 1.0], [10000.0, 1.0], [1500.0, 1.0], [1600.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[2200.0, 1.0], [1200.0, 2.0], [700.0, 2.0], [800.0, 1.0], [3400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[600.0, 1.0], [300.0, 2.0], [1300.0, 1.0], [200.0, 3.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [1700.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 40600.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 152.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 421.0, "series": [{"data": [[0.0, 421.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 235.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 152.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400634E12, "maxY": 8.0, "series": [{"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-15", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-37", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-13", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-24", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-6", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.6640064E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-29", "isController": false}, {"data": [[1.6640064E12, 6.821501014198785], [1.66400646E12, 1.9555555555555557], [1.66400634E12, 8.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-4", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-51", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-30", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-21", "isController": false}, {"data": [[1.6640064E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-32", "isController": false}, {"data": [[1.6640064E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-43", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400646E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 31317.5, "series": [{"data": [[8.0, 283.0], [2.0, 252.0], [6.0, 289.5], [7.0, 261.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[6.375, 272.74999999999994]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[8.0, 407.0], [2.0, 239.0], [6.0, 270.0], [7.0, 246.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[6.375, 291.50000000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[8.0, 268.0], [2.0, 235.0], [6.0, 277.5], [7.0, 264.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[6.375, 264.75000000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[8.0, 332.5], [2.0, 259.0], [6.0, 852.5], [7.0, 256.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[6.375, 424.62500000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[8.0, 271.0], [2.0, 240.0], [6.0, 277.0], [7.0, 262.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[6.375, 265.37500000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[8.0, 422.5], [2.0, 508.0], [6.0, 255.0], [7.0, 424.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[6.375, 392.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[8.0, 530.0], [2.0, 506.0], [6.0, 553.5], [7.0, 628.6666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[6.375, 569.8750000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[8.0, 268.0], [2.0, 503.0], [6.0, 393.5], [7.0, 424.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[6.375, 387.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[8.0, 279.0], [2.0, 572.0], [6.0, 519.5], [7.0, 431.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[6.375, 433.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[8.0, 261.5], [2.0, 610.0], [6.0, 529.0], [7.0, 662.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[6.375, 522.125]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[8.0, 5054.875]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[8.0, 5054.875]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[8.0, 2498.25]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[8.0, 2498.25]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[8.0, 1327.75]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[8.0, 1327.75]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[8.0, 2275.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8.0, 2275.0]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[8.0, 5784.375000000001]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[8.0, 5784.375000000001]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[8.0, 2067.6249999999995]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[8.0, 2067.6249999999995]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[8.0, 1257.625]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[8.0, 1257.625]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[8.0, 2421.125]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[8.0, 2421.125]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[8.0, 8526.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[8.0, 8526.0]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[8.0, 5354.5]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[8.0, 5354.5]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1827.0], [4.0, 3636.0], [2.0, 5801.0], [1.0, 4179.0], [5.0, 4054.0], [6.0, 3879.0], [3.0, 3786.0], [7.0, 2418.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[4.5, 3697.5]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[8.0, 3260.5], [7.0, 3040.5]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[7.5, 3150.5]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[8.0, 2100.5], [2.0, 3710.0], [6.0, 2798.5], [7.0, 3006.6666666666665]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[6.375, 2816.0]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[8.0, 524.0], [7.0, 572.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[7.5, 548.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[8.0, 269.5], [2.0, 257.0], [6.0, 638.0], [7.0, 259.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[6.375, 356.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[8.0, 618.75], [7.0, 661.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[7.5, 640.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[8.0, 268.0], [2.0, 236.0], [6.0, 300.0], [7.0, 490.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[6.375, 355.37499999999994]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[8.0, 258.0], [2.0, 258.0], [6.0, 458.0], [7.0, 267.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[6.375, 311.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[8.0, 413.75], [7.0, 761.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[7.5, 587.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[8.0, 676.5], [7.0, 712.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[7.5, 694.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 261.0], [4.0, 2947.0], [2.0, 2533.0], [1.0, 1626.0], [5.0, 257.0], [6.0, 1513.0], [3.0, 2387.0], [7.0, 601.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[4.5, 1515.6249999999998]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[8.0, 275.0], [7.0, 355.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[7.5, 315.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 376.0], [4.0, 57.0], [2.0, 55.0], [1.0, 1040.0], [5.0, 178.0], [6.0, 162.0], [3.0, 296.0], [7.0, 282.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[4.5, 305.75]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[8.0, 407.5], [7.0, 438.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[7.5, 422.875]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[8.0, 407.75], [7.0, 501.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[7.5, 454.625]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[8.0, 513.25], [7.0, 360.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[7.5, 437.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 327.0], [4.0, 351.0], [2.0, 1467.0], [1.0, 1076.0], [5.0, 238.0], [6.0, 305.0], [3.0, 318.0], [7.0, 517.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[4.5, 574.875]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 833.0], [4.0, 909.0], [2.0, 1513.0], [1.0, 1117.0], [5.0, 1507.0], [6.0, 1630.0], [3.0, 2438.0], [7.0, 479.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[4.5, 1303.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[8.0, 269.25], [7.0, 283.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[7.5, 276.37500000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 53.0], [4.0, 19.0], [2.0, 13.0], [1.0, 10.0], [5.0, 12.0], [6.0, 14.0], [3.0, 61.0], [7.0, 17.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[4.5, 24.875]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[8.0, 455.75], [7.0, 344.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[7.5, 400.125]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 88.0], [4.0, 55.0], [2.0, 65.0], [1.0, 75.0], [5.0, 54.0], [6.0, 164.0], [3.0, 64.0], [7.0, 292.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[4.5, 107.125]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 320.0], [4.0, 276.0], [2.0, 2352.0], [1.0, 292.0], [5.0, 285.0], [6.0, 346.0], [3.0, 335.0], [7.0, 264.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[4.5, 558.75]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[8.0, 31317.5]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[8.0, 31317.5]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 317.0], [4.0, 298.0], [2.0, 587.0], [1.0, 313.0], [5.0, 1039.0], [6.0, 1300.0], [3.0, 392.0], [7.0, 529.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[4.5, 596.875]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 327.0], [4.0, 345.0], [2.0, 1461.0], [1.0, 1051.0], [5.0, 246.0], [6.0, 1613.0], [3.0, 298.0], [7.0, 241.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[4.5, 697.75]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 328.0], [4.0, 929.0], [2.0, 285.0], [1.0, 1114.0], [5.0, 258.0], [6.0, 629.0], [3.0, 301.0], [7.0, 484.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[4.5, 541.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[8.0, 395.75], [7.0, 556.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[7.5, 475.875]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[8.0, 272.5], [7.0, 355.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[7.5, 314.125]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[8.0, 479.25], [7.0, 356.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[7.5, 417.74999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 519.0], [4.0, 246.0], [2.0, 229.0], [1.0, 2454.0], [5.0, 932.0], [6.0, 238.0], [3.0, 1276.0], [7.0, 567.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[4.5, 807.625]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 253.0], [4.0, 254.0], [2.0, 232.0], [1.0, 975.0], [5.0, 337.0], [6.0, 320.0], [3.0, 1700.0], [7.0, 612.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[4.5, 585.375]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 561.0], [4.0, 300.0], [2.0, 300.0], [1.0, 359.0], [5.0, 1092.0], [6.0, 593.0], [3.0, 1710.0], [7.0, 619.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[4.5, 691.75]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 258.0], [4.0, 542.0], [2.0, 2574.0], [1.0, 359.0], [5.0, 356.0], [6.0, 1481.0], [3.0, 1674.0], [7.0, 546.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[4.5, 973.7500000000001]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 293.0], [4.0, 2982.0], [2.0, 638.0], [1.0, 338.0], [5.0, 2538.0], [6.0, 656.0], [3.0, 658.0], [7.0, 548.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[4.5, 1081.375]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[8.0, 2100.5], [2.0, 3710.0], [6.0, 2798.5], [7.0, 3006.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[6.375, 2816.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 272.0], [4.0, 352.0], [2.0, 248.0], [1.0, 441.0], [5.0, 238.0], [6.0, 233.0], [3.0, 244.0], [7.0, 524.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[4.5, 319.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 268.0], [4.0, 1924.0], [2.0, 685.0], [1.0, 236.0], [5.0, 254.0], [6.0, 610.0], [3.0, 231.0], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[4.5, 556.2500000000001]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 290.0], [4.0, 1516.0], [2.0, 1018.0], [1.0, 266.0], [5.0, 252.0], [6.0, 252.0], [3.0, 259.0], [7.0, 515.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[4.5, 546.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 258.0], [4.0, 264.0], [2.0, 1199.0], [1.0, 510.0], [5.0, 277.0], [6.0, 233.0], [3.0, 257.0], [7.0, 257.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[4.5, 406.875]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 270.0], [4.0, 255.0], [2.0, 1172.0], [1.0, 276.0], [5.0, 258.0], [6.0, 254.0], [3.0, 258.0], [7.0, 249.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[4.5, 374.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1827.0], [4.0, 3636.0], [2.0, 5801.0], [1.0, 4179.0], [5.0, 4054.0], [6.0, 3879.0], [3.0, 3786.0], [7.0, 2418.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[4.5, 3697.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 275.0], [4.0, 362.0], [2.0, 246.0], [1.0, 242.0], [5.0, 264.0], [6.0, 334.0], [3.0, 620.0], [7.0, 254.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[4.5, 324.625]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 280.0], [4.0, 351.0], [2.0, 230.0], [1.0, 237.0], [5.0, 257.0], [6.0, 291.0], [3.0, 259.0], [7.0, 257.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[4.5, 270.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 259.0], [4.0, 365.0], [2.0, 249.0], [1.0, 252.0], [5.0, 255.0], [6.0, 599.0], [3.0, 258.0], [7.0, 252.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[4.5, 311.125]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[8.0, 31317.5]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[8.0, 31317.5]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[8.0, 435.0], [7.0, 412.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[7.5, 423.875]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[8.0, 301.75], [7.0, 418.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[7.5, 359.875]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[8.0, 636.75], [7.0, 362.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[7.5, 499.375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[8.0, 364.25], [7.0, 352.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[7.5, 358.375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[8.0, 981.0], [7.0, 616.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[7.5, 798.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[8.0, 354.5], [7.0, 655.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[7.5, 505.125]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[8.0, 403.75], [7.0, 468.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[7.5, 436.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[8.0, 283.5], [7.0, 277.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[7.5, 280.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[8.0, 131.0], [7.0, 91.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[7.5, 111.375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[8.0, 85.25], [7.0, 191.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[7.5, 138.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[8.0, 1603.125]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[8.0, 1603.125]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[8.0, 1866.8749999999998]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[8.0, 1866.8749999999998]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[8.0, 3093.125]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[8.0, 3093.125]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[8.0, 3260.5], [7.0, 3040.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[7.5, 3150.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[8.0, 90.0], [2.0, 164.0], [6.0, 839.5], [7.0, 180.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[6.375, 320.625]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[8.0, 411.0], [2.0, 592.0], [6.0, 594.5], [7.0, 429.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[6.375, 486.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[8.0, 278.5], [2.0, 549.0], [6.0, 430.0], [7.0, 423.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[6.375, 404.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[8.0, 399.0], [2.0, 632.0], [6.0, 603.5], [7.0, 337.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[6.375, 456.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[8.0, 443.0], [2.0, 576.0], [6.0, 529.0], [7.0, 428.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[6.375, 475.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[8.0, 80.5], [2.0, 168.0], [6.0, 560.5], [7.0, 160.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[6.375, 241.24999999999997]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[8.0, 57.0], [2.0, 23.0], [6.0, 112.5], [7.0, 33.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[6.375, 57.625]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[8.0, 738.875]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[8.0, 738.875]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[8.0, 549.125]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[8.0, 549.125]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[8.0, 281.875]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[8.0, 281.875]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[8.0, 377.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[8.0, 377.0]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[8.0, 29992.5]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[8.0, 29992.5]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[8.0, 615.75], [0.0, 15142.0625]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[2.6666666666666665, 10299.958333333334]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[8.0, 308.625], [0.0, 479.18750000000006]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[2.6666666666666665, 422.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[8.0, 571.875], [0.0, 332.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[4.0, 451.93749999999994]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[8.0, 2612.4999999999995]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[8.0, 2612.4999999999995]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[8.0, 1567.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[8.0, 1567.0]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[8.0, 503.5], [2.0, 253.0], [6.0, 472.0], [7.0, 337.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[6.375, 401.875]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[8.0, 467.0], [2.0, 1815.0], [6.0, 284.0], [7.0, 628.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[6.375, 650.25]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[8.0, 436.5], [2.0, 536.0], [6.0, 546.5], [7.0, 946.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[6.375, 667.625]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 8.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 1759.4833333333333, "minX": 1.66400634E12, "maxY": 340447.4, "series": [{"data": [[1.6640064E12, 122447.18333333333], [1.66400646E12, 1759.4833333333333], [1.66400634E12, 340447.4]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6640064E12, 14623.266666666666], [1.66400646E12, 3118.85], [1.66400634E12, 5585.816666666667]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400646E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 11.5, "minX": 1.66400634E12, "maxY": 33978.0, "series": [{"data": [[1.6640064E12, 275.71428571428567], [1.66400646E12, 252.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.6640064E12, 299.00000000000006], [1.66400646E12, 239.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.6640064E12, 269.00000000000006], [1.66400646E12, 235.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.6640064E12, 448.28571428571433], [1.66400646E12, 259.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.6640064E12, 269.00000000000006], [1.66400646E12, 240.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.6640064E12, 375.42857142857144], [1.66400646E12, 508.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.6640064E12, 579.0000000000001], [1.66400646E12, 506.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.6640064E12, 370.7142857142857], [1.66400646E12, 503.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.6640064E12, 413.14285714285717], [1.66400646E12, 572.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.6640064E12, 509.5714285714286], [1.66400646E12, 610.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400634E12, 5054.875]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400634E12, 2498.25]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400634E12, 1327.75]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400634E12, 2275.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400634E12, 5784.375000000001]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400634E12, 2067.6249999999995]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400634E12, 1257.625]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400634E12, 2421.125]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400634E12, 8526.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400634E12, 5354.5]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.6640064E12, 3628.714285714286], [1.66400646E12, 4179.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.6640064E12, 3189.285714285714], [1.66400634E12, 2879.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.6640064E12, 2912.5714285714284], [1.66400634E12, 2140.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.6640064E12, 545.1428571428571], [1.66400634E12, 568.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.6640064E12, 370.42857142857144], [1.66400646E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.6640064E12, 651.1428571428571], [1.66400634E12, 562.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.6640064E12, 372.4285714285714], [1.66400646E12, 236.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.6640064E12, 319.14285714285717], [1.66400646E12, 258.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.6640064E12, 632.0], [1.66400634E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.6640064E12, 716.8571428571428], [1.66400634E12, 536.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6640064E12, 658.0], [1.66400646E12, 2373.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.6640064E12, 320.2857142857143], [1.66400634E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6640064E12, 225.16666666666666], [1.66400646E12, 547.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.6640064E12, 444.57142857142856], [1.66400634E12, 271.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.6640064E12, 441.4285714285714], [1.66400634E12, 547.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.6640064E12, 422.42857142857144], [1.66400634E12, 539.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6640064E12, 342.6666666666667], [1.66400646E12, 1271.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6640064E12, 1071.6], [1.66400646E12, 1689.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.6640064E12, 276.85714285714283], [1.66400634E12, 273.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6640064E12, 29.333333333333332], [1.66400646E12, 11.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.6640064E12, 416.7142857142857], [1.66400634E12, 284.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6640064E12, 119.5], [1.66400646E12, 70.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6640064E12, 304.3333333333333], [1.66400646E12, 1322.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.6640064E12, 33978.0], [1.66400634E12, 29721.2]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6640064E12, 645.8333333333334], [1.66400646E12, 450.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6640064E12, 511.66666666666663], [1.66400646E12, 1256.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6640064E12, 488.1666666666667], [1.66400646E12, 699.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.6640064E12, 505.42857142857144], [1.66400634E12, 269.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.6640064E12, 320.2857142857143], [1.66400634E12, 271.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.6640064E12, 403.2857142857143], [1.66400634E12, 519.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6640064E12, 500.4], [1.66400646E12, 1319.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6640064E12, 355.2], [1.66400646E12, 969.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6640064E12, 812.5], [1.66400646E12, 329.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6640064E12, 809.5], [1.66400646E12, 1466.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6640064E12, 938.6], [1.66400646E12, 1319.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.6640064E12, 2688.285714285714], [1.66400646E12, 3710.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6640064E12, 323.8], [1.66400646E12, 311.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6640064E12, 343.5], [1.66400646E12, 769.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6640064E12, 565.0], [1.66400646E12, 514.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6640064E12, 257.8], [1.66400646E12, 655.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6640064E12, 257.2], [1.66400646E12, 568.6666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6640064E12, 3044.5], [1.66400646E12, 4350.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6640064E12, 297.8], [1.66400646E12, 369.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6640064E12, 287.2], [1.66400646E12, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6640064E12, 346.0], [1.66400646E12, 253.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.6640064E12, 33978.0], [1.66400634E12, 29721.2]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.6640064E12, 394.57142857142856], [1.66400634E12, 629.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.6640064E12, 359.7142857142857], [1.66400634E12, 361.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.6640064E12, 410.71428571428567], [1.66400634E12, 1120.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.6640064E12, 357.85714285714283], [1.66400634E12, 362.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.6640064E12, 796.0], [1.66400634E12, 816.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.6640064E12, 532.7142857142858], [1.66400634E12, 312.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.6640064E12, 458.4285714285714], [1.66400634E12, 279.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.6640064E12, 266.0], [1.66400634E12, 382.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.6640064E12, 75.85714285714286], [1.66400634E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.6640064E12, 147.57142857142856], [1.66400634E12, 75.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400634E12, 1603.125]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400634E12, 1866.8749999999998]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400634E12, 3093.125]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.6640064E12, 3189.285714285714], [1.66400634E12, 2879.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.6640064E12, 343.0], [1.66400646E12, 164.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.6640064E12, 471.14285714285717], [1.66400646E12, 592.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.6640064E12, 383.85714285714283], [1.66400646E12, 549.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.6640064E12, 430.85714285714283], [1.66400646E12, 632.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.6640064E12, 461.42857142857144], [1.66400646E12, 576.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.6640064E12, 251.7142857142857], [1.66400646E12, 168.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.6640064E12, 62.57142857142857], [1.66400646E12, 23.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400634E12, 738.875]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400634E12, 549.125]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400634E12, 281.875]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400634E12, 377.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.6640064E12, 32640.666666666668], [1.66400634E12, 28403.6]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6640064E12, 33865.0], [1.66400634E12, 8157.681818181821]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6640064E12, 822.6666666666666], [1.66400634E12, 365.1428571428571]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400634E12, 451.93749999999994]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400634E12, 2612.4999999999995]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400634E12, 1567.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.6640064E12, 423.14285714285717], [1.66400646E12, 253.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.6640064E12, 483.85714285714283], [1.66400646E12, 1815.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.6640064E12, 686.4285714285714], [1.66400646E12, 536.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400646E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400634E12, "maxY": 1815.0, "series": [{"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400634E12, 975.625]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400634E12, 699.2500000000001]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400634E12, 590.5]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400634E12, 783.25]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400634E12, 1370.875]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400634E12, 1296.2500000000002]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400634E12, 714.3749999999999]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400634E12, 1095.875]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400634E12, 1307.25]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400634E12, 634.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.6640064E12, 637.4285714285714], [1.66400646E12, 313.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.6640064E12, 532.7142857142858], [1.66400634E12, 312.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.6640064E12, 682.8571428571428], [1.66400634E12, 560.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6640064E12, 302.1666666666667], [1.66400646E12, 1322.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.6640064E12, 576.6666666666666], [1.66400634E12, 638.4]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6640064E12, 645.8333333333334], [1.66400646E12, 450.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.6640064E12, 686.2857142857143], [1.66400646E12, 536.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6640064E12, 796.25], [1.66400646E12, 397.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.6640064E12, 576.6666666666666], [1.66400634E12, 638.4]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.6640064E12, 329.7142857142857], [1.66400634E12, 816.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.6640064E12, 532.7142857142858], [1.66400634E12, 312.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400634E12, 1596.2500000000002]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400634E12, 1503.5]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400634E12, 824.8749999999999]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.6640064E12, 532.7142857142858], [1.66400634E12, 312.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400634E12, 646.625]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400634E12, 402.375]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400634E12, 146.75000000000003]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400634E12, 356.74999999999994]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.6640064E12, 473.0], [1.66400634E12, 1697.2]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6640064E12, 429.5], [1.66400634E12, 849.6363636363636]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6640064E12, 822.6666666666666], [1.66400634E12, 352.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400634E12, 374.8125]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400634E12, 961.75]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400634E12, 1160.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.6640064E12, 291.0], [1.66400646E12, 1815.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.6640064E12, 686.2857142857143], [1.66400646E12, 536.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400646E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400634E12, "maxY": 1306.4, "series": [{"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.6640064E12, 36.857142857142854], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.6640064E12, 40.285714285714285], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.6640064E12, 109.42857142857142], [1.66400646E12, 253.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.6640064E12, 220.42857142857142], [1.66400646E12, 252.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.6640064E12, 106.0], [1.66400646E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.6640064E12, 145.14285714285714], [1.66400646E12, 338.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.6640064E12, 147.28571428571428], [1.66400646E12, 352.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400634E12, 68.75]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400634E12, 176.125]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400634E12, 69.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400634E12, 328.125]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400634E12, 299.375]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400634E12, 818.1249999999999]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.6640064E12, 103.57142857142858], [1.66400646E12, 0.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.6640064E12, 75.14285714285714], [1.66400634E12, 0.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.6640064E12, 191.14285714285717], [1.66400634E12, 259.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.6640064E12, 263.7142857142857], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.6640064E12, 197.2857142857143], [1.66400634E12, 276.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.6640064E12, 45.857142857142854], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.6640064E12, 337.42857142857144], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.6640064E12, 74.28571428571429], [1.66400634E12, 261.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6640064E12, 380.5], [1.66400646E12, 1028.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.6640064E12, 45.285714285714285], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6640064E12, 147.5], [1.66400646E12, 275.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.6640064E12, 153.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.6640064E12, 149.2857142857143], [1.66400634E12, 271.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.6640064E12, 45.285714285714285], [1.66400634E12, 270.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6640064E12, 43.0], [1.66400646E12, 134.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6640064E12, 167.6], [1.66400646E12, 204.33333333333331]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6640064E12, 1.5], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.6640064E12, 45.142857142857146], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6640064E12, 58.5], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.6640064E12, 264.0], [1.66400634E12, 316.4]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6640064E12, 80.33333333333334], [1.66400646E12, 121.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6640064E12, 56.33333333333333], [1.66400646E12, 145.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6640064E12, 88.66666666666667], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.6640064E12, 38.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.6640064E12, 45.142857142857146], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.6640064E12, 45.142857142857146], [1.66400634E12, 254.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6640064E12, 115.6], [1.66400646E12, 421.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6640064E12, 71.6], [1.66400646E12, 452.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6640064E12, 392.6666666666667], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6640064E12, 521.0], [1.66400646E12, 647.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6640064E12, 435.2], [1.66400646E12, 538.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.6640064E12, 191.85714285714286], [1.66400646E12, 254.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6640064E12, 46.599999999999994], [1.66400646E12, 73.33333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6640064E12, 64.25], [1.66400646E12, 87.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6640064E12, 99.2], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 89.33333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6640064E12, 120.5], [1.66400646E12, 60.75]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 86.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6640064E12, 50.2], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.6640064E12, 264.0], [1.66400634E12, 316.4]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.6640064E12, 114.71428571428571], [1.66400634E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.6640064E12, 75.57142857142857], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.6640064E12, 123.7142857142857], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.6640064E12, 80.14285714285714], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.6640064E12, 75.14285714285714], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.6640064E12, 189.2857142857143], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.6640064E12, 178.71428571428572], [1.66400634E12, 289.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.6640064E12, 6.857142857142857], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.6640064E12, 43.42857142857143], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.6640064E12, 75.14285714285714], [1.66400634E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.6640064E12, 236.71428571428572], [1.66400646E12, 110.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.6640064E12, 200.14285714285714], [1.66400646E12, 243.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.6640064E12, 113.71428571428571], [1.66400646E12, 233.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.6640064E12, 161.42857142857144], [1.66400646E12, 263.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.6640064E12, 203.57142857142858], [1.66400646E12, 276.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.6640064E12, 167.57142857142856], [1.66400646E12, 110.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.6640064E12, 16.857142857142858], [1.66400646E12, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400634E12, 280.375]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400634E12, 279.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400634E12, 67.375]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400634E12, 236.125]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.6640064E12, 190.66666666666666], [1.66400634E12, 1306.4]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.6640064E12, 145.5], [1.66400634E12, 442.68181818181824]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6640064E12, 216.66666666666669], [1.66400634E12, 121.33333333333333]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400634E12, 139.99999999999997]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400634E12, 206.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400634E12, 410.625]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.6640064E12, 143.85714285714286], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.6640064E12, 0.0], [1.66400646E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.6640064E12, 191.85714285714286], [1.66400646E12, 254.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400646E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66400634E12, "maxY": 40693.0, "series": [{"data": [[1.6640064E12, 40693.0], [1.66400646E12, 5801.0], [1.66400634E12, 31931.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6640064E12, 1153.5], [1.66400646E12, 2533.0], [1.66400634E12, 8379.000000000004]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6640064E12, 30678.75], [1.66400646E12, 5801.0], [1.66400634E12, 31520.12]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6640064E12, 2109.25], [1.66400646E12, 3673.0], [1.66400634E12, 27443.19999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6640064E12, 12.0], [1.66400646E12, 10.0], [1.66400634E12, 75.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6640064E12, 295.5], [1.66400646E12, 503.0], [1.66400634E12, 923.0]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400646E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 264.0, "minX": 1.0, "maxY": 3429.5, "series": [{"data": [[2.0, 3429.5], [8.0, 570.5], [9.0, 283.0], [10.0, 830.0], [11.0, 350.0], [3.0, 595.0], [12.0, 418.5], [13.0, 603.5], [14.0, 542.5], [15.0, 497.0], [4.0, 533.5], [1.0, 462.0], [16.0, 335.0], [17.0, 593.0], [18.0, 285.5], [5.0, 1640.0], [20.0, 283.0], [21.0, 879.0], [22.0, 479.0], [23.0, 394.0], [6.0, 1166.0], [25.0, 285.0], [27.0, 264.0], [7.0, 475.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 574.5, "series": [{"data": [[2.0, 352.5], [8.0, 0.0], [9.0, 0.0], [10.0, 574.5], [11.0, 0.0], [3.0, 292.0], [12.0, 268.0], [13.0, 313.0], [14.0, 186.5], [15.0, 0.0], [4.0, 330.5], [1.0, 317.0], [16.0, 0.0], [17.0, 318.0], [18.0, 0.0], [5.0, 313.5], [20.0, 0.0], [21.0, 545.0], [22.0, 0.0], [23.0, 0.0], [6.0, 427.5], [25.0, 0.0], [27.0, 0.0], [7.0, 139.5]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 27.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.3, "minX": 1.66400634E12, "maxY": 7.933333333333334, "series": [{"data": [[1.6640064E12, 7.933333333333334], [1.66400646E12, 1.3], [1.66400634E12, 4.233333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400646E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.66400634E12, "maxY": 6.75, "series": [{"data": [[1.6640064E12, 0.8166666666666667], [1.66400646E12, 0.13333333333333333], [1.66400634E12, 3.5833333333333335]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6640064E12, 0.3333333333333333], [1.66400646E12, 0.05], [1.66400634E12, 0.15]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.6640064E12, 6.75], [1.66400646E12, 1.3], [1.66400634E12, 0.35]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400646E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66400634E12, "maxY": 0.36666666666666664, "series": [{"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.6640064E12, 0.03333333333333333], [1.66400634E12, 0.36666666666666664]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.6640064E12, 0.06666666666666667], [1.66400646E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.6640064E12, 0.06666666666666667], [1.66400646E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.6640064E12, 0.05], [1.66400634E12, 0.08333333333333333]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.6640064E12, 0.05], [1.66400634E12, 0.35]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.6640064E12, 0.05], [1.66400634E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.6640064E12, 0.05], [1.66400634E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66400634E12, 0.26666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.6640064E12, 0.06666666666666667], [1.66400646E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66400634E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400634E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.6640064E12, 0.08333333333333333], [1.66400646E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.6640064E12, 0.1], [1.66400646E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.6640064E12, 0.11666666666666667], [1.66400646E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400646E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 1.5, "minX": 1.66400634E12, "maxY": 8.3, "series": [{"data": [[1.6640064E12, 8.3], [1.66400646E12, 1.5], [1.66400634E12, 4.2]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400646E12, "title": "Total Transactions Per Second"}},
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
