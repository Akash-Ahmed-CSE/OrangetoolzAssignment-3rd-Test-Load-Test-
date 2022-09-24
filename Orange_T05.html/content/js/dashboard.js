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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.7180952380952381, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.2, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.6, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.2, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.5, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.4, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.4, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.0, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.1, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.7, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [0.6, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.6, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.2, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.4, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.3, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.5, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.3333333333333333, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.65, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.2, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.3, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 505, 0, 0.0, 1023.4930693069304, 10, 22140, 325.0, 2043.2000000000003, 3426.0999999999995, 13995.939999999999, 5.882010366315299, 198.19523333309067, 9.93496938879506], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 5, 0, 0.0, 315.2, 245, 489, 284.0, 489.0, 489.0, 489.0, 0.13628434365460096, 0.016769362598124726, 0.13351606792411688], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 5, 0, 0.0, 319.0, 227, 538, 277.0, 538.0, 538.0, 538.0, 0.1365485976459022, 0.016935226465849197, 0.13684196377365707], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 5, 0, 0.0, 316.0, 238, 519, 262.0, 519.0, 519.0, 519.0, 0.13669792492549962, 0.01682025248106734, 0.13792607034475218], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 5, 0, 0.0, 318.0, 229, 534, 256.0, 534.0, 534.0, 534.0, 0.1366456232406876, 0.016813816922193983, 0.13894084269355853], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 5, 0, 0.0, 319.6, 236, 534, 272.0, 534.0, 534.0, 534.0, 0.13657843699636701, 0.016938927244666613, 0.13820564103089403], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 5, 0, 0.0, 418.4, 263, 542, 457.0, 542.0, 542.0, 542.0, 0.135339974014725, 0.01678532880846687, 0.1336482243395409], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 5, 0, 0.0, 418.2, 252, 563, 470.0, 563.0, 563.0, 563.0, 0.1353876147410035, 0.016659022907584416, 0.13290198275161788], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 5, 0, 0.0, 359.0, 244, 524, 294.0, 524.0, 524.0, 524.0, 0.1365747063643813, 0.0169384645588637, 0.13606788616498225], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 5, 0, 0.0, 416.4, 246, 530, 488.0, 530.0, 530.0, 530.0, 0.1364815067558346, 0.016793622901596833, 0.13450892247850418], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 5, 0, 0.0, 452.6, 313, 509, 491.0, 509.0, 509.0, 509.0, 0.1364330932110893, 0.01678766576620825, 0.13352856056265006], "isController": false}, {"data": ["http://159.89.38.11/-12", 5, 0, 0.0, 2056.0, 503, 3843, 1906.0, 3843.0, 3843.0, 3843.0, 0.40270618556701027, 34.77037567453286, 0.3658176697406572], "isController": false}, {"data": ["http://159.89.38.11/-13", 5, 0, 0.0, 2457.6, 1856, 3442, 2444.0, 3442.0, 3442.0, 3442.0, 0.40716612377850164, 17.559039087947884, 0.3643023462947883], "isController": false}, {"data": ["http://159.89.38.11/-10", 5, 0, 0.0, 1774.6, 868, 2716, 1682.0, 2716.0, 2716.0, 2716.0, 0.3916960438699569, 20.043055963572268, 0.6755991725421073], "isController": false}, {"data": ["http://159.89.38.11/-11", 5, 0, 0.0, 929.0, 479, 1140, 1094.0, 1140.0, 1140.0, 1140.0, 0.45085662759242556, 18.644946883453564, 0.40515455928764654], "isController": false}, {"data": ["http://159.89.38.11/-18", 5, 0, 0.0, 2301.6, 544, 5141, 1810.0, 5141.0, 5141.0, 5141.0, 0.3926804366606456, 32.37772912903479, 0.3590111570329066], "isController": false}, {"data": ["http://159.89.38.11/-19", 5, 0, 0.0, 1414.4, 277, 2945, 564.0, 2945.0, 2945.0, 2945.0, 0.41511000415110005, 8.239366049190535, 0.37059918534661684], "isController": false}, {"data": ["http://159.89.38.11/-16", 5, 0, 0.0, 1173.0, 331, 2255, 693.0, 2255.0, 2255.0, 2255.0, 0.4042037186742118, 7.325797670776072, 0.3758620907437349], "isController": false}, {"data": ["http://159.89.38.11/-17", 5, 0, 0.0, 1309.6, 291, 2577, 569.0, 2577.0, 2577.0, 2577.0, 0.41339396444811904, 9.838695612856553, 0.38117830198429103], "isController": false}, {"data": ["http://159.89.38.11/-14", 5, 0, 0.0, 3995.4, 2172, 5754, 3989.0, 5754.0, 5754.0, 5754.0, 0.3198362438431523, 47.22925612086612, 0.28772768342608585], "isController": false}, {"data": ["http://159.89.38.11/-15", 5, 0, 0.0, 2286.2, 1510, 4192, 1923.0, 4192.0, 4192.0, 4192.0, 0.40167095115681234, 30.95062961921594, 0.37115337303181234], "isController": false}, {"data": ["Broadcast", 5, 0, 0.0, 2117.6, 1506, 3537, 1809.0, 3537.0, 3537.0, 3537.0, 0.12900895322135356, 1.6318624700054185, 2.7005958197873934], "isController": true}, {"data": ["Form Numbers", 5, 0, 0.0, 2785.6, 1495, 5423, 1835.0, 5423.0, 5423.0, 5423.0, 0.235393813850572, 2.97865125229509, 4.969613968857399], "isController": true}, {"data": ["Teplate", 5, 0, 0.0, 2066.0, 1645, 2676, 2051.0, 2676.0, 2676.0, 2676.0, 0.14004033161550525, 1.7717837112088282, 2.940737557416536], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 5, 0, 0.0, 460.2, 257, 541, 503.0, 541.0, 541.0, 541.0, 0.14392216689214474, 0.017709172879306873, 0.1419544810166662], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 5, 0, 0.0, 254.4, 230, 280, 257.0, 280.0, 280.0, 280.0, 0.1364144817613838, 0.016785375685482773, 0.13324391079857037], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 5, 0, 0.0, 339.6, 229, 520, 256.0, 520.0, 520.0, 520.0, 0.14531926642834309, 0.018022994957421455, 0.1448935263899788], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 5, 0, 0.0, 313.2, 245, 521, 263.0, 521.0, 521.0, 521.0, 0.13615445361217765, 0.01662041670070528, 0.1333888162731803], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 5, 0, 0.0, 381.8, 244, 546, 313.0, 546.0, 546.0, 546.0, 0.136035913481159, 0.016738794041626988, 0.13446831213440347], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 5, 0, 0.0, 476.0, 247, 676, 484.0, 676.0, 676.0, 676.0, 0.1437607820586544, 0.01768931497987349, 0.14081256289534214], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 5, 0, 0.0, 240.2, 218, 247, 246.0, 247.0, 247.0, 247.0, 0.145632481868756, 0.018061841013019546, 0.14748133173623046], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 5, 0, 0.0, 386.8, 228, 514, 461.0, 514.0, 514.0, 514.0, 0.09101996978137003, 0.011288609533431635, 0.09013110288897384], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 5, 0, 0.0, 251.6, 233, 277, 252.0, 277.0, 277.0, 277.0, 0.14551804423748543, 0.017905540599534343, 0.1480759786088475], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 5, 0, 0.0, 104.8, 54, 196, 55.0, 196.0, 196.0, 196.0, 0.09167415338919345, 0.03527306292513889, 0.04010744210777214], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 5, 0, 0.0, 387.2, 230, 488, 467.0, 488.0, 488.0, 488.0, 0.1452770433216143, 0.01787588618996426, 0.14272334529447656], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 5, 0, 0.0, 394.2, 236, 544, 463.0, 544.0, 544.0, 544.0, 0.14531504301325274, 0.01802247115496396, 0.14361213235294118], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 5, 0, 0.0, 260.6, 247, 293, 254.0, 293.0, 293.0, 293.0, 0.14534883720930233, 0.017884720203488372, 0.14250999273255816], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 5, 0, 0.0, 389.8, 237, 503, 472.0, 503.0, 503.0, 503.0, 0.09123588124737697, 0.011137192535080196, 0.09203775910990275], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 5, 0, 0.0, 328.0, 242, 462, 251.0, 462.0, 462.0, 462.0, 0.0912891858830403, 0.011232849044202223, 0.08977364275802888], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 5, 0, 0.0, 304.0, 229, 493, 256.0, 493.0, 493.0, 493.0, 0.1443876519680037, 0.017766449363250458, 0.14579768763175374], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 5, 0, 0.0, 18.0, 12, 28, 15.0, 28.0, 28.0, 28.0, 0.09198108868816571, 0.07843543617432255, 0.0446431651152523], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 5, 0, 0.0, 243.2, 218, 279, 237.0, 279.0, 279.0, 279.0, 0.14547570555717196, 0.01804239707593832, 0.1459019039132965], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 5, 0, 0.0, 128.8, 55, 177, 169.0, 177.0, 177.0, 177.0, 0.09174311926605505, 0.03538919151376147, 0.03986883600917431], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 5, 0, 0.0, 535.0, 252, 1602, 276.0, 1602.0, 1602.0, 1602.0, 0.09155664609694018, 0.6950794597242315, 0.08025512259434912], "isController": false}, {"data": ["Dashboard", 5, 0, 0.0, 14450.8, 8123, 22140, 13386.0, 22140.0, 22140.0, 22140.0, 0.19128505298595966, 264.70735479073414, 3.918616279792647], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 5, 0, 0.0, 439.4, 277, 710, 310.0, 710.0, 710.0, 710.0, 0.0937752020855605, 0.11406874191188882, 0.08271265871452953], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 5, 0, 0.0, 302.0, 231, 499, 259.0, 499.0, 499.0, 499.0, 0.09157676880528946, 0.011268235224088353, 0.09175562968186231], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 5, 0, 0.0, 333.0, 232, 473, 250.0, 473.0, 473.0, 473.0, 0.09123421648054886, 0.011226085231005037, 0.08936320227538136], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 5, 0, 0.0, 257.2, 234, 289, 252.0, 289.0, 289.0, 289.0, 0.1457173665957509, 0.01793006659283653, 0.14244441793197912], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 5, 0, 0.0, 249.4, 230, 266, 249.0, 266.0, 266.0, 266.0, 0.1455646452589595, 0.017911274709598534, 0.14400096254621678], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 5, 0, 0.0, 263.0, 234, 292, 266.0, 292.0, 292.0, 292.0, 0.1460877695319348, 0.017832979679191258, 0.1432344927832642], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 5, 0, 0.0, 468.0, 251, 673, 473.0, 673.0, 673.0, 673.0, 0.09123754607496078, 0.011315594093281266, 0.0898119594175395], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 5, 0, 0.0, 350.4, 239, 510, 254.0, 510.0, 510.0, 510.0, 0.0908958696916812, 0.011184452715968586, 0.088943028741274], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 5, 0, 0.0, 395.4, 233, 511, 465.0, 511.0, 511.0, 511.0, 0.09086778736937755, 0.011269735347569287, 0.0902466208541572], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 5, 0, 0.0, 452.6, 230, 586, 483.0, 586.0, 586.0, 586.0, 0.09120093389756312, 0.011221989913176711, 0.08959779248139502], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 5, 0, 0.0, 484.2, 456, 509, 497.0, 509.0, 509.0, 509.0, 0.09093554488578495, 0.01118933462461807, 0.08871543880947184], "isController": false}, {"data": ["http://159.89.38.11/message/template", 5, 0, 0.0, 2066.0, 1645, 2676, 2051.0, 2676.0, 2676.0, 2676.0, 0.12797215325945074, 1.619097684343887, 2.687315240203732], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 5, 0, 0.0, 267.4, 234, 350, 247.0, 350.0, 350.0, 350.0, 0.09146285693379919, 0.011254218724276071, 0.08931919622441327], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 5, 0, 0.0, 261.0, 227, 340, 247.0, 340.0, 340.0, 340.0, 0.09097525473071325, 0.011283063819141194, 0.09088641170851529], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 5, 0, 0.0, 261.2, 227, 331, 254.0, 331.0, 331.0, 331.0, 0.09127252149467881, 0.011230798543290557, 0.0918073214253117], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 5, 0, 0.0, 263.0, 232, 330, 253.0, 330.0, 330.0, 330.0, 0.0912558631892099, 0.011228748790859814, 0.09250350194374989], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 5, 0, 0.0, 321.8, 226, 672, 235.0, 672.0, 672.0, 672.0, 0.09135256609358157, 0.011329859271371933, 0.09215546950651345], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 5, 0, 0.0, 2117.6, 1506, 3537, 1809.0, 3537.0, 3537.0, 3537.0, 0.08905353898763936, 1.126457695116304, 1.8641932138976953], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 5, 0, 0.0, 264.0, 231, 335, 244.0, 335.0, 335.0, 335.0, 0.09145449224465906, 0.011253189475417032, 0.08904309449992684], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 5, 0, 0.0, 254.8, 228, 330, 235.0, 330.0, 330.0, 330.0, 0.09143442323165825, 0.011161428617145783, 0.08929142893716627], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 5, 0, 0.0, 272.6, 250, 335, 256.0, 335.0, 335.0, 335.0, 0.09141937725120217, 0.011248868685206517, 0.09008022621724901], "isController": false}, {"data": ["http://159.89.38.11/", 5, 0, 0.0, 14450.8, 8123, 22140, 13386.0, 22140.0, 22140.0, 22140.0, 0.19193121185367165, 265.6015334104257, 3.9318533237687614], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 5, 0, 0.0, 408.2, 238, 580, 481.0, 580.0, 580.0, 580.0, 0.1448897389086905, 0.017686735706627255, 0.14672915942217973], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 5, 0, 0.0, 356.2, 225, 598, 249.0, 598.0, 598.0, 598.0, 0.14493173715180152, 0.017833397344850573, 0.14309178345749152], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 5, 0, 0.0, 300.6, 238, 473, 255.0, 473.0, 473.0, 473.0, 0.14481000926784057, 0.017818419109128823, 0.14565850541589434], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 5, 0, 0.0, 397.8, 240, 563, 457.0, 563.0, 563.0, 563.0, 0.1448771441817339, 0.017826679850486787, 0.14247195721777933], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 5, 0, 0.0, 1094.6, 263, 3073, 277.0, 3073.0, 3073.0, 3073.0, 0.13385447341650156, 1.0167188420249504, 0.11743638566150881], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 5, 0, 0.0, 509.4, 277, 933, 360.0, 933.0, 933.0, 933.0, 0.13154433043935806, 0.16011411470665615, 0.1173108228097869], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 5, 0, 0.0, 493.0, 439, 552, 493.0, 552.0, 552.0, 552.0, 0.1442210620439009, 0.017886791874585365, 0.14337601675848743], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 5, 0, 0.0, 145.8, 55, 224, 166.0, 224.0, 224.0, 224.0, 0.14534883720930233, 0.05592523619186047, 0.07068722747093023], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 5, 0, 0.0, 21.2, 10, 53, 13.0, 53.0, 53.0, 53.0, 0.14582786478840376, 0.124352433137924, 0.0707777820310905], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 5, 0, 0.0, 70.4, 53, 96, 58.0, 96.0, 96.0, 96.0, 0.1456621802715143, 0.05618804805395327, 0.07041287034609334], "isController": false}, {"data": ["http://159.89.38.11/-21", 5, 0, 0.0, 377.4, 320, 579, 328.0, 579.0, 579.0, 579.0, 0.5526693931690063, 2.312683935282414, 0.49394827014479936], "isController": false}, {"data": ["http://159.89.38.11/-22", 5, 0, 0.0, 715.4, 291, 1669, 592.0, 1669.0, 1669.0, 1669.0, 0.5408328826392645, 3.8037875202812335, 0.48125676041103305], "isController": false}, {"data": ["http://159.89.38.11/-20", 5, 0, 0.0, 2521.8, 1141, 3848, 2493.0, 3848.0, 3848.0, 3848.0, 0.4139758238118894, 20.08833855977811, 0.37322507865540655], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 5, 0, 0.0, 2785.6, 1495, 5423, 1835.0, 5423.0, 5423.0, 5423.0, 0.12663036596175764, 1.6023687792832721, 2.673409403887552], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 5, 0, 0.0, 76.2, 56, 111, 71.0, 111.0, 111.0, 111.0, 0.13799194127062978, 0.05322931328310426, 0.05996720104045923], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 5, 0, 0.0, 413.4, 238, 705, 316.0, 705.0, 705.0, 705.0, 0.13615445361217765, 0.01662041670070528, 0.13777660628216648], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 5, 0, 0.0, 347.0, 230, 705, 262.0, 705.0, 705.0, 705.0, 0.137324910738808, 0.01689740112606427, 0.13547424299642957], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 5, 0, 0.0, 316.0, 244, 509, 262.0, 509.0, 509.0, 509.0, 0.13629177342855583, 0.016770276808591833, 0.13698388009049775], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 5, 0, 0.0, 405.0, 248, 513, 467.0, 513.0, 513.0, 513.0, 0.13647778141718528, 0.01692644359373294, 0.13557148364996177], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 5, 0, 0.0, 193.8, 138, 239, 203.0, 239.0, 239.0, 239.0, 0.13777900248002206, 0.05301262400110223, 0.060278313585009645], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 5, 0, 0.0, 25.0, 10, 68, 16.0, 68.0, 68.0, 68.0, 0.13814444383046914, 0.11747673992927003, 0.06704862166381167], "isController": false}, {"data": ["http://159.89.38.11/-5", 5, 0, 0.0, 1086.8, 490, 1924, 552.0, 1924.0, 1924.0, 1924.0, 0.4456725198324271, 1.2403971499242357, 0.412682307915144], "isController": false}, {"data": ["http://159.89.38.11/-6", 5, 0, 0.0, 1491.0, 782, 2040, 1396.0, 2040.0, 2040.0, 2040.0, 0.4676830979328407, 55.677398775839485, 0.18816937143391638], "isController": false}, {"data": ["http://159.89.38.11/-7", 5, 0, 0.0, 202.2, 52, 621, 102.0, 621.0, 621.0, 621.0, 0.5042355788624445, 7.9472254437273095, 0.20336845124041952], "isController": false}, {"data": ["http://159.89.38.11/-8", 5, 0, 0.0, 1061.8, 330, 1766, 1101.0, 1766.0, 1766.0, 1766.0, 0.46420945130442853, 10.822608160802153, 0.1885850895924241], "isController": false}, {"data": ["http://159.89.38.11/-9", 5, 0, 0.0, 12376.0, 4927, 20276, 12226.0, 20276.0, 20276.0, 20276.0, 0.20348363991535082, 103.46248874481117, 0.36790001068289113], "isController": false}, {"data": ["http://159.89.38.11/-0", 15, 0, 0.0, 4471.333333333333, 476, 19801, 1205.0, 16007.200000000003, 19801.0, 19801.0, 0.5865561334219684, 103.80126561705706, 0.4205179779454894], "isController": false}, {"data": ["http://159.89.38.11/-1", 15, 0, 0.0, 530.1999999999999, 258, 1166, 396.0, 1002.2, 1166.0, 1166.0, 0.5888587916617595, 4.878442063655635, 0.43393832440230834], "isController": false}, {"data": ["http://159.89.38.11/-2", 10, 0, 0.0, 716.9, 242, 1688, 567.5, 1670.0, 1688.0, 1688.0, 0.7519927808693037, 6.852387342081516, 0.48842812359001353], "isController": false}, {"data": ["http://159.89.38.11/-3", 5, 0, 0.0, 1565.0, 781, 1958, 1899.0, 1958.0, 1958.0, 1958.0, 0.4725897920604915, 15.72468690926276, 0.4339149633742911], "isController": false}, {"data": ["http://159.89.38.11/-4", 5, 0, 0.0, 1638.6, 712, 2604, 1496.0, 2604.0, 2604.0, 2604.0, 0.42498937526561836, 6.869554823629409, 0.3823244262643434], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 5, 0, 0.0, 401.0, 239, 705, 322.0, 705.0, 705.0, 705.0, 0.13641076008075517, 0.01678491774431167, 0.13403955741528892], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 5, 0, 0.0, 472.6, 263, 1290, 268.0, 1290.0, 1290.0, 1290.0, 0.13345433192761438, 1.0135752248705492, 0.11724171582234559], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 5, 0, 0.0, 323.6, 266, 493, 278.0, 493.0, 493.0, 493.0, 0.13340804183676191, 0.1625389384722111, 0.11868625597000987], "isController": false}]}, function(index, item){
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
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 505, 0, "", "", "", "", "", "", "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
