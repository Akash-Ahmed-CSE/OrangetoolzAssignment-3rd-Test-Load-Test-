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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 10.0, "series": [{"data": [[200.0, 7.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[200.0, 8.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[200.0, 8.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[200.0, 7.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[400.0, 8.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[400.0, 5.0], [200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[400.0, 6.0], [200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[400.0, 6.0], [200.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[2800.0, 1.0], [3000.0, 1.0], [5900.0, 1.0], [6000.0, 1.0], [11800.0, 1.0], [3100.0, 1.0], [6200.0, 1.0], [12800.0, 1.0], [3300.0, 1.0], [13500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[9000.0, 1.0], [4400.0, 1.0], [2400.0, 1.0], [5100.0, 1.0], [2700.0, 1.0], [5500.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[2300.0, 1.0], [2400.0, 1.0], [9400.0, 1.0], [5000.0, 1.0], [2700.0, 1.0], [1500.0, 2.0], [7300.0, 2.0], [15900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [2300.0, 1.0], [2600.0, 1.0], [1400.0, 1.0], [2900.0, 1.0], [3100.0, 2.0], [7400.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[8200.0, 1.0], [4300.0, 1.0], [8700.0, 1.0], [2300.0, 1.0], [4400.0, 1.0], [4600.0, 1.0], [6000.0, 1.0], [3600.0, 1.0], [7800.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[4600.0, 1.0], [9500.0, 1.0], [600.0, 2.0], [4700.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [12200.0, 1.0], [1700.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[4800.0, 2.0], [600.0, 1.0], [4700.0, 1.0], [700.0, 1.0], [11500.0, 1.0], [5900.0, 1.0], [1000.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[2100.0, 1.0], [1100.0, 1.0], [21000.0, 1.0], [5200.0, 1.0], [1300.0, 1.0], [5700.0, 1.0], [1600.0, 3.0], [3700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[17000.0, 1.0], [8200.0, 1.0], [9000.0, 1.0], [4400.0, 1.0], [10100.0, 1.0], [14300.0, 1.0], [7300.0, 1.0], [15300.0, 2.0], [7900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[8300.0, 1.0], [5000.0, 2.0], [2700.0, 1.0], [1500.0, 1.0], [3200.0, 1.0], [3500.0, 1.0], [7400.0, 1.0], [8000.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0], [5400.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[2100.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2200.0, 1.0], [2600.0, 1.0], [1500.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [2000.0, 3.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[200.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[400.0, 7.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[600.0, 1.0], [400.0, 6.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[200.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[400.0, 3.0], [200.0, 2.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[200.0, 8.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0], [200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[400.0, 4.0], [200.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[400.0, 5.0], [200.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 4.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 6.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0], [200.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 7.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 7.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[200.0, 9.0], [800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[24300.0, 1.0], [27100.0, 1.0], [27400.0, 1.0], [28200.0, 1.0], [28700.0, 1.0], [31100.0, 1.0], [31000.0, 1.0], [31400.0, 1.0], [32000.0, 1.0], [31900.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 3.0], [2500.0, 1.0], [200.0, 5.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 7.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[200.0, 7.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[600.0, 1.0], [400.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[600.0, 1.0], [200.0, 7.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[200.0, 3.0], [400.0, 2.0], [800.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1500.0, 1.0], [200.0, 3.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[600.0, 1.0], [200.0, 4.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[200.0, 3.0], [400.0, 3.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[200.0, 5.0], [400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2200.0, 1.0], [2600.0, 1.0], [1500.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [2000.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[300.0, 1.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[300.0, 1.0], [200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[200.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[300.0, 1.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2100.0, 1.0], [2500.0, 1.0], [5400.0, 1.0], [1600.0, 2.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[0.0, 1.0], [300.0, 1.0], [200.0, 7.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 7.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[600.0, 1.0], [200.0, 8.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[24300.0, 1.0], [27100.0, 1.0], [27400.0, 1.0], [28200.0, 1.0], [28700.0, 1.0], [31100.0, 1.0], [31000.0, 1.0], [31400.0, 1.0], [32000.0, 1.0], [31900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[200.0, 5.0], [400.0, 2.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[600.0, 1.0], [200.0, 7.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[200.0, 7.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[200.0, 8.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[400.0, 1.0], [200.0, 8.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[200.0, 9.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[400.0, 7.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 6.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[300.0, 5.0], [4700.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[600.0, 5.0], [300.0, 2.0], [200.0, 1.0], [3600.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[4200.0, 2.0], [4500.0, 1.0], [4900.0, 1.0], [5200.0, 1.0], [11000.0, 1.0], [5800.0, 1.0], [6500.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[2100.0, 2.0], [1700.0, 3.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 6.0], [100.0, 2.0], [200.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[400.0, 3.0], [200.0, 5.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[400.0, 5.0], [200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[400.0, 6.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 3.0], [200.0, 2.0], [100.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[4200.0, 1.0], [2100.0, 1.0], [4600.0, 1.0], [1400.0, 1.0], [700.0, 1.0], [3000.0, 1.0], [3900.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[4100.0, 1.0], [8500.0, 1.0], [600.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [6600.0, 1.0], [1900.0, 1.0], [1000.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 3.0], [1100.0, 1.0], [3000.0, 1.0], [100.0, 2.0], [800.0, 1.0], [1000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[600.0, 1.0], [21200.0, 1.0], [1400.0, 1.0], [1500.0, 1.0], [800.0, 2.0], [400.0, 1.0], [200.0, 1.0], [3400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[17000.0, 1.0], [20900.0, 1.0], [22000.0, 1.0], [24500.0, 1.0], [24900.0, 1.0], [24700.0, 1.0], [25300.0, 1.0], [30500.0, 1.0], [30100.0, 1.0], [29900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[600.0, 5.0], [900.0, 1.0], [1000.0, 1.0], [4300.0, 1.0], [16800.0, 1.0], [4400.0, 1.0], [4800.0, 1.0], [4900.0, 1.0], [20600.0, 1.0], [21400.0, 1.0], [24100.0, 1.0], [1500.0, 1.0], [24000.0, 1.0], [24200.0, 1.0], [24800.0, 1.0], [400.0, 1.0], [1600.0, 3.0], [7100.0, 1.0], [1800.0, 1.0], [29000.0, 1.0], [29200.0, 1.0], [29700.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[2300.0, 1.0], [600.0, 4.0], [2600.0, 1.0], [700.0, 1.0], [2900.0, 1.0], [200.0, 5.0], [1000.0, 1.0], [300.0, 2.0], [6200.0, 1.0], [400.0, 2.0], [1700.0, 1.0], [1800.0, 1.0], [500.0, 7.0], [8000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[2200.0, 1.0], [600.0, 1.0], [700.0, 1.0], [11100.0, 1.0], [200.0, 4.0], [800.0, 1.0], [3400.0, 1.0], [900.0, 1.0], [3900.0, 1.0], [4400.0, 1.0], [300.0, 1.0], [1400.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [7800.0, 1.0], [500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[4600.0, 1.0], [9200.0, 1.0], [4800.0, 1.0], [5300.0, 1.0], [1300.0, 1.0], [1700.0, 1.0], [3400.0, 1.0], [3800.0, 1.0], [7800.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[2300.0, 1.0], [10400.0, 1.0], [2700.0, 1.0], [5400.0, 1.0], [5900.0, 1.0], [800.0, 3.0], [3700.0, 1.0], [15000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[200.0, 9.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[200.0, 5.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 32000.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 6.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 598.0, "series": [{"data": [[0.0, 598.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 193.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 213.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 6.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399632E12, "maxY": 9.986970684039088, "series": [{"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-49", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-24", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-25", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-19", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-28", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-39", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-29", "isController": false}, {"data": [[1.66399638E12, 7.750373692077734], [1.66399632E12, 9.986970684039088], [1.66399644E12, 1.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-4", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-2", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-11", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-44", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-43", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-32", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-21", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399644E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 3.0, "minX": 0.0, "maxY": 29378.7, "series": [{"data": [[9.0, 289.8], [10.0, 265.0], [6.0, 344.6666666666667], [3.0, 461.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[7.6, 320.9]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[9.0, 352.6], [10.0, 257.0], [6.0, 240.66666666666666], [3.0, 246.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[7.6, 298.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[9.0, 338.0], [10.0, 234.0], [6.0, 259.0], [3.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[7.6, 293.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[9.0, 276.4], [10.0, 268.0], [6.0, 239.66666666666666], [3.0, 232.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[7.6, 260.1]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[9.0, 309.0], [10.0, 235.0], [6.0, 347.6666666666667], [3.0, 463.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[7.6, 328.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[9.0, 485.0], [10.0, 498.0], [6.0, 477.3333333333333], [3.0, 244.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[7.6, 459.90000000000003]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[9.0, 391.2], [10.0, 487.0], [6.0, 409.0], [3.0, 470.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[7.6, 414.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[9.0, 499.6], [10.0, 498.0], [6.0, 501.3333333333333], [3.0, 481.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[7.6, 498.1]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[9.0, 488.0], [10.0, 575.0], [6.0, 472.0], [3.0, 244.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[7.6, 467.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[9.0, 453.4], [10.0, 468.0], [6.0, 501.3333333333333], [3.0, 485.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[7.6, 472.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[10.0, 6895.0999999999985]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[10.0, 6895.0999999999985]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[10.0, 3839.5]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[10.0, 3839.5]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[10.0, 5578.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[10.0, 5578.0]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[10.0, 2855.8]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[10.0, 2855.8]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[10.0, 5808.4]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[10.0, 5808.4]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[10.0, 3805.8]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[10.0, 3805.8]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[10.0, 3635.3999999999996]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[10.0, 3635.3999999999996]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[10.0, 4545.4]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[10.0, 4545.4]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[10.0, 10917.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[10.0, 10917.0]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[10.0, 5309.2]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[10.0, 5309.2]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1770.0], [4.0, 1992.0], [2.0, 5431.0], [1.0, 1861.0], [9.0, 1678.0], [10.0, 1655.0], [5.0, 2537.0], [6.0, 1884.0], [3.0, 2116.0], [7.0, 1926.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[5.5, 2285.0]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[10.0, 1930.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[10.0, 1930.0]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[9.0, 1732.2], [10.0, 2087.0], [6.0, 2132.6666666666665], [3.0, 2687.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[7.6, 1983.3]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[10.0, 485.1]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[10.0, 485.1]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[9.0, 249.4], [10.0, 249.0], [6.0, 254.66666666666666], [3.0, 237.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[7.6, 249.7]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[10.0, 459.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[10.0, 459.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[9.0, 298.2], [10.0, 248.0], [6.0, 249.0], [3.0, 234.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[7.6, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[9.0, 296.0], [10.0, 268.0], [6.0, 259.6666666666667], [3.0, 231.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[7.6, 275.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[10.0, 505.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[10.0, 505.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[10.0, 274.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[10.0, 274.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 520.0], [4.0, 465.0], [2.0, 574.0], [1.0, 541.0], [9.0, 252.0], [10.0, 483.0], [5.0, 536.0], [6.0, 239.0], [3.0, 537.0], [7.0, 478.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[5.5, 462.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[10.0, 303.3]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[10.0, 303.3]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 172.0], [4.0, 54.0], [2.0, 218.0], [1.0, 244.0], [9.0, 167.0], [10.0, 170.0], [5.0, 55.0], [6.0, 221.0], [3.0, 246.0], [7.0, 240.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[5.5, 178.70000000000002]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[10.0, 470.40000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[10.0, 470.40000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[10.0, 441.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[10.0, 441.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[10.0, 262.7]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[10.0, 262.7]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 491.0], [4.0, 253.0], [2.0, 486.0], [1.0, 523.0], [9.0, 243.0], [10.0, 268.0], [5.0, 492.0], [6.0, 256.0], [3.0, 535.0], [7.0, 495.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[5.5, 404.2]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 491.0], [4.0, 253.0], [2.0, 531.0], [1.0, 523.0], [9.0, 241.0], [10.0, 249.0], [5.0, 247.0], [6.0, 236.0], [3.0, 536.0], [7.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[5.5, 356.69999999999993]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[10.0, 306.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[10.0, 306.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 13.0], [4.0, 16.0], [2.0, 29.0], [1.0, 49.0], [9.0, 14.0], [10.0, 15.0], [5.0, 17.0], [6.0, 14.0], [3.0, 19.0], [7.0, 17.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[5.5, 20.3]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[10.0, 337.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[10.0, 337.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 218.0], [4.0, 63.0], [2.0, 80.0], [1.0, 85.0], [9.0, 57.0], [10.0, 65.0], [5.0, 247.0], [6.0, 59.0], [3.0, 265.0], [7.0, 83.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[5.5, 122.19999999999999]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 251.0], [4.0, 276.0], [2.0, 838.0], [1.0, 276.0], [9.0, 264.0], [10.0, 284.0], [5.0, 257.0], [6.0, 273.0], [3.0, 273.0], [7.0, 278.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[5.5, 327.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[10.0, 29378.7]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[10.0, 29378.7]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 280.0], [4.0, 296.0], [2.0, 2535.0], [1.0, 315.0], [9.0, 280.0], [10.0, 312.0], [5.0, 502.0], [6.0, 291.0], [3.0, 292.0], [7.0, 305.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[5.5, 540.8000000000001]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 231.0], [4.0, 253.0], [2.0, 511.0], [1.0, 265.0], [9.0, 233.0], [10.0, 254.0], [5.0, 487.0], [6.0, 253.0], [3.0, 536.0], [7.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[5.5, 328.29999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 491.0], [4.0, 253.0], [2.0, 266.0], [1.0, 523.0], [9.0, 226.0], [10.0, 268.0], [5.0, 499.0], [6.0, 245.0], [3.0, 270.0], [7.0, 260.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[5.5, 330.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[10.0, 269.90000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[10.0, 269.90000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[10.0, 304.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[10.0, 304.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[10.0, 343.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[10.0, 343.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 503.0], [4.0, 805.0], [2.0, 271.0], [1.0, 248.0], [9.0, 525.0], [10.0, 255.0], [5.0, 479.0], [6.0, 530.0], [3.0, 541.0], [7.0, 488.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[5.5, 464.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 536.0], [4.0, 538.0], [2.0, 1543.0], [1.0, 236.0], [9.0, 490.0], [10.0, 266.0], [5.0, 484.0], [6.0, 257.0], [3.0, 503.0], [7.0, 543.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[5.5, 539.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 267.0], [4.0, 681.0], [2.0, 546.0], [1.0, 236.0], [9.0, 534.0], [10.0, 270.0], [5.0, 500.0], [6.0, 265.0], [3.0, 541.0], [7.0, 543.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[5.5, 438.3]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 260.0], [4.0, 276.0], [2.0, 508.0], [1.0, 540.0], [9.0, 452.0], [10.0, 275.0], [5.0, 497.0], [6.0, 473.0], [3.0, 536.0], [7.0, 543.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[5.5, 436.00000000000006]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 273.0], [4.0, 549.0], [2.0, 494.0], [1.0, 257.0], [9.0, 238.0], [10.0, 236.0], [5.0, 500.0], [6.0, 475.0], [3.0, 536.0], [7.0, 269.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[5.5, 382.70000000000005]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[9.0, 1732.2], [10.0, 2087.0], [6.0, 2132.6666666666665], [3.0, 2687.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[7.6, 1983.3]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 230.0], [4.0, 270.0], [2.0, 329.0], [1.0, 252.0], [9.0, 234.0], [10.0, 267.0], [5.0, 495.0], [6.0, 248.0], [3.0, 266.0], [7.0, 266.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[5.5, 285.7]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 269.0], [4.0, 267.0], [2.0, 364.0], [1.0, 251.0], [9.0, 244.0], [10.0, 261.0], [5.0, 630.0], [6.0, 283.0], [3.0, 235.0], [7.0, 447.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[5.5, 325.09999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 257.0], [4.0, 240.0], [2.0, 333.0], [1.0, 251.0], [9.0, 279.0], [10.0, 262.0], [5.0, 250.0], [6.0, 276.0], [3.0, 538.0], [7.0, 537.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[5.5, 322.3]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 535.0], [4.0, 529.0], [2.0, 292.0], [1.0, 266.0], [9.0, 506.0], [10.0, 261.0], [5.0, 506.0], [6.0, 539.0], [3.0, 538.0], [7.0, 239.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[5.5, 421.09999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 265.0], [4.0, 262.0], [2.0, 308.0], [1.0, 499.0], [9.0, 279.0], [10.0, 234.0], [5.0, 267.0], [6.0, 297.0], [3.0, 272.0], [7.0, 274.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[5.5, 295.70000000000005]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1770.0], [4.0, 1992.0], [2.0, 5431.0], [1.0, 1861.0], [9.0, 1678.0], [10.0, 1655.0], [5.0, 2537.0], [6.0, 1884.0], [3.0, 2116.0], [7.0, 1926.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[5.5, 2285.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 241.0], [4.0, 3.0], [2.0, 340.0], [1.0, 258.0], [9.0, 263.0], [10.0, 271.0], [5.0, 248.0], [6.0, 529.0], [3.0, 251.0], [7.0, 233.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[5.5, 263.7]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 228.0], [4.0, 482.0], [2.0, 300.0], [1.0, 245.0], [9.0, 277.0], [10.0, 236.0], [5.0, 790.0], [6.0, 263.0], [3.0, 266.0], [7.0, 266.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[5.5, 335.29999999999995]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [4.0, 242.0], [2.0, 626.0], [1.0, 255.0], [9.0, 277.0], [10.0, 247.0], [5.0, 261.0], [6.0, 248.0], [3.0, 469.0], [7.0, 266.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[5.5, 314.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[10.0, 29378.7]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[10.0, 29378.7]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[10.0, 369.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[10.0, 369.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[10.0, 339.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[10.0, 339.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[10.0, 324.09999999999997]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[10.0, 324.09999999999997]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[10.0, 292.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[10.0, 292.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[10.0, 311.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[10.0, 311.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[10.0, 294.7]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[10.0, 294.7]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[10.0, 481.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[10.0, 481.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[10.0, 182.3]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[10.0, 182.3]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[10.0, 14.1]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[10.0, 14.1]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[10.0, 61.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[10.0, 61.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[10.0, 1051.3]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[10.0, 1051.3]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[10.0, 968.9]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[10.0, 968.9]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[10.0, 5029.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[10.0, 5029.0]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[10.0, 1930.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[10.0, 1930.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[9.0, 66.0], [10.0, 89.0], [6.0, 192.33333333333334], [3.0, 230.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[7.6, 122.60000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[9.0, 308.0], [10.0, 487.0], [6.0, 404.3333333333333], [3.0, 484.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[7.6, 372.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[9.0, 288.6], [10.0, 497.0], [6.0, 495.3333333333333], [3.0, 496.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[7.6, 392.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[9.0, 307.4], [10.0, 524.0], [6.0, 514.3333333333334], [3.0, 468.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[7.6, 407.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[9.0, 500.8], [10.0, 544.0], [6.0, 498.3333333333333], [3.0, 489.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[7.6, 503.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[9.0, 162.0], [10.0, 73.0], [6.0, 156.0], [3.0, 193.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[7.6, 154.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[9.0, 16.2], [10.0, 15.0], [6.0, 14.0], [3.0, 32.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[7.6, 17.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[10.0, 2186.2]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[10.0, 2186.2]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[10.0, 2806.6]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[10.0, 2806.6]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[10.0, 759.8]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[10.0, 759.8]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[10.0, 3131.1]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[10.0, 3131.1]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[10.0, 25024.100000000006]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[10.0, 25024.100000000006]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 13587.85], [10.0, 1345.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[3.3333333333333335, 9506.900000000001]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 1175.5], [10.0, 1533.1000000000001]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[3.3333333333333335, 1294.6999999999998]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 2179.0], [10.0, 2338.3]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[5.0, 2258.65]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[10.0, 4332.2]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[10.0, 4332.2]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[10.0, 4829.3]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[10.0, 4829.3]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[9.0, 247.4], [10.0, 244.0], [6.0, 313.3333333333333], [3.0, 244.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[7.6, 266.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[9.0, 268.0], [10.0, 265.0], [6.0, 271.6666666666667], [3.0, 764.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[7.6, 318.40000000000003]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[9.0, 260.8], [10.0, 545.0], [6.0, 514.3333333333334], [3.0, 510.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[7.6, 390.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 10.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 431.8666666666667, "minX": 1.66399632E12, "maxY": 568007.05, "series": [{"data": [[1.66399638E12, 12026.533333333333], [1.66399632E12, 568007.05], [1.66399644E12, 431.8666666666667]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66399638E12, 19717.766666666666], [1.66399632E12, 8640.35], [1.66399644E12, 715.8333333333334]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399644E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 13.5, "minX": 1.66399632E12, "maxY": 29378.7, "series": [{"data": [[1.66399638E12, 320.9]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399638E12, 298.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399638E12, 293.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399638E12, 260.1]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399638E12, 328.59999999999997]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399638E12, 459.90000000000003]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399638E12, 414.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399638E12, 498.1]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399638E12, 467.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399638E12, 472.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399632E12, 6895.0999999999985]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399632E12, 3839.5]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399632E12, 5578.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399632E12, 2855.8]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399632E12, 5808.4]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399632E12, 3805.8]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399632E12, 3635.3999999999996]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399632E12, 4545.4]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399632E12, 10917.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399632E12, 5309.2]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399638E12, 2285.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399632E12, 1930.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399638E12, 1978.5555555555557], [1.66399632E12, 2026.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399638E12, 482.5], [1.66399632E12, 495.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399638E12, 249.7]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399638E12, 449.62499999999994], [1.66399632E12, 496.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399638E12, 272.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399638E12, 275.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399638E12, 512.875], [1.66399632E12, 476.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399638E12, 281.375], [1.66399632E12, 245.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399638E12, 453.77777777777777], [1.66399644E12, 541.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399638E12, 313.125], [1.66399632E12, 264.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399638E12, 171.44444444444446], [1.66399644E12, 244.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399638E12, 466.0], [1.66399632E12, 488.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399638E12, 434.6666666666667], [1.66399632E12, 504.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399638E12, 268.12499999999994], [1.66399632E12, 241.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399638E12, 391.0], [1.66399644E12, 523.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399638E12, 338.2222222222222], [1.66399644E12, 523.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399638E12, 293.125], [1.66399632E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399638E12, 17.11111111111111], [1.66399644E12, 49.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399638E12, 359.375], [1.66399632E12, 248.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399638E12, 126.33333333333333], [1.66399644E12, 85.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399638E12, 332.6666666666667], [1.66399644E12, 276.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399632E12, 29378.7]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399638E12, 565.8888888888889], [1.66399644E12, 315.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399638E12, 335.3333333333333], [1.66399644E12, 265.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399638E12, 308.6666666666667], [1.66399644E12, 523.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399638E12, 272.2222222222222], [1.66399632E12, 249.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399638E12, 289.25], [1.66399632E12, 366.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399638E12, 354.4444444444444], [1.66399632E12, 240.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399638E12, 488.55555555555554], [1.66399644E12, 248.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399638E12, 573.3333333333334], [1.66399644E12, 236.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399638E12, 460.77777777777777], [1.66399644E12, 236.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399638E12, 424.4444444444445], [1.66399644E12, 540.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399638E12, 396.6666666666667], [1.66399644E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399638E12, 1983.3]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399638E12, 289.44444444444446], [1.66399644E12, 252.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399638E12, 333.3333333333333], [1.66399644E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399638E12, 330.22222222222223], [1.66399644E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399638E12, 438.3333333333333], [1.66399644E12, 266.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399638E12, 273.11111111111114], [1.66399644E12, 499.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399638E12, 2332.1111111111113], [1.66399644E12, 1861.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399638E12, 264.3333333333333], [1.66399644E12, 258.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399638E12, 345.3333333333333], [1.66399644E12, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399638E12, 321.22222222222223], [1.66399644E12, 255.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399632E12, 29378.7]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399638E12, 403.125], [1.66399632E12, 236.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399638E12, 364.5], [1.66399632E12, 239.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399638E12, 311.75000000000006], [1.66399632E12, 373.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399638E12, 306.0], [1.66399632E12, 237.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399638E12, 294.875], [1.66399632E12, 379.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399638E12, 314.0], [1.66399632E12, 265.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399638E12, 480.625], [1.66399632E12, 485.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399638E12, 198.875], [1.66399632E12, 116.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399638E12, 14.25], [1.66399632E12, 13.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399638E12, 63.125], [1.66399632E12, 55.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399632E12, 1051.3]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399632E12, 968.9]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399632E12, 5029.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399638E12, 1920.3333333333335], [1.66399632E12, 2017.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399638E12, 122.60000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399638E12, 372.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399638E12, 392.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399638E12, 407.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399638E12, 503.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399638E12, 154.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399638E12, 17.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399632E12, 2186.2]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399632E12, 2806.6]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399632E12, 759.8]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399632E12, 3131.1]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399632E12, 25024.100000000006]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399632E12, 9506.900000000001]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399632E12, 1294.6999999999998]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399632E12, 2258.65]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399632E12, 4332.2]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399632E12, 4829.3]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399638E12, 266.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399638E12, 318.40000000000003]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399638E12, 390.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399644E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399632E12, "maxY": 2620.5, "series": [{"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399632E12, 869.5]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399632E12, 882.7]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399632E12, 1527.6000000000001]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399632E12, 638.1999999999999]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399632E12, 1238.3]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399632E12, 1283.7999999999997]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399632E12, 1794.9999999999998]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399632E12, 1000.4]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399632E12, 1142.8]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399632E12, 721.9000000000001]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399638E12, 540.8000000000001]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399632E12, 294.7]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399638E12, 378.5555555555555], [1.66399632E12, 495.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399638E12, 331.8888888888888], [1.66399644E12, 276.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399632E12, 1344.5]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399638E12, 565.8888888888889], [1.66399644E12, 315.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399638E12, 390.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399638E12, 565.8888888888889], [1.66399644E12, 315.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399632E12, 1344.5]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399638E12, 263.25], [1.66399632E12, 260.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399638E12, 314.0], [1.66399632E12, 265.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399632E12, 947.8]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399632E12, 728.6]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399632E12, 1104.2]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399638E12, 296.6666666666667], [1.66399632E12, 277.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399632E12, 1970.6]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399632E12, 860.5999999999999]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399632E12, 246.60000000000002]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399632E12, 2620.5]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399632E12, 999.2]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399632E12, 1290.4333333333334]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399632E12, 883.0666666666667]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399632E12, 920.85]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399632E12, 1388.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399632E12, 1943.8000000000002]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399638E12, 318.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399638E12, 390.20000000000005]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399644E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399632E12, "maxY": 2449.5, "series": [{"data": [[1.66399638E12, 73.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399638E12, 50.7]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399638E12, 47.60000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399638E12, 22.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399638E12, 75.3]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399638E12, 213.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399638E12, 164.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399638E12, 248.9]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399638E12, 224.79999999999998]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399638E12, 221.7]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399632E12, 182.7]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399632E12, 327.40000000000003]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399632E12, 484.2]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399632E12, 182.8]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399632E12, 338.5]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399632E12, 205.5]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399632E12, 707.2]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399632E12, 579.7]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399638E12, 162.7]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399632E12, 24.1]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399638E12, 111.88888888888889], [1.66399632E12, 236.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399638E12, 213.875], [1.66399632E12, 245.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399638E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399638E12, 183.875], [1.66399632E12, 247.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399638E12, 24.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399638E12, 22.500000000000004]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399638E12, 266.0], [1.66399632E12, 238.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399638E12, 32.375], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66399638E12, 198.11111111111111], [1.66399644E12, 270.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399638E12, 65.49999999999999], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66399638E12, 103.1111111111111], [1.66399644E12, 146.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399638E12, 217.25], [1.66399632E12, 249.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399638E12, 188.55555555555554], [1.66399632E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399638E12, 28.625], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66399638E12, 140.1111111111111], [1.66399644E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66399638E12, 86.88888888888889], [1.66399644E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399638E12, 30.0], [1.66399632E12, 118.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66399638E12, 1.7777777777777777], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399638E12, 109.625], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66399638E12, 51.888888888888886], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399632E12, 483.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66399638E12, 180.77777777777777], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66399638E12, 84.88888888888889], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66399638E12, 55.11111111111111], [1.66399644E12, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399638E12, 29.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 121.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399638E12, 99.55555555555556], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66399638E12, 228.44444444444446], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66399638E12, 175.88888888888889], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66399638E12, 194.66666666666666], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66399638E12, 165.11111111111111], [1.66399644E12, 267.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66399638E12, 140.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399638E12, 124.30000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66399638E12, 58.888888888888886], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66399638E12, 66.66666666666667], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66399638E12, 59.666666666666664], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66399638E12, 176.0], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399644E12, 247.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66399638E12, 180.77777777777777], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66399638E12, 29.111111111111104], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66399638E12, 82.66666666666667], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66399638E12, 59.22222222222222], [1.66399644E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399632E12, 483.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399638E12, 153.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399638E12, 114.875], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399638E12, 60.99999999999999], [1.66399632E12, 126.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399638E12, 59.875], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399638E12, 40.16666666666667], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399638E12, 242.125], [1.66399632E12, 242.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399638E12, 125.12500000000001], [1.66399632E12, 60.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399638E12, 0.0], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399632E12, 33.10000000000001]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399638E12, 26.77777777777778], [1.66399632E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399638E12, 58.5]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399638E12, 123.30000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399638E12, 147.7]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399638E12, 150.70000000000002]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399638E12, 250.29999999999998]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399638E12, 92.60000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399638E12, 2.1]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399632E12, 795.6]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399632E12, 573.3]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399632E12, 170.8]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399632E12, 2449.5]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399632E12, 232.89999999999998]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399632E12, 400.0333333333333]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399632E12, 426.0333333333334]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399632E12, 830.0500000000001]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399632E12, 417.8]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399632E12, 413.09999999999997]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399638E12, 22.3]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399638E12, 49.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399638E12, 124.30000000000001]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399644E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66399632E12, "maxY": 32018.0, "series": [{"data": [[1.66399638E12, 5431.0], [1.66399632E12, 32018.0], [1.66399644E12, 1861.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66399638E12, 538.0], [1.66399632E12, 15312.6], [1.66399644E12, 540.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66399638E12, 2145.519999999999], [1.66399632E12, 31360.480000000007], [1.66399644E12, 1861.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66399638E12, 779.6000000000006], [1.66399632E12, 24859.300000000003], [1.66399644E12, 1531.0]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66399638E12, 10.0], [1.66399632E12, 12.0], [1.66399644E12, 49.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66399638E12, 268.0], [1.66399632E12, 1776.0], [1.66399644E12, 257.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399644E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 136.5, "minX": 1.0, "maxY": 15978.0, "series": [{"data": [[2.0, 1109.0], [33.0, 257.5], [32.0, 262.5], [35.0, 245.0], [41.0, 274.0], [44.0, 263.0], [45.0, 465.0], [3.0, 684.0], [4.0, 508.0], [66.0, 457.0], [5.0, 2727.0], [6.0, 3126.0], [7.0, 563.5], [9.0, 777.0], [10.0, 1717.5], [11.0, 949.0], [12.0, 492.0], [13.0, 683.0], [14.0, 556.5], [1.0, 473.5], [16.0, 477.0], [19.0, 247.0], [21.0, 256.0], [28.0, 459.5], [29.0, 247.0], [30.0, 368.0], [31.0, 460.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[16.0, 1992.0], [11.0, 15978.0], [45.0, 136.5]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 66.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 753.0, "series": [{"data": [[2.0, 353.0], [33.0, 0.0], [32.0, 0.0], [35.0, 0.0], [41.0, 0.0], [44.0, 0.0], [45.0, 0.0], [3.0, 320.0], [4.0, 281.5], [66.0, 0.0], [5.0, 753.0], [6.0, 517.5], [7.0, 336.5], [9.0, 337.0], [10.0, 520.5], [11.0, 505.0], [12.0, 0.0], [13.0, 318.0], [14.0, 160.0], [1.0, 471.0], [16.0, 0.0], [19.0, 0.0], [21.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[16.0, 296.0], [11.0, 602.0], [45.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 66.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 0.4, "minX": 1.66399632E12, "maxY": 10.7, "series": [{"data": [[1.66399638E12, 10.7], [1.66399632E12, 5.733333333333333], [1.66399644E12, 0.4]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399644E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399632E12, "maxY": 9.466666666666667, "series": [{"data": [[1.66399638E12, 0.9166666666666666], [1.66399632E12, 4.7], [1.66399644E12, 0.03333333333333333]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66399638E12, 0.4166666666666667], [1.66399632E12, 0.23333333333333334], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66399638E12, 9.466666666666667], [1.66399632E12, 0.65], [1.66399644E12, 0.35]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.66399638E12, 0.03333333333333333]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.66399644E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399632E12, "maxY": 0.5, "series": [{"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66399632E12, 0.5]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-failure", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "Dashboard-failure", "isController": true}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66399638E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66399632E12, 0.15]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66399632E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66399632E12, 0.5]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-failure", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66399638E12, 0.15]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66399632E12, 0.15]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66399638E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-failure", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66399632E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-2-failure", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66399638E12, 0.1], [1.66399632E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399632E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66399638E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-failure", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66399632E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66399638E12, 0.13333333333333333], [1.66399632E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66399638E12, 0.15], [1.66399644E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66399638E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66399638E12, 0.16666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399644E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.06666666666666667, "minX": 1.66399632E12, "maxY": 11.083333333333334, "series": [{"data": [[1.66399638E12, 11.083333333333334], [1.66399632E12, 5.883333333333334], [1.66399644E12, 0.4]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66399638E12, 0.06666666666666667], [1.66399632E12, 0.06666666666666667]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.66399644E12, "title": "Total Transactions Per Second"}},
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
