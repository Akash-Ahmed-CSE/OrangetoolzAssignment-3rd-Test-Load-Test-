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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 9.0, "series": [{"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[400.0, 3.0], [200.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[400.0, 5.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[200.0, 4.0], [400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[200.0, 3.0], [400.0, 4.0], [100.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[600.0, 1.0], [200.0, 2.0], [400.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[4100.0, 1.0], [9300.0, 1.0], [5000.0, 1.0], [12100.0, 1.0], [11900.0, 1.0], [3300.0, 1.0], [6800.0, 1.0], [7200.0, 1.0], [7500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[4200.0, 2.0], [4600.0, 1.0], [1200.0, 1.0], [2600.0, 1.0], [2800.0, 1.0], [2900.0, 1.0], [1600.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [5100.0, 1.0], [5400.0, 1.0], [5700.0, 1.0], [5800.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1100.0, 1.0], [2300.0, 1.0], [8900.0, 1.0], [1200.0, 1.0], [5300.0, 1.0], [3100.0, 2.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8500.0, 1.0], [8200.0, 1.0], [4500.0, 1.0], [2200.0, 1.0], [10700.0, 1.0], [2600.0, 1.0], [5800.0, 1.0], [3600.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[2100.0, 1.0], [1200.0, 2.0], [600.0, 1.0], [1400.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [1600.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[2100.0, 1.0], [2300.0, 1.0], [600.0, 1.0], [4800.0, 1.0], [900.0, 1.0], [3900.0, 1.0], [500.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[600.0, 2.0], [1200.0, 1.0], [1300.0, 1.0], [1600.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[4300.0, 1.0], [8500.0, 1.0], [4200.0, 1.0], [10000.0, 1.0], [11100.0, 1.0], [6200.0, 1.0], [6600.0, 1.0], [7800.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[2300.0, 1.0], [5100.0, 2.0], [10500.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [6100.0, 1.0], [3400.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2300.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[2100.0, 2.0], [2200.0, 1.0], [1500.0, 1.0], [1700.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2100.0, 1.0], [1500.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[400.0, 3.0], [200.0, 2.0], [500.0, 3.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[400.0, 5.0], [900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[400.0, 2.0], [200.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[400.0, 4.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[200.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 2.0], [100.0, 6.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[400.0, 4.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[200.0, 5.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 7.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 5.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 5.0], [400.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 6.0], [100.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1600.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[18800.0, 1.0], [20100.0, 1.0], [21600.0, 1.0], [22800.0, 1.0], [23100.0, 1.0], [23600.0, 1.0], [24400.0, 1.0], [25000.0, 2.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 4.0], [200.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[200.0, 3.0], [400.0, 3.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[400.0, 2.0], [200.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[200.0, 3.0], [400.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[200.0, 5.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[400.0, 4.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[200.0, 1.0], [400.0, 2.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2100.0, 1.0], [1500.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[200.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2300.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [1800.0, 2.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[200.0, 7.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[18800.0, 1.0], [20100.0, 1.0], [21600.0, 1.0], [22800.0, 1.0], [23100.0, 1.0], [23600.0, 1.0], [24400.0, 1.0], [25000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[200.0, 3.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[600.0, 1.0], [200.0, 6.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[600.0, 1.0], [200.0, 5.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[300.0, 1.0], [400.0, 3.0], [200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[200.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[200.0, 5.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[400.0, 3.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[0.0, 3.0], [100.0, 5.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 5.0], [1600.0, 1.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[2300.0, 1.0], [300.0, 6.0], [2400.0, 1.0], [1300.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[4800.0, 1.0], [2400.0, 1.0], [2900.0, 1.0], [1500.0, 1.0], [3200.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [4000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[2100.0, 2.0], [2200.0, 1.0], [1500.0, 1.0], [1700.0, 4.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 5.0], [100.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[200.0, 4.0], [400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[400.0, 2.0], [200.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[200.0, 6.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[200.0, 1.0], [400.0, 3.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 2.0], [100.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[600.0, 2.0], [2900.0, 1.0], [1500.0, 1.0], [1900.0, 1.0], [500.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1200.0, 1.0], [2800.0, 1.0], [1400.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1000.0, 2.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 4.0], [1100.0, 1.0], [700.0, 1.0], [100.0, 2.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[8200.0, 1.0], [1100.0, 2.0], [4500.0, 1.0], [800.0, 2.0], [200.0, 1.0], [1700.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[17400.0, 1.0], [17000.0, 1.0], [20000.0, 1.0], [20800.0, 2.0], [22200.0, 1.0], [22500.0, 1.0], [23900.0, 1.0], [15900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[600.0, 2.0], [2400.0, 1.0], [2600.0, 1.0], [700.0, 3.0], [2700.0, 1.0], [800.0, 1.0], [3400.0, 1.0], [3600.0, 1.0], [15400.0, 1.0], [1000.0, 1.0], [17100.0, 1.0], [16600.0, 1.0], [4400.0, 1.0], [1200.0, 1.0], [20300.0, 2.0], [19500.0, 1.0], [21100.0, 1.0], [22000.0, 1.0], [23400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 1.0], [2700.0, 1.0], [700.0, 1.0], [200.0, 5.0], [800.0, 1.0], [900.0, 1.0], [300.0, 2.0], [1300.0, 1.0], [1500.0, 1.0], [400.0, 4.0], [1600.0, 1.0], [1800.0, 1.0], [500.0, 5.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[2200.0, 2.0], [1100.0, 1.0], [2300.0, 1.0], [1200.0, 2.0], [300.0, 3.0], [600.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [3000.0, 1.0], [800.0, 1.0], [1900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[4300.0, 1.0], [1200.0, 1.0], [1300.0, 3.0], [2600.0, 1.0], [700.0, 1.0], [12700.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[4900.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1500.0, 1.0], [800.0, 1.0], [6500.0, 1.0], [3800.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[200.0, 6.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 25000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 4.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 549.0, "series": [{"data": [[0.0, 549.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 183.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 173.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 4.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400652E12, "maxY": 9.0, "series": [{"data": [[1.66400658E12, 0.0], [1.66400652E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-26", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-37", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-49", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-13", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-35", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-29", "isController": false}, {"data": [[1.66400658E12, 8.712585034013603], [1.66400664E12, 4.969283276450517], [1.66400652E12, 9.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66400652E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-2", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-40", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-22", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-33", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-12", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-20", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-42", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-21", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400664E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 22751.111111111113, "series": [{"data": [[9.0, 249.0], [6.0, 254.33333333333334], [7.0, 247.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[7.333333333333332, 250.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[9.0, 250.66666666666666], [6.0, 251.66666666666666], [7.0, 329.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[7.333333333333332, 277.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[9.0, 249.0], [6.0, 241.33333333333334], [7.0, 238.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[7.333333333333332, 243.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[9.0, 252.0], [6.0, 342.6666666666667], [7.0, 249.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[7.333333333333332, 281.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[9.0, 243.0], [6.0, 332.0], [7.0, 252.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[7.333333333333332, 275.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[9.0, 325.6666666666667], [6.0, 430.3333333333333], [7.0, 415.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[7.333333333333332, 390.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[9.0, 323.6666666666667], [6.0, 477.6666666666667], [7.0, 418.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[7.333333333333332, 406.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[9.0, 249.33333333333334], [6.0, 489.6666666666667], [7.0, 418.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[7.333333333333332, 385.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[9.0, 242.33333333333334], [6.0, 378.3333333333333], [7.0, 504.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[7.333333333333332, 375.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[9.0, 430.0], [6.0, 416.3333333333333], [7.0, 539.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[7.333333333333332, 461.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[9.0, 7515.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[9.0, 7515.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[9.0, 2931.1111111111113]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[9.0, 2931.1111111111113]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[9.0, 3804.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[9.0, 3804.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[9.0, 3209.444444444445]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[9.0, 3209.444444444445]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[9.0, 5621.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[9.0, 5621.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[9.0, 1490.111111111111]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[9.0, 1490.111111111111]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[9.0, 1954.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[9.0, 1954.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[9.0, 1877.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[9.0, 1877.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[9.0, 7434.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[9.0, 7434.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[9.0, 5196.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[9.0, 5196.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1829.0], [4.0, 2324.0], [2.0, 1987.0], [1.0, 2086.0], [9.0, 2939.0], [5.0, 1961.0], [6.0, 1415.0], [3.0, 1853.0], [7.0, 2005.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[5.0, 2044.3333333333333]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[8.0, 2111.0], [9.0, 1837.142857142857], [7.0, 2159.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[8.666666666666666, 1903.3333333333333]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[9.0, 1671.3333333333333], [6.0, 1851.0], [7.0, 1890.3333333333333]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[7.333333333333332, 1804.2222222222222]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[8.0, 265.0], [9.0, 530.7142857142857], [7.0, 490.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[8.666666666666666, 496.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[9.0, 251.0], [6.0, 247.66666666666666], [7.0, 243.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[7.333333333333332, 247.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[8.0, 493.0], [9.0, 560.8571428571429], [7.0, 489.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[8.666666666666666, 545.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[9.0, 252.33333333333334], [6.0, 241.33333333333334], [7.0, 256.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[7.333333333333332, 250.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[9.0, 249.66666666666666], [6.0, 238.0], [7.0, 321.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[7.333333333333332, 269.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[8.0, 492.0], [9.0, 441.42857142857144], [7.0, 555.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[8.666666666666666, 459.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[8.0, 266.0], [9.0, 246.42857142857144], [7.0, 501.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[8.666666666666666, 276.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 493.0], [4.0, 510.0], [2.0, 499.0], [1.0, 483.0], [9.0, 534.0], [5.0, 221.0], [6.0, 260.0], [3.0, 504.0], [7.0, 482.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[5.0, 442.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [9.0, 280.85714285714283], [7.0, 493.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[8.666666666666666, 301.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 166.0], [4.0, 167.0], [2.0, 163.0], [1.0, 207.0], [9.0, 163.0], [5.0, 56.0], [6.0, 58.0], [3.0, 173.0], [7.0, 160.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[5.0, 145.88888888888886]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[8.0, 504.0], [9.0, 460.5714285714286], [7.0, 241.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[8.666666666666666, 441.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[8.0, 518.0], [9.0, 347.57142857142856], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[8.666666666666666, 354.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[8.0, 258.0], [9.0, 315.57142857142856], [7.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[8.666666666666666, 301.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 457.0], [4.0, 526.0], [2.0, 514.0], [1.0, 265.0], [9.0, 260.0], [5.0, 234.0], [6.0, 254.0], [3.0, 282.0], [7.0, 453.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[5.0, 360.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 263.0], [4.0, 251.0], [2.0, 524.0], [1.0, 487.0], [9.0, 264.0], [5.0, 504.0], [6.0, 267.0], [3.0, 282.0], [7.0, 490.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[5.0, 370.2222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[8.0, 248.0], [9.0, 243.28571428571428], [7.0, 241.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[8.666666666666666, 243.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 18.0], [4.0, 25.0], [2.0, 18.0], [1.0, 20.0], [9.0, 13.0], [5.0, 16.0], [6.0, 15.0], [3.0, 52.0], [7.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[5.0, 21.22222222222222]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[8.0, 265.0], [9.0, 251.71428571428572], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[8.666666666666666, 252.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 54.0], [4.0, 180.0], [2.0, 61.0], [1.0, 66.0], [9.0, 64.0], [5.0, 173.0], [6.0, 56.0], [3.0, 54.0], [7.0, 171.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[5.0, 97.66666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 287.0], [4.0, 277.0], [2.0, 274.0], [1.0, 281.0], [9.0, 1638.0], [5.0, 256.0], [6.0, 275.0], [3.0, 280.0], [7.0, 255.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[5.0, 424.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[9.0, 22751.111111111113]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[9.0, 22751.111111111113]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 320.0], [4.0, 537.0], [2.0, 542.0], [1.0, 564.0], [9.0, 309.0], [5.0, 505.0], [6.0, 306.0], [3.0, 306.0], [7.0, 275.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[5.0, 407.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 525.0], [4.0, 510.0], [2.0, 249.0], [1.0, 505.0], [9.0, 255.0], [5.0, 504.0], [6.0, 254.0], [3.0, 238.0], [7.0, 490.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[5.0, 392.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 533.0], [4.0, 526.0], [2.0, 492.0], [1.0, 467.0], [9.0, 255.0], [5.0, 470.0], [6.0, 262.0], [3.0, 533.0], [7.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[5.0, 419.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[8.0, 251.0], [9.0, 244.71428571428572], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[8.666666666666666, 245.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[8.0, 250.0], [9.0, 250.57142857142856], [7.0, 244.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[8.666666666666666, 249.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[8.0, 248.0], [9.0, 257.5714285714286], [7.0, 241.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[8.666666666666666, 254.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 267.0], [4.0, 521.0], [2.0, 244.0], [1.0, 487.0], [9.0, 460.0], [5.0, 501.0], [6.0, 256.0], [3.0, 503.0], [7.0, 533.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[5.0, 419.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 456.0], [4.0, 471.0], [2.0, 249.0], [1.0, 484.0], [9.0, 243.0], [5.0, 485.0], [6.0, 248.0], [3.0, 501.0], [7.0, 473.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[5.0, 401.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 253.0], [4.0, 490.0], [2.0, 247.0], [1.0, 231.0], [9.0, 234.0], [5.0, 485.0], [6.0, 256.0], [3.0, 495.0], [7.0, 517.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[5.0, 356.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 525.0], [4.0, 500.0], [2.0, 248.0], [1.0, 510.0], [9.0, 489.0], [5.0, 481.0], [6.0, 248.0], [3.0, 498.0], [7.0, 490.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[5.0, 443.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 504.0], [4.0, 518.0], [2.0, 491.0], [1.0, 518.0], [9.0, 530.0], [5.0, 498.0], [6.0, 251.0], [3.0, 520.0], [7.0, 522.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[5.0, 483.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[9.0, 1671.3333333333333], [6.0, 1851.0], [7.0, 1890.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[7.333333333333332, 1804.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [4.0, 259.0], [2.0, 248.0], [1.0, 243.0], [9.0, 232.0], [5.0, 248.0], [6.0, 235.0], [3.0, 252.0], [7.0, 261.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[5.0, 247.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 263.0], [4.0, 255.0], [2.0, 245.0], [1.0, 255.0], [9.0, 266.0], [5.0, 244.0], [6.0, 242.0], [3.0, 242.0], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[5.0, 250.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [4.0, 249.0], [2.0, 246.0], [1.0, 260.0], [9.0, 268.0], [5.0, 240.0], [6.0, 248.0], [3.0, 259.0], [7.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[5.0, 252.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 256.0], [4.0, 260.0], [2.0, 251.0], [1.0, 231.0], [9.0, 242.0], [5.0, 247.0], [6.0, 249.0], [3.0, 248.0], [7.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[5.0, 249.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 252.0], [4.0, 255.0], [2.0, 449.0], [1.0, 242.0], [9.0, 230.0], [5.0, 461.0], [6.0, 258.0], [3.0, 253.0], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[5.0, 293.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1829.0], [4.0, 2324.0], [2.0, 1987.0], [1.0, 2086.0], [9.0, 2939.0], [5.0, 1961.0], [6.0, 1415.0], [3.0, 1853.0], [7.0, 2005.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[5.0, 2044.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 251.0], [4.0, 495.0], [2.0, 249.0], [1.0, 246.0], [9.0, 241.0], [5.0, 230.0], [6.0, 250.0], [3.0, 259.0], [7.0, 491.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[5.0, 301.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [4.0, 248.0], [2.0, 251.0], [1.0, 243.0], [9.0, 244.0], [5.0, 239.0], [6.0, 258.0], [3.0, 248.0], [7.0, 258.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[5.0, 249.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 266.0], [4.0, 510.0], [2.0, 245.0], [1.0, 233.0], [9.0, 229.0], [5.0, 243.0], [6.0, 255.0], [3.0, 257.0], [7.0, 508.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[5.0, 305.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[9.0, 22751.111111111113]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[9.0, 22751.111111111113]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[8.0, 501.0], [9.0, 401.85714285714283], [7.0, 459.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[8.666666666666666, 419.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[8.0, 266.0], [9.0, 315.14285714285717], [7.0, 626.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[8.666666666666666, 344.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[8.0, 523.0], [9.0, 317.71428571428567], [7.0, 632.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[8.666666666666666, 375.4444444444444]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[8.0, 494.0], [9.0, 311.2857142857143], [7.0, 380.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[8.666666666666666, 339.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[8.0, 288.0], [9.0, 271.57142857142856], [7.0, 272.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[8.666666666666666, 273.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[8.0, 565.0], [9.0, 346.7142857142857], [7.0, 527.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[8.666666666666666, 391.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[8.0, 509.0], [9.0, 500.71428571428567], [7.0, 566.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[8.666666666666666, 508.88888888888886]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[8.0, 176.0], [9.0, 144.42857142857144], [7.0, 53.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[8.666666666666666, 137.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[8.0, 11.0], [9.0, 23.000000000000004], [7.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[8.666666666666666, 20.222222222222225]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[8.0, 55.0], [9.0, 63.285714285714285], [7.0, 58.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[8.666666666666666, 61.77777777777778]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[9.0, 719.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[9.0, 719.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[9.0, 904.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[9.0, 904.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[9.0, 2679.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[9.0, 2679.0]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[8.0, 2111.0], [9.0, 1837.142857142857], [7.0, 2159.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[8.666666666666666, 1903.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[9.0, 56.666666666666664], [6.0, 163.0], [7.0, 93.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[7.333333333333332, 104.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[9.0, 338.6666666666667], [6.0, 486.0], [7.0, 348.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[7.333333333333332, 391.11111111111114]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[9.0, 418.3333333333333], [6.0, 426.3333333333333], [7.0, 427.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[7.333333333333332, 424.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[9.0, 254.33333333333334], [6.0, 420.6666666666667], [7.0, 351.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[7.333333333333332, 342.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[9.0, 417.6666666666667], [6.0, 499.3333333333333], [7.0, 494.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[7.333333333333332, 470.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[9.0, 127.66666666666667], [6.0, 126.0], [7.0, 173.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[7.333333333333332, 142.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[9.0, 12.666666666666666], [6.0, 19.333333333333332], [7.0, 15.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[7.333333333333332, 15.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[9.0, 1432.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[9.0, 1432.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[9.0, 1546.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[9.0, 1546.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[9.0, 380.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[9.0, 380.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[9.0, 2153.8888888888887]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[9.0, 2153.8888888888887]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[9.0, 20104.666666666668]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[9.0, 20104.666666666668]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 10810.833333333334], [9.0, 1091.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[2.999999999999999, 7570.88888888889]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 926.8888888888889], [9.0, 720.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[2.999999999999999, 857.9999999999999]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 1364.7777777777778], [9.0, 1124.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[4.5, 1244.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[9.0, 2978.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[9.0, 2978.6666666666665]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[9.0, 2662.777777777778]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[9.0, 2662.777777777778]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[9.0, 347.3333333333333], [6.0, 337.3333333333333], [7.0, 338.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[7.333333333333332, 341.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[9.0, 367.6666666666667], [6.0, 273.3333333333333], [7.0, 274.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[7.333333333333332, 305.2222222222223]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[9.0, 270.0], [6.0, 362.0], [7.0, 369.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[7.333333333333332, 333.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 9.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 256.78333333333336, "minX": 1.66400652E12, "maxY": 508684.61666666664, "series": [{"data": [[1.66400658E12, 508684.61666666664], [1.66400664E12, 5331.533333333334], [1.66400652E12, 8869.266666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66400658E12, 17375.383333333335], [1.66400664E12, 8530.766666666666], [1.66400652E12, 256.78333333333336]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400664E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 13.5, "minX": 1.66400652E12, "maxY": 22751.111111111113, "series": [{"data": [[1.66400658E12, 251.25], [1.66400664E12, 249.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400658E12, 304.5], [1.66400664E12, 255.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400658E12, 247.5], [1.66400664E12, 239.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400658E12, 248.5], [1.66400664E12, 307.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400658E12, 247.25], [1.66400664E12, 298.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400658E12, 305.0], [1.66400664E12, 458.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400658E12, 306.75], [1.66400664E12, 486.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400658E12, 246.0], [1.66400664E12, 497.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400658E12, 319.75], [1.66400664E12, 419.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400658E12, 473.0], [1.66400664E12, 453.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400658E12, 7515.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400658E12, 2931.1111111111113]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400658E12, 4142.25], [1.66400652E12, 1104.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400658E12, 3209.444444444445]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400658E12, 5621.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400658E12, 1490.111111111111]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400658E12, 1954.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400658E12, 1877.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400658E12, 7434.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400658E12, 5196.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400658E12, 2183.5], [1.66400664E12, 1933.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400658E12, 1903.3333333333333]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400658E12, 1804.2222222222222]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400658E12, 496.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400658E12, 247.25], [1.66400664E12, 247.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400658E12, 545.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400658E12, 254.5], [1.66400664E12, 246.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400658E12, 306.0], [1.66400664E12, 240.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400658E12, 459.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400658E12, 276.8888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400658E12, 513.5], [1.66400664E12, 422.71428571428567]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400658E12, 301.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400658E12, 164.5], [1.66400664E12, 140.57142857142858]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400658E12, 441.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400658E12, 354.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400658E12, 301.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400658E12, 358.5], [1.66400664E12, 361.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400658E12, 263.5], [1.66400664E12, 400.7142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400658E12, 243.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400658E12, 15.5], [1.66400664E12, 22.857142857142858]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400658E12, 252.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400658E12, 59.0], [1.66400664E12, 108.71428571428571]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400658E12, 962.5], [1.66400664E12, 271.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400658E12, 22751.111111111113]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400658E12, 314.5], [1.66400664E12, 433.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400658E12, 390.0], [1.66400664E12, 392.85714285714283]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400658E12, 394.0], [1.66400664E12, 426.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400658E12, 245.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400658E12, 249.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400658E12, 254.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400658E12, 363.5], [1.66400664E12, 435.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400658E12, 349.5], [1.66400664E12, 415.85714285714283]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400658E12, 243.5], [1.66400664E12, 388.7142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400658E12, 507.0], [1.66400664E12, 425.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400658E12, 517.0], [1.66400664E12, 474.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400658E12, 1782.0], [1.66400664E12, 1822.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400658E12, 239.5], [1.66400664E12, 249.42857142857142]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400658E12, 264.5], [1.66400664E12, 246.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400658E12, 261.5], [1.66400664E12, 249.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400658E12, 249.0], [1.66400664E12, 249.42857142857142]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400658E12, 241.0], [1.66400664E12, 308.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400658E12, 2384.0], [1.66400664E12, 1947.2857142857142]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400658E12, 246.0], [1.66400664E12, 317.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400658E12, 249.5], [1.66400664E12, 249.28571428571428]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400658E12, 247.5], [1.66400664E12, 321.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400658E12, 22751.111111111113]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400658E12, 419.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400658E12, 344.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400658E12, 375.4444444444444]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400658E12, 339.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400658E12, 273.44444444444446]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400658E12, 391.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400658E12, 508.88888888888886]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400658E12, 137.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400658E12, 20.222222222222225]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400658E12, 61.77777777777778]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400658E12, 719.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400658E12, 904.5555555555555]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400658E12, 2679.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400658E12, 1903.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400658E12, 56.0], [1.66400664E12, 142.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400658E12, 391.0], [1.66400664E12, 391.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400658E12, 451.0], [1.66400664E12, 402.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400658E12, 328.25], [1.66400664E12, 353.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400658E12, 437.0], [1.66400664E12, 497.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400658E12, 136.75], [1.66400664E12, 147.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400658E12, 13.5], [1.66400664E12, 17.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400658E12, 1689.142857142857], [1.66400652E12, 534.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400658E12, 1757.0], [1.66400652E12, 809.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400658E12, 478.0], [1.66400652E12, 37.5]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400658E12, 2657.0], [1.66400652E12, 393.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400658E12, 20104.666666666668]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400658E12, 8793.60869565217], [1.66400652E12, 540.25]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400658E12, 921.1666666666667], [1.66400652E12, 352.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400658E12, 1403.4], [1.66400652E12, 450.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400658E12, 3260.375], [1.66400652E12, 725.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400658E12, 3201.1428571428573], [1.66400652E12, 778.5]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400658E12, 325.25], [1.66400664E12, 353.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400658E12, 345.75], [1.66400664E12, 272.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400658E12, 338.75], [1.66400664E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400664E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400652E12, "maxY": 1773.2857142857142, "series": [{"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400658E12, 971.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400658E12, 995.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400658E12, 1045.375], [1.66400652E12, 258.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400658E12, 1056.7777777777778]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400658E12, 711.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400658E12, 625.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400658E12, 1130.2222222222222]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400658E12, 589.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400658E12, 470.1111111111111]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400658E12, 800.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400658E12, 352.25], [1.66400664E12, 451.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400658E12, 391.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400658E12, 333.8888888888889]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400658E12, 695.5], [1.66400664E12, 270.85714285714283]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400658E12, 1090.5555555555557]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400658E12, 314.5], [1.66400664E12, 433.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400658E12, 338.75], [1.66400664E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400658E12, 314.5], [1.66400664E12, 433.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400658E12, 1090.5555555555557]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400658E12, 273.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400658E12, 391.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400658E12, 633.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400658E12, 904.4444444444443]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400658E12, 655.111111111111]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400658E12, 391.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400658E12, 1689.142857142857], [1.66400652E12, 534.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400658E12, 453.1428571428571], [1.66400652E12, 555.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400658E12, 249.0], [1.66400652E12, 37.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400658E12, 940.2857142857143], [1.66400652E12, 345.5]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400658E12, 1047.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400658E12, 1128.6521739130435], [1.66400652E12, 475.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400658E12, 746.9583333333335], [1.66400652E12, 337.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400658E12, 1120.4666666666667], [1.66400652E12, 436.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400658E12, 870.75], [1.66400652E12, 244.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400658E12, 1773.2857142857142], [1.66400652E12, 534.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400658E12, 281.5], [1.66400664E12, 272.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400658E12, 338.75], [1.66400664E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400664E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400652E12, "maxY": 672.8571428571429, "series": [{"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400658E12, 58.25], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 51.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 48.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400658E12, 61.75000000000001], [1.66400664E12, 200.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400658E12, 61.00000000000001], [1.66400664E12, 243.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 248.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400658E12, 72.75], [1.66400664E12, 227.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400658E12, 220.75], [1.66400664E12, 201.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400658E12, 208.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400658E12, 215.33333333333331]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400658E12, 160.375], [1.66400652E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400658E12, 427.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400658E12, 209.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400658E12, 74.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400658E12, 76.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400658E12, 58.75], [1.66400664E12, 152.2]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400658E12, 110.88888888888889]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400658E12, 56.44444444444444]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400658E12, 190.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400658E12, 219.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400658E12, 59.25], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400658E12, 203.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400658E12, 27.77777777777778]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400658E12, 256.0], [1.66400664E12, 208.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400658E12, 53.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400658E12, 111.0], [1.66400664E12, 82.99999999999999]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400658E12, 192.11111111111114]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400658E12, 111.33333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400658E12, 54.99999999999999]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400658E12, 113.5], [1.66400664E12, 105.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 142.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 3.5714285714285716]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 50.57142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400658E12, 527.7777777777778]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 142.28571428571428]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400658E12, 131.5], [1.66400664E12, 143.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400658E12, 133.5], [1.66400664E12, 179.14285714285714]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400658E12, 116.0], [1.66400664E12, 181.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400658E12, 114.0], [1.66400664E12, 171.7142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 140.85714285714283]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400658E12, 253.0], [1.66400664E12, 176.99999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400658E12, 258.0], [1.66400664E12, 219.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400658E12, 65.25], [1.66400664E12, 49.4]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 64.71428571428571]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 142.28571428571428]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 70.28571428571429]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 72.42857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400658E12, 527.7777777777778]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400658E12, 169.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400658E12, 93.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400658E12, 126.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400658E12, 80.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400658E12, 110.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400658E12, 257.55555555555554]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400658E12, 74.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400658E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400658E12, 214.88888888888894]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400658E12, 112.22222222222223]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400658E12, 36.11111111111111]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400658E12, 110.88888888888889]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 87.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400658E12, 122.25], [1.66400664E12, 145.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400658E12, 183.5], [1.66400664E12, 150.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400658E12, 63.5], [1.66400664E12, 101.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400658E12, 185.75], [1.66400664E12, 247.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400658E12, 84.0], [1.66400664E12, 93.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 3.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400658E12, 607.7142857142857], [1.66400652E12, 274.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400658E12, 241.42857142857142], [1.66400652E12, 356.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400658E12, 51.57142857142857], [1.66400652E12, 23.5]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400658E12, 672.8571428571429], [1.66400652E12, 160.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400658E12, 276.77777777777777]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400658E12, 337.30434782608694], [1.66400652E12, 191.5]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400658E12, 326.625], [1.66400652E12, 125.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400658E12, 468.2], [1.66400652E12, 210.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400658E12, 288.37500000000006], [1.66400652E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400658E12, 618.2857142857143], [1.66400652E12, 277.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400658E12, 66.25], [1.66400664E12, 100.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400658E12, 0.0], [1.66400664E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400658E12, 65.25], [1.66400664E12, 49.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400664E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66400652E12, "maxY": 25060.0, "series": [{"data": [[1.66400658E12, 25060.0], [1.66400664E12, 2324.0], [1.66400652E12, 1104.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66400658E12, 4936.0], [1.66400664E12, 517.5], [1.66400652E12, 1010.7999999999998]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66400658E12, 23470.0], [1.66400664E12, 2033.2999999999986], [1.66400652E12, 1104.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66400658E12, 11982.0], [1.66400664E12, 540.75], [1.66400652E12, 1101.45]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66400658E12, 10.0], [1.66400664E12, 12.0], [1.66400652E12, 16.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66400658E12, 489.0], [1.66400664E12, 258.0], [1.66400652E12, 527.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400664E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 179.0, "minX": 1.0, "maxY": 20376.0, "series": [{"data": [[2.0, 994.0], [32.0, 253.0], [37.0, 260.0], [3.0, 20376.0], [4.0, 512.0], [5.0, 263.0], [6.0, 613.0], [7.0, 905.5], [8.0, 1153.5], [9.0, 526.0], [10.0, 2029.5], [11.0, 463.5], [12.0, 497.5], [13.0, 501.0], [14.0, 530.5], [15.0, 275.0], [1.0, 528.0], [16.0, 490.5], [17.0, 254.0], [18.0, 260.5], [20.0, 254.0], [23.0, 266.0], [25.0, 260.5], [27.0, 255.0], [28.0, 259.0], [29.0, 261.0], [30.0, 255.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[11.0, 1705.0], [25.0, 179.0], [13.0, 1961.0], [30.0, 221.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 37.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 687.0, "series": [{"data": [[2.0, 136.5], [32.0, 0.0], [37.0, 0.0], [3.0, 687.0], [4.0, 512.0], [5.0, 260.0], [6.0, 434.0], [7.0, 360.5], [8.0, 312.5], [9.0, 277.0], [10.0, 553.0], [11.0, 0.0], [12.0, 0.0], [13.0, 337.0], [14.0, 391.5], [15.0, 0.0], [1.0, 528.0], [16.0, 0.0], [17.0, 0.0], [18.0, 0.0], [20.0, 0.0], [23.0, 0.0], [25.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[11.0, 271.0], [25.0, 0.0], [13.0, 505.0], [30.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 37.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.6833333333333333, "minX": 1.66400652E12, "maxY": 9.666666666666666, "series": [{"data": [[1.66400658E12, 9.666666666666666], [1.66400664E12, 4.8], [1.66400652E12, 0.6833333333333333]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400664E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66400652E12, "maxY": 5.25, "series": [{"data": [[1.66400658E12, 4.383333333333334], [1.66400664E12, 0.4], [1.66400652E12, 0.31666666666666665]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66400658E12, 0.35], [1.66400664E12, 0.2], [1.66400652E12, 0.05]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66400658E12, 5.25], [1.66400664E12, 4.166666666666667]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66400664E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66400664E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66400652E12, "maxY": 0.4, "series": [{"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66400658E12, 0.38333333333333336], [1.66400652E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66400658E12, 0.11666666666666667], [1.66400652E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66400658E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66400658E12, 0.11666666666666667], [1.66400652E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66400658E12, 0.13333333333333333], [1.66400652E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66400664E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-failure", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66400658E12, 0.4], [1.66400652E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66400658E12, 0.11666666666666667], [1.66400652E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66400658E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-failure", "isController": true}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66400658E12, 0.05], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66400664E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-failure", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66400658E12, 0.25], [1.66400652E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66400658E12, 0.11666666666666667], [1.66400652E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66400658E12, 0.13333333333333333]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66400664E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-failure", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66400658E12, 0.13333333333333333], [1.66400652E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66400658E12, 0.11666666666666667], [1.66400652E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66400658E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66400664E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66400658E12, 0.06666666666666667], [1.66400664E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400664E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66400652E12, "maxY": 10.466666666666667, "series": [{"data": [[1.66400658E12, 10.466666666666667], [1.66400664E12, 4.816666666666666], [1.66400652E12, 0.36666666666666664]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66400658E12, 0.03333333333333333], [1.66400664E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66400664E12, "title": "Total Transactions Per Second"}},
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
