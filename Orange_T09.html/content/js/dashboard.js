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
var showControllersOnly = false;
var seriesFilter = "";
var filtersOnlySampleSeries = true;

/*
 * Add header in statistics table to group metrics by category
 * format
 *
 */
function summaryTableHeader(header) {
    var newRow = header.insertRow(-1);
    newRow.className = "tablesorter-no-sort";
    var cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Requests";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 3;
    cell.innerHTML = "Executions";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 7;
    cell.innerHTML = "Response Times (ms)";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 1;
    cell.innerHTML = "Throughput";
    newRow.appendChild(cell);

    cell = document.createElement('th');
    cell.setAttribute("data-sorter", false);
    cell.colSpan = 2;
    cell.innerHTML = "Network (KB/sec)";
    newRow.appendChild(cell);
}

/*
 * Populates the table identified by id parameter with the specified data and
 * format
 *
 */
function createTable(table, info, formatter, defaultSorts, seriesIndex, headerCreator) {
    var tableRef = table[0];

    // Create header and populate it with data.titles array
    var header = tableRef.createTHead();

    // Call callback is available
    if(headerCreator) {
        headerCreator(header);
    }

    var newRow = header.insertRow(-1);
    for (var index = 0; index < info.titles.length; index++) {
        var cell = document.createElement('th');
        cell.innerHTML = info.titles[index];
        newRow.appendChild(cell);
    }

    var tBody;

    // Create overall body if defined
    if(info.overall){
        tBody = document.createElement('tbody');
        tBody.className = "tablesorter-no-sort";
        tableRef.appendChild(tBody);
        var newRow = tBody.insertRow(-1);
        var data = info.overall.data;
        for(var index=0;index < data.length; index++){
            var cell = newRow.insertCell(-1);
            cell.innerHTML = formatter ? formatter(index, data[index]): data[index];
        }
    }

    // Create regular body
    tBody = document.createElement('tbody');
    tableRef.appendChild(tBody);

    var regexp;
    if(seriesFilter) {
        regexp = new RegExp(seriesFilter, 'i');
    }
    // Populate body with data.items array
    for(var index=0; index < info.items.length; index++){
        var item = info.items[index];
        if((!regexp || filtersOnlySampleSeries && !info.supportsControllersDiscrimination || regexp.test(item.data[seriesIndex]))
                &&
                (!showControllersOnly || !info.supportsControllersDiscrimination || item.isController)){
            if(item.data.length > 0) {
                var newRow = tBody.insertRow(-1);
                for(var col=0; col < item.data.length; col++){
                    var cell = newRow.insertCell(-1);
                    cell.innerHTML = formatter ? formatter(col, item.data[col]) : item.data[col];
                }
            }
        }
    }

    // Add support of columns sort
    table.tablesorter({sortList : defaultSorts});
}

$(document).ready(function() {

    // Customize table sorter default options
    $.extend( $.tablesorter.defaults, {
        theme: 'blue',
        cssInfoBlock: "tablesorter-no-sort",
        widthFixed: true,
        widgets: ['zebra']
    });

    var data = {"OkPercent": 99.55995599559957, "KoPercent": 0.44004400440044006};
    var dataset = [
        {
            "label" : "FAIL",
            "data" : data.KoPercent,
            "color" : "#FF6347"
        },
        {
            "label" : "PASS",
            "data" : data.OkPercent,
            "color" : "#9ACD32"
        }];
    $.plot($("#flot-requests-summary"), dataset, {
        series : {
            pie : {
                show : true,
                radius : 1,
                label : {
                    show : true,
                    radius : 3 / 4,
                    formatter : function(label, series) {
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'
                            + label
                            + '<br/>'
                            + Math.round10(series.percent, -2)
                            + '%</div>';
                    },
                    background : {
                        opacity : 0.5,
                        color : '#000'
                    }
                }
            }
        },
        legend : {
            show : true
        }
    });

    // Creates APDEX table
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6783068783068783, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.05555555555555555, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.05555555555555555, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.1111111111111111, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.2777777777777778, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.2777777777777778, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.05555555555555555, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.0, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.7222222222222222, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.7222222222222222, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.05555555555555555, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.7222222222222222, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.7222222222222222, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.7777777777777778, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.7222222222222222, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.2222222222222222, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.2777777777777778, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.3888888888888889, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.2222222222222222, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.5925925925925926, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.4444444444444444, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [0.9444444444444444, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [0.8888888888888888, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
        switch(index){
            case 0:
                item = item.toFixed(3);
                break;
            case 1:
            case 2:
                item = formatDuration(item);
                break;
        }
        return item;
    }, [[0, 0]], 3);

    // Create statistics table
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 909, 4, 0.44004400440044006, 1529.59515951595, 10, 25060, 449.0, 3020.0, 7053.5, 22480.999999999993, 8.849988316847107, 298.28858733947834, 14.925075697094789], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 9, 0, 0.0, 250.22222222222223, 230, 264, 254.0, 264.0, 264.0, 264.0, 0.2435064935064935, 0.029962713068181816, 0.23859197443181818], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 9, 0, 0.0, 277.1111111111111, 238, 466, 254.0, 466.0, 466.0, 466.0, 0.24354603019970775, 0.030205415854846564, 0.24410098534664718], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 9, 0, 0.0, 243.0, 234, 256, 243.0, 256.0, 256.0, 256.0, 0.24366471734892786, 0.02998218201754386, 0.2458856197205978], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 9, 0, 0.0, 281.3333333333333, 232, 527, 255.0, 527.0, 527.0, 527.0, 0.24371750433275563, 0.029988677290944545, 0.24784293083838824], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 9, 0, 0.0, 275.6666666666667, 230, 485, 253.0, 485.0, 485.0, 485.0, 0.24410751579918089, 0.03027505322899997, 0.24704761283191842], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 9, 0, 0.0, 390.3333333333333, 239, 554, 488.0, 554.0, 554.0, 554.0, 0.24289531212047608, 0.03012471156181686, 0.23989074771273583], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 9, 0, 0.0, 406.6666666666667, 230, 516, 469.0, 516.0, 516.0, 516.0, 0.24146812620734065, 0.02971189834191887, 0.23706636349001933], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 9, 0, 0.0, 385.77777777777777, 232, 544, 475.0, 544.0, 544.0, 544.0, 0.24172105390379503, 0.029979076021271454, 0.2408555162758843], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 9, 1, 11.11111111111111, 375.1111111111111, 179, 552, 468.0, 552.0, 552.0, 552.0, 0.2431643791202853, 0.0885745248162758, 0.21303268196801037], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 9, 0, 0.0, 461.8888888888889, 248, 602, 507.0, 602.0, 602.0, 602.0, 0.2431183986601475, 0.029914959210135338, 0.23797429191766392], "isController": false}, {"data": ["http://159.89.38.11/-12", 9, 0, 0.0, 7515.666666666667, 3304, 12137, 7266.0, 12137.0, 12137.0, 12137.0, 0.46970408642555195, 40.55509482151245, 0.4267396175825896], "isController": false}, {"data": ["http://159.89.38.11/-13", 9, 0, 0.0, 2931.1111111111113, 1277, 4615, 2821.0, 4615.0, 4615.0, 4615.0, 0.5230733465070325, 22.557538068115775, 0.4680757257642683], "isController": false}, {"data": ["http://159.89.38.11/-10", 9, 0, 0.0, 3804.6666666666665, 1104, 5878, 3496.0, 5878.0, 5878.0, 5878.0, 0.5467136435427044, 27.975294428076783, 0.9430454417749969], "isController": false}, {"data": ["http://159.89.38.11/-11", 9, 0, 0.0, 3209.444444444445, 1100, 8907, 2383.0, 8907.0, 8907.0, 8907.0, 0.5417770286539851, 22.404913898838192, 0.48692915889116306], "isController": false}, {"data": ["http://159.89.38.11/-18", 9, 0, 0.0, 5621.666666666667, 2204, 10732, 4522.0, 10732.0, 10732.0, 10732.0, 0.4979253112033195, 41.05549792531121, 0.4552969398340249], "isController": false}, {"data": ["http://159.89.38.11/-19", 9, 0, 0.0, 1490.111111111111, 680, 3197, 1280.0, 3197.0, 3197.0, 3197.0, 0.5484126500517945, 10.885241320608127, 0.4896796546523673], "isController": false}, {"data": ["http://159.89.38.11/-16", 9, 0, 0.0, 1954.3333333333333, 554, 4865, 1040.0, 4865.0, 4865.0, 4865.0, 0.5018400802944128, 9.09536137713282, 0.46671780904984944], "isController": false}, {"data": ["http://159.89.38.11/-17", 9, 0, 0.0, 1877.4444444444443, 636, 3642, 1325.0, 3642.0, 3642.0, 3642.0, 0.5256395280925126, 12.510118104631468, 0.4847450465775026], "isController": false}, {"data": ["http://159.89.38.11/-14", 9, 0, 0.0, 7434.666666666667, 4256, 11116, 7806.0, 11116.0, 11116.0, 11116.0, 0.3976670201484624, 58.72229275748939, 0.35779675901378577], "isController": false}, {"data": ["http://159.89.38.11/-15", 9, 0, 0.0, 5196.666666666667, 2334, 10503, 5171.0, 10503.0, 10503.0, 10503.0, 0.4361944457907236, 33.6108267096399, 0.40311068736974753], "isController": false}, {"data": ["Broadcast", 9, 1, 11.11111111111111, 2044.3333333333333, 1415, 2939, 1987.0, 2939.0, 2939.0, 2939.0, 0.23269643457351913, 3.001092178491093, 4.860441727318562], "isController": true}, {"data": ["Form Numbers", 9, 0, 0.0, 1903.3333333333333, 1583, 2240, 1768.0, 2240.0, 2240.0, 2240.0, 1.1401064099315936, 14.426502723587534, 24.089325159931594], "isController": true}, {"data": ["Teplate", 9, 1, 11.11111111111111, 1804.2222222222222, 1518, 2114, 1787.0, 2114.0, 2114.0, 2114.0, 0.360100828231905, 4.643917484395631, 7.52366912735566], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 9, 0, 0.0, 496.66666666666663, 225, 1035, 490.0, 1035.0, 1035.0, 1035.0, 0.37861259517899964, 0.046587096672415965, 0.37376490787093514], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 9, 0, 0.0, 247.33333333333337, 234, 265, 247.0, 265.0, 265.0, 265.0, 0.243605359317905, 0.02997487819732034, 0.23797515732846122], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 9, 0, 0.0, 545.3333333333334, 475, 943, 498.0, 943.0, 943.0, 943.0, 0.377453447408153, 0.0468130740437846, 0.37667527732343564], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 9, 0, 0.0, 250.11111111111111, 231, 267, 252.0, 267.0, 267.0, 267.0, 0.24348672997321646, 0.02972250121743365, 0.2385726097719341], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 9, 0, 0.0, 269.77777777777777, 235, 475, 243.0, 475.0, 475.0, 475.0, 0.2435064935064935, 0.029962713068181816, 0.2407321682224026], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 9, 0, 0.0, 459.6666666666667, 245, 555, 515.0, 555.0, 555.0, 555.0, 0.3800675675675676, 0.04676612647804054, 0.37260313291807434], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 9, 0, 0.0, 276.8888888888889, 224, 501, 255.0, 501.0, 501.0, 501.0, 0.37968275396557544, 0.04708956030627742, 0.38483253090195746], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 9, 1, 11.11111111111111, 442.8888888888889, 221, 534, 493.0, 534.0, 534.0, 534.0, 0.18667938852129184, 0.06816147378191699, 0.16484340969903136], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 9, 0, 0.0, 301.55555555555554, 229, 493, 255.0, 493.0, 493.0, 493.0, 0.37974683544303794, 0.04672666139240506, 0.38675171413502113], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 9, 0, 0.0, 145.88888888888886, 56, 207, 163.0, 207.0, 207.0, 207.0, 0.1877307523831376, 0.07225271036273753, 0.0821322041676227], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 9, 0, 0.0, 441.00000000000006, 241, 520, 493.0, 520.0, 520.0, 520.0, 0.38258799523890497, 0.04707625722666213, 0.37619492326985204], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 9, 0, 0.0, 354.77777777777777, 228, 518, 242.0, 518.0, 518.0, 518.0, 0.3837298541826554, 0.04759149558710667, 0.3795661187857082], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 9, 0, 0.0, 301.55555555555554, 234, 506, 248.0, 506.0, 506.0, 506.0, 0.3834845967020325, 0.0471865812348204, 0.37632754910733307], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 9, 0, 0.0, 360.55555555555554, 234, 526, 282.0, 526.0, 526.0, 526.0, 0.18753516284303307, 0.022892475932987436, 0.18983458487007981], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 9, 0, 0.0, 370.2222222222223, 251, 524, 282.0, 524.0, 524.0, 524.0, 0.18667164457718874, 0.022969362516333768, 0.18422076903532242], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 9, 0, 0.0, 243.55555555555554, 230, 260, 241.0, 260.0, 260.0, 260.0, 0.38307653017791776, 0.04713636992423598, 0.3871500436281604], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 9, 0, 0.0, 21.22222222222222, 13, 52, 18.0, 52.0, 52.0, 52.0, 0.18849746575629373, 0.1609264388639886, 0.09148753953210739], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 9, 0, 0.0, 252.11111111111111, 225, 265, 254.0, 265.0, 265.0, 265.0, 0.38319070123898324, 0.04752462798569422, 0.38464596106356713], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 9, 0, 0.0, 97.66666666666667, 54, 180, 64.0, 180.0, 180.0, 180.0, 0.18831603615667894, 0.07264143972840642, 0.08183655868136927], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 9, 0, 0.0, 424.77777777777777, 255, 1638, 277.0, 1638.0, 1638.0, 1638.0, 0.1823154056517776, 1.38473456649448, 0.1601985845234478], "isController": false}, {"data": ["Dashboard", 9, 0, 0.0, 22751.111111111113, 18859, 25060, 23173.0, 25060.0, 25060.0, 25060.0, 0.30566499116967805, 422.99179162138296, 6.262915141879501], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 9, 0, 0.0, 407.1111111111111, 275, 564, 320.0, 564.0, 564.0, 564.0, 0.18221574344023322, 0.2220358939706835, 0.16074370596452867], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 9, 0, 0.0, 392.22222222222223, 238, 525, 490.0, 525.0, 525.0, 525.0, 0.18660197798096662, 0.022960790259376748, 0.1876143585038668], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 9, 0, 0.0, 419.1111111111111, 234, 533, 470.0, 533.0, 533.0, 533.0, 0.1867491129417135, 0.022978894756499908, 0.18356773156890005], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 9, 0, 0.0, 245.44444444444446, 229, 262, 245.0, 262.0, 262.0, 262.0, 0.38245792962774094, 0.04706025305966344, 0.3741995607045725], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 9, 0, 0.0, 249.77777777777777, 240, 263, 250.0, 263.0, 263.0, 263.0, 0.38257173219978746, 0.047074256110520726, 0.3787941684378321], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 9, 0, 0.0, 254.6666666666667, 241, 266, 255.0, 266.0, 266.0, 266.0, 0.38022813688212925, 0.046414567490494295, 0.3731318652302492], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 9, 0, 0.0, 419.1111111111111, 244, 533, 487.0, 533.0, 533.0, 533.0, 0.1857431790977009, 0.023036507563875014, 0.18348588351838857], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 9, 0, 0.0, 401.1111111111111, 243, 501, 471.0, 501.0, 501.0, 501.0, 0.1858083696347833, 0.022863139232404982, 0.18246156089353183], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 9, 0, 0.0, 356.44444444444446, 231, 517, 256.0, 517.0, 517.0, 517.0, 0.18684603886397608, 0.023173288023168908, 0.18621754198845708], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 9, 0, 0.0, 443.22222222222223, 248, 525, 490.0, 525.0, 525.0, 525.0, 0.18654782879054824, 0.022954127370711994, 0.18391640325422323], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 9, 0, 0.0, 483.55555555555554, 251, 530, 518.0, 530.0, 530.0, 530.0, 0.18635083650819945, 0.02292988808596985, 0.18244830705441445], "isController": false}, {"data": ["http://159.89.38.11/message/template", 9, 1, 11.11111111111111, 1804.2222222222222, 1518, 2114, 1787.0, 2114.0, 2114.0, 2114.0, 0.23309419595452074, 3.006019779013753, 4.870090453497708], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 9, 0, 0.0, 247.22222222222223, 232, 261, 248.0, 261.0, 261.0, 261.0, 0.18733608092918697, 0.023051119333083552, 0.1835958640356355], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 9, 0, 0.0, 250.77777777777777, 242, 266, 245.0, 266.0, 266.0, 266.0, 0.18731268731268733, 0.023231163367882116, 0.18778015604187479], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 9, 0, 0.0, 252.2222222222222, 240, 268, 249.0, 268.0, 268.0, 268.0, 0.1869741352446245, 0.023006583047678407, 0.18871890256570065], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 9, 0, 0.0, 249.33333333333334, 231, 260, 249.0, 260.0, 260.0, 260.0, 0.18690812427313508, 0.022998460603920915, 0.19011249532729688], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 9, 0, 0.0, 293.55555555555554, 230, 461, 253.0, 461.0, 461.0, 461.0, 0.18738678714943055, 0.0232403534843532, 0.18968438989985215], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 9, 1, 11.11111111111111, 2044.3333333333333, 1415, 2939, 1987.0, 2939.0, 2939.0, 2939.0, 0.1767686687355148, 2.2797902774777072, 3.6922517320874415], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 9, 0, 0.0, 301.3333333333333, 230, 495, 250.0, 495.0, 495.0, 495.0, 0.18664841659926587, 0.02296650438623779, 0.18237510758207345], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 9, 0, 0.0, 249.33333333333334, 239, 258, 248.0, 258.0, 258.0, 258.0, 0.18674136321195142, 0.022795576563958916, 0.18301302002282394], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 9, 0, 0.0, 305.1111111111111, 229, 510, 255.0, 510.0, 510.0, 510.0, 0.18686155634914045, 0.02299273056639814, 0.18477315136824182], "isController": false}, {"data": ["http://159.89.38.11/", 9, 0, 0.0, 22751.111111111113, 18859, 25060, 23173.0, 25060.0, 25060.0, 25060.0, 0.30653950953678477, 424.2019861205722, 6.280833563947548], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 9, 0, 0.0, 419.22222222222223, 234, 560, 475.0, 560.0, 560.0, 560.0, 0.38138825324180015, 0.04655618325705568, 0.38656116249258415], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 9, 0, 0.0, 344.22222222222223, 239, 626, 265.0, 626.0, 626.0, 626.0, 0.3787081843046497, 0.046598858615611194, 0.37422910530191456], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 9, 0, 0.0, 375.4444444444444, 239, 632, 254.0, 632.0, 632.0, 632.0, 0.37859666834931854, 0.04658513692579506, 0.3811436511442033], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 9, 0, 0.0, 339.22222222222223, 228, 494, 254.0, 494.0, 494.0, 494.0, 0.3826693311790467, 0.04708626535992177, 0.3766486005995153], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 9, 0, 0.0, 273.44444444444446, 260, 288, 273.0, 288.0, 288.0, 288.0, 0.38458251431501583, 2.9215084447910433, 0.3379285157251517], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 9, 0, 0.0, 391.0, 268, 565, 289.0, 565.0, 565.0, 565.0, 0.3845496496325414, 0.4685864328747223, 0.34299024739360795], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 9, 0, 0.0, 508.88888888888886, 472, 566, 513.0, 566.0, 566.0, 566.0, 0.38000337780780274, 0.04712932517733491, 0.3781066595591961], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 9, 0, 0.0, 137.77777777777777, 53, 219, 167.0, 219.0, 219.0, 219.0, 0.38809831824062097, 0.14936900334195774, 0.18874312742561447], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 9, 0, 0.0, 20.222222222222225, 10, 81, 12.0, 81.0, 81.0, 81.0, 0.38878569268650914, 0.3304847131625556, 0.18869774342304202], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 9, 0, 0.0, 61.77777777777778, 54, 81, 58.0, 81.0, 81.0, 81.0, 0.38798120446609474, 0.14970281717463466, 0.18754950801827824], "isController": false}, {"data": ["http://159.89.38.11/-21", 9, 0, 0.0, 719.3333333333334, 299, 2285, 336.0, 2285.0, 2285.0, 2285.0, 0.5679666792881485, 2.3766965046383945, 0.5076941736084817], "isController": false}, {"data": ["http://159.89.38.11/-22", 9, 0, 0.0, 904.5555555555555, 311, 2434, 343.0, 2434.0, 2434.0, 2434.0, 0.5658242172764995, 3.979556653149755, 0.5035688183704262], "isController": false}, {"data": ["http://159.89.38.11/-20", 9, 0, 0.0, 2679.0, 1551, 4888, 2459.0, 4888.0, 4888.0, 4888.0, 0.5387286005028133, 26.14201578025859, 0.48576765084400814], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 9, 0, 0.0, 1903.3333333333333, 1583, 2240, 1768.0, 2240.0, 2240.0, 2240.0, 0.35948234542259144, 4.548762282313469, 7.595507781294935], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 9, 0, 0.0, 104.22222222222223, 54, 170, 60.0, 170.0, 170.0, 170.0, 0.24518484212820443, 0.09457813734437573, 0.10655005346391697], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 9, 0, 0.0, 391.11111111111114, 243, 548, 458.0, 548.0, 548.0, 548.0, 0.24322352241710132, 0.029690371388806314, 0.2461529723941302], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 9, 0, 0.0, 424.0, 248, 549, 473.0, 549.0, 549.0, 549.0, 0.24460509865738977, 0.03009789299885851, 0.24134051237973583], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 9, 0, 0.0, 342.1111111111111, 242, 550, 261.0, 550.0, 550.0, 550.0, 0.243000243000243, 0.029900420525420527, 0.24426586926586927], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 9, 0, 0.0, 470.3333333333333, 241, 508, 501.0, 508.0, 508.0, 508.0, 0.24281667341157426, 0.030114958518818295, 0.241235835694051], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 9, 0, 0.0, 142.44444444444446, 54, 190, 163.0, 190.0, 190.0, 190.0, 0.24588148512417016, 0.09460674329972953, 0.10757314974182444], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 9, 0, 0.0, 15.666666666666664, 12, 25, 14.0, 25.0, 25.0, 25.0, 0.24614374794880212, 0.20992728503446012, 0.11946625266655726], "isController": false}, {"data": ["http://159.89.38.11/-5", 9, 0, 0.0, 1432.5555555555557, 515, 2902, 1587.0, 2902.0, 2902.0, 2902.0, 0.7249879168680522, 2.0177886358144033, 0.6714162185838569], "isController": false}, {"data": ["http://159.89.38.11/-6", 9, 0, 0.0, 1546.4444444444443, 532, 2855, 1430.0, 2855.0, 2855.0, 2855.0, 0.7605205340544194, 90.53932590945581, 0.3059906836234578], "isController": false}, {"data": ["http://159.89.38.11/-7", 9, 0, 0.0, 380.1111111111111, 16, 1184, 124.0, 1184.0, 1184.0, 1184.0, 0.7869884575026234, 12.406169388335082, 0.317408430613851], "isController": false}, {"data": ["http://159.89.38.11/-8", 9, 0, 0.0, 2153.8888888888887, 252, 8294, 1146.0, 8294.0, 8294.0, 8294.0, 0.5290383258876088, 12.333894824241712, 0.21492181989184106], "isController": false}, {"data": ["http://159.89.38.11/-9", 9, 0, 0.0, 20104.666666666668, 15938, 23973, 20847.0, 23973.0, 23973.0, 23973.0, 0.3221188260558339, 163.78326743691838, 0.5824772391732284], "isController": false}, {"data": ["http://159.89.38.11/-0", 27, 0, 0.0, 7570.88888888889, 515, 23470, 2643.0, 21366.8, 22901.999999999996, 23470.0, 0.9361023471899594, 165.65991423395624, 0.6711983843566897], "isController": false}, {"data": ["http://159.89.38.11/-1", 27, 0, 0.0, 857.9999999999999, 244, 2710, 516.0, 2073.6, 2549.199999999999, 2710.0, 0.9378256339006599, 7.769523109152484, 0.6915310763285863], "isController": false}, {"data": ["http://159.89.38.11/-2", 18, 0, 0.0, 1244.5555555555557, 307, 3014, 1194.0, 2384.000000000001, 3014.0, 3014.0, 1.0768126346015794, 9.812244817839195, 0.6994725300610193], "isController": false}, {"data": ["http://159.89.38.11/-3", 9, 0, 0.0, 2978.6666666666665, 725, 12745, 1397.0, 12745.0, 12745.0, 12745.0, 0.38878569268650914, 12.936236446498768, 0.3570196741759903], "isController": false}, {"data": ["http://159.89.38.11/-4", 9, 0, 0.0, 2662.777777777778, 724, 6551, 2055.0, 6551.0, 6551.0, 6551.0, 0.5736868944416114, 9.27311081718511, 0.5161688073686894], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 9, 0, 0.0, 341.0, 242, 530, 259.0, 530.0, 530.0, 530.0, 0.243000243000243, 0.029900420525420527, 0.238807855995356], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 9, 0, 0.0, 305.2222222222223, 259, 561, 280.0, 561.0, 561.0, 561.0, 0.24254837492588802, 1.84216754028998, 0.21317728264970623], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 9, 0, 0.0, 333.8888888888889, 252, 545, 280.0, 545.0, 545.0, 545.0, 0.2424895594773003, 0.2955341506129597, 0.215940952108312], "isController": false}]}, function(index, item){
        switch(index){
            // Errors pct
            case 3:
                item = item.toFixed(2) + '%';
                break;
            // Mean
            case 4:
            // Mean
            case 7:
            // Median
            case 8:
            // Percentile 1
            case 9:
            // Percentile 2
            case 10:
            // Percentile 3
            case 11:
            // Throughput
            case 12:
            // Kbytes/s
            case 13:
            // Sent Kbytes/s
                item = item.toFixed(2);
                break;
        }
        return item;
    }, [[0, 0]], 0, summaryTableHeader);

    // Create error table
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, 50.0, 0.22002200220022003], "isController": false}, {"data": ["Assertion failed", 2, 50.0, 0.22002200220022003], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 909, 4, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "Assertion failed", 2, "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 9, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 9, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template", 9, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 9, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
