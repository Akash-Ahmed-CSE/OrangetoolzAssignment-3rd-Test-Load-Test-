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
        data: {"result": {"minY": 1.0, "minX": 0.0, "maxY": 24.0, "series": [{"data": [[200.0, 22.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[200.0, 20.0], [400.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[0.0, 1.0], [200.0, 22.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[200.0, 23.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[200.0, 23.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[200.0, 2.0], [400.0, 14.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[200.0, 5.0], [400.0, 8.0], [500.0, 11.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[200.0, 2.0], [400.0, 10.0], [500.0, 12.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[200.0, 1.0], [400.0, 9.0], [500.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[200.0, 1.0], [400.0, 10.0], [500.0, 13.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[33500.0, 1.0], [32800.0, 1.0], [9600.0, 1.0], [38500.0, 1.0], [9900.0, 1.0], [10600.0, 1.0], [10800.0, 1.0], [13300.0, 1.0], [13800.0, 1.0], [14300.0, 1.0], [16100.0, 1.0], [15900.0, 1.0], [18000.0, 1.0], [70400.0, 1.0], [18400.0, 1.0], [18500.0, 1.0], [19000.0, 1.0], [19500.0, 1.0], [21000.0, 1.0], [21100.0, 1.0], [22000.0, 1.0], [21900.0, 1.0], [25200.0, 1.0], [26200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[8400.0, 1.0], [34400.0, 1.0], [8900.0, 1.0], [10500.0, 1.0], [12100.0, 1.0], [12000.0, 1.0], [49500.0, 1.0], [13300.0, 1.0], [13200.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [18400.0, 1.0], [4500.0, 1.0], [18200.0, 1.0], [1400.0, 1.0], [22600.0, 1.0], [6000.0, 2.0], [26400.0, 1.0], [6700.0, 1.0], [27800.0, 1.0], [7600.0, 1.0], [7700.0, 1.0], [7900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[9400.0, 2.0], [40800.0, 1.0], [10700.0, 1.0], [11400.0, 1.0], [11500.0, 1.0], [12400.0, 1.0], [54200.0, 1.0], [3900.0, 1.0], [18600.0, 1.0], [5100.0, 2.0], [5000.0, 1.0], [5500.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [6200.0, 1.0], [6400.0, 1.0], [6600.0, 1.0], [6500.0, 1.0], [7000.0, 1.0], [7400.0, 1.0], [7700.0, 1.0], [31200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[34700.0, 1.0], [10000.0, 1.0], [10100.0, 1.0], [2700.0, 2.0], [3400.0, 1.0], [13800.0, 1.0], [14800.0, 1.0], [3800.0, 1.0], [18100.0, 1.0], [17700.0, 1.0], [4400.0, 1.0], [19400.0, 1.0], [21500.0, 1.0], [1400.0, 1.0], [5500.0, 1.0], [22100.0, 1.0], [6000.0, 1.0], [24600.0, 1.0], [6900.0, 1.0], [6700.0, 2.0], [7100.0, 1.0], [1800.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[9200.0, 1.0], [2400.0, 1.0], [9400.0, 1.0], [9900.0, 1.0], [11300.0, 1.0], [11900.0, 1.0], [12300.0, 1.0], [12700.0, 1.0], [12900.0, 1.0], [14200.0, 1.0], [14300.0, 1.0], [4100.0, 1.0], [17300.0, 1.0], [16900.0, 1.0], [17700.0, 1.0], [17600.0, 1.0], [5200.0, 1.0], [21300.0, 1.0], [20900.0, 1.0], [22400.0, 1.0], [5600.0, 1.0], [6500.0, 1.0], [27000.0, 1.0], [27200.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[2100.0, 1.0], [8200.0, 1.0], [2300.0, 1.0], [8900.0, 1.0], [2600.0, 1.0], [12300.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [3900.0, 1.0], [15800.0, 1.0], [4300.0, 1.0], [4100.0, 1.0], [4600.0, 1.0], [4500.0, 1.0], [4800.0, 1.0], [1300.0, 1.0], [5500.0, 1.0], [5400.0, 1.0], [5800.0, 1.0], [1800.0, 1.0], [1900.0, 1.0], [2000.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[2100.0, 3.0], [2400.0, 1.0], [9600.0, 1.0], [10700.0, 1.0], [2900.0, 1.0], [3100.0, 1.0], [3300.0, 1.0], [3600.0, 1.0], [1000.0, 2.0], [1200.0, 1.0], [5200.0, 1.0], [1400.0, 1.0], [6000.0, 1.0], [6300.0, 1.0], [6200.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [7600.0, 1.0], [8100.0, 1.0], [8000.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[8700.0, 1.0], [2400.0, 1.0], [11500.0, 1.0], [12100.0, 1.0], [3100.0, 2.0], [3200.0, 1.0], [13700.0, 1.0], [3600.0, 1.0], [3900.0, 1.0], [4300.0, 1.0], [5000.0, 1.0], [1300.0, 1.0], [5200.0, 1.0], [1400.0, 1.0], [6000.0, 2.0], [25500.0, 1.0], [27500.0, 1.0], [6800.0, 2.0], [6900.0, 1.0], [7400.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[33400.0, 1.0], [34900.0, 1.0], [36300.0, 1.0], [40700.0, 1.0], [42200.0, 1.0], [11500.0, 1.0], [48400.0, 1.0], [49900.0, 1.0], [57200.0, 1.0], [17000.0, 1.0], [19000.0, 1.0], [19300.0, 1.0], [20200.0, 1.0], [19600.0, 1.0], [21500.0, 1.0], [21300.0, 1.0], [22100.0, 1.0], [24400.0, 1.0], [27100.0, 1.0], [27000.0, 1.0], [27400.0, 1.0], [29000.0, 1.0], [30400.0, 1.0], [29700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[10000.0, 2.0], [11200.0, 2.0], [12600.0, 1.0], [13600.0, 1.0], [14800.0, 1.0], [14700.0, 1.0], [15600.0, 1.0], [15700.0, 1.0], [15900.0, 1.0], [17100.0, 1.0], [19200.0, 1.0], [19700.0, 1.0], [19500.0, 1.0], [23900.0, 1.0], [24900.0, 1.0], [6500.0, 1.0], [26300.0, 1.0], [7400.0, 2.0], [7800.0, 1.0], [7900.0, 1.0], [7700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2500.0, 1.0], [1500.0, 2.0], [1600.0, 3.0], [1700.0, 5.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 6.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[4100.0, 1.0], [2100.0, 2.0], [2300.0, 4.0], [2200.0, 6.0], [1700.0, 1.0], [7100.0, 1.0], [1800.0, 1.0], [2000.0, 8.0]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[2300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 6.0], [1800.0, 4.0], [2000.0, 10.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[400.0, 13.0], [500.0, 11.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[200.0, 23.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[200.0, 2.0], [400.0, 16.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[200.0, 22.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[200.0, 21.0], [400.0, 2.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[400.0, 8.0], [500.0, 16.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[200.0, 23.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[400.0, 9.0], [200.0, 2.0], [500.0, 13.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[400.0, 1.0], [200.0, 23.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[0.0, 1.0], [100.0, 21.0], [200.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[400.0, 14.0], [200.0, 1.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[2900.0, 1.0], [200.0, 1.0], [400.0, 16.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[200.0, 22.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[200.0, 12.0], [400.0, 8.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[200.0, 14.0], [400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[200.0, 23.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[0.0, 24.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[200.0, 22.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[0.0, 22.0], [100.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[300.0, 3.0], [200.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[53600.0, 1.0], [58100.0, 1.0], [59200.0, 1.0], [57400.0, 1.0], [57900.0, 1.0], [60100.0, 1.0], [61000.0, 1.0], [60600.0, 1.0], [60000.0, 1.0], [60500.0, 1.0], [60700.0, 1.0], [63400.0, 1.0], [65000.0, 1.0], [66600.0, 2.0], [67000.0, 1.0], [67900.0, 1.0], [68400.0, 1.0], [65900.0, 1.0], [68600.0, 1.0], [71200.0, 1.0], [77000.0, 1.0], [96000.0, 1.0], [103400.0, 1.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[300.0, 9.0], [200.0, 7.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[200.0, 16.0], [400.0, 4.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[200.0, 18.0], [400.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[200.0, 22.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[300.0, 1.0], [200.0, 22.0], [400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[200.0, 18.0], [400.0, 4.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[400.0, 8.0], [200.0, 7.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[600.0, 2.0], [400.0, 11.0], [200.0, 3.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[600.0, 1.0], [400.0, 11.0], [200.0, 5.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[400.0, 12.0], [200.0, 5.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[400.0, 8.0], [200.0, 2.0], [500.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[2300.0, 2.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 6.0], [1800.0, 4.0], [2000.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[200.0, 22.0], [500.0, 2.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[300.0, 1.0], [200.0, 23.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[300.0, 2.0], [200.0, 21.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[300.0, 2.0], [200.0, 22.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[300.0, 1.0], [200.0, 21.0], [800.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[2100.0, 2.0], [2300.0, 1.0], [2500.0, 1.0], [1500.0, 2.0], [1600.0, 3.0], [1700.0, 5.0], [1800.0, 3.0], [1900.0, 1.0], [2000.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[200.0, 22.0], [400.0, 1.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[200.0, 18.0], [400.0, 2.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[200.0, 23.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[53600.0, 1.0], [58100.0, 1.0], [59200.0, 1.0], [57400.0, 1.0], [57900.0, 1.0], [60100.0, 1.0], [61000.0, 1.0], [60600.0, 1.0], [60000.0, 1.0], [60500.0, 1.0], [60700.0, 1.0], [63400.0, 1.0], [65000.0, 1.0], [66600.0, 2.0], [67000.0, 1.0], [67900.0, 1.0], [68400.0, 1.0], [65900.0, 1.0], [68600.0, 1.0], [71200.0, 1.0], [77000.0, 1.0], [96000.0, 1.0], [103400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[200.0, 4.0], [400.0, 11.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[400.0, 6.0], [200.0, 8.0], [500.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[400.0, 9.0], [200.0, 6.0], [500.0, 9.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[400.0, 12.0], [200.0, 7.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[300.0, 2.0], [700.0, 1.0], [200.0, 17.0], [400.0, 1.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[5600.0, 1.0], [200.0, 7.0], [400.0, 3.0], [500.0, 14.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[6100.0, 1.0], [200.0, 1.0], [400.0, 11.0], [500.0, 11.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[100.0, 24.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[0.0, 24.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[0.0, 2.0], [100.0, 22.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[600.0, 3.0], [2500.0, 1.0], [2600.0, 1.0], [700.0, 1.0], [11300.0, 1.0], [3400.0, 1.0], [4200.0, 1.0], [300.0, 8.0], [5500.0, 1.0], [5800.0, 1.0], [1500.0, 1.0], [6400.0, 1.0], [1700.0, 2.0], [1900.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[9100.0, 1.0], [600.0, 3.0], [10200.0, 1.0], [700.0, 1.0], [10900.0, 1.0], [11300.0, 1.0], [3400.0, 1.0], [900.0, 1.0], [4000.0, 1.0], [1100.0, 1.0], [300.0, 3.0], [4800.0, 1.0], [5100.0, 1.0], [1300.0, 3.0], [1600.0, 1.0], [7600.0, 1.0], [1900.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[8400.0, 1.0], [8800.0, 1.0], [9400.0, 1.0], [13300.0, 1.0], [3400.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [14800.0, 1.0], [3800.0, 1.0], [15500.0, 1.0], [4200.0, 1.0], [16400.0, 1.0], [4600.0, 2.0], [18700.0, 1.0], [4900.0, 4.0], [5500.0, 1.0], [6000.0, 1.0], [6100.0, 1.0], [6600.0, 1.0], [7600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[4100.0, 1.0], [2100.0, 2.0], [2300.0, 4.0], [2200.0, 6.0], [1700.0, 1.0], [7100.0, 1.0], [1800.0, 1.0], [2000.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[0.0, 23.0], [100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[600.0, 1.0], [200.0, 14.0], [400.0, 4.0], [500.0, 5.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[600.0, 1.0], [200.0, 15.0], [400.0, 4.0], [500.0, 4.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[600.0, 1.0], [200.0, 13.0], [400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[200.0, 1.0], [400.0, 13.0], [500.0, 10.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[0.0, 2.0], [600.0, 1.0], [100.0, 21.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[0.0, 23.0], [300.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[8500.0, 1.0], [9200.0, 1.0], [600.0, 6.0], [700.0, 4.0], [3000.0, 2.0], [3100.0, 1.0], [4000.0, 1.0], [16900.0, 1.0], [300.0, 1.0], [5200.0, 1.0], [400.0, 1.0], [2000.0, 3.0], [500.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[10300.0, 1.0], [12600.0, 1.0], [13500.0, 1.0], [14600.0, 1.0], [900.0, 1.0], [15600.0, 1.0], [15400.0, 1.0], [16200.0, 1.0], [1000.0, 1.0], [16400.0, 1.0], [4300.0, 1.0], [18300.0, 1.0], [18700.0, 1.0], [1200.0, 1.0], [23600.0, 1.0], [6000.0, 1.0], [1600.0, 1.0], [27300.0, 1.0], [1700.0, 2.0], [30300.0, 1.0], [30200.0, 1.0], [2000.0, 1.0], [8000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[0.0, 4.0], [600.0, 1.0], [700.0, 1.0], [10900.0, 1.0], [46000.0, 1.0], [12000.0, 1.0], [3000.0, 1.0], [48600.0, 1.0], [3100.0, 1.0], [800.0, 1.0], [1100.0, 2.0], [1200.0, 1.0], [300.0, 1.0], [5000.0, 1.0], [5600.0, 1.0], [5500.0, 1.0], [6000.0, 1.0], [100100.0, 1.0], [100.0, 1.0], [1700.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[34700.0, 1.0], [2200.0, 1.0], [2400.0, 1.0], [10200.0, 1.0], [2800.0, 2.0], [700.0, 3.0], [200.0, 1.0], [900.0, 1.0], [3800.0, 1.0], [4000.0, 1.0], [1100.0, 1.0], [20200.0, 1.0], [5100.0, 1.0], [1400.0, 1.0], [5600.0, 1.0], [1500.0, 1.0], [6200.0, 1.0], [400.0, 1.0], [30200.0, 1.0], [7500.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[39100.0, 1.0], [47000.0, 1.0], [46200.0, 1.0], [47300.0, 1.0], [50800.0, 1.0], [51900.0, 1.0], [52100.0, 1.0], [54600.0, 1.0], [54700.0, 1.0], [53600.0, 1.0], [57300.0, 1.0], [58700.0, 1.0], [59300.0, 1.0], [59500.0, 1.0], [60100.0, 1.0], [62500.0, 1.0], [65300.0, 1.0], [65400.0, 1.0], [65700.0, 1.0], [66700.0, 1.0], [66600.0, 1.0], [69700.0, 1.0], [93100.0, 1.0], [31400.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[600.0, 2.0], [700.0, 8.0], [800.0, 1.0], [900.0, 1.0], [1300.0, 1.0], [1400.0, 1.0], [1700.0, 4.0], [1800.0, 1.0], [1900.0, 1.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 2.0], [2800.0, 2.0], [2700.0, 2.0], [3000.0, 1.0], [3400.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [4900.0, 1.0], [6900.0, 1.0], [7300.0, 1.0], [7800.0, 1.0], [8100.0, 1.0], [8600.0, 1.0], [16500.0, 1.0], [20000.0, 1.0], [31100.0, 1.0], [38900.0, 1.0], [38600.0, 1.0], [45800.0, 1.0], [46700.0, 1.0], [45600.0, 1.0], [50100.0, 1.0], [51400.0, 2.0], [53100.0, 1.0], [52900.0, 1.0], [54000.0, 1.0], [54200.0, 1.0], [56600.0, 1.0], [56900.0, 1.0], [59000.0, 1.0], [58800.0, 1.0], [59600.0, 1.0], [62200.0, 1.0], [64700.0, 1.0], [65100.0, 1.0], [64900.0, 1.0], [66200.0, 2.0], [69200.0, 1.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[8200.0, 1.0], [600.0, 4.0], [700.0, 2.0], [800.0, 2.0], [1000.0, 1.0], [18400.0, 1.0], [1100.0, 1.0], [1300.0, 1.0], [1400.0, 3.0], [1500.0, 1.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 2.0], [1900.0, 2.0], [30600.0, 1.0], [2000.0, 2.0], [2300.0, 1.0], [2400.0, 1.0], [2500.0, 1.0], [2600.0, 2.0], [2800.0, 1.0], [3000.0, 1.0], [200.0, 6.0], [3400.0, 1.0], [3700.0, 1.0], [4100.0, 2.0], [4300.0, 2.0], [4500.0, 1.0], [4400.0, 1.0], [300.0, 7.0], [4800.0, 1.0], [5400.0, 1.0], [400.0, 7.0], [7400.0, 1.0], [500.0, 7.0]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[8900.0, 1.0], [8800.0, 1.0], [600.0, 2.0], [700.0, 2.0], [11200.0, 1.0], [900.0, 1.0], [1000.0, 2.0], [1200.0, 2.0], [1500.0, 3.0], [1600.0, 1.0], [1700.0, 1.0], [1800.0, 1.0], [1900.0, 2.0], [2000.0, 2.0], [2100.0, 2.0], [2300.0, 4.0], [2500.0, 1.0], [2900.0, 1.0], [3000.0, 1.0], [200.0, 1.0], [3500.0, 1.0], [3700.0, 1.0], [3600.0, 1.0], [4100.0, 2.0], [4500.0, 1.0], [300.0, 7.0], [500.0, 2.0], [8100.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[2100.0, 1.0], [8600.0, 1.0], [35800.0, 1.0], [8800.0, 1.0], [9400.0, 1.0], [9800.0, 1.0], [11100.0, 1.0], [2700.0, 1.0], [11800.0, 1.0], [3300.0, 1.0], [3400.0, 1.0], [13600.0, 1.0], [14200.0, 1.0], [14600.0, 2.0], [900.0, 1.0], [4400.0, 1.0], [1300.0, 1.0], [5800.0, 1.0], [6100.0, 1.0], [24500.0, 1.0], [6900.0, 2.0], [7600.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[9000.0, 1.0], [9200.0, 1.0], [9300.0, 1.0], [39400.0, 1.0], [40200.0, 1.0], [2800.0, 2.0], [700.0, 1.0], [2700.0, 1.0], [13000.0, 1.0], [900.0, 1.0], [4400.0, 1.0], [18800.0, 1.0], [4700.0, 1.0], [6400.0, 1.0], [1600.0, 2.0], [6600.0, 1.0], [1700.0, 3.0], [1800.0, 1.0], [7800.0, 1.0], [2000.0, 1.0]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[300.0, 1.0], [200.0, 13.0], [400.0, 4.0], [500.0, 6.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[200.0, 24.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[300.0, 1.0], [600.0, 1.0], [200.0, 13.0], [400.0, 1.0], [500.0, 8.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 100, "maxX": 103400.0, "title": "Response Time Distribution"}},
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
        data: {"result": {"minY": 13.0, "minX": 0.0, "ticks": [[0, "Requests having \nresponse time <= 500ms"], [1, "Requests having \nresponse time > 500ms and <= 1,500ms"], [2, "Requests having \nresponse time > 1,500ms"], [3, "Requests in error"]], "maxY": 1389.0, "series": [{"data": [[0.0, 1389.0]], "color": "#9ACD32", "isOverall": false, "label": "Requests having \nresponse time <= 500ms", "isController": false}, {"data": [[1.0, 416.0]], "color": "yellow", "isOverall": false, "label": "Requests having \nresponse time > 500ms and <= 1,500ms", "isController": false}, {"data": [[2.0, 606.0]], "color": "orange", "isOverall": false, "label": "Requests having \nresponse time > 1,500ms", "isController": false}, {"data": [[3.0, 13.0]], "color": "#FF6347", "isOverall": false, "label": "Requests in error", "isController": false}], "supportsControllersDiscrimination": false, "maxX": 3.0, "title": "Synthetic Response Times Distribution"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400592E12, "maxY": 23.844559585492227, "series": [{"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0], [1.66400592E12, 0.0]], "isOverall": false, "label": "", "isController": false}, {"data": [[1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-26", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-25", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-69", "isController": false}, {"data": [[1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-8", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-128", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-28", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-127", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-7", "isController": false}, {"data": [[1.66400604E12, 19.177627118644068], [1.66400598E12, 23.844559585492227], [1.6640061E12, 3.539682539682542], [1.66400592E12, 23.80891719745223]], "isOverall": false, "label": "Thread Group", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-104", "isController": false}, {"data": [[1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-5", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-125", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-144", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-100", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-120", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-141", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-91", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-92", "isController": false}, {"data": [[1.66400598E12, 0.0], [1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-72", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-50", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-11", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-56", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-54", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-98", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-59", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-38", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-35", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-36", "isController": false}, {"data": [[1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-19", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-117", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-17", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-115", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-113", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-134", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-110", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-132", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-81", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-62", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-84", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-41", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-82", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-44", "isController": false}, {"data": [[1.66400598E12, 0.0], [1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-66", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-89", "isController": false}, {"data": [[1.66400592E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-20", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-42", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "ResDownload-Thread-65", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6640061E12, "title": "Active Threads Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 0.0, "maxY": 103461.0, "series": [{"data": [[16.0, 248.0], [8.0, 243.5], [1.0, 506.0], [17.0, 245.0], [20.0, 243.5], [10.0, 243.0], [21.0, 236.25], [22.0, 254.33333333333334], [23.0, 252.4], [24.0, 324.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[18.875, 266.95833333333326]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-Aggregated", "isController": false}, {"data": [[16.0, 256.5], [8.0, 242.5], [1.0, 545.0], [17.0, 497.0], [20.0, 255.5], [10.0, 274.0], [21.0, 249.75], [22.0, 244.33333333333334], [23.0, 251.4], [24.0, 396.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[18.875, 291.7916666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-Aggregated", "isController": false}, {"data": [[16.0, 250.0], [8.0, 240.5], [1.0, 12.0], [17.0, 228.0], [20.0, 227.0], [10.0, 222.0], [21.0, 239.75], [22.0, 235.33333333333334], [23.0, 296.8], [24.0, 247.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[18.875, 241.12500000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-Aggregated", "isController": false}, {"data": [[16.0, 264.5], [8.0, 245.0], [1.0, 233.0], [17.0, 232.0], [20.0, 259.5], [10.0, 244.0], [21.0, 318.5], [22.0, 242.33333333333334], [23.0, 245.6], [24.0, 249.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[18.875, 259.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-Aggregated", "isController": false}, {"data": [[16.0, 256.5], [8.0, 252.0], [1.0, 246.0], [17.0, 243.0], [20.0, 255.5], [10.0, 273.0], [21.0, 237.75], [22.0, 251.33333333333334], [23.0, 306.2], [24.0, 255.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[18.875, 262.12499999999994]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-Aggregated", "isController": false}, {"data": [[16.0, 494.0], [8.0, 507.0], [1.0, 249.0], [17.0, 528.0], [20.0, 519.5], [10.0, 497.0], [21.0, 475.0], [22.0, 498.3333333333333], [23.0, 496.4], [24.0, 410.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[18.875, 475.91666666666663]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-Aggregated", "isController": false}, {"data": [[16.0, 488.0], [8.0, 368.5], [1.0, 256.0], [17.0, 522.0], [20.0, 532.5], [10.0, 506.0], [21.0, 499.75], [22.0, 414.6666666666667], [23.0, 490.6], [24.0, 333.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[18.875, 448.20833333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-Aggregated", "isController": false}, {"data": [[16.0, 503.5], [8.0, 472.5], [1.0, 256.0], [17.0, 468.0], [20.0, 485.5], [10.0, 470.0], [21.0, 497.75], [22.0, 499.6666666666667], [23.0, 509.8], [24.0, 420.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[18.875, 475.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-Aggregated", "isController": false}, {"data": [[16.0, 500.5], [8.0, 505.5], [1.0, 522.0], [17.0, 454.0], [20.0, 452.5], [10.0, 449.0], [21.0, 504.75], [22.0, 498.0], [23.0, 511.2], [24.0, 425.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[18.875, 486.95833333333326]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-Aggregated", "isController": false}, {"data": [[16.0, 524.0], [8.0, 496.0], [1.0, 510.0], [17.0, 473.0], [20.0, 512.5], [10.0, 489.0], [21.0, 516.0], [22.0, 475.6666666666667], [23.0, 497.6], [24.0, 412.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[18.875, 489.74999999999994]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-Aggregated", "isController": false}, {"data": [[21.0, 18452.0], [22.0, 38535.0], [24.0, 21123.454545454544]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[23.791666666666668, 21737.625]], "isOverall": false, "label": "http://159.89.38.11/-12-Aggregated", "isController": false}, {"data": [[21.0, 7646.0], [22.0, 26449.0], [24.0, 13526.772727272728]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[23.791666666666668, 13820.166666666666]], "isOverall": false, "label": "http://159.89.38.11/-13-Aggregated", "isController": false}, {"data": [[21.0, 6584.0], [22.0, 54216.0], [24.0, 10615.227272727276]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[23.791666666666668, 12263.958333333336]], "isOverall": false, "label": "http://159.89.38.11/-10-Aggregated", "isController": false}, {"data": [[21.0, 24677.0], [22.0, 13853.0], [24.0, 10393.5]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[23.791666666666668, 11132.791666666666]], "isOverall": false, "label": "http://159.89.38.11/-11-Aggregated", "isController": false}, {"data": [[21.0, 9445.0], [22.0, 11978.0], [24.0, 14097.72727272727]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[23.791666666666668, 13815.541666666664]], "isOverall": false, "label": "http://159.89.38.11/-18-Aggregated", "isController": false}, {"data": [[21.0, 3366.0], [22.0, 5404.0], [24.0, 4838.590909090909]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[23.791666666666668, 4800.791666666666]], "isOverall": false, "label": "http://159.89.38.11/-19-Aggregated", "isController": false}, {"data": [[21.0, 9606.0], [22.0, 2074.0], [24.0, 4040.1818181818185]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[23.791666666666668, 4190.166666666667]], "isOverall": false, "label": "http://159.89.38.11/-16-Aggregated", "isController": false}, {"data": [[21.0, 5224.0], [22.0, 2436.0], [24.0, 8020.045454545455]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[23.791666666666668, 7670.875000000001]], "isOverall": false, "label": "http://159.89.38.11/-17-Aggregated", "isController": false}, {"data": [[21.0, 21382.0], [22.0, 36327.0], [24.0, 29675.636363636368]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[23.791666666666668, 29607.208333333336]], "isOverall": false, "label": "http://159.89.38.11/-14-Aggregated", "isController": false}, {"data": [[21.0, 17196.0], [22.0, 15988.0], [24.0, 14029.31818181818]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[23.791666666666668, 14242.874999999998]], "isOverall": false, "label": "http://159.89.38.11/-15-Aggregated", "isController": false}, {"data": [[8.0, 1773.0], [2.0, 2551.0], [9.0, 2078.0], [10.0, 1771.0], [11.0, 1666.0], [12.0, 1829.0], [3.0, 2138.0], [13.0, 2082.0], [14.0, 1820.0], [15.0, 2033.0], [16.0, 2051.0], [4.0, 1575.0], [1.0, 1548.0], [17.0, 2090.0], [18.0, 1737.0], [19.0, 1635.0], [20.0, 2323.0], [5.0, 1762.0], [21.0, 1710.0], [22.0, 1824.0], [23.0, 1915.0], [24.0, 1686.0], [6.0, 2127.0], [7.0, 2098.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[12.5, 1909.25]], "isOverall": false, "label": "Broadcast-Aggregated", "isController": true}, {"data": [[8.0, 7153.0], [9.0, 2126.0], [21.0, 2239.0], [22.0, 2180.0], [23.0, 2676.25], [24.0, 2124.1874999999995]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[22.333333333333336, 2432.916666666666]], "isOverall": false, "label": "Form Numbers-Aggregated", "isController": true}, {"data": [[16.0, 1947.0], [8.0, 1666.0], [1.0, 2388.0], [17.0, 2005.0], [20.0, 2061.0], [10.0, 2043.0], [21.0, 1915.25], [22.0, 1721.3333333333333], [23.0, 2063.4], [24.0, 1721.6666666666667]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[18.875, 1920.4583333333335]], "isOverall": false, "label": "Teplate-Aggregated", "isController": true}, {"data": [[8.0, 524.0], [9.0, 514.0], [21.0, 474.0], [22.0, 526.0], [23.0, 492.25], [24.0, 494.0625]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[22.333333333333336, 496.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-Aggregated", "isController": false}, {"data": [[16.0, 255.0], [8.0, 254.5], [1.0, 257.0], [17.0, 264.0], [20.0, 262.0], [10.0, 247.0], [21.0, 244.75], [22.0, 238.33333333333334], [23.0, 300.0], [24.0, 235.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[18.875, 258.83333333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-Aggregated", "isController": false}, {"data": [[8.0, 479.0], [9.0, 466.0], [21.0, 484.0], [22.0, 517.0], [23.0, 479.25], [24.0, 458.4375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[22.333333333333336, 466.58333333333326]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-Aggregated", "isController": false}, {"data": [[16.0, 260.5], [8.0, 246.0], [1.0, 516.0], [17.0, 237.0], [20.0, 245.5], [10.0, 232.0], [21.0, 255.5], [22.0, 259.3333333333333], [23.0, 251.6], [24.0, 333.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[18.875, 272.79166666666663]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-Aggregated", "isController": false}, {"data": [[16.0, 240.5], [8.0, 256.5], [1.0, 257.0], [17.0, 260.0], [20.0, 242.5], [10.0, 224.0], [21.0, 248.75], [22.0, 247.33333333333334], [23.0, 352.0], [24.0, 337.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[18.875, 280.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-Aggregated", "isController": false}, {"data": [[8.0, 504.0], [9.0, 506.0], [21.0, 536.0], [22.0, 512.0], [23.0, 503.0], [24.0, 504.5625]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[22.333333333333336, 505.95833333333326]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [9.0, 226.0], [21.0, 239.0], [22.0, 238.0], [23.0, 246.75], [24.0, 259.37500000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[22.333333333333336, 253.9583333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-Aggregated", "isController": false}, {"data": [[8.0, 454.0], [2.0, 559.0], [9.0, 498.0], [10.0, 488.0], [11.0, 487.0], [12.0, 514.0], [3.0, 537.0], [13.0, 506.0], [14.0, 504.0], [15.0, 464.0], [16.0, 523.0], [4.0, 254.0], [1.0, 262.0], [17.0, 494.0], [18.0, 521.0], [19.0, 486.0], [20.0, 514.0], [5.0, 487.0], [21.0, 517.0], [22.0, 491.0], [23.0, 503.0], [24.0, 511.0], [6.0, 514.0], [7.0, 505.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[12.5, 483.0416666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-Aggregated", "isController": false}, {"data": [[8.0, 263.0], [9.0, 253.0], [21.0, 266.0], [22.0, 257.0], [23.0, 255.25], [24.0, 268.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[22.333333333333336, 264.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-Aggregated", "isController": false}, {"data": [[8.0, 168.0], [2.0, 269.0], [9.0, 59.0], [10.0, 180.0], [11.0, 163.0], [12.0, 171.0], [3.0, 204.0], [13.0, 165.0], [14.0, 165.0], [15.0, 171.0], [16.0, 164.0], [4.0, 163.0], [1.0, 165.0], [17.0, 167.0], [18.0, 166.0], [19.0, 169.0], [20.0, 163.0], [5.0, 196.0], [21.0, 164.0], [22.0, 164.0], [23.0, 170.0], [24.0, 163.0], [6.0, 167.0], [7.0, 163.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[12.5, 169.12499999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-Aggregated", "isController": false}, {"data": [[8.0, 485.0], [9.0, 482.0], [21.0, 475.0], [22.0, 492.0], [23.0, 485.25], [24.0, 479.9375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[22.333333333333336, 481.41666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-Aggregated", "isController": false}, {"data": [[8.0, 494.0], [9.0, 518.0], [21.0, 480.0], [22.0, 509.0], [23.0, 1092.75], [24.0, 470.62500000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[22.333333333333336, 579.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-Aggregated", "isController": false}, {"data": [[8.0, 243.0], [9.0, 234.0], [21.0, 238.0], [22.0, 257.0], [23.0, 251.75], [24.0, 276.06250000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[22.333333333333336, 266.50000000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-Aggregated", "isController": false}, {"data": [[8.0, 255.0], [2.0, 518.0], [9.0, 482.0], [10.0, 246.0], [11.0, 256.0], [12.0, 486.0], [3.0, 449.0], [13.0, 498.0], [14.0, 261.0], [15.0, 511.0], [16.0, 528.0], [4.0, 255.0], [1.0, 255.0], [17.0, 495.0], [18.0, 228.0], [19.0, 260.0], [20.0, 481.0], [5.0, 257.0], [21.0, 493.0], [22.0, 255.0], [23.0, 244.0], [24.0, 250.0], [6.0, 495.0], [7.0, 518.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[12.5, 374.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-Aggregated", "isController": false}, {"data": [[8.0, 492.0], [2.0, 482.0], [9.0, 462.0], [10.0, 256.0], [11.0, 248.0], [12.0, 519.0], [3.0, 258.0], [13.0, 513.0], [14.0, 257.0], [15.0, 501.0], [16.0, 237.0], [4.0, 255.0], [1.0, 247.0], [17.0, 473.0], [18.0, 247.0], [19.0, 237.0], [20.0, 500.0], [5.0, 238.0], [21.0, 252.0], [22.0, 255.0], [23.0, 266.0], [24.0, 239.0], [6.0, 521.0], [7.0, 533.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[12.5, 353.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-Aggregated", "isController": false}, {"data": [[8.0, 253.0], [9.0, 258.0], [21.0, 237.0], [22.0, 262.0], [23.0, 257.25], [24.0, 261.68749999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[22.333333333333336, 259.41666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-Aggregated", "isController": false}, {"data": [[8.0, 14.0], [2.0, 11.0], [9.0, 12.0], [10.0, 12.0], [11.0, 13.0], [12.0, 12.0], [3.0, 17.0], [13.0, 10.0], [14.0, 15.0], [15.0, 11.0], [16.0, 14.0], [4.0, 16.0], [1.0, 14.0], [17.0, 10.0], [18.0, 15.0], [19.0, 14.0], [20.0, 13.0], [5.0, 22.0], [21.0, 11.0], [22.0, 16.0], [23.0, 10.0], [24.0, 14.0], [6.0, 12.0], [7.0, 13.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[12.5, 13.375]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-Aggregated", "isController": false}, {"data": [[8.0, 531.0], [9.0, 224.0], [21.0, 237.0], [22.0, 239.0], [23.0, 233.0], [24.0, 257.9375]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[22.333333333333336, 262.08333333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-Aggregated", "isController": false}, {"data": [[8.0, 62.0], [2.0, 171.0], [9.0, 58.0], [10.0, 55.0], [11.0, 60.0], [12.0, 54.0], [3.0, 71.0], [13.0, 58.0], [14.0, 67.0], [15.0, 54.0], [16.0, 55.0], [4.0, 59.0], [1.0, 58.0], [17.0, 55.0], [18.0, 171.0], [19.0, 55.0], [20.0, 55.0], [5.0, 72.0], [21.0, 56.0], [22.0, 56.0], [23.0, 56.0], [24.0, 74.0], [6.0, 54.0], [7.0, 58.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[12.5, 68.49999999999997]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-Aggregated", "isController": false}, {"data": [[8.0, 274.0], [2.0, 373.0], [9.0, 285.0], [10.0, 279.0], [11.0, 270.0], [12.0, 284.0], [3.0, 286.0], [13.0, 278.0], [14.0, 281.0], [15.0, 259.0], [16.0, 291.0], [4.0, 277.0], [1.0, 279.0], [17.0, 305.0], [18.0, 268.0], [19.0, 282.0], [20.0, 279.0], [5.0, 283.0], [21.0, 283.0], [22.0, 283.0], [23.0, 285.0], [24.0, 282.0], [6.0, 309.0], [7.0, 270.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[12.5, 285.2083333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-Aggregated", "isController": false}, {"data": [[21.0, 103461.0], [22.0, 96079.0], [24.0, 63534.318181818184]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[23.791666666666668, 66553.95833333333]], "isOverall": false, "label": "Dashboard-Aggregated", "isController": true}, {"data": [[8.0, 294.0], [2.0, 531.0], [9.0, 300.0], [10.0, 297.0], [11.0, 287.0], [12.0, 294.0], [3.0, 301.0], [13.0, 545.0], [14.0, 299.0], [15.0, 512.0], [16.0, 513.0], [4.0, 300.0], [1.0, 302.0], [17.0, 570.0], [18.0, 283.0], [19.0, 298.0], [20.0, 540.0], [5.0, 303.0], [21.0, 332.0], [22.0, 312.0], [23.0, 306.0], [24.0, 303.0], [6.0, 554.0], [7.0, 541.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[12.5, 379.87500000000006]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-Aggregated", "isController": false}, {"data": [[8.0, 492.0], [2.0, 243.0], [9.0, 459.0], [10.0, 258.0], [11.0, 245.0], [12.0, 260.0], [3.0, 264.0], [13.0, 257.0], [14.0, 241.0], [15.0, 507.0], [16.0, 517.0], [4.0, 256.0], [1.0, 258.0], [17.0, 476.0], [18.0, 232.0], [19.0, 260.0], [20.0, 524.0], [5.0, 250.0], [21.0, 256.0], [22.0, 228.0], [23.0, 263.0], [24.0, 253.0], [6.0, 492.0], [7.0, 518.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[12.5, 333.70833333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-Aggregated", "isController": false}, {"data": [[8.0, 497.0], [2.0, 489.0], [9.0, 258.0], [10.0, 243.0], [11.0, 244.0], [12.0, 479.0], [3.0, 467.0], [13.0, 485.0], [14.0, 250.0], [15.0, 238.0], [16.0, 497.0], [4.0, 255.0], [1.0, 249.0], [17.0, 268.0], [18.0, 247.0], [19.0, 263.0], [20.0, 253.0], [5.0, 240.0], [21.0, 259.0], [22.0, 259.0], [23.0, 260.0], [24.0, 259.0], [6.0, 252.0], [7.0, 258.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[12.5, 311.20833333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-Aggregated", "isController": false}, {"data": [[8.0, 260.0], [9.0, 259.0], [21.0, 241.0], [22.0, 263.0], [23.0, 258.25], [24.0, 280.87500000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[22.333333333333336, 272.91666666666663]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-Aggregated", "isController": false}, {"data": [[8.0, 246.0], [9.0, 253.0], [21.0, 476.0], [22.0, 345.0], [23.0, 252.5], [24.0, 243.18750000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[22.333333333333336, 259.20833333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-Aggregated", "isController": false}, {"data": [[8.0, 266.0], [9.0, 241.0], [21.0, 237.0], [22.0, 264.0], [23.0, 366.25], [24.0, 308.5625]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[22.333333333333336, 308.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-Aggregated", "isController": false}, {"data": [[8.0, 527.0], [2.0, 590.0], [9.0, 515.0], [10.0, 534.0], [11.0, 459.0], [12.0, 259.0], [3.0, 597.0], [13.0, 498.0], [14.0, 262.0], [15.0, 514.0], [16.0, 476.0], [4.0, 265.0], [1.0, 239.0], [17.0, 472.0], [18.0, 471.0], [19.0, 510.0], [20.0, 495.0], [5.0, 243.0], [21.0, 251.0], [22.0, 249.0], [23.0, 547.0], [24.0, 499.0], [6.0, 508.0], [7.0, 445.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[12.5, 434.37500000000006]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-Aggregated", "isController": false}, {"data": [[8.0, 246.0], [2.0, 619.0], [9.0, 515.0], [10.0, 501.0], [11.0, 200.0], [12.0, 496.0], [3.0, 614.0], [13.0, 461.0], [14.0, 463.0], [15.0, 516.0], [16.0, 443.0], [4.0, 494.0], [1.0, 267.0], [17.0, 462.0], [18.0, 487.0], [19.0, 527.0], [20.0, 482.0], [5.0, 480.0], [21.0, 464.0], [22.0, 509.0], [23.0, 542.0], [24.0, 500.0], [6.0, 512.0], [7.0, 484.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[12.5, 470.16666666666674]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-Aggregated", "isController": false}, {"data": [[8.0, 247.0], [2.0, 625.0], [9.0, 518.0], [10.0, 497.0], [11.0, 508.0], [12.0, 511.0], [3.0, 484.0], [13.0, 502.0], [14.0, 261.0], [15.0, 506.0], [16.0, 249.0], [4.0, 494.0], [1.0, 464.0], [17.0, 462.0], [18.0, 501.0], [19.0, 235.0], [20.0, 485.0], [5.0, 245.0], [21.0, 494.0], [22.0, 443.0], [23.0, 486.0], [24.0, 463.0], [6.0, 490.0], [7.0, 511.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[12.5, 445.0416666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-Aggregated", "isController": false}, {"data": [[8.0, 506.0], [2.0, 508.0], [9.0, 482.0], [10.0, 487.0], [11.0, 464.0], [12.0, 518.0], [3.0, 494.0], [13.0, 520.0], [14.0, 472.0], [15.0, 477.0], [16.0, 517.0], [4.0, 247.0], [1.0, 261.0], [17.0, 266.0], [18.0, 472.0], [19.0, 482.0], [20.0, 488.0], [5.0, 231.0], [21.0, 484.0], [22.0, 502.0], [23.0, 253.0], [24.0, 486.0], [6.0, 472.0], [7.0, 518.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[12.5, 441.95833333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-Aggregated", "isController": false}, {"data": [[8.0, 500.0], [2.0, 487.0], [9.0, 511.0], [10.0, 498.0], [11.0, 459.0], [12.0, 518.0], [3.0, 509.0], [13.0, 517.0], [14.0, 484.0], [15.0, 517.0], [16.0, 530.0], [4.0, 532.0], [1.0, 490.0], [17.0, 516.0], [18.0, 514.0], [19.0, 239.0], [20.0, 441.0], [5.0, 503.0], [21.0, 246.0], [22.0, 518.0], [23.0, 528.0], [24.0, 460.0], [6.0, 503.0], [7.0, 480.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[12.5, 479.1666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-Aggregated", "isController": false}, {"data": [[16.0, 1947.0], [8.0, 1666.0], [1.0, 2388.0], [17.0, 2005.0], [20.0, 2061.0], [10.0, 2043.0], [21.0, 1915.25], [22.0, 1721.3333333333333], [23.0, 2063.4], [24.0, 1721.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[18.875, 1920.4583333333335]], "isOverall": false, "label": "http://159.89.38.11/message/template-Aggregated", "isController": false}, {"data": [[8.0, 227.0], [2.0, 536.0], [9.0, 256.0], [10.0, 251.0], [11.0, 227.0], [12.0, 259.0], [3.0, 228.0], [13.0, 257.0], [14.0, 524.0], [15.0, 239.0], [16.0, 262.0], [4.0, 268.0], [1.0, 261.0], [17.0, 267.0], [18.0, 250.0], [19.0, 242.0], [20.0, 221.0], [5.0, 228.0], [21.0, 242.0], [22.0, 250.0], [23.0, 251.0], [24.0, 250.0], [6.0, 250.0], [7.0, 242.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[12.5, 270.33333333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-Aggregated", "isController": false}, {"data": [[8.0, 237.0], [2.0, 280.0], [9.0, 249.0], [10.0, 251.0], [11.0, 231.0], [12.0, 258.0], [3.0, 311.0], [13.0, 253.0], [14.0, 242.0], [15.0, 232.0], [16.0, 258.0], [4.0, 251.0], [1.0, 259.0], [17.0, 248.0], [18.0, 234.0], [19.0, 237.0], [20.0, 257.0], [5.0, 244.0], [21.0, 234.0], [22.0, 262.0], [23.0, 246.0], [24.0, 239.0], [6.0, 256.0], [7.0, 251.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[12.5, 250.83333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-Aggregated", "isController": false}, {"data": [[8.0, 245.0], [2.0, 317.0], [9.0, 246.0], [10.0, 247.0], [11.0, 242.0], [12.0, 258.0], [3.0, 316.0], [13.0, 261.0], [14.0, 251.0], [15.0, 239.0], [16.0, 248.0], [4.0, 267.0], [1.0, 272.0], [17.0, 259.0], [18.0, 240.0], [19.0, 245.0], [20.0, 245.0], [5.0, 244.0], [21.0, 246.0], [22.0, 529.0], [23.0, 268.0], [24.0, 228.0], [6.0, 242.0], [7.0, 258.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[12.5, 267.20833333333326]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-Aggregated", "isController": false}, {"data": [[8.0, 250.0], [2.0, 378.0], [9.0, 253.0], [10.0, 252.0], [11.0, 285.0], [12.0, 258.0], [3.0, 331.0], [13.0, 257.0], [14.0, 260.0], [15.0, 258.0], [16.0, 264.0], [4.0, 246.0], [1.0, 231.0], [17.0, 248.0], [18.0, 256.0], [19.0, 235.0], [20.0, 221.0], [5.0, 245.0], [21.0, 259.0], [22.0, 246.0], [23.0, 252.0], [24.0, 231.0], [6.0, 254.0], [7.0, 243.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[12.5, 258.875]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-Aggregated", "isController": false}, {"data": [[8.0, 231.0], [2.0, 378.0], [9.0, 250.0], [10.0, 250.0], [11.0, 519.0], [12.0, 261.0], [3.0, 875.0], [13.0, 252.0], [14.0, 258.0], [15.0, 231.0], [16.0, 261.0], [4.0, 253.0], [1.0, 264.0], [17.0, 267.0], [18.0, 260.0], [19.0, 237.0], [20.0, 259.0], [5.0, 231.0], [21.0, 251.0], [22.0, 250.0], [23.0, 250.0], [24.0, 257.0], [6.0, 257.0], [7.0, 255.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[12.5, 294.0416666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-Aggregated", "isController": false}, {"data": [[8.0, 1773.0], [2.0, 2551.0], [9.0, 2078.0], [10.0, 1771.0], [11.0, 1666.0], [12.0, 1829.0], [3.0, 2138.0], [13.0, 2082.0], [14.0, 1820.0], [15.0, 2033.0], [16.0, 2051.0], [4.0, 1575.0], [1.0, 1548.0], [17.0, 2090.0], [18.0, 1737.0], [19.0, 1635.0], [20.0, 2323.0], [5.0, 1762.0], [21.0, 1710.0], [22.0, 1824.0], [23.0, 1915.0], [24.0, 1686.0], [6.0, 2127.0], [7.0, 2098.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[12.5, 1909.25]], "isOverall": false, "label": "http://159.89.38.11/broadcast-Aggregated", "isController": false}, {"data": [[8.0, 227.0], [2.0, 524.0], [9.0, 242.0], [10.0, 248.0], [11.0, 230.0], [12.0, 258.0], [3.0, 475.0], [13.0, 247.0], [14.0, 261.0], [15.0, 253.0], [16.0, 248.0], [4.0, 245.0], [1.0, 236.0], [17.0, 259.0], [18.0, 231.0], [19.0, 265.0], [20.0, 244.0], [5.0, 244.0], [21.0, 258.0], [22.0, 247.0], [23.0, 260.0], [24.0, 230.0], [6.0, 254.0], [7.0, 256.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[12.5, 268.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-Aggregated", "isController": false}, {"data": [[8.0, 257.0], [2.0, 530.0], [9.0, 515.0], [10.0, 246.0], [11.0, 248.0], [12.0, 248.0], [3.0, 483.0], [13.0, 253.0], [14.0, 262.0], [15.0, 234.0], [16.0, 268.0], [4.0, 247.0], [1.0, 233.0], [17.0, 231.0], [18.0, 237.0], [19.0, 256.0], [20.0, 517.0], [5.0, 444.0], [21.0, 249.0], [22.0, 253.0], [23.0, 508.0], [24.0, 257.0], [6.0, 253.0], [7.0, 243.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[12.5, 311.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-Aggregated", "isController": false}, {"data": [[8.0, 252.0], [2.0, 517.0], [9.0, 259.0], [10.0, 269.0], [11.0, 251.0], [12.0, 261.0], [3.0, 244.0], [13.0, 232.0], [14.0, 235.0], [15.0, 258.0], [16.0, 222.0], [4.0, 247.0], [1.0, 243.0], [17.0, 232.0], [18.0, 245.0], [19.0, 234.0], [20.0, 242.0], [5.0, 253.0], [21.0, 247.0], [22.0, 251.0], [23.0, 252.0], [24.0, 252.0], [6.0, 235.0], [7.0, 223.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[12.5, 256.5]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-Aggregated", "isController": false}, {"data": [[21.0, 103461.0], [22.0, 96079.0], [24.0, 63534.318181818184]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[23.791666666666668, 66553.95833333333]], "isOverall": false, "label": "http://159.89.38.11/-Aggregated", "isController": false}, {"data": [[8.0, 512.0], [9.0, 469.0], [21.0, 504.0], [22.0, 524.0], [23.0, 510.75], [24.0, 425.12499999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[22.333333333333336, 452.25]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-Aggregated", "isController": false}, {"data": [[8.0, 515.0], [9.0, 509.0], [21.0, 476.0], [22.0, 506.0], [23.0, 369.0], [24.0, 407.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[22.333333333333336, 416.4166666666667]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-Aggregated", "isController": false}, {"data": [[8.0, 512.0], [9.0, 509.0], [21.0, 251.0], [22.0, 529.0], [23.0, 495.75], [24.0, 421.93750000000006]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[22.333333333333336, 438.95833333333337]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-Aggregated", "isController": false}, {"data": [[8.0, 257.0], [9.0, 266.0], [21.0, 485.0], [22.0, 249.0], [23.0, 368.75], [24.0, 460.18749999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[22.333333333333336, 420.62499999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-Aggregated", "isController": false}, {"data": [[8.0, 312.0], [0.0, 503.0], [9.0, 285.0], [21.0, 274.0], [22.0, 272.0], [23.0, 265.0], [24.0, 368.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[21.44, 343.76]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-Aggregated", "isController": false}, {"data": [[8.0, 540.0], [0.0, 5633.0], [9.0, 552.0], [21.0, 525.0], [22.0, 543.0], [23.0, 511.5], [24.0, 417.75]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[21.44, 660.92]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-Aggregated", "isController": false}, {"data": [[8.0, 6137.0], [9.0, 452.0], [21.0, 474.0], [22.0, 469.0], [23.0, 514.0], [24.0, 479.5625]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[22.333333333333336, 719.2083333333334]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-Aggregated", "isController": false}, {"data": [[8.0, 162.0], [9.0, 166.0], [21.0, 161.0], [22.0, 162.0], [23.0, 163.0], [24.0, 167.25000000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[22.333333333333336, 165.79166666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-Aggregated", "isController": false}, {"data": [[8.0, 52.0], [9.0, 15.0], [21.0, 23.0], [22.0, 17.0], [23.0, 25.5], [24.0, 17.687500000000004]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[22.333333333333336, 20.5]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-Aggregated", "isController": false}, {"data": [[8.0, 161.0], [9.0, 168.0], [21.0, 163.0], [22.0, 169.0], [23.0, 175.25], [24.0, 153.81250000000003]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[22.333333333333336, 159.29166666666669]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-Aggregated", "isController": false}, {"data": [[21.0, 347.0], [22.0, 345.0], [24.0, 2450.545454545454]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[23.791666666666668, 2275.166666666666]], "isOverall": false, "label": "http://159.89.38.11/-21-Aggregated", "isController": false}, {"data": [[21.0, 1385.0], [22.0, 1977.0], [24.0, 3603.1363636363635]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[23.791666666666668, 3442.958333333333]], "isOverall": false, "label": "http://159.89.38.11/-22-Aggregated", "isController": false}, {"data": [[21.0, 4925.0], [22.0, 7658.0], [24.0, 7867.136363636363]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[23.791666666666668, 7735.833333333333]], "isOverall": false, "label": "http://159.89.38.11/-20-Aggregated", "isController": false}, {"data": [[8.0, 7153.0], [9.0, 2126.0], [21.0, 2239.0], [22.0, 2180.0], [23.0, 2676.25], [24.0, 2124.1874999999995]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[22.333333333333336, 2432.916666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-Aggregated", "isController": false}, {"data": [[16.0, 56.5], [8.0, 54.0], [1.0, 59.0], [17.0, 175.0], [20.0, 59.0], [10.0, 60.0], [21.0, 55.5], [22.0, 55.333333333333336], [23.0, 60.2], [24.0, 58.666666666666664]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[18.875, 62.41666666666668]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-Aggregated", "isController": false}, {"data": [[16.0, 393.0], [8.0, 246.0], [1.0, 641.0], [17.0, 484.0], [20.0, 502.5], [10.0, 460.0], [21.0, 375.0], [22.0, 248.0], [23.0, 348.0], [24.0, 249.33333333333334]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[18.875, 358.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-Aggregated", "isController": false}, {"data": [[16.0, 393.5], [8.0, 251.5], [1.0, 641.0], [17.0, 498.0], [20.0, 521.0], [10.0, 250.0], [21.0, 248.5], [22.0, 257.6666666666667], [23.0, 446.8], [24.0, 240.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[18.875, 351.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-Aggregated", "isController": false}, {"data": [[16.0, 515.5], [8.0, 259.0], [1.0, 641.0], [17.0, 484.0], [20.0, 364.0], [10.0, 503.0], [21.0, 371.5], [22.0, 251.0], [23.0, 400.8], [24.0, 253.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[18.875, 371.12500000000006]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-Aggregated", "isController": false}, {"data": [[16.0, 512.0], [8.0, 492.5], [1.0, 582.0], [17.0, 483.0], [20.0, 510.5], [10.0, 544.0], [21.0, 471.5], [22.0, 485.0], [23.0, 497.8], [24.0, 418.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[18.875, 488.45833333333337]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-Aggregated", "isController": false}, {"data": [[16.0, 166.5], [8.0, 162.5], [1.0, 609.0], [17.0, 169.0], [20.0, 108.5], [10.0, 162.0], [21.0, 165.5], [22.0, 171.33333333333334], [23.0, 144.4], [24.0, 167.66666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[18.875, 175.66666666666669]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-Aggregated", "isController": false}, {"data": [[16.0, 12.0], [8.0, 11.5], [1.0, 31.0], [17.0, 302.0], [20.0, 15.5], [10.0, 11.0], [21.0, 12.75], [22.0, 13.666666666666666], [23.0, 15.6], [24.0, 13.666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[18.875, 26.374999999999996]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-Aggregated", "isController": false}, {"data": [[21.0, 711.0], [22.0, 338.0], [24.0, 3030.636363636364]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[23.791666666666668, 2821.791666666667]], "isOverall": false, "label": "http://159.89.38.11/-5-Aggregated", "isController": false}, {"data": [[21.0, 30239.0], [22.0, 1764.0], [24.0, 11847.5]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[23.791666666666668, 12193.666666666668]], "isOverall": false, "label": "http://159.89.38.11/-6-Aggregated", "isController": false}, {"data": [[21.0, 100172.0], [22.0, 5575.0], [24.0, 6762.5]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[23.791666666666668, 10605.083333333332]], "isOverall": false, "label": "http://159.89.38.11/-7-Aggregated", "isController": false}, {"data": [[21.0, 786.0], [22.0, 5630.0], [24.0, 6458.454545454546]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[23.791666666666668, 6187.583333333334]], "isOverall": false, "label": "http://159.89.38.11/-8-Aggregated", "isController": false}, {"data": [[21.0, 53631.0], [22.0, 93199.0], [24.0, 56040.77272727273]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[23.791666666666668, 57488.625]], "isOverall": false, "label": "http://159.89.38.11/-9-Aggregated", "isController": false}, {"data": [[0.0, 31341.8085106383], [21.0, 1815.0], [22.0, 749.0], [24.0, 1365.4090909090905]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[8.04225352112676, 21206.59154929577]], "isOverall": false, "label": "http://159.89.38.11/-0-Aggregated", "isController": false}, {"data": [[0.0, 1722.3404255319151], [21.0, 1468.0], [22.0, 358.0], [24.0, 3894.4545454545455]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[8.04225352112676, 2372.5915492957743]], "isOverall": false, "label": "http://159.89.38.11/-1-Aggregated", "isController": false}, {"data": [[0.0, 2971.6666666666665], [21.0, 8835.0], [22.0, 2390.0], [24.0, 1399.0454545454545]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[11.895833333333332, 2360.9166666666656]], "isOverall": false, "label": "http://159.89.38.11/-2-Aggregated", "isController": false}, {"data": [[21.0, 7633.0], [22.0, 9808.0], [24.0, 9632.045454545454]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[23.791666666666668, 9556.083333333332]], "isOverall": false, "label": "http://159.89.38.11/-3-Aggregated", "isController": false}, {"data": [[21.0, 6679.0], [22.0, 2054.0], [24.0, 8335.500000000002]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[23.791666666666668, 8004.750000000002]], "isOverall": false, "label": "http://159.89.38.11/-4-Aggregated", "isController": false}, {"data": [[16.0, 479.5], [8.0, 245.5], [1.0, 360.0], [17.0, 254.0], [20.0, 368.0], [10.0, 494.0], [21.0, 384.75], [22.0, 334.6666666666667], [23.0, 404.8], [24.0, 257.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[18.875, 359.75]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-Aggregated", "isController": false}, {"data": [[16.0, 272.0], [8.0, 274.0], [1.0, 278.0], [17.0, 276.0], [20.0, 262.5], [10.0, 272.0], [21.0, 275.75], [22.0, 283.6666666666667], [23.0, 275.2], [24.0, 281.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[18.875, 275.7083333333335]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-Aggregated", "isController": false}, {"data": [[16.0, 398.0], [8.0, 282.0], [1.0, 672.0], [17.0, 276.0], [20.0, 499.5], [10.0, 521.0], [21.0, 399.75], [22.0, 292.6666666666667], [23.0, 429.0], [24.0, 287.6666666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}, {"data": [[18.875, 388.0416666666667]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-Aggregated", "isController": false}], "supportsControllersDiscrimination": true, "maxX": 24.0, "title": "Time VS Threads"}},
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
        data : {"result": {"minY": 2205.7, "minX": 1.66400592E12, "maxY": 1206160.1666666667, "series": [{"data": [[1.66400604E12, 120857.0], [1.66400598E12, 1206160.1666666667], [1.6640061E12, 3358.133333333333], [1.66400592E12, 63385.316666666666]], "isOverall": false, "label": "Bytes received per second", "isController": false}, {"data": [[1.66400604E12, 43481.916666666664], [1.66400598E12, 18491.633333333335], [1.6640061E12, 5649.6], [1.66400592E12, 2205.7]], "isOverall": false, "label": "Bytes sent per second", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6640061E12, "title": "Bytes Throughput Over Time"}},
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
        data: {"result": {"minY": 12.0, "minX": 1.66400592E12, "maxY": 100172.0, "series": [{"data": [[1.66400604E12, 256.56521739130426], [1.6640061E12, 506.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400604E12, 280.7826086956522], [1.6640061E12, 545.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400604E12, 251.08695652173918], [1.6640061E12, 12.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400604E12, 260.4782608695652], [1.6640061E12, 233.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400604E12, 262.8260869565217], [1.6640061E12, 246.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400604E12, 485.78260869565213], [1.6640061E12, 249.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400604E12, 456.5652173913044], [1.6640061E12, 256.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400604E12, 485.2173913043478], [1.6640061E12, 256.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400604E12, 485.43478260869557], [1.6640061E12, 522.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400604E12, 488.86956521739125], [1.6640061E12, 510.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400604E12, 70444.0], [1.66400598E12, 20019.81818181818], [1.66400592E12, 10823.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400598E12, 14738.318181818182], [1.66400592E12, 3720.5]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400598E12, 13491.894736842107], [1.66400592E12, 7597.8]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400598E12, 13799.111111111111], [1.66400592E12, 3133.8333333333335]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400598E12, 13815.541666666664]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400598E12, 4800.791666666666]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400598E12, 4311.272727272728], [1.66400592E12, 2858.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400598E12, 7861.826086956521], [1.66400592E12, 3279.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400598E12, 29607.208333333336]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400598E12, 15182.904761904761], [1.66400592E12, 7662.666666666667]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400604E12, 1924.9565217391305], [1.6640061E12, 1548.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400604E12, 3839.333333333333], [1.66400598E12, 2231.9999999999995]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400604E12, 1905.7499999999998], [1.66400598E12, 1994.0]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400604E12, 496.6315789473684], [1.66400598E12, 495.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400604E12, 258.91304347826093], [1.6640061E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400604E12, 472.8421052631579], [1.66400598E12, 442.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400604E12, 262.21739130434776], [1.6640061E12, 516.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400604E12, 281.3478260869566], [1.6640061E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400604E12, 509.2631578947369], [1.66400598E12, 493.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400604E12, 244.73684210526318], [1.66400598E12, 289.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400604E12, 498.52941176470586], [1.6640061E12, 445.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400604E12, 255.89473684210523], [1.66400598E12, 298.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400604E12, 160.70588235294116], [1.6640061E12, 189.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400604E12, 479.1578947368421], [1.66400598E12, 490.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400604E12, 616.2105263157895], [1.66400598E12, 438.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400604E12, 272.99999999999994], [1.66400598E12, 241.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400604E12, 366.4117647058823], [1.6640061E12, 392.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400604E12, 350.23529411764713], [1.6640061E12, 362.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400604E12, 263.3157894736843], [1.66400598E12, 244.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400604E12, 12.722222222222221], [1.6640061E12, 15.333333333333332]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400604E12, 268.4736842105263], [1.66400598E12, 237.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400604E12, 64.38888888888887], [1.6640061E12, 80.83333333333334]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400604E12, 279.8888888888889], [1.6640061E12, 301.1666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400604E12, 92194.66666666667], [1.66400598E12, 62891.0]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400604E12, 379.22222222222223], [1.6640061E12, 381.83333333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400604E12, 336.94117647058823], [1.6640061E12, 325.8571428571429]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400604E12, 309.35294117647067], [1.6640061E12, 315.7142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400604E12, 279.2105263157895], [1.66400598E12, 249.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400604E12, 262.8947368421053], [1.66400598E12, 245.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400604E12, 325.4210526315789], [1.66400598E12, 245.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400604E12, 443.41176470588243], [1.6640061E12, 412.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400604E12, 459.6470588235294], [1.6640061E12, 495.71428571428567]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400604E12, 433.41176470588243], [1.6640061E12, 473.28571428571433]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400604E12, 463.2941176470589], [1.6640061E12, 390.1428571428571]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400604E12, 470.35294117647055], [1.6640061E12, 500.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400604E12, 1900.1304347826087], [1.6640061E12, 2388.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400604E12, 263.2352941176471], [1.6640061E12, 287.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400604E12, 245.17647058823528], [1.6640061E12, 264.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400604E12, 264.52941176470586], [1.6640061E12, 273.7142857142857]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400604E12, 252.0588235294118], [1.6640061E12, 275.42857142857144]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400604E12, 267.29411764705884], [1.6640061E12, 359.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400604E12, 1883.7058823529412], [1.6640061E12, 1971.2857142857142]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400604E12, 247.52941176470588], [1.6640061E12, 319.14285714285717]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400604E12, 296.4117647058824], [1.6640061E12, 347.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400604E12, 246.70588235294116], [1.6640061E12, 280.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400604E12, 92194.66666666667], [1.66400598E12, 62891.0]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400604E12, 456.157894736842], [1.66400598E12, 437.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400604E12, 404.36842105263156], [1.66400598E12, 462.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400604E12, 435.1052631578948], [1.66400598E12, 453.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400604E12, 414.6842105263158], [1.66400598E12, 443.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400604E12, 321.75], [1.66400598E12, 431.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400604E12, 742.75], [1.66400598E12, 333.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400604E12, 789.5263157894736], [1.66400598E12, 452.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400604E12, 165.42105263157893], [1.66400598E12, 167.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400604E12, 21.157894736842106], [1.66400598E12, 18.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400604E12, 157.36842105263156], [1.66400598E12, 166.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400598E12, 2275.166666666666]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400598E12, 3442.958333333333]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400598E12, 7735.833333333333]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400604E12, 2542.368421052631], [1.66400598E12, 2017.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400604E12, 62.56521739130436], [1.6640061E12, 59.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400604E12, 346.04347826086956], [1.6640061E12, 641.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400604E12, 339.17391304347825], [1.6640061E12, 641.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400604E12, 359.3913043478261], [1.6640061E12, 641.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400604E12, 484.3913043478261], [1.6640061E12, 582.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400604E12, 156.82608695652175], [1.6640061E12, 609.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400604E12, 26.173913043478258], [1.6640061E12, 31.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400598E12, 4683.285714285714], [1.66400592E12, 2055.2941176470586]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400598E12, 17361.375], [1.66400592E12, 1858.25]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400604E12, 100172.0], [1.66400598E12, 16350.374999999998], [1.66400592E12, 1569.8]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400598E12, 13010.222222222223], [1.66400592E12, 2094.0]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400604E12, 93199.0], [1.66400598E12, 55936.0]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400598E12, 39256.891891891886], [1.66400592E12, 1563.6176470588234]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400598E12, 2578.844444444445], [1.66400592E12, 2015.6153846153845]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400598E12, 3276.5833333333335], [1.66400592E12, 1445.2499999999998]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400598E12, 11769.294117647058], [1.66400592E12, 4181.142857142857]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400598E12, 14780.7], [1.66400592E12, 3164.785714285714]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400604E12, 359.7391304347826], [1.6640061E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400604E12, 275.60869565217405], [1.6640061E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400604E12, 375.69565217391306], [1.6640061E12, 672.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6640061E12, "title": "Response Time Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400592E12, "maxY": 11838.0, "series": [{"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400604E12, 1202.0], [1.66400598E12, 1077.8636363636365], [1.66400592E12, 872.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400598E12, 1946.2727272727277], [1.66400592E12, 1039.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400598E12, 1215.7368421052633], [1.66400592E12, 761.4]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400598E12, 2241.9444444444443], [1.66400592E12, 811.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400598E12, 1729.3749999999998]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400598E12, 2374.7083333333335]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400598E12, 1905.0], [1.66400592E12, 1456.5]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400598E12, 2182.391304347826], [1.66400592E12, 1067.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400598E12, 2767.083333333333]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400598E12, 2483.190476190476], [1.66400592E12, 631.3333333333334]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400604E12, 383.26086956521743], [1.6640061E12, 302.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400604E12, 539.0], [1.66400598E12, 441.57142857142856]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400604E12, 381.55], [1.66400598E12, 420.25]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400604E12, 28.05263157894737], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400604E12, 279.55555555555554], [1.6640061E12, 301.1666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400604E12, 1049.6666666666667], [1.66400598E12, 1402.4285714285718]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400604E12, 379.22222222222223], [1.6640061E12, 381.83333333333337]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400604E12, 375.6521739130435], [1.6640061E12, 672.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400604E12, 369.70588235294116], [1.6640061E12, 404.5714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400604E12, 1049.6666666666667], [1.66400598E12, 1402.4285714285718]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400604E12, 285.4], [1.66400598E12, 332.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400604E12, 486.4], [1.66400598E12, 333.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400604E12, 26.63157894736842], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400598E12, 1928.7916666666663]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400598E12, 2186.333333333333]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400598E12, 1921.9999999999995]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400604E12, 485.36842105263156], [1.66400598E12, 333.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400598E12, 4148.285714285715], [1.66400592E12, 1284.2941176470592]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400598E12, 5813.624999999999], [1.66400592E12, 500.87499999999994]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400604E12, 11838.0], [1.66400598E12, 4259.75], [1.66400592E12, 291.46666666666664]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400598E12, 8512.333333333332], [1.66400592E12, 1082.8666666666668]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400604E12, 351.0], [1.66400598E12, 1722.1304347826087]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400598E12, 1836.0270270270269], [1.66400592E12, 917.1176470588238]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400598E12, 1139.0666666666668], [1.66400592E12, 1228.6923076923074]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400598E12, 1639.1666666666665], [1.66400592E12, 1045.3333333333335]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400598E12, 1843.5882352941173], [1.66400592E12, 1674.2857142857144]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400598E12, 3341.6], [1.66400592E12, 2047.7142857142862]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400604E12, 275.3478260869565], [1.6640061E12, 278.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400604E12, 375.6521739130435], [1.6640061E12, 672.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6640061E12, "title": "Latencies Over Time"}},
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
        data: {"result": {"minY": 0.0, "minX": 1.66400592E12, "maxY": 5278.6875, "series": [{"data": [[1.66400604E12, 10.08695652173913], [1.6640061E12, 252.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-19", "isController": false}, {"data": [[1.66400604E12, 31.56521739130434], [1.6640061E12, 269.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-18", "isController": false}, {"data": [[1.66400604E12, 10.08695652173913], [1.6640061E12, 11.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-17", "isController": false}, {"data": [[1.66400604E12, 11.043478260869568], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-16", "isController": false}, {"data": [[1.66400604E12, 11.173913043478263], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-15", "isController": false}, {"data": [[1.66400604E12, 237.47826086956516], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-14", "isController": false}, {"data": [[1.66400604E12, 206.82608695652172], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-13", "isController": false}, {"data": [[1.66400604E12, 237.08695652173913], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-12", "isController": false}, {"data": [[1.66400604E12, 235.78260869565216], [1.6640061E12, 261.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-11", "isController": false}, {"data": [[1.66400604E12, 238.47826086956525], [1.6640061E12, 279.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-10", "isController": false}, {"data": [[1.66400604E12, 339.0], [1.66400598E12, 299.3636363636364], [1.66400592E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-12", "isController": false}, {"data": [[1.66400598E12, 744.9090909090909], [1.66400592E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-13", "isController": false}, {"data": [[1.66400598E12, 195.3684210526316], [1.66400592E12, 49.6]], "isOverall": false, "label": "http://159.89.38.11/-10", "isController": false}, {"data": [[1.66400598E12, 719.9444444444443], [1.66400592E12, 151.0]], "isOverall": false, "label": "http://159.89.38.11/-11", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-18", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-19", "isController": false}, {"data": [[1.66400598E12, 226.81818181818178], [1.66400592E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-16", "isController": false}, {"data": [[1.66400598E12, 516.3043478260869], [1.66400592E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-17", "isController": false}, {"data": [[1.66400598E12, 1166.1249999999998]], "isOverall": false, "label": "http://159.89.38.11/-14", "isController": false}, {"data": [[1.66400598E12, 459.4761904761905], [1.66400592E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-15", "isController": false}, {"data": [[1.66400604E12, 86.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "Broadcast", "isController": true}, {"data": [[1.66400604E12, 254.66666666666666], [1.66400598E12, 162.52380952380955]], "isOverall": false, "label": "Form Numbers", "isController": true}, {"data": [[1.66400604E12, 105.0], [1.66400598E12, 128.5]], "isOverall": false, "label": "Teplate", "isController": true}, {"data": [[1.66400604E12, 247.73684210526315], [1.66400598E12, 248.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11", "isController": false}, {"data": [[1.66400604E12, 10.173913043478262], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-22", "isController": false}, {"data": [[1.66400604E12, 229.6315789473684], [1.66400598E12, 197.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12", "isController": false}, {"data": [[1.66400604E12, 10.82608695652174], [1.6640061E12, 257.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-21", "isController": false}, {"data": [[1.66400604E12, 32.652173913043484], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-20", "isController": false}, {"data": [[1.66400604E12, 254.1578947368421], [1.66400598E12, 246.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 48.8]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15", "isController": false}, {"data": [[1.66400604E12, 248.41176470588235], [1.6640061E12, 188.28571428571428]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 48.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16", "isController": false}, {"data": [[1.66400604E12, 105.29411764705883], [1.6640061E12, 130.42857142857142]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8", "isController": false}, {"data": [[1.66400604E12, 232.6842105263158], [1.66400598E12, 245.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13", "isController": false}, {"data": [[1.66400604E12, 245.0], [1.66400598E12, 195.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14", "isController": false}, {"data": [[1.66400604E12, 26.210526315789465], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19", "isController": false}, {"data": [[1.66400604E12, 116.52941176470588], [1.6640061E12, 141.2857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5", "isController": false}, {"data": [[1.66400604E12, 101.17647058823529], [1.6640061E12, 109.85714285714285]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4", "isController": false}, {"data": [[1.66400604E12, 12.73684210526316], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17", "isController": false}, {"data": [[1.66400604E12, 0.2222222222222222], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7", "isController": false}, {"data": [[1.66400604E12, 27.263157894736842], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18", "isController": false}, {"data": [[1.66400604E12, 6.055555555555557], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1", "isController": false}, {"data": [[1.66400604E12, 323.6666666666667], [1.66400598E12, 792.6190476190477]], "isOverall": false, "label": "Dashboard", "isController": true}, {"data": [[1.66400604E12, 82.94444444444444], [1.6640061E12, 80.83333333333333]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0", "isController": false}, {"data": [[1.66400604E12, 87.17647058823529], [1.6640061E12, 72.42857142857143]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3", "isController": false}, {"data": [[1.66400604E12, 57.470588235294116], [1.6640061E12, 68.28571428571428]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2", "isController": false}, {"data": [[1.66400604E12, 26.63157894736841], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22", "isController": false}, {"data": [[1.66400604E12, 25.736842105263158], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20", "isController": false}, {"data": [[1.66400604E12, 77.78947368421053], [1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21", "isController": false}, {"data": [[1.66400604E12, 192.0], [1.6640061E12, 139.14285714285714]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14", "isController": false}, {"data": [[1.66400604E12, 228.94117647058818], [1.6640061E12, 206.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13", "isController": false}, {"data": [[1.66400604E12, 187.00000000000003], [1.6640061E12, 209.85714285714286]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12", "isController": false}, {"data": [[1.66400604E12, 215.47058823529412], [1.6640061E12, 142.28571428571425]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11", "isController": false}, {"data": [[1.66400604E12, 220.05882352941177], [1.6640061E12, 248.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10", "isController": false}, {"data": [[1.66400604E12, 97.3913043478261], [1.6640061E12, 374.0]], "isOverall": false, "label": "http://159.89.38.11/message/template", "isController": false}, {"data": [[1.66400604E12, 15.352941176470589], [1.6640061E12, 40.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18", "isController": false}, {"data": [[1.66400604E12, 15.588235294117643], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16", "isController": false}, {"data": [[1.66400604E12, 15.176470588235293], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15", "isController": false}, {"data": [[1.66400604E12, 73.29411764705883], [1.6640061E12, 104.57142857142856]], "isOverall": false, "label": "http://159.89.38.11/broadcast", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 74.00000000000001]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22", "isController": false}, {"data": [[1.66400604E12, 45.294117647058826], [1.6640061E12, 106.14285714285714]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 40.0]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20", "isController": false}, {"data": [[1.66400604E12, 323.6666666666667], [1.66400598E12, 792.6190476190477]], "isOverall": false, "label": "http://159.89.38.11/", "isController": false}, {"data": [[1.66400604E12, 209.57894736842104], [1.66400598E12, 194.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5", "isController": false}, {"data": [[1.66400604E12, 155.84210526315786], [1.66400598E12, 206.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4", "isController": false}, {"data": [[1.66400604E12, 184.4736842105263], [1.66400598E12, 201.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3", "isController": false}, {"data": [[1.66400604E12, 166.99999999999997], [1.66400598E12, 196.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2", "isController": false}, {"data": [[1.66400604E12, 12.55], [1.66400598E12, 52.0]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1", "isController": false}, {"data": [[1.66400604E12, 208.94999999999996], [1.66400598E12, 49.599999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0", "isController": false}, {"data": [[1.66400604E12, 246.05263157894737], [1.66400598E12, 202.4]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9", "isController": false}, {"data": [[1.66400604E12, 110.31578947368422], [1.66400598E12, 112.2]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8", "isController": false}, {"data": [[1.66400604E12, 6.578947368421053], [1.66400598E12, 6.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7", "isController": false}, {"data": [[1.66400604E12, 101.42105263157893], [1.66400598E12, 112.6]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6", "isController": false}, {"data": [[1.66400598E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/-21", "isController": false}, {"data": [[1.66400598E12, 14.124999999999998]], "isOverall": false, "label": "http://159.89.38.11/-22", "isController": false}, {"data": [[1.66400598E12, 56.04166666666668]], "isOverall": false, "label": "http://159.89.38.11/-20", "isController": false}, {"data": [[1.66400604E12, 206.7894736842105], [1.66400598E12, 49.599999999999994]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage", "isController": false}, {"data": [[1.66400604E12, 5.043478260869565], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-6", "isController": false}, {"data": [[1.66400604E12, 97.34782608695653], [1.6640061E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-5", "isController": false}, {"data": [[1.66400604E12, 88.04347826086955], [1.6640061E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-4", "isController": false}, {"data": [[1.66400604E12, 108.39130434782608], [1.6640061E12, 360.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-3", "isController": false}, {"data": [[1.66400604E12, 236.56521739130434], [1.6640061E12, 301.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-9", "isController": false}, {"data": [[1.66400604E12, 102.95652173913044], [1.6640061E12, 330.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-8", "isController": false}, {"data": [[1.66400604E12, 0.21739130434782608], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-7", "isController": false}, {"data": [[1.66400598E12, 483.1428571428571], [1.66400592E12, 659.0000000000001]], "isOverall": false, "label": "http://159.89.38.11/-5", "isController": false}, {"data": [[1.66400598E12, 5278.6875], [1.66400592E12, 293.75]], "isOverall": false, "label": "http://159.89.38.11/-6", "isController": false}, {"data": [[1.66400604E12, 1102.0], [1.66400598E12, 479.75], [1.66400592E12, 204.60000000000002]], "isOverall": false, "label": "http://159.89.38.11/-7", "isController": false}, {"data": [[1.66400598E12, 4842.444444444444], [1.66400592E12, 823.3333333333333]], "isOverall": false, "label": "http://159.89.38.11/-8", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.66400598E12, 535.2173913043478]], "isOverall": false, "label": "http://159.89.38.11/-9", "isController": false}, {"data": [[1.66400598E12, 622.4594594594596], [1.66400592E12, 319.2647058823529]], "isOverall": false, "label": "http://159.89.38.11/-0", "isController": false}, {"data": [[1.66400598E12, 665.0666666666666], [1.66400592E12, 464.80769230769215]], "isOverall": false, "label": "http://159.89.38.11/-1", "isController": false}, {"data": [[1.66400598E12, 1485.7083333333328], [1.66400592E12, 345.66666666666663]], "isOverall": false, "label": "http://159.89.38.11/-2", "isController": false}, {"data": [[1.66400598E12, 319.88235294117646], [1.66400592E12, 977.8571428571429]], "isOverall": false, "label": "http://159.89.38.11/-3", "isController": false}, {"data": [[1.66400598E12, 1049.6000000000001], [1.66400592E12, 532.8571428571428]], "isOverall": false, "label": "http://159.89.38.11/-4", "isController": false}, {"data": [[1.66400604E12, 108.47826086956522], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-2", "isController": false}, {"data": [[1.66400604E12, 0.0], [1.6640061E12, 0.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-1", "isController": false}, {"data": [[1.66400604E12, 97.3913043478261], [1.6640061E12, 374.0]], "isOverall": false, "label": "http://159.89.38.11/message/template-0", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6640061E12, "title": "Connect Time Over Time"}},
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
        data: {"result": {"minY": 10.0, "minX": 1.66400592E12, "maxY": 103461.0, "series": [{"data": [[1.66400604E12, 103461.0], [1.66400598E12, 71219.0], [1.6640061E12, 2551.0], [1.66400592E12, 10823.0]], "isOverall": false, "label": "Max", "isController": false}, {"data": [[1.66400604E12, 521.0], [1.66400598E12, 47219.40000000001], [1.6640061E12, 584.4000000000001], [1.66400592E12, 5624.5]], "isOverall": false, "label": "90th percentile", "isController": false}, {"data": [[1.66400604E12, 2301.1699999999996], [1.66400598E12, 66991.08], [1.6640061E12, 2191.6899999999982], [1.66400592E12, 10000.849999999999]], "isOverall": false, "label": "99th percentile", "isController": false}, {"data": [[1.66400604E12, 551.6999999999998], [1.66400598E12, 59647.2], [1.6640061E12, 661.1500000000002], [1.66400592E12, 7837.299999999999]], "isOverall": false, "label": "95th percentile", "isController": false}, {"data": [[1.66400604E12, 10.0], [1.66400598E12, 15.0], [1.6640061E12, 11.0], [1.66400592E12, 19.0]], "isOverall": false, "label": "Min", "isController": false}, {"data": [[1.66400604E12, 262.5], [1.66400598E12, 5620.0], [1.6640061E12, 267.5], [1.66400592E12, 1695.5]], "isOverall": false, "label": "Median", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6640061E12, "title": "Response Time Percentiles Over Time (successful requests only)"}},
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
    data: {"result": {"minY": 12.0, "minX": 1.0, "maxY": 94639.0, "series": [{"data": [[2.0, 2051.0], [33.0, 292.5], [35.0, 259.0], [34.0, 251.0], [36.0, 258.0], [37.0, 255.0], [38.0, 469.0], [40.0, 476.0], [42.0, 468.5], [43.0, 271.5], [44.0, 453.5], [46.0, 263.0], [3.0, 1737.0], [49.0, 258.0], [50.0, 454.0], [54.0, 260.5], [57.0, 465.0], [4.0, 1691.5], [64.0, 269.0], [5.0, 12665.0], [6.0, 5366.0], [7.0, 2436.0], [8.0, 1052.0], [9.0, 3674.0], [10.0, 4379.5], [11.0, 5198.0], [12.0, 3903.0], [13.0, 2370.0], [14.0, 7584.0], [15.0, 389.5], [16.0, 971.0], [1.0, 528.0], [17.0, 502.0], [18.0, 257.5], [19.0, 461.0], [20.0, 340.5], [21.0, 371.0], [22.0, 313.5], [23.0, 250.0], [24.0, 252.5], [25.0, 267.0], [27.0, 257.0], [28.0, 378.0], [29.0, 256.0], [30.0, 259.0], [31.0, 306.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 2388.0], [17.0, 94639.0], [40.0, 67900.0], [11.0, 57231.0], [46.0, 1262.5], [12.0, 57994.0], [49.0, 200.0], [25.0, 1666.0], [14.0, 21235.5], [28.0, 12.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Response Time Vs Request"}},
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
    data: {"result": {"minY": 0.0, "minX": 1.0, "maxY": 8641.0, "series": [{"data": [[2.0, 299.0], [33.0, 0.0], [35.0, 0.0], [34.0, 0.0], [36.0, 0.0], [37.0, 0.0], [38.0, 0.0], [40.0, 0.0], [42.0, 0.0], [43.0, 0.0], [44.0, 0.0], [46.0, 0.0], [3.0, 495.5], [49.0, 0.0], [50.0, 0.0], [54.0, 0.0], [57.0, 0.0], [4.0, 419.0], [64.0, 0.0], [5.0, 869.0], [6.0, 845.5], [7.0, 729.0], [8.0, 614.0], [9.0, 866.5], [10.0, 1178.5], [11.0, 1047.0], [12.0, 860.0], [13.0, 731.0], [14.0, 1207.5], [15.0, 269.0], [16.0, 168.0], [1.0, 525.0], [17.0, 333.0], [18.0, 0.0], [19.0, 0.0], [20.0, 0.0], [21.0, 0.0], [22.0, 0.0], [23.0, 0.0], [24.0, 0.0], [25.0, 0.0], [27.0, 0.0], [28.0, 0.0], [29.0, 0.0], [30.0, 0.0], [31.0, 0.0]], "isOverall": false, "label": "Successes", "isController": false}, {"data": [[8.0, 672.0], [17.0, 550.0], [40.0, 635.0], [11.0, 848.0], [46.0, 271.5], [12.0, 8641.0], [49.0, 0.0], [25.0, 287.0], [14.0, 430.5], [28.0, 0.0]], "isOverall": false, "label": "Failures", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 1000, "maxX": 64.0, "title": "Latencies Vs Request"}},
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
        data: {"result": {"minY": 3.0166666666666666, "minX": 1.66400592E12, "maxY": 23.816666666666666, "series": [{"data": [[1.66400604E12, 23.816666666666666], [1.66400598E12, 7.466666666666667], [1.6640061E12, 3.0166666666666666], [1.66400592E12, 6.1]], "isOverall": false, "label": "hitsPerSecond", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6640061E12, "title": "Hits Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66400592E12, "maxY": 20.616666666666667, "series": [{"data": [[1.66400604E12, 2.1333333333333333], [1.66400598E12, 8.583333333333334], [1.6640061E12, 0.25], [1.66400592E12, 2.6166666666666667]], "isOverall": false, "label": "200", "isController": false}, {"data": [[1.66400604E12, 1.0], [1.66400598E12, 0.1], [1.6640061E12, 0.11666666666666667], [1.66400592E12, 0.38333333333333336]], "isOverall": false, "label": "302", "isController": false}, {"data": [[1.66400604E12, 20.616666666666667], [1.66400598E12, 1.75], [1.6640061E12, 2.75]], "isOverall": false, "label": "304", "isController": false}, {"data": [[1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.NoHttpResponseException", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666], [1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: org.apache.http.ConnectionClosedException", "isController": false}, {"data": [[1.66400604E12, 0.03333333333333333], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "Non HTTP response code: java.net.SocketException", "isController": false}], "supportsControllersDiscrimination": false, "granularity": 60000, "maxX": 1.6640061E12, "title": "Codes Per Second"}},
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
        data: {"result": {"minY": 0.016666666666666666, "minX": 1.66400592E12, "maxY": 0.75, "series": [{"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-9-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-14-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-failure", "isController": false}, {"data": [[1.66400598E12, 0.6166666666666667], [1.66400592E12, 0.5666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-0-success", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-20-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-9-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-9-success", "isController": false}, {"data": [[1.66400598E12, 0.16666666666666666], [1.66400592E12, 0.23333333333333334]], "isOverall": false, "label": "http://159.89.38.11/-4-success", "isController": false}, {"data": [[1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-10-failure", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-5-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666], [1.66400598E12, 0.03333333333333333]], "isOverall": false, "label": "Dashboard-failure", "isController": true}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-5-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-failure", "isController": true}, {"data": [[1.66400604E12, 0.38333333333333336]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-success", "isController": false}, {"data": [[1.66400598E12, 0.15], [1.66400592E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-8-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-2-success", "isController": false}, {"data": [[1.66400598E12, 0.38333333333333336]], "isOverall": false, "label": "http://159.89.38.11/-14-success", "isController": false}, {"data": [[1.66400598E12, 0.38333333333333336], [1.66400592E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-17-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-14-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-14-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-failure", "isController": false}, {"data": [[1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-17-failure", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-18-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-18-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336]], "isOverall": false, "label": "http://159.89.38.11/message/template-success", "isController": false}, {"data": [[1.66400604E12, 0.03333333333333333], [1.66400598E12, 0.31666666666666665]], "isOverall": false, "label": "Dashboard-success", "isController": true}, {"data": [[1.66400598E12, 0.3], [1.66400592E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-10-success", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-success", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.6640061E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-1-success", "isController": false}, {"data": [[1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-failure", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-10-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-6-success", "isController": false}, {"data": [[1.66400598E12, 0.75], [1.66400592E12, 0.43333333333333335]], "isOverall": false, "label": "http://159.89.38.11/-1-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-19-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-11-success", "isController": false}, {"data": [[1.66400598E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-20-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-22-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-4-success", "isController": false}, {"data": [[1.66400598E12, 0.11666666666666667], [1.66400592E12, 0.2833333333333333]], "isOverall": false, "label": "http://159.89.38.11/-5-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666], [1.66400598E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-failure", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.6640061E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-6-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-15-success", "isController": false}, {"data": [[1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-14-failure", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "Teplate-failure", "isController": true}, {"data": [[1.66400598E12, 0.38333333333333336]], "isOverall": false, "label": "http://159.89.38.11/-9-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-11-success", "isController": false}, {"data": [[1.66400604E12, 0.3333333333333333], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-1-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-9-failure", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-2-success", "isController": false}, {"data": [[1.66400604E12, 0.36666666666666664], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "Broadcast-success", "isController": true}, {"data": [[1.66400604E12, 0.03333333333333333], [1.66400598E12, 0.31666666666666665]], "isOverall": false, "label": "http://159.89.38.11/-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-13-success", "isController": false}, {"data": [[1.66400598E12, 0.3], [1.66400592E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/-11-success", "isController": false}, {"data": [[1.66400598E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-18-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-3-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-20-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-7-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-19-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-15-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-8-success", "isController": false}, {"data": [[1.66400598E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-21-success", "isController": false}, {"data": [[1.66400604E12, 0.05], [1.66400598E12, 0.3333333333333333]], "isOverall": false, "label": "Form Numbers-success", "isController": true}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-7-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-22-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-21-success", "isController": false}, {"data": [[1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "Form Numbers-failure", "isController": true}, {"data": [[1.66400598E12, 0.38333333333333336], [1.66400592E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-2-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-12-success", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.6640061E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-7-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-16-success", "isController": false}, {"data": [[1.66400598E12, 0.35], [1.66400592E12, 0.05]], "isOverall": false, "label": "http://159.89.38.11/-15-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-3-success", "isController": false}, {"data": [[1.66400598E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-2-failure", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-0-success", "isController": false}, {"data": [[1.66400604E12, 0.3333333333333333], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-0-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-12-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-16-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-21-success", "isController": false}, {"data": [[1.66400598E12, 0.26666666666666666], [1.66400592E12, 0.13333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-6-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.06666666666666667]], "isOverall": false, "label": "Teplate-success", "isController": true}, {"data": [[1.66400604E12, 0.016666666666666666], [1.66400598E12, 0.36666666666666664], [1.66400592E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/-12-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-4-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-19-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-3-success", "isController": false}, {"data": [[1.66400598E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-19-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-12-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-16-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-failure", "isController": false}, {"data": [[1.66400598E12, 0.4]], "isOverall": false, "label": "http://159.89.38.11/-22-success", "isController": false}, {"data": [[1.66400604E12, 0.26666666666666666], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-13-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-21-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-8-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-6-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-17-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-8-success", "isController": false}, {"data": [[1.66400598E12, 0.2833333333333333], [1.66400592E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/-3-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-20-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-2-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-10-success", "isController": false}, {"data": [[1.66400598E12, 0.36666666666666664], [1.66400592E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-13-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-1-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-22-success", "isController": false}, {"data": [[1.66400598E12, 0.36666666666666664], [1.66400592E12, 0.03333333333333333]], "isOverall": false, "label": "http://159.89.38.11/-16-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-15-success", "isController": false}, {"data": [[1.66400604E12, 0.26666666666666666], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-18-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-4-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666], [1.66400598E12, 0.13333333333333333], [1.66400592E12, 0.25]], "isOverall": false, "label": "http://159.89.38.11/-7-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-13-success", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-11-success", "isController": false}, {"data": [[1.66400604E12, 0.31666666666666665], [1.66400598E12, 0.08333333333333333]], "isOverall": false, "label": "http://159.89.38.11/virtual/number/manage-17-success", "isController": false}, {"data": [[1.66400604E12, 0.2833333333333333], [1.6640061E12, 0.11666666666666667]], "isOverall": false, "label": "http://159.89.38.11/broadcast-10-success", "isController": false}, {"data": [[1.66400604E12, 0.3], [1.6640061E12, 0.1]], "isOverall": false, "label": "http://159.89.38.11/broadcast-0-success", "isController": false}, {"data": [[1.66400604E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/broadcast-failure", "isController": false}, {"data": [[1.66400604E12, 0.38333333333333336], [1.6640061E12, 0.016666666666666666]], "isOverall": false, "label": "http://159.89.38.11/message/template-5-success", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6640061E12, "title": "Transactions Per Second"}},
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
        data: {"result": {"minY": 0.03333333333333333, "minX": 1.66400592E12, "maxY": 24.466666666666665, "series": [{"data": [[1.66400604E12, 24.466666666666665], [1.66400598E12, 11.1], [1.6640061E12, 3.1166666666666667], [1.66400592E12, 3.0]], "isOverall": false, "label": "Transaction-success", "isController": false}, {"data": [[1.66400604E12, 0.15], [1.66400598E12, 0.13333333333333333], [1.6640061E12, 0.03333333333333333]], "isOverall": false, "label": "Transaction-failure", "isController": false}], "supportsControllersDiscrimination": true, "granularity": 60000, "maxX": 1.6640061E12, "title": "Total Transactions Per Second"}},
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
