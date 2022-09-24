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

    var data = {"OkPercent": 99.4059405940594, "KoPercent": 0.594059405940594};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6614285714285715, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.05, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.25, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.25, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.0, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.0, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.8, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.85, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.7, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [0.7, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.85, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.7, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.55, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.25, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.25, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.7, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.45, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.18333333333333332, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.5166666666666667, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.4, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.15, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [0.95, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1010, 6, 0.594059405940594, 1967.2534653465314, 3, 32018, 469.0, 4708.199999999999, 9140.89999999999, 29262.69, 9.148219267417847, 308.06535506809087, 15.430163380063222], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 10, 0, 0.0, 320.9, 228, 538, 263.0, 530.9, 538.0, 538.0, 0.33203838363714844, 0.04085628548660225, 0.32587751519075603], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 10, 0, 0.0, 298.8, 219, 513, 252.5, 510.9, 513.0, 513.0, 0.33593120128997583, 0.04166334234748723, 0.33724343254501477], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 10, 0, 0.0, 293.5, 229, 502, 254.5, 496.8, 502.0, 502.0, 0.33593120128997583, 0.04133528453372749, 0.33953983724133296], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 10, 0, 0.0, 260.1, 222, 442, 235.5, 424.6, 442.0, 442.0, 0.33416875522138684, 0.041118421052631575, 0.34036915204678364], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 10, 0, 0.0, 328.59999999999997, 230, 537, 270.5, 532.7, 537.0, 537.0, 0.3332000533120085, 0.04132461598693856, 0.33775552279088367], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 10, 0, 0.0, 459.90000000000003, 244, 506, 486.0, 505.2, 506.0, 506.0, 0.33539039441910384, 0.04159626962033808, 0.3317875679165549], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 10, 0, 0.0, 414.0, 241, 518, 471.5, 517.5, 518.0, 518.0, 0.33259054777663216, 0.04092422755845279, 0.3270690250108092], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 10, 0, 0.0, 498.1, 458, 540, 492.5, 538.3, 540.0, 540.0, 0.33254630707325994, 0.041243536131156264, 0.33189680256725745], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 10, 0, 0.0, 467.5, 244, 575, 478.5, 570.1, 575.0, 575.0, 0.3349859305909152, 0.04121897192817901, 0.3307331795189602], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 10, 0, 0.0, 472.4, 238, 552, 485.0, 550.6, 552.0, 552.0, 0.33072064027515957, 0.04069414128385753, 0.3242612527697854], "isController": false}, {"data": ["http://159.89.38.11/-12", 10, 0, 0.0, 6895.0999999999985, 2893, 13524, 5993.5, 13454.7, 13524.0, 13524.0, 0.42587624036455, 36.77091983944465, 0.38711484817512026], "isController": false}, {"data": ["http://159.89.38.11/-13", 10, 0, 0.0, 3839.5, 943, 9057, 2990.0, 8707.400000000001, 9057.0, 9057.0, 0.44897409419476497, 19.36200781214924, 0.4019721187087505], "isController": false}, {"data": ["http://159.89.38.11/-10", 10, 1, 10.0, 5578.0, 1523, 15978, 3895.0, 15321.600000000002, 15978.0, 15978.0, 0.3065885887727259, 15.365866773844928, 0.5166197362571665], "isController": false}, {"data": ["http://159.89.38.11/-11", 10, 0, 0.0, 2855.8, 1148, 7478, 2522.5, 7049.700000000002, 7478.0, 7478.0, 0.5029169181251257, 20.79787376156709, 0.4522323224703279], "isController": false}, {"data": ["http://159.89.38.11/-18", 10, 0, 0.0, 5808.4, 2315, 8788, 5358.5, 8731.9, 8788.0, 8788.0, 0.3973931012557622, 32.766303051979015, 0.3635525949769512], "isController": false}, {"data": ["http://159.89.38.11/-19", 10, 0, 0.0, 3805.8, 656, 12268, 1599.5, 11992.5, 12268.0, 12268.0, 0.3950383187169155, 7.840970535079403, 0.35291118550999445], "isController": false}, {"data": ["http://159.89.38.11/-16", 10, 0, 0.0, 3635.3999999999996, 642, 11540, 2897.0, 10980.300000000003, 11540.0, 11540.0, 0.38895371450797356, 7.049406237845196, 0.361909276546091], "isController": false}, {"data": ["http://159.89.38.11/-17", 10, 0, 0.0, 4545.4, 1168, 21086, 1932.0, 19554.500000000007, 21086.0, 21086.0, 0.4149033275246867, 9.874618159281388, 0.38281314828644925], "isController": false}, {"data": ["http://159.89.38.11/-14", 10, 0, 0.0, 10917.0, 4436, 17048, 9599.5, 16875.3, 17048.0, 17048.0, 0.3475359699728922, 51.319591362862305, 0.3128502510947383], "isController": false}, {"data": ["http://159.89.38.11/-15", 10, 0, 0.0, 5309.2, 1566, 8341, 5031.0, 8320.7, 8341.0, 8341.0, 0.39599255533995964, 30.513082604047042, 0.36613842909753297], "isController": false}, {"data": ["Broadcast", 10, 1, 10.0, 2285.0, 1655, 5431, 1905.0, 5141.6, 5431.0, 5431.0, 0.3141394150724091, 4.141701172918041, 6.5368915021361484], "isController": true}, {"data": ["Form Numbers", 10, 0, 0.0, 1930.0, 1708, 2170, 1955.0, 2164.9, 2170.0, 2170.0, 1.8477457501847745, 23.390584580561715, 39.044455607908354], "isController": true}, {"data": ["Teplate", 10, 0, 0.0, 1983.3, 1584, 2687, 1918.0, 2648.0, 2687.0, 2687.0, 0.7518231711901361, 9.516069632922337, 15.812074750018795], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 10, 0, 0.0, 485.1, 449, 531, 485.0, 529.6, 531.0, 531.0, 0.9038322487346349, 0.11121373373101952, 0.8923578158893709], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 10, 0, 0.0, 249.7, 233, 274, 248.5, 272.3, 274.0, 274.0, 0.33581838941500436, 0.04132140338504937, 0.3286035412049164], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 10, 0, 0.0, 459.00000000000006, 237, 512, 485.0, 511.3, 512.0, 512.0, 0.8954956568460642, 0.11106244962836931, 0.8937466418912868], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 10, 0, 0.0, 272.0, 225, 480, 248.0, 459.4000000000001, 480.0, 480.0, 0.3354804079441761, 0.04095219823537306, 0.32925567381239934], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 10, 0, 0.0, 275.8, 225, 461, 264.5, 443.50000000000006, 461.0, 461.0, 0.335536690937154, 0.04128674126765762, 0.3322599654397208], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 10, 0, 0.0, 505.6, 443, 647, 494.0, 635.7, 647.0, 647.0, 0.889284126278346, 0.10942363272565585, 0.871915295686972], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 10, 0, 0.0, 274.2, 224, 532, 247.5, 505.6000000000001, 532.0, 532.0, 0.9220839096357768, 0.11436001613646841, 0.9346905255878284], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 10, 0, 0.0, 462.5, 239, 574, 501.5, 570.7, 574.0, 574.0, 0.20075483819160042, 0.02489830512727857, 0.19953933038223723], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 10, 0, 0.0, 303.3, 230, 538, 248.5, 535.1, 538.0, 538.0, 0.9234463015975621, 0.11362718164188752, 0.9405805591467356], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 10, 0, 0.0, 178.70000000000002, 54, 246, 195.0, 245.8, 246.0, 246.0, 0.20191006925515376, 0.07790494957296021, 0.08833565529912976], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 10, 0, 0.0, 470.40000000000003, 237, 537, 494.0, 536.7, 537.0, 537.0, 0.8925383791503035, 0.10982405837201, 0.877720847465191], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 10, 0, 0.0, 441.6, 238, 543, 476.0, 542.2, 543.0, 543.0, 0.8890469416785206, 0.11026265780583215, 0.8794966327347085], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 10, 0, 0.0, 262.7, 224, 462, 241.0, 441.70000000000005, 462.0, 462.0, 0.9208103130755064, 0.11330283149171272, 0.9037249654696133], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 10, 0, 0.0, 404.2, 243, 535, 488.5, 533.8, 535.0, 535.0, 0.2009081046329409, 0.02452491511632579, 0.20341945594085264], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 10, 0, 0.0, 356.69999999999993, 236, 536, 256.5, 535.5, 536.0, 536.0, 0.2009081046329409, 0.0247211144372564, 0.19831827359665688], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 10, 0, 0.0, 306.5, 227, 477, 255.0, 476.2, 477.0, 477.0, 0.9152480322167307, 0.11261841021416803, 0.9250797981878088], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 10, 0, 0.0, 20.3, 13, 49, 16.5, 47.00000000000001, 49.0, 49.0, 0.2028479857195018, 0.17293583157531744, 0.09845258681893788], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 10, 0, 0.0, 337.2, 228, 581, 259.5, 576.6, 581.0, 581.0, 0.8999280057595392, 0.11161216477681786, 0.9034433495320374], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 10, 0, 0.0, 122.19999999999999, 57, 265, 81.5, 263.2, 265.0, 265.0, 0.2026917463920869, 0.07838469880006486, 0.08808381557077996], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 10, 0, 0.0, 327.0, 251, 838, 274.5, 782.6000000000001, 838.0, 838.0, 0.20187746038154838, 1.5333618274957102, 0.17758907842939337], "isController": false}, {"data": ["Dashboard", 10, 1, 10.0, 29378.7, 24383, 32018, 29932.0, 32013.7, 32018.0, 32018.0, 0.2819681376004512, 389.9039435887494, 5.768809257366417], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 10, 0, 0.0, 540.8000000000001, 280, 2535, 300.5, 2331.7000000000007, 2535.0, 2535.0, 0.20172678124747842, 0.2460121136932139, 0.1782839228798515], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 10, 0, 0.0, 328.29999999999995, 231, 536, 257.0, 533.5, 536.0, 536.0, 0.20195492366103887, 0.02484992224735439, 0.2030988089708377], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 10, 0, 0.0, 330.1, 226, 523, 267.0, 520.6, 523.0, 523.0, 0.2009081046329409, 0.0247211144372564, 0.19753347631293447], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 10, 0, 0.0, 269.90000000000003, 222, 495, 247.0, 472.6000000000001, 495.0, 495.0, 0.9286775631500742, 0.11427087202823179, 0.9087255061292718], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 10, 0, 0.0, 304.59999999999997, 228, 617, 242.5, 604.5, 617.0, 617.0, 0.9154155986818016, 0.11263902874404981, 0.9064759932259246], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 10, 0, 0.0, 343.0, 234, 654, 264.0, 642.8000000000001, 654.0, 654.0, 0.8819119851838787, 0.10765527162889144, 0.8655483838962871], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 10, 0, 0.0, 464.5, 248, 805, 495.5, 778.6000000000001, 805.0, 805.0, 0.20098886521686699, 0.02492732996342003, 0.19859427131486918], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 10, 0, 0.0, 539.6, 236, 1543, 496.5, 1443.0000000000005, 1543.0, 1543.0, 0.20103735274013912, 0.024737018012946806, 0.19746422791604681], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 10, 0, 0.0, 438.3, 236, 681, 517.0, 667.5, 681.0, 681.0, 0.2009767469903732, 0.024925827019313868, 0.2003486946560283], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 10, 0, 0.0, 436.00000000000006, 260, 543, 485.0, 542.7, 543.0, 543.0, 0.20065010634455638, 0.024689368554115333, 0.19786765369798145], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 10, 0, 0.0, 382.70000000000005, 236, 549, 374.0, 547.7, 549.0, 549.0, 0.20166575917075039, 0.024814341460463428, 0.19749064775041844], "isController": false}, {"data": ["http://159.89.38.11/message/template", 10, 0, 0.0, 1983.3, 1584, 2687, 1918.0, 2648.0, 2687.0, 2687.0, 0.3141394150724091, 3.976164426459963, 6.606867283950618], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 10, 1, 10.0, 285.7, 230, 495, 266.0, 478.4000000000001, 495.0, 495.0, 0.20104947827660385, 0.07765143423671567, 0.17733192263616077], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 10, 0, 0.0, 325.09999999999997, 235, 630, 268.0, 611.7, 630.0, 630.0, 0.20105352044714303, 0.024935348727331216, 0.20160327616711568], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 10, 0, 0.0, 322.3, 240, 538, 269.0, 537.9, 538.0, 538.0, 0.20105352044714303, 0.024739007398769552, 0.20297766546704732], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 10, 0, 0.0, 421.09999999999997, 239, 539, 506.0, 538.9, 539.0, 539.0, 0.20153164046755342, 0.024797838573155987, 0.2050348271866183], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 10, 0, 0.0, 295.70000000000005, 234, 499, 273.0, 479.9000000000001, 499.0, 499.0, 0.20059778138853784, 0.024878826402679986, 0.20310525365589457], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 10, 1, 10.0, 2285.0, 1655, 5431, 1905.0, 5141.6, 5431.0, 5431.0, 0.1956258069564537, 2.5791848945087836, 4.070755256220901], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 10, 1, 10.0, 263.7, 3, 529, 254.5, 510.1000000000001, 529.0, 529.0, 0.2010696907548156, 0.07765924091164997, 0.17681958644991352], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 10, 0, 0.0, 335.29999999999995, 228, 790, 266.0, 759.2, 790.0, 790.0, 0.20108586366378445, 0.02454661421677056, 0.19711913080635432], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 10, 0, 0.0, 314.6, 242, 626, 258.0, 610.3000000000001, 626.0, 626.0, 0.20082740892477005, 0.024711185082540065, 0.1986308591396554], "isController": false}, {"data": ["http://159.89.38.11/", 10, 1, 10.0, 29378.7, 24383, 32018, 29932.0, 32013.7, 32018.0, 32018.0, 0.28262958566502744, 390.8185902259624, 5.782341877578995], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 10, 0, 0.0, 369.8, 228, 519, 371.5, 517.7, 519.0, 519.0, 0.906947215672048, 0.11071133003809179, 0.9193468846363142], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 10, 0, 0.0, 339.4, 227, 696, 247.5, 677.7, 696.0, 696.0, 0.896700143472023, 0.11033615046628409, 0.8861919386657102], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 10, 0, 0.0, 324.09999999999997, 232, 515, 255.0, 513.9, 515.0, 515.0, 0.9266981744045965, 0.11402731442869057, 0.9330330252061904], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 10, 0, 0.0, 292.2, 220, 484, 252.5, 482.7, 484.0, 484.0, 0.9151642719868216, 0.11260810377962845, 0.9008648302370276], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 10, 0, 0.0, 311.8, 247, 507, 263.0, 506.1, 507.0, 507.0, 0.9049773755656109, 6.874823246606335, 0.794683257918552], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 10, 0, 0.0, 294.7, 251, 511, 273.5, 488.6000000000001, 511.0, 511.0, 0.9033423667570009, 1.100242773261066, 0.8061272018970189], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 10, 0, 0.0, 481.5, 449, 505, 480.5, 504.9, 505.0, 505.0, 0.9080177971488241, 0.11261548851357486, 0.9035841164986834], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 10, 0, 0.0, 182.3, 55, 243, 190.0, 241.4, 243.0, 243.0, 0.9279881217520415, 0.35814541573867853, 0.4513067232739421], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 10, 0, 0.0, 14.1, 11, 22, 13.0, 21.400000000000002, 22.0, 22.0, 0.946880030300161, 0.8085467758734969, 0.45956970220623045], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 10, 0, 0.0, 61.6, 54, 90, 56.5, 87.80000000000001, 90.0, 90.0, 0.9423294383716547, 0.36441646249528836, 0.45552057811911045], "isController": false}, {"data": ["http://159.89.38.11/-21", 10, 0, 0.0, 1051.3, 232, 4711, 354.0, 4406.600000000001, 4711.0, 4711.0, 0.4511210357738981, 1.8877476936437045, 0.4034537544548202], "isController": false}, {"data": ["http://159.89.38.11/-22", 10, 0, 0.0, 968.9, 230, 3626, 655.0, 3447.9000000000005, 3626.0, 3626.0, 0.4535353077237063, 3.189805943580208, 0.4038413023266361], "isController": false}, {"data": ["http://159.89.38.11/-20", 10, 0, 0.0, 5029.0, 1763, 11098, 4731.5, 10642.2, 11098.0, 11098.0, 0.40487469128304787, 19.64670254868618, 0.3652570701242965], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 10, 0, 0.0, 1930.0, 1708, 2170, 1955.0, 2164.9, 2170.0, 2170.0, 0.773874013310633, 9.796459042717846, 16.352622949233865], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 10, 0, 0.0, 122.60000000000001, 54, 243, 86.0, 241.70000000000002, 243.0, 243.0, 0.3351206434316354, 0.12959743632707774, 0.14563348274128687], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 10, 0, 0.0, 372.4, 236, 534, 352.5, 533.7, 534.0, 534.0, 0.33229215125938727, 0.04056300674553067, 0.3368352080148867], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 10, 0, 0.0, 392.20000000000005, 221, 540, 472.0, 535.7, 540.0, 540.0, 0.33217073575817974, 0.040872571001494766, 0.32827810994851353], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 10, 0, 0.0, 407.2, 238, 540, 484.5, 539.4, 540.0, 540.0, 0.33247996808192304, 0.04091062107258037, 0.33475278036373307], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 10, 0, 0.0, 503.2, 448, 546, 488.0, 545.8, 546.0, 546.0, 0.33072064027515957, 0.041017110659126235, 0.329105793398816], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 10, 0, 0.0, 154.4, 56, 246, 166.0, 244.4, 246.0, 246.0, 0.335345405767941, 0.1293896189637827, 0.1467136150234742], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 10, 0, 0.0, 17.0, 10, 32, 14.5, 31.700000000000003, 32.0, 32.0, 0.3373705340575554, 0.2874897734556864, 0.163743315846294], "isController": false}, {"data": ["http://159.89.38.11/-5", 10, 0, 0.0, 2186.2, 519, 4683, 1812.0, 4637.8, 4683.0, 4683.0, 0.5983008256551394, 1.6651927276534644, 0.5543631087710902], "isController": false}, {"data": ["http://159.89.38.11/-6", 10, 0, 0.0, 2806.6, 504, 8597, 1492.5, 8406.5, 8597.0, 8597.0, 0.5819366852886406, 69.28007385140246, 0.23413858822160147], "isController": false}, {"data": ["http://159.89.38.11/-7", 10, 0, 0.0, 759.8, 49, 3084, 468.0, 2888.9000000000005, 3084.0, 3084.0, 0.5676335357892944, 8.947767071578589, 0.22893813504001814], "isController": false}, {"data": ["http://159.89.38.11/-8", 10, 0, 0.0, 3131.1, 262, 21267, 868.0, 19483.300000000007, 21267.0, 21267.0, 0.3675524681148234, 8.569643726798251, 0.149318190171647], "isController": false}, {"data": ["http://159.89.38.11/-9", 10, 0, 0.0, 25024.100000000006, 17053, 30516, 24872.5, 30477.0, 30516.0, 30516.0, 0.29515067441929105, 150.07114745358754, 0.5339806049113072], "isController": false}, {"data": ["http://159.89.38.11/-0", 30, 0, 0.0, 9506.900000000001, 494, 29759, 3125.5, 28639.90000000001, 29499.4, 29759.0, 0.8582217645039478, 151.87793002274287, 0.6156176693557615], "isController": false}, {"data": ["http://159.89.38.11/-1", 30, 0, 0.0, 1294.6999999999998, 246, 8009, 564.5, 2887.9000000000005, 7042.0999999999985, 8009.0, 0.863508145760175, 7.153962602901388, 0.6372307833458063], "isController": false}, {"data": ["http://159.89.38.11/-2", 20, 1, 5.0, 2258.65, 230, 11133, 1204.5, 7539.900000000007, 10970.649999999998, 11133.0, 0.6030271965265633, 5.178054379861908, 0.37968924312549], "isController": false}, {"data": ["http://159.89.38.11/-3", 10, 0, 0.0, 4332.2, 1068, 9219, 4258.0, 9077.6, 9219.0, 9219.0, 0.4476275738585497, 14.894108102059088, 0.4112578334825425], "isController": false}, {"data": ["http://159.89.38.11/-4", 10, 0, 0.0, 4829.3, 828, 15085, 3253.5, 14619.100000000002, 15085.0, 15085.0, 0.4832318546438581, 7.8109899004542385, 0.43500305040108245], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 10, 0, 0.0, 266.5, 232, 448, 244.5, 429.30000000000007, 448.0, 448.0, 0.3349747094094396, 0.041217591196864634, 0.32974072957491707], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 10, 0, 0.0, 318.40000000000003, 250, 764, 268.0, 717.7000000000002, 764.0, 764.0, 0.3347168295621904, 2.542736540199491, 0.2939885903400723], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 10, 0, 0.0, 390.20000000000005, 243, 547, 385.5, 546.8, 547.0, 547.0, 0.3371998920960345, 0.4107647904302671, 0.30031865389803075], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, 16.666666666666668, 0.09900990099009901], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, 33.333333333333336, 0.19801980198019803], "isController": false}, {"data": ["Assertion failed", 3, 50.0, 0.297029702970297], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1010, 6, "Assertion failed", 3, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 2, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-10", 10, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 10, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 10, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/", 10, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-2", 20, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
