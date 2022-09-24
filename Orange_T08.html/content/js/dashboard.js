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

    var data = {"OkPercent": 100.0, "KoPercent": 0.0};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6410714285714286, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.0625, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.4375, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.125, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.375, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.125, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.0, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.0, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.5625, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.5625, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.625, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.625, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.625, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.5625, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.5, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [0.625, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.6875, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.4375, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.625, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.4375, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.9375, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.1875, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [0.5625, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 808, 0, 0.0, 1838.402227722772, 10, 40693, 478.5, 3074.6000000000004, 5783.449999999998, 30638.12999999999, 6.3552989664773705, 214.14387687984708, 10.751082239377684], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 8, 0, 0.0, 272.74999999999994, 249, 330, 266.5, 330.0, 330.0, 330.0, 0.1522012099996195, 0.01872788326167193, 0.14930284711388456], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 8, 0, 0.0, 291.50000000000006, 227, 538, 265.0, 538.0, 538.0, 538.0, 0.15238966036154447, 0.018899889517496236, 0.15291052345848336], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 8, 0, 0.0, 264.75000000000006, 235, 309, 260.5, 309.0, 309.0, 309.0, 0.1528526118690053, 0.01880803622606901, 0.15441994822117772], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 8, 0, 0.0, 424.62500000000006, 250, 1447, 259.0, 1447.0, 1447.0, 1447.0, 0.15239256324291373, 0.018751428680280402, 0.15514574919993904], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 8, 0, 0.0, 265.37500000000006, 240, 296, 260.5, 296.0, 296.0, 296.0, 0.15250295474474818, 0.018913940676350605, 0.15451349174577758], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 8, 0, 0.0, 392.0, 252, 553, 390.5, 553.0, 553.0, 553.0, 0.15183146707155057, 0.01883066046688176, 0.1501263285253369], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 8, 0, 0.0, 569.8750000000001, 443, 990, 517.5, 990.0, 990.0, 990.0, 0.1519497046477616, 0.01869693631408004, 0.1493529079374727], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 8, 0, 0.0, 387.25, 248, 539, 385.0, 539.0, 539.0, 539.0, 0.15206812652068127, 0.018860011785279806, 0.1516968664461679], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 8, 0, 0.0, 433.0, 270, 572, 502.5, 572.0, 572.0, 572.0, 0.15272421824290788, 0.018792237791607803, 0.15071076419380705], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 8, 0, 0.0, 522.125, 259, 980, 505.0, 980.0, 980.0, 980.0, 0.15237514761342424, 0.01874928574149556, 0.14932466858405394], "isController": false}, {"data": ["http://159.89.38.11/-12", 8, 0, 0.0, 5054.875, 3124, 11355, 4027.5, 11355.0, 11355.0, 11355.0, 0.49794597286194453, 42.99355004357027, 0.4534517770446907], "isController": false}, {"data": ["http://159.89.38.11/-13", 8, 0, 0.0, 2498.25, 1389, 3518, 2652.0, 3518.0, 3518.0, 3518.0, 0.7073386383731212, 30.503978779840846, 0.6344634173297966], "isController": false}, {"data": ["http://159.89.38.11/-10", 8, 0, 0.0, 1327.75, 1172, 1623, 1277.5, 1623.0, 1623.0, 1623.0, 0.7818608287724785, 40.00775752541048, 1.3503133551602815], "isController": false}, {"data": ["http://159.89.38.11/-11", 8, 0, 0.0, 2275.0, 1042, 4834, 1854.5, 4834.0, 4834.0, 4834.0, 0.768787238131847, 31.79280583317317, 0.6925842062271765], "isController": false}, {"data": ["http://159.89.38.11/-18", 8, 0, 0.0, 5784.375000000001, 2511, 10748, 5200.5, 10748.0, 10748.0, 10748.0, 0.6211180124223603, 51.21312111801242, 0.5692570846273292], "isController": false}, {"data": ["http://159.89.38.11/-19", 8, 0, 0.0, 2067.6249999999995, 772, 6546, 1230.0, 6546.0, 6546.0, 6546.0, 0.8707009142359599, 17.282222736177623, 0.7792943241184153], "isController": false}, {"data": ["http://159.89.38.11/-16", 8, 0, 0.0, 1257.625, 562, 2661, 1103.5, 2661.0, 2661.0, 2661.0, 0.7688611244593945, 13.934857039884673, 0.7166776790004806], "isController": false}, {"data": ["http://159.89.38.11/-17", 8, 0, 0.0, 2421.125, 540, 4786, 2293.5, 4786.0, 4786.0, 4786.0, 0.8020050125313284, 19.087562656641605, 0.7413063909774437], "isController": false}, {"data": ["http://159.89.38.11/-14", 8, 0, 0.0, 8526.0, 5565, 12819, 8431.5, 12819.0, 12819.0, 12819.0, 0.48638132295719844, 71.82246701726653, 0.4386456560068093], "isController": false}, {"data": ["http://159.89.38.11/-15", 8, 0, 0.0, 5354.5, 3319, 10419, 4856.0, 10419.0, 10419.0, 10419.0, 0.404735404229485, 31.186760093089145, 0.3748940731559243], "isController": false}, {"data": ["Broadcast", 8, 0, 0.0, 3697.5, 1827, 5801, 3832.5, 5801.0, 5801.0, 5801.0, 0.14223233652170822, 1.8002148208317035, 2.9854206299114603], "isController": true}, {"data": ["Form Numbers", 8, 0, 0.0, 3150.5, 2367, 4298, 2835.5, 4298.0, 4298.0, 4298.0, 0.3765769158350593, 4.765362058110525, 7.952980841649407], "isController": true}, {"data": ["Teplate", 8, 0, 0.0, 2816.0, 2061, 4833, 2125.0, 4833.0, 4833.0, 4833.0, 0.20125786163522014, 2.546924135220126, 4.230689858490566], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 8, 0, 0.0, 548.0, 492, 680, 530.0, 680.0, 680.0, 680.0, 0.22267375511453782, 0.027399309711359145, 0.21968375107857602], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 8, 0, 0.0, 356.25, 247, 1016, 258.5, 1016.0, 1016.0, 1016.0, 0.15279714269343161, 0.018801210917355846, 0.14943978360104665], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 8, 0, 0.0, 640.0, 394, 1147, 567.5, 1147.0, 1147.0, 1147.0, 0.21955101816784675, 0.027229471979801304, 0.218961403617103], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 8, 0, 0.0, 355.37499999999994, 236, 941, 268.0, 941.0, 941.0, 941.0, 0.15288474401360674, 0.01866268847822348, 0.14997336461100388], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 8, 0, 0.0, 311.5, 258, 653, 263.5, 653.0, 653.0, 653.0, 0.15226204297596163, 0.01873536856930778, 0.15070076226185267], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 8, 0, 0.0, 587.75, 260, 1547, 543.0, 1547.0, 1547.0, 1547.0, 0.21676104803966725, 0.026671769583005937, 0.21236867328691036], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 8, 0, 0.0, 694.25, 280, 1606, 459.0, 1606.0, 1606.0, 1606.0, 0.2187047212881708, 0.02712451133163837, 0.22153464077749527], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 8, 0, 0.0, 1515.6249999999998, 257, 2947, 1569.5, 2947.0, 2947.0, 2947.0, 0.11485012059262663, 0.01424410675318709, 0.11406501234638795], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 8, 0, 0.0, 315.0, 267, 599, 277.0, 599.0, 599.0, 599.0, 0.22612923285657754, 0.027824495449149188, 0.23015936811012494], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 8, 0, 0.0, 305.75, 55, 1040, 230.0, 1040.0, 1040.0, 1040.0, 0.11587317680798366, 0.04468302801958257, 0.050694514853492856], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 8, 0, 0.0, 422.875, 265, 554, 458.5, 554.0, 554.0, 554.0, 0.22633395575171167, 0.027849685961636398, 0.22241068649917956], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 8, 0, 0.0, 454.625, 260, 554, 529.0, 554.0, 554.0, 554.0, 0.22431583669807087, 0.027820421152983398, 0.22174190009533423], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 8, 0, 0.0, 437.0, 256, 968, 290.5, 968.0, 968.0, 968.0, 0.22525059128280212, 0.027716381349251043, 0.2209061584919473], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 8, 0, 0.0, 574.875, 238, 1467, 339.0, 1467.0, 1467.0, 1467.0, 0.11574241525485032, 0.014128712799664347, 0.11709877168361811], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 8, 0, 0.0, 1303.25, 479, 2438, 1312.0, 2438.0, 2438.0, 2438.0, 0.1156737998843262, 0.014233299595141701, 0.11409232215153269], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 8, 0, 0.0, 276.37500000000006, 248, 318, 276.0, 318.0, 318.0, 318.0, 0.22463076318301792, 0.02764011343853541, 0.22687926447464482], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 8, 0, 0.0, 24.875, 10, 61, 15.5, 61.0, 61.0, 61.0, 0.11755543473469207, 0.10029235026376501, 0.057055713928849575], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 8, 0, 0.0, 400.125, 260, 997, 271.5, 997.0, 997.0, 997.0, 0.2249971875351558, 0.027904924625942178, 0.2257112899370008], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 8, 0, 0.0, 107.125, 54, 292, 70.0, 292.0, 292.0, 292.0, 0.11744326022490385, 0.04543184712557621, 0.05103735429695529], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 8, 0, 0.0, 558.75, 264, 2352, 306.0, 2352.0, 2352.0, 2352.0, 0.11702065414545668, 0.8887398703996254, 0.10285018430753028], "isController": false}, {"data": ["Dashboard", 8, 0, 0.0, 31317.5, 24423, 40693, 31517.0, 40693.0, 40693.0, 40693.0, 0.16605089459919467, 229.78699270154428, 3.4089486513553906], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 8, 0, 0.0, 596.875, 298, 1300, 460.5, 1300.0, 1300.0, 1300.0, 0.11697787655909576, 0.14256678705639797, 0.10332664975361536], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 8, 0, 0.0, 697.75, 241, 1613, 336.0, 1613.0, 1613.0, 1613.0, 0.11578429386053782, 0.014246895533620865, 0.11634964685790374], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 8, 0, 0.0, 541.0, 258, 1114, 406.0, 1114.0, 1114.0, 1114.0, 0.11567881776248247, 0.01423391702936796, 0.11364540104400134], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 8, 0, 0.0, 475.875, 265, 1160, 281.5, 1160.0, 1160.0, 1160.0, 0.21878845890879256, 0.026921236154792836, 0.21392768015862165], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 8, 0, 0.0, 314.125, 260, 595, 274.5, 595.0, 595.0, 595.0, 0.22451098700642663, 0.0276253753543064, 0.22215406014088063], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 8, 0, 0.0, 417.74999999999994, 256, 856, 282.0, 856.0, 856.0, 856.0, 0.22454249466711573, 0.027409972493544404, 0.22021171901313574], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 8, 0, 0.0, 807.625, 229, 2454, 543.0, 2454.0, 2454.0, 2454.0, 0.11238322680339959, 0.013938154105499754, 0.11095648661937206], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 8, 0, 0.0, 585.375, 232, 1700, 328.5, 1700.0, 1700.0, 1700.0, 0.11463945890175398, 0.014106027169551758, 0.11251235956666283], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 8, 0, 0.0, 691.75, 300, 1710, 577.0, 1710.0, 1710.0, 1710.0, 0.11569052783803327, 0.014348336948662327, 0.11523861171366594], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 8, 0, 0.0, 973.7500000000001, 258, 2574, 544.0, 2574.0, 2574.0, 2574.0, 0.11573236889692586, 0.014240506329113924, 0.1140370705244123], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 8, 0, 0.0, 1081.375, 293, 2982, 647.0, 2982.0, 2982.0, 2982.0, 0.11576753878212549, 0.014244833873581848, 0.11328034556610327], "isController": false}, {"data": ["http://159.89.38.11/message/template", 8, 0, 0.0, 2816.0, 2061, 4833, 2125.0, 4833.0, 4833.0, 4833.0, 0.14779781259237365, 1.870385648370529, 3.1068933246194206], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 8, 0, 0.0, 319.0, 233, 524, 260.0, 524.0, 524.0, 524.0, 0.1153951562883148, 0.014199013371413735, 0.11302865405974584], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 8, 0, 0.0, 556.2500000000001, 231, 1924, 261.0, 1924.0, 1924.0, 1924.0, 0.11575581311223973, 0.014356433852787544, 0.11598189868472457], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 8, 0, 0.0, 546.0, 252, 1516, 278.0, 1516.0, 1516.0, 1516.0, 0.11573571748911361, 0.014240918362918275, 0.11675292594360777], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 8, 0, 0.0, 406.875, 233, 1199, 261.0, 1199.0, 1199.0, 1199.0, 0.1153369280009227, 0.014191848562613536, 0.11725170121968802], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 8, 0, 0.0, 374.0, 249, 1172, 258.0, 1172.0, 1172.0, 1172.0, 0.11573906627508283, 0.014354356852476094, 0.11709538345799396], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 8, 0, 0.0, 3697.5, 1827, 5801, 3832.5, 5801.0, 5801.0, 5801.0, 0.11071898138537124, 1.401354685661892, 2.3239633070375754], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 8, 0, 0.0, 324.625, 242, 620, 269.5, 620.0, 620.0, 620.0, 0.11544844505375569, 0.014205570387473844, 0.11274262212280828], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 8, 0, 0.0, 270.25, 230, 351, 258.0, 351.0, 351.0, 351.0, 0.11545177723579583, 0.014093234525853982, 0.11308411383545235], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 8, 0, 0.0, 311.125, 249, 599, 256.5, 599.0, 599.0, 599.0, 0.11571395510298542, 0.01423824056931266, 0.11435793219162231], "isController": false}, {"data": ["http://159.89.38.11/", 8, 0, 0.0, 31317.5, 24423, 40693, 31517.0, 40693.0, 40693.0, 40693.0, 0.16630633627141195, 230.1404817556752, 3.414192751642275], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 8, 0, 0.0, 423.875, 257, 629, 403.5, 629.0, 629.0, 629.0, 0.22378248342610982, 0.027317197683851296, 0.22667810638059804], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 8, 0, 0.0, 359.875, 276, 602, 287.0, 602.0, 602.0, 602.0, 0.2238576265495145, 0.02754498139183479, 0.22107033676581692], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 8, 0, 0.0, 499.375, 270, 1120, 427.5, 1120.0, 1120.0, 1120.0, 0.22535211267605634, 0.02772887323943662, 0.2267275528169014], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 8, 0, 0.0, 358.375, 252, 569, 292.5, 569.0, 569.0, 569.0, 0.22346992932763485, 0.02749727646023632, 0.2198145374172463], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 8, 0, 0.0, 798.5, 286, 2009, 762.0, 2009.0, 2009.0, 2009.0, 0.22192632046160674, 1.6857406270805593, 0.19483570517088325], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 8, 0, 0.0, 505.125, 312, 1401, 326.0, 1401.0, 1401.0, 1401.0, 0.22190785276413968, 0.27023348866883024, 0.19839515547418934], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 8, 0, 0.0, 436.0, 267, 550, 520.5, 550.0, 550.0, 550.0, 0.22595040388634693, 0.02802314579449811, 0.2246816394113992], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 8, 0, 0.0, 280.5, 232, 382, 254.0, 382.0, 382.0, 382.0, 0.22382631078283252, 0.0861206703598008, 0.10885303004868223], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 8, 0, 0.0, 111.375, 45, 360, 57.5, 360.0, 360.0, 360.0, 0.2257718575379579, 0.19242420768188748, 0.10957872382457527], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 8, 0, 0.0, 138.5, 75, 490, 91.5, 490.0, 490.0, 490.0, 0.22396416573348266, 0.08641976658734603, 0.10826392777155655], "isController": false}, {"data": ["http://159.89.38.11/-21", 8, 0, 0.0, 1603.125, 249, 7611, 279.5, 7611.0, 7611.0, 7611.0, 1.0511102351859152, 4.398444685323874, 0.9417906648272237], "isController": false}, {"data": ["http://159.89.38.11/-22", 8, 0, 0.0, 1866.8749999999998, 266, 7857, 861.5, 7857.0, 7857.0, 7857.0, 1.0182003309151075, 7.161209749268168, 0.9083261741122566], "isController": false}, {"data": ["http://159.89.38.11/-20", 8, 0, 0.0, 3093.125, 1672, 4513, 3065.0, 4513.0, 4513.0, 4513.0, 0.8920606601248885, 43.287591993755576, 0.8062520907671722], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 8, 0, 0.0, 3150.5, 2367, 4298, 2835.5, 4298.0, 4298.0, 4298.0, 0.2054917674860651, 2.6003789155814134, 4.339809534818012], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 8, 0, 0.0, 320.625, 87, 1200, 167.0, 1200.0, 1200.0, 1200.0, 0.15385798907608278, 0.05949976921301638, 0.06686211439341487], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 8, 0, 0.0, 486.25, 275, 641, 526.0, 641.0, 641.0, 641.0, 0.1525989508822127, 0.018627801621363856, 0.15461075345731998], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 8, 0, 0.0, 404.5, 275, 549, 404.0, 549.0, 549.0, 549.0, 0.15272421824290788, 0.018792237791607803, 0.15085990893818488], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 8, 0, 0.0, 456.0, 257, 643, 507.5, 643.0, 643.0, 643.0, 0.15247970113978576, 0.018762150726184576, 0.15344758986772386], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 8, 0, 0.0, 475.75, 266, 620, 501.5, 620.0, 620.0, 620.0, 0.1524274064476793, 0.018904570916850848, 0.15160870455757944], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 8, 0, 0.0, 241.24999999999997, 80, 602, 165.5, 602.0, 602.0, 602.0, 0.15392903871315322, 0.05932055361540829, 0.06734395443700454], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 8, 0, 0.0, 57.625, 17, 208, 36.5, 208.0, 208.0, 208.0, 0.15427634750747277, 0.13139478473628388, 0.07487826631954489], "isController": false}, {"data": ["http://159.89.38.11/-5", 8, 0, 0.0, 738.875, 515, 1855, 573.5, 1855.0, 1855.0, 1855.0, 0.8600301010535368, 2.3936384648462696, 0.7982994248548699], "isController": false}, {"data": ["http://159.89.38.11/-6", 8, 0, 0.0, 549.125, 408, 1310, 429.0, 1310.0, 1310.0, 1310.0, 0.876328184905247, 104.3243458347026, 0.3525851681454705], "isController": false}, {"data": ["http://159.89.38.11/-7", 8, 0, 0.0, 281.875, 105, 923, 162.0, 923.0, 923.0, 923.0, 0.8982708286548394, 14.15741494498091, 0.36229087132270377], "isController": false}, {"data": ["http://159.89.38.11/-8", 8, 0, 0.0, 377.0, 278, 871, 290.5, 871.0, 871.0, 871.0, 0.8970621215519176, 20.91122764352994, 0.3644314868804665], "isController": false}, {"data": ["http://159.89.38.11/-9", 8, 0, 0.0, 29992.5, 22982, 39330, 30259.0, 39330.0, 39330.0, 39330.0, 0.17118158086189925, 87.03831124021055, 0.3102666153121924], "isController": false}, {"data": ["http://159.89.38.11/-0", 24, 0, 0.0, 10299.958333333334, 539, 38115, 879.5, 30044.0, 36109.0, 38115.0, 0.5118471283243404, 90.58040498571093, 0.36772350657936825], "isController": false}, {"data": ["http://159.89.38.11/-1", 24, 0, 0.0, 422.3333333333334, 268, 1214, 336.5, 643.0, 1088.0, 1214.0, 0.5053801933079239, 4.187236123102192, 0.37298933700435893], "isController": false}, {"data": ["http://159.89.38.11/-2", 16, 0, 0.0, 451.93749999999994, 277, 1938, 312.0, 998.6000000000009, 1938.0, 1938.0, 1.4788797485904426, 13.476002865329512, 0.9622105786117016], "isController": false}, {"data": ["http://159.89.38.11/-3", 8, 0, 0.0, 2612.4999999999995, 1106, 10054, 1605.5, 10054.0, 10054.0, 10054.0, 0.71396697902722, 23.756135653726016, 0.6571424587237841], "isController": false}, {"data": ["http://159.89.38.11/-4", 8, 0, 0.0, 1567.0, 771, 3434, 1262.5, 3434.0, 3434.0, 3434.0, 0.7992806474173244, 12.919622339894095, 0.7208356229393545], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 8, 0, 0.0, 401.875, 253, 725, 296.0, 725.0, 725.0, 725.0, 0.1535891873212126, 0.018898669533664827, 0.15111436154894695], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 8, 0, 0.0, 650.25, 263, 1815, 308.5, 1815.0, 1815.0, 1815.0, 0.15250586194406845, 1.1584637179022819, 0.1338149579655718], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 8, 0, 0.0, 667.625, 313, 1731, 554.0, 1731.0, 1731.0, 1731.0, 0.15700435687090317, 0.1911190730855281, 0.13971701191270558], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": []}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 808, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
