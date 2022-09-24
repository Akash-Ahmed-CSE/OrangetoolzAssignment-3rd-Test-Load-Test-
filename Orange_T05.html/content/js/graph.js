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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 5.0, "series": [{"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[300.0, 1.0], [400.0, 1.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[300.0, 1.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[2200.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [3800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[2400.0, 2.0], [3400.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[2100.0, 1.0], [1400.0, 1.0], [2700.0, 1.0], [800.0, 1.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1100.0, 2.0], [700.0, 1.0], [400.0, 1.0], [1000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[5100.0, 1.0], [2500.0, 1.0], [1400.0, 1.0], [1800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[2800.0, 1.0], [2900.0, 1.0], [200.0, 1.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[2200.0, 1.0], [300.0, 1.0], [600.0, 1.0], [2000.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[2500.0, 2.0], [200.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[2100.0, 1.0], [5000.0, 1.0], [5700.0, 1.0], [2900.0, 1.0], [3900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[4100.0, 1.0], [2100.0, 1.0], [1500.0, 1.0], [1600.0, 1.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [3500.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[5400.0, 1.0], [1400.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2600.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[200.0, 1.0], [400.0, 1.0], [500.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[200.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[300.0, 1.0], [200.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[600.0, 1.0], [200.0, 1.0], [400.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 3.0], [100.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[200.0, 2.0], [400.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[400.0, 2.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 3.0], [400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 2.0], [100.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[200.0, 4.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[22100.0, 1.0], [13300.0, 2.0], [15200.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 1.0], [600.0, 1.0], [700.0, 1.0], [200.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[400.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[200.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[600.0, 1.0], [400.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[200.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[200.0, 2.0], [400.0, 1.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[400.0, 3.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[400.0, 3.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2600.0, 1.0], [1600.0, 1.0], [1800.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[600.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1500.0, 1.0], [1600.0, 1.0], [3500.0, 1.0], [1800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[300.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[22100.0, 1.0], [13300.0, 2.0], [15200.0, 1.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[200.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[200.0, 4.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[200.0, 2.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[3000.0, 1.0], [1500.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[600.0, 1.0], [300.0, 1.0], [200.0, 2.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[400.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[0.0, 1.0], [100.0, 3.0], [200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[300.0, 4.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[700.0, 1.0], [200.0, 2.0], [1600.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1100.0, 1.0], [2400.0, 1.0], [1200.0, 1.0], [3800.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[5400.0, 1.0], [1400.0, 1.0], [3300.0, 1.0], [1700.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 4.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[300.0, 1.0], [400.0, 2.0], [200.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[100.0, 2.0], [200.0, 3.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[400.0, 1.0], [1900.0, 2.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1200.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [100.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 1.0], [1300.0, 1.0], [700.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[4900.0, 1.0], [20200.0, 1.0], [10400.0, 1.0], [12200.0, 1.0], [14000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1200.0, 1.0], [600.0, 1.0], [10100.0, 1.0], [19800.0, 1.0], [1300.0, 1.0], [11900.0, 1.0], [3200.0, 1.0], [400.0, 1.0], [1600.0, 1.0], [800.0, 1.0], [13400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1100.0, 1.0], [300.0, 4.0], [600.0, 1.0], [200.0, 4.0], [800.0, 3.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[300.0, 3.0], [700.0, 1.0], [1500.0, 1.0], [200.0, 2.0], [800.0, 2.0], [1600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1200.0, 1.0], [700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[2400.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [1400.0, 1.0], [900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[300.0, 1.0], [700.0, 1.0], [200.0, 2.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1200.0, 1.0], [200.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[300.0, 1.0], [200.0, 3.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 22100.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 80.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 328.0, "series": [{"data": [[0.0, 328.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 97.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 80.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 2.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399608E12, "maxY": 5.0, "series": [{"data": [[1.66399614E12, 0.0], [1.66399608E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-16", "isController": false}, {"data": [[1.66399608E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-13", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-19", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-9", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-17", "isController": false}, {"data": [[1.66399608E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.6639962E12, 2.3448275862068977], [1.66399614E12, 4.492146596858639], [1.66399608E12, 5.0]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-3", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-23", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-12", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6639962E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 12.0, "minX": 0.0, "maxY": 14450.8, "series": [{"data": [[4.0, 317.5], [5.0, 306.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[4.2, 315.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[4.0, 321.75], [5.0, 308.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[4.2, 319.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[4.0, 318.0], [5.0, 308.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[4.2, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[4.0, 316.25], [5.0, 325.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[4.2, 318.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[4.0, 322.75], [5.0, 307.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[4.2, 319.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[4.0, 449.0], [5.0, 296.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[4.2, 418.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[4.0, 446.25], [5.0, 306.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[4.2, 418.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[4.0, 375.25], [5.0, 294.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[4.2, 359.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[4.0, 447.0], [5.0, 294.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[4.2, 416.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[4.0, 487.5], [5.0, 313.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[4.2, 452.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[5.0, 2056.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[5.0, 2056.0]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[5.0, 2457.6]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[5.0, 2457.6]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[5.0, 1774.6]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[5.0, 1774.6]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[5.0, 929.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[5.0, 929.0]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[5.0, 2301.6]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[5.0, 2301.6]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[5.0, 1414.4]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[5.0, 1414.4]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[5.0, 1173.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[5.0, 1173.0]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[5.0, 1309.6]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[5.0, 1309.6]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[5.0, 3995.4]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[5.0, 3995.4]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[5.0, 2286.2]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[5.0, 2286.2]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[4.0, 1688.0], [2.0, 1506.0], [1.0, 3537.0], [5.0, 1809.0], [3.0, 2048.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[3.0, 2117.6]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[4.0, 2336.6666666666665], [5.0, 3459.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[4.4, 2785.6]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[4.0, 1913.5], [5.0, 2676.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[4.2, 2066.0]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[4.0, 501.0], [5.0, 399.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[4.4, 460.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[4.0, 253.75], [5.0, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[4.2, 254.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[4.0, 402.3333333333333], [5.0, 245.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[4.4, 339.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[4.0, 322.5], [5.0, 276.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[4.2, 313.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[4.0, 399.0], [5.0, 313.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[4.2, 381.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[4.0, 485.6666666666667], [5.0, 461.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[4.4, 476.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[4.0, 236.66666666666666], [5.0, 245.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[4.4, 240.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[4.0, 514.0], [2.0, 228.0], [1.0, 488.0], [5.0, 243.0], [3.0, 461.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[3.0, 386.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[4.0, 249.33333333333334], [5.0, 255.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[4.4, 251.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[4.0, 55.0], [2.0, 54.0], [1.0, 196.0], [5.0, 54.0], [3.0, 165.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[3.0, 104.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[4.0, 402.0], [5.0, 365.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[4.4, 387.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[4.0, 321.3333333333333], [5.0, 503.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[4.4, 394.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[4.0, 254.33333333333334], [5.0, 270.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[4.4, 260.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[4.0, 247.0], [2.0, 237.0], [1.0, 472.0], [5.0, 503.0], [3.0, 490.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[3.0, 389.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[4.0, 242.0], [2.0, 251.0], [1.0, 441.0], [5.0, 244.0], [3.0, 462.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[3.0, 328.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[4.0, 322.6666666666667], [5.0, 276.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[4.4, 304.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[4.0, 12.0], [2.0, 15.0], [1.0, 28.0], [5.0, 14.0], [3.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[3.0, 18.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[4.0, 233.33333333333334], [5.0, 258.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[4.4, 243.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[4.0, 73.0], [2.0, 170.0], [1.0, 169.0], [5.0, 55.0], [3.0, 177.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[3.0, 128.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[4.0, 265.0], [2.0, 252.0], [1.0, 1602.0], [5.0, 280.0], [3.0, 276.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[3.0, 535.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[5.0, 14450.8]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[5.0, 14450.8]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[4.0, 296.0], [2.0, 277.0], [1.0, 710.0], [5.0, 310.0], [3.0, 604.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[3.0, 439.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[4.0, 253.0], [2.0, 231.0], [1.0, 268.0], [5.0, 259.0], [3.0, 499.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[3.0, 302.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[4.0, 248.0], [2.0, 232.0], [1.0, 473.0], [5.0, 462.0], [3.0, 250.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[3.0, 333.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[4.0, 254.33333333333334], [5.0, 261.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[4.4, 257.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[4.0, 251.66666666666666], [5.0, 246.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[4.4, 249.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[4.0, 267.6666666666667], [5.0, 256.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[4.4, 263.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[4.0, 473.0], [2.0, 482.0], [1.0, 461.0], [5.0, 673.0], [3.0, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[3.0, 468.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[4.0, 510.0], [2.0, 254.0], [1.0, 504.0], [5.0, 239.0], [3.0, 245.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[3.0, 350.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[4.0, 510.0], [2.0, 465.0], [1.0, 511.0], [5.0, 258.0], [3.0, 233.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[3.0, 395.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[4.0, 483.0], [2.0, 230.0], [1.0, 470.0], [5.0, 586.0], [3.0, 494.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[3.0, 452.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[4.0, 458.0], [2.0, 501.0], [1.0, 497.0], [5.0, 456.0], [3.0, 509.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[3.0, 484.2]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[4.0, 1913.5], [5.0, 2676.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[4.2, 2066.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[4.0, 235.0], [2.0, 271.0], [1.0, 234.0], [5.0, 350.0], [3.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[3.0, 267.4]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[4.0, 229.0], [2.0, 227.0], [1.0, 262.0], [5.0, 340.0], [3.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[3.0, 261.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[4.0, 227.0], [2.0, 254.0], [1.0, 238.0], [5.0, 331.0], [3.0, 256.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[3.0, 261.2]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[4.0, 268.0], [2.0, 232.0], [1.0, 253.0], [5.0, 330.0], [3.0, 232.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[3.0, 263.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[4.0, 228.0], [2.0, 226.0], [1.0, 248.0], [5.0, 672.0], [3.0, 235.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[3.0, 321.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[4.0, 1688.0], [2.0, 1506.0], [1.0, 3537.0], [5.0, 1809.0], [3.0, 2048.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[3.0, 2117.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[4.0, 269.0], [2.0, 241.0], [1.0, 244.0], [5.0, 335.0], [3.0, 231.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[3.0, 264.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[4.0, 228.0], [2.0, 247.0], [1.0, 234.0], [5.0, 330.0], [3.0, 235.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[3.0, 254.8]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[4.0, 272.0], [2.0, 250.0], [1.0, 256.0], [5.0, 335.0], [3.0, 250.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[3.0, 272.6]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[5.0, 14450.8]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[5.0, 14450.8]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[4.0, 405.6666666666667], [5.0, 412.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[4.4, 408.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[4.0, 311.3333333333333], [5.0, 423.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[4.4, 356.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[4.0, 322.0], [5.0, 268.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[4.4, 300.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[4.0, 391.6666666666667], [5.0, 407.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[4.4, 397.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[4.0, 712.3333333333334], [5.0, 1668.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[4.4, 1094.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[4.0, 445.6666666666667], [5.0, 605.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[4.4, 509.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[4.0, 472.6666666666667], [5.0, 523.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[4.4, 493.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[4.0, 148.33333333333334], [5.0, 142.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[4.4, 145.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[4.0, 14.333333333333334], [5.0, 31.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[4.4, 21.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[4.0, 66.0], [5.0, 77.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[4.4, 70.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[5.0, 377.4]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[5.0, 377.4]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[5.0, 715.4]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[5.0, 715.4]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[5.0, 2521.8]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[5.0, 2521.8]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[4.0, 2336.6666666666665], [5.0, 3459.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[4.4, 2785.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[4.0, 67.5], [5.0, 111.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[4.2, 76.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[4.0, 437.75], [5.0, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[4.2, 413.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[4.0, 357.5], [5.0, 305.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[4.2, 347.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[4.0, 318.5], [5.0, 306.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[4.2, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[4.0, 431.25], [5.0, 300.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[4.2, 405.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[4.0, 207.75], [5.0, 138.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[4.2, 193.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[4.0, 14.25], [5.0, 68.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[4.2, 25.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[5.0, 1086.8]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[5.0, 1086.8]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[5.0, 1491.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[5.0, 1491.0]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[5.0, 202.2]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[5.0, 202.2]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[5.0, 1061.8]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[5.0, 1061.8]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[5.0, 12376.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[5.0, 12376.0]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 6309.5], [5.0, 795.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.6666666666666665, 4471.333333333333]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 605.4000000000001], [5.0, 379.8]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.6666666666666665, 530.1999999999999]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 868.6], [5.0, 565.2]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[2.5, 716.9]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[5.0, 1565.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[5.0, 1565.0]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[5.0, 1638.6]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[5.0, 1638.6]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[4.0, 420.75], [5.0, 322.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[4.2, 401.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[4.0, 268.25], [5.0, 1290.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[4.2, 472.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[4.0, 335.0], [5.0, 278.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[4.2, 323.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 5.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 492.5, "minX": 1.66399608E12, "maxY": 262551.2, "series": [{"data": [[1.6639962E12, 1540.5666666666666], [1.66399614E12, 262551.2], [1.66399608E12, 26315.516666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.6639962E12, 2737.016666666667], [1.66399614E12, 11327.783333333333], [1.66399608E12, 492.5]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6639962E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 13.0, "minX": 1.66399608E12, "maxY": 14450.8, "series": [{"data": [[1.66399614E12, 315.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399614E12, 319.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399614E12, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399614E12, 318.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399614E12, 319.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399614E12, 418.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399614E12, 418.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399614E12, 359.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399614E12, 416.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399614E12, 452.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399614E12, 2651.0], [1.66399608E12, 1163.5]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399614E12, 2608.0], [1.66399608E12, 1856.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399614E12, 2195.6666666666665], [1.66399608E12, 1143.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399614E12, 1123.3333333333333], [1.66399608E12, 637.5]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399614E12, 2301.6]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399614E12, 1414.4]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399614E12, 1383.5], [1.66399608E12, 331.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399614E12, 1564.25], [1.66399608E12, 291.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399614E12, 3995.4]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399614E12, 2286.2]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399614E12, 2117.6]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399614E12, 2785.6]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399614E12, 2066.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399614E12, 460.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399614E12, 254.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399614E12, 339.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399614E12, 313.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399614E12, 381.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399614E12, 476.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399614E12, 240.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6639962E12, 422.75], [1.66399614E12, 243.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399614E12, 251.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6639962E12, 138.33333333333334], [1.66399614E12, 54.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399614E12, 387.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399614E12, 394.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399614E12, 260.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6639962E12, 399.6666666666667], [1.66399614E12, 375.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6639962E12, 384.6666666666667], [1.66399614E12, 243.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399614E12, 304.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6639962E12, 21.333333333333332], [1.66399614E12, 13.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399614E12, 243.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6639962E12, 172.0], [1.66399614E12, 64.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6639962E12, 710.0], [1.66399614E12, 272.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399614E12, 14450.8]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6639962E12, 530.3333333333334], [1.66399614E12, 303.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6639962E12, 332.6666666666667], [1.66399614E12, 256.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6639962E12, 318.3333333333333], [1.66399614E12, 355.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399614E12, 257.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399614E12, 249.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399614E12, 263.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6639962E12, 416.75], [1.66399614E12, 673.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6639962E12, 378.25], [1.66399614E12, 239.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6639962E12, 429.75], [1.66399614E12, 258.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6639962E12, 419.25], [1.66399614E12, 586.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6639962E12, 491.25], [1.66399614E12, 456.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399614E12, 2066.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6639962E12, 246.75], [1.66399614E12, 350.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6639962E12, 241.25], [1.66399614E12, 340.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6639962E12, 243.75], [1.66399614E12, 331.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6639962E12, 246.25], [1.66399614E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6639962E12, 234.25], [1.66399614E12, 672.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6639962E12, 2194.75], [1.66399614E12, 1809.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6639962E12, 246.25], [1.66399614E12, 335.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6639962E12, 236.0], [1.66399614E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6639962E12, 257.0], [1.66399614E12, 335.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399614E12, 14450.8]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399614E12, 408.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399614E12, 356.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399614E12, 300.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399614E12, 397.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399614E12, 1094.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399614E12, 509.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399614E12, 493.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399614E12, 145.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399614E12, 21.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399614E12, 70.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399614E12, 377.4]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399614E12, 715.4]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399614E12, 2521.8]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399614E12, 2785.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399614E12, 76.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399614E12, 413.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399614E12, 347.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399614E12, 316.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399614E12, 405.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399614E12, 193.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399614E12, 25.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399614E12, 1464.0], [1.66399608E12, 521.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399614E12, 1544.3333333333333], [1.66399608E12, 1411.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399614E12, 336.5], [1.66399608E12, 112.66666666666667]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399614E12, 1418.6666666666667], [1.66399608E12, 526.5]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399614E12, 12376.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399614E12, 6783.777777777777], [1.66399608E12, 1002.6666666666666]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399614E12, 579.1], [1.66399608E12, 432.4]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399614E12, 909.3333333333334], [1.66399608E12, 428.25]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399614E12, 1695.3333333333333], [1.66399608E12, 1369.5]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399614E12, 2536.5], [1.66399608E12, 1040.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399614E12, 401.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399614E12, 472.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399614E12, 323.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6639962E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399608E12, "maxY": 2206.5, "series": [{"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399614E12, 617.6666666666666], [1.66399608E12, 431.5]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399614E12, 1144.25], [1.66399608E12, 462.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399614E12, 615.3333333333334], [1.66399608E12, 244.5]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399614E12, 556.3333333333334], [1.66399608E12, 262.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399614E12, 749.2]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399614E12, 707.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399614E12, 681.75], [1.66399608E12, 314.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399614E12, 322.75], [1.66399608E12, 261.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399614E12, 512.8]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399614E12, 370.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399614E12, 439.4]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399614E12, 509.4]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399614E12, 323.6]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6639962E12, 463.66666666666663], [1.66399614E12, 272.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399614E12, 794.2]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6639962E12, 530.3333333333334], [1.66399614E12, 303.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399614E12, 323.6]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6639962E12, 471.75], [1.66399614E12, 310.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399614E12, 794.2]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399614E12, 951.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399614E12, 509.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399614E12, 377.2]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399614E12, 551.8]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399614E12, 609.4]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399614E12, 509.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399614E12, 1463.6666666666667], [1.66399608E12, 521.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399614E12, 630.0], [1.66399608E12, 834.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399614E12, 108.0], [1.66399608E12, 98.66666666666667]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399614E12, 1236.3333333333333], [1.66399608E12, 468.5]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399614E12, 921.2]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399614E12, 937.3333333333334], [1.66399608E12, 412.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399614E12, 467.09999999999997], [1.66399608E12, 322.8]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399614E12, 584.3333333333333], [1.66399608E12, 404.25]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399614E12, 522.6666666666666], [1.66399608E12, 802.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399614E12, 2206.5], [1.66399608E12, 728.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399614E12, 386.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399614E12, 323.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6639962E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66399608E12, "maxY": 1127.3333333333333, "series": [{"data": [[1.66399614E12, 48.99999999999999]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66399614E12, 57.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66399614E12, 51.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66399614E12, 52.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66399614E12, 52.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66399614E12, 152.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66399614E12, 151.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66399614E12, 101.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66399614E12, 153.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66399614E12, 194.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66399614E12, 282.3333333333333], [1.66399608E12, 124.5]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66399614E12, 437.5], [1.66399608E12, 230.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66399614E12, 297.0], [1.66399608E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66399614E12, 255.0], [1.66399608E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66399614E12, 381.0], [1.66399608E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66399614E12, 0.0], [1.66399608E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66399614E12, 131.8]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66399614E12, 57.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66399614E12, 126.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66399614E12, 179.8]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66399614E12, 46.4]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66399614E12, 205.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66399614E12, 97.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66399614E12, 55.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66399614E12, 111.6]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66399614E12, 226.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.6639962E12, 179.75], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.6639962E12, 85.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66399614E12, 142.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66399614E12, 146.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.6639962E12, 159.0], [1.66399614E12, 125.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.6639962E12, 150.33333333333334], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66399614E12, 49.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.6639962E12, 5.333333333333333], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.6639962E12, 114.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66399614E12, 485.4]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.6639962E12, 210.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.6639962E12, 83.33333333333334], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.6639962E12, 77.66666666666667], [1.66399614E12, 116.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.6639962E12, 179.25], [1.66399614E12, 316.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.6639962E12, 125.5], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.6639962E12, 184.75], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.6639962E12, 182.75], [1.66399614E12, 248.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.6639962E12, 243.25], [1.66399614E12, 228.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66399614E12, 46.4]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 331.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.6639962E12, 157.5], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.6639962E12, 0.0], [1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66399614E12, 485.4]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66399614E12, 157.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66399614E12, 107.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66399614E12, 48.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66399614E12, 151.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66399614E12, 174.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66399614E12, 179.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66399614E12, 249.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66399614E12, 73.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66399614E12, 89.2]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66399614E12, 179.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66399614E12, 144.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66399614E12, 85.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66399614E12, 50.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66399614E12, 145.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66399614E12, 117.2]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66399614E12, 648.3333333333333], [1.66399608E12, 233.5]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66399614E12, 435.0], [1.66399608E12, 414.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66399614E12, 36.0], [1.66399608E12, 49.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66399614E12, 1127.3333333333333], [1.66399608E12, 277.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66399614E12, 180.6]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66399614E12, 375.5555555555556], [1.66399608E12, 140.16666666666669]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66399614E12, 135.8], [1.66399608E12, 75.6]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66399614E12, 201.83333333333334], [1.66399608E12, 92.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66399614E12, 222.33333333333331], [1.66399608E12, 250.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66399614E12, 830.0], [1.66399608E12, 257.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66399614E12, 136.8]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66399614E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66399614E12, 46.4]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6639962E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66399608E12, "maxY": 22140.0, "series": [{"data": [[1.6639962E12, 3537.0], [1.66399614E12, 22140.0], [1.66399608E12, 3264.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.6639962E12, 511.6], [1.66399614E12, 2466.500000000001], [1.66399608E12, 1866.2]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.6639962E12, 3537.0], [1.66399614E12, 16101.729999999989], [1.66399608E12, 3264.0]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.6639962E12, 1563.5999999999995], [1.66399614E12, 4181.849999999998], [1.66399608E12, 2101.1999999999966]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.6639962E12, 15.0], [1.66399614E12, 10.0], [1.66399608E12, 93.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.6639962E12, 253.0], [1.66399614E12, 328.5], [1.66399608E12, 537.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6639962E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 166.0, "minX": 1.0, "maxY": 20276.0, "series": [{"data": [[8.0, 2039.0], [2.0, 1706.0], [9.0, 334.5], [10.0, 260.0], [11.0, 1263.0], [12.0, 307.0], [3.0, 20276.0], [13.0, 249.0], [15.0, 313.0], [1.0, 633.5], [16.0, 988.0], [4.0, 589.5], [18.0, 278.5], [19.0, 296.0], [5.0, 166.0], [20.0, 246.5], [21.0, 489.0], [22.0, 260.5], [6.0, 253.0], [7.0, 1923.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 668.0, "series": [{"data": [[8.0, 598.5], [2.0, 348.0], [9.0, 248.0], [10.0, 0.0], [11.0, 528.0], [12.0, 290.0], [3.0, 668.0], [13.0, 0.0], [15.0, 0.0], [1.0, 628.5], [16.0, 329.5], [4.0, 431.5], [18.0, 0.0], [19.0, 0.0], [5.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [6.0, 46.0], [7.0, 621.0]], "isOverall": false, "label": "Successes", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 22.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 1.0333333333333334, "minX": 1.66399608E12, "maxY": 6.05, "series": [{"data": [[1.6639962E12, 1.3333333333333333], [1.66399614E12, 6.05], [1.66399608E12, 1.0333333333333334]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6639962E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.05, "minX": 1.66399608E12, "maxY": 3.966666666666667, "series": [{"data": [[1.6639962E12, 0.11666666666666667], [1.66399614E12, 2.1333333333333333], [1.66399608E12, 0.5833333333333334]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.23333333333333334], [1.66399608E12, 0.05]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.6639962E12, 1.2833333333333334], [1.66399614E12, 3.966666666666667]], "isOverall": false, "label": "304", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6639962E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66399608E12, "maxY": 0.16666666666666666, "series": [{"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66399614E12, 0.15], [1.66399608E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66399614E12, 0.03333333333333333], [1.66399608E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66399614E12, 0.06666666666666667], [1.66399608E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66399614E12, 0.16666666666666666], [1.66399608E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66399614E12, 0.1], [1.66399608E12, 0.06666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66399614E12, 0.05], [1.66399608E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66399614E12, 0.06666666666666667], [1.66399608E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66399614E12, 0.06666666666666667], [1.66399608E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66399614E12, 0.03333333333333333], [1.66399608E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.6639962E12, 0.06666666666666667], [1.66399614E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.6639962E12, 0.05], [1.66399614E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66399614E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6639962E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.6333333333333333, "minX": 1.66399608E12, "maxY": 6.666666666666667, "series": [{"data": [[1.6639962E12, 1.45], [1.66399614E12, 6.666666666666667], [1.66399608E12, 0.6333333333333333]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6639962E12, "title": "Total Transactions Per Second"}},
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
