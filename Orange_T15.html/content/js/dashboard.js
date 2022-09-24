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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6536507936507937, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.03333333333333333, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.03333333333333333, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.03333333333333333, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.1, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.06666666666666667, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.0, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.0, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.8, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [0.9333333333333333, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [0.9666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.7333333333333333, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.4, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.7666666666666667, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.36666666666666664, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.13333333333333333, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.5, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.26666666666666666, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.16666666666666666, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.5, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.2833333333333333, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.13333333333333333, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [0.8666666666666667, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 1515, 9, 0.594059405940594, 3228.2085808580923, 2, 70047, 468.0, 7610.800000000002, 18025.0, 47525.63999999996, 11.284495921939593, 380.4003386163458, 19.014887713679194], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 15, 0, 0.0, 273.6, 228, 481, 249.0, 401.80000000000007, 481.0, 481.0, 0.3687406278423757, 0.04537238194154232, 0.36153866245482924], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 15, 0, 0.0, 305.0666666666666, 220, 1179, 249.0, 633.0000000000003, 1179.0, 1179.0, 0.3695400458229657, 0.04583162677687172, 0.37062268267596266], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 15, 0, 0.0, 362.5333333333333, 224, 1026, 244.0, 913.8000000000001, 1026.0, 1026.0, 0.3671431368709614, 0.04517581566966908, 0.3707285190669669], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 15, 0, 0.0, 276.2666666666667, 228, 515, 248.0, 410.6000000000001, 515.0, 515.0, 0.3702423853482747, 0.04555716850965098, 0.3767505522782248], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 15, 0, 0.0, 295.0, 219, 718, 258.0, 582.4000000000001, 718.0, 718.0, 0.3671431368709614, 0.04553435388926963, 0.37180413372576854], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 15, 0, 0.0, 480.19999999999993, 240, 581, 487.0, 555.2, 581.0, 581.0, 0.3682065884432225, 0.04566624680887624, 0.36389166748490354], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 15, 0, 0.0, 546.5333333333333, 253, 1816, 490.0, 1031.8000000000004, 1816.0, 1816.0, 0.3695673598107815, 0.045474108726717255, 0.3630710585641076], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 15, 0, 0.0, 474.93333333333334, 253, 751, 500.0, 637.0000000000001, 751.0, 751.0, 0.3671970624235006, 0.045541041921664624, 0.3661212897796817], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 15, 0, 0.0, 437.2, 236, 598, 489.0, 547.0, 598.0, 598.0, 0.3707182047353072, 0.04561571659828975, 0.36564979177994167], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 15, 0, 0.0, 447.1333333333334, 227, 580, 481.0, 561.4, 580.0, 580.0, 0.3712779386648845, 0.04568459010915571, 0.3636638403133586], "isController": false}, {"data": ["http://159.89.38.11/-12", 15, 0, 0.0, 13358.466666666665, 2094, 25267, 13500.0, 23784.4, 25267.0, 25267.0, 0.32370141781221, 27.948962064891344, 0.2947663887330327], "isController": false}, {"data": ["http://159.89.38.11/-13", 15, 0, 0.0, 8752.266666666666, 1290, 20775, 8136.0, 17082.600000000002, 20775.0, 20775.0, 0.5038629492777964, 21.729089687604972, 0.4519348862109506], "isController": false}, {"data": ["http://159.89.38.11/-10", 15, 0, 0.0, 9414.066666666666, 1899, 31350, 6815.0, 23353.800000000003, 31350.0, 31350.0, 0.4736941830354323, 24.23889433856502, 0.8180784891524032], "isController": false}, {"data": ["http://159.89.38.11/-11", 15, 0, 0.0, 11381.06666666667, 1174, 44884, 6308.0, 39208.600000000006, 44884.0, 44884.0, 0.297772660499464, 12.314237162276173, 0.2682474155814507], "isController": false}, {"data": ["http://159.89.38.11/-18", 15, 0, 0.0, 10423.4, 3281, 17312, 10563.0, 15809.0, 17312.0, 17312.0, 0.40219868615095855, 33.16253854404076, 0.36860357454082315], "isController": false}, {"data": ["http://159.89.38.11/-19", 15, 0, 0.0, 3711.2666666666664, 1317, 12953, 2256.0, 9825.2, 12953.0, 12953.0, 0.47670501493675715, 9.46194280135702, 0.42664478127184896], "isController": false}, {"data": ["http://159.89.38.11/-16", 15, 0, 0.0, 6051.133333333334, 682, 18033, 4864.0, 15536.400000000001, 18033.0, 18033.0, 0.42912315834644543, 7.777438179445001, 0.399984131383207], "isController": false}, {"data": ["http://159.89.38.11/-17", 15, 0, 0.0, 5995.333333333334, 1286, 21207, 3678.0, 18432.600000000002, 21207.0, 21207.0, 0.4241721573395922, 10.095214498557814, 0.39205547641602806], "isController": false}, {"data": ["http://159.89.38.11/-14", 15, 1, 6.666666666666667, 22198.733333333334, 5583, 64264, 20493.0, 46490.80000000001, 64264.0, 64264.0, 0.21228417775261818, 29.27778877282055, 0.1786172339371639], "isController": false}, {"data": ["http://159.89.38.11/-15", 15, 0, 0.0, 12312.466666666665, 3943, 29363, 10752.0, 26036.600000000002, 29363.0, 29363.0, 0.3979518743533282, 30.664057318334972, 0.36859774195473965], "isController": false}, {"data": ["Broadcast", 15, 1, 6.666666666666667, 1978.3999999999999, 1567, 2921, 1810.0, 2645.6000000000004, 2921.0, 2921.0, 0.3531988038333843, 4.593561995220043, 7.369161918104971], "isController": true}, {"data": ["Form Numbers", 15, 0, 0.0, 2153.133333333333, 1741, 3800, 1973.0, 3300.2000000000003, 3800.0, 3800.0, 0.46227810650887574, 10.398067195975099, 9.759515465128821], "isController": true}, {"data": ["Teplate", 15, 2, 13.333333333333334, 2078.666666666667, 1628, 2806, 2008.0, 2637.4, 2806.0, 2806.0, 0.355694671693818, 4.605157609791089, 7.427372520511726], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 15, 0, 0.0, 420.73333333333335, 223, 666, 474.0, 601.8000000000001, 666.0, 666.0, 0.3934529430280138, 0.04841315509915014, 0.38812493442450946], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 15, 0, 0.0, 283.7333333333333, 224, 523, 246.0, 488.20000000000005, 523.0, 523.0, 0.3684417370799764, 0.04533560436726272, 0.3601661902510316], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 15, 0, 0.0, 484.2666666666667, 224, 1480, 474.0, 917.8000000000004, 1480.0, 1480.0, 0.3890142379211079, 0.04824688302341866, 0.3879252006665111], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 15, 0, 0.0, 302.4, 230, 535, 242.0, 514.6, 535.0, 535.0, 0.36634509708145074, 0.04471986048357553, 0.35918991940407863], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 15, 1, 6.666666666666667, 337.26666666666665, 2, 744, 265.0, 620.4000000000001, 744.0, 744.0, 0.37037037037037035, 0.09917534722222222, 0.3419174382716049], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 15, 0, 0.0, 524.6, 255, 1179, 497.0, 802.2000000000003, 1179.0, 1179.0, 0.39065551996249703, 0.048068940932885384, 0.382694896411178], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 15, 0, 0.0, 378.73333333333335, 224, 1289, 255.0, 808.4000000000003, 1289.0, 1289.0, 0.3895901511609786, 0.04831830976312918, 0.3945868477611552], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 15, 0, 0.0, 492.1333333333333, 251, 663, 494.0, 584.4000000000001, 663.0, 663.0, 0.2727867898450571, 0.033831955381174075, 0.27104635329526444], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 15, 0, 0.0, 295.2, 222, 514, 253.0, 489.40000000000003, 514.0, 514.0, 0.3884400248601616, 0.047796331183965195, 0.39531865030039365], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 15, 0, 0.0, 153.33333333333334, 56, 203, 173.0, 195.20000000000002, 203.0, 203.0, 0.274825943569073, 0.10602985296812019, 0.12023635031146941], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 15, 0, 0.0, 461.7333333333334, 246, 657, 467.0, 588.6, 657.0, 657.0, 0.39108330074305825, 0.0481215780211185, 0.3842597119019685], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 15, 0, 0.0, 630.4666666666667, 267, 2539, 478.0, 1534.6000000000006, 2539.0, 2539.0, 0.3691489885317714, 3.6768056384431755, 0.3627561740168332], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 15, 0, 0.0, 274.8, 228, 538, 237.0, 505.0, 538.0, 538.0, 0.3912158990141359, 0.04813789382400501, 0.38362590305670025], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 15, 0, 0.0, 327.7333333333334, 227, 506, 254.0, 497.6, 506.0, 506.0, 0.27440864936062787, 0.03349714958015477, 0.277749431745422], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 15, 0, 0.0, 290.53333333333336, 231, 510, 246.0, 494.40000000000003, 510.0, 510.0, 0.274443793911007, 0.03376945120389344, 0.27081670470762587], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 15, 0, 0.0, 260.26666666666665, 222, 498, 243.0, 362.4000000000001, 498.0, 498.0, 0.39247494701588215, 0.048292815746094876, 0.3963588136790601], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 15, 0, 0.0, 15.266666666666666, 10, 37, 14.0, 28.000000000000007, 37.0, 37.0, 0.2756238285987284, 0.23456736246370954, 0.13377445587262504], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 15, 0, 0.0, 257.9333333333334, 223, 471, 241.0, 353.4000000000001, 471.0, 471.0, 0.3929993712010061, 0.04874113295168728, 0.3942019083394467], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 15, 0, 0.0, 67.73333333333333, 53, 166, 57.0, 116.20000000000003, 166.0, 166.0, 0.27485615861032725, 0.10630992436874703, 0.11944432673983948], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 15, 0, 0.0, 273.6, 252, 331, 270.0, 302.20000000000005, 331.0, 331.0, 0.2742982536344518, 2.0833452386394806, 0.24090386989119503], "isController": false}, {"data": ["Dashboard", 15, 1, 6.666666666666667, 48728.666666666664, 42844, 70047, 46812.0, 59946.600000000006, 70047.0, 70047.0, 0.20077633516262883, 275.886017078537, 4.109470682472226], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 15, 0, 0.0, 381.6, 261, 997, 294.0, 841.6000000000001, 997.0, 997.0, 0.27419295872481997, 0.3339941574050378, 0.24206097137425509], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 15, 0, 0.0, 328.8, 231, 502, 256.0, 500.2, 502.0, 502.0, 0.274443793911007, 0.03376945120389344, 0.27590892353995905], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 15, 0, 0.0, 293.4, 226, 511, 247.0, 493.0, 511.0, 511.0, 0.2733933583640142, 0.03364019839244705, 0.26871220906390114], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 15, 0, 0.0, 278.1333333333333, 231, 491, 251.0, 488.6, 491.0, 491.0, 0.38851045093113007, 0.04780499689191639, 0.3798347292729674], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 15, 0, 0.0, 265.59999999999997, 224, 530, 247.0, 373.4000000000001, 530.0, 530.0, 0.39087947882736157, 0.048096498371335505, 0.3867314739413681], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 15, 0, 0.0, 262.93333333333334, 231, 532, 243.0, 370.6000000000001, 532.0, 532.0, 0.3880079670969244, 0.04736425379601128, 0.38048020836027835], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 15, 0, 0.0, 440.1333333333333, 248, 513, 485.0, 510.6, 513.0, 513.0, 0.27212365298791774, 0.0337497108686187, 0.268792972860201], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 15, 0, 0.0, 428.79999999999995, 238, 676, 467.0, 578.8000000000001, 676.0, 676.0, 0.27332361516034986, 0.03363161670918367, 0.26837674243804666], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 15, 0, 0.0, 388.5333333333333, 238, 517, 465.0, 507.4, 517.0, 517.0, 0.2732787990307712, 0.03389297605166791, 0.2723358448414072], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 15, 0, 0.0, 437.6666666666667, 237, 513, 477.0, 511.2, 513.0, 513.0, 0.27321409056136386, 0.03361814004954282, 0.2693364426614695], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 15, 0, 0.0, 420.20000000000005, 241, 512, 470.0, 509.0, 512.0, 512.0, 0.2734083079671181, 0.033642037894391484, 0.26765890149098664], "isController": false}, {"data": ["http://159.89.38.11/message/template", 15, 2, 13.333333333333334, 2078.666666666667, 1628, 2806, 2008.0, 2637.4, 2806.0, 2806.0, 0.3564977659473334, 4.615555222989353, 7.444142184677726], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 15, 0, 0.0, 289.93333333333334, 234, 607, 251.0, 539.2, 607.0, 607.0, 0.27380257009345793, 0.033690550616968455, 0.2683122581410631], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 15, 0, 0.0, 294.79999999999995, 225, 546, 250.0, 514.8000000000001, 546.0, 546.0, 0.27344818156959255, 0.033913983456385015, 0.2741068783611339], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 15, 0, 0.0, 242.86666666666662, 229, 261, 240.0, 258.0, 261.0, 261.0, 0.2734780944046382, 0.03365062489744572, 0.2760063424128061], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 15, 1, 6.666666666666667, 308.0, 228, 712, 256.0, 592.6, 712.0, 712.0, 0.2723608236191306, 0.08130041512328867, 0.2585654641936304], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 15, 0, 0.0, 271.53333333333336, 234, 603, 248.0, 402.0000000000001, 603.0, 603.0, 0.2735878308132854, 0.03393130323563208, 0.2769186201597753], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 15, 1, 6.666666666666667, 1978.3999999999999, 1567, 2921, 1810.0, 2645.6000000000004, 2921.0, 2921.0, 0.2671035293279675, 3.4738413827949715, 5.5728647298692975], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 15, 1, 6.666666666666667, 386.9333333333334, 166, 1391, 245.0, 1101.2000000000003, 1391.0, 1391.0, 0.2735479164767028, 0.08165476543266162, 0.2494700009118264], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 15, 0, 0.0, 308.59999999999997, 225, 939, 250.0, 644.4000000000002, 939.0, 939.0, 0.27354292800350133, 0.03339147070355241, 0.2680578224159311], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 15, 0, 0.0, 390.66666666666663, 234, 1439, 250.0, 1148.6000000000001, 1439.0, 1439.0, 0.2736976553234194, 0.033677641182373874, 0.2706149929294772], "isController": false}, {"data": ["http://159.89.38.11/", 15, 1, 6.666666666666667, 48728.666666666664, 42844, 70047, 46812.0, 59946.600000000006, 70047.0, 70047.0, 0.20105352044714303, 276.2668963493707, 4.115144084167706], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 15, 0, 0.0, 412.3333333333333, 226, 562, 488.0, 533.2, 562.0, 562.0, 0.39110369462623523, 0.0477421502229291, 0.3961198032096576], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 15, 0, 0.0, 337.1333333333333, 228, 520, 247.0, 508.6, 520.0, 520.0, 0.3911240906364893, 0.04812659709003677, 0.38620957569554903], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 15, 0, 0.0, 395.00000000000006, 232, 541, 470.0, 524.8, 541.0, 541.0, 0.39131795888552645, 0.04815045197224251, 0.3936617904101012], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 15, 0, 0.0, 412.53333333333336, 220, 1168, 465.0, 784.6000000000003, 1168.0, 1168.0, 0.3935871533153158, 0.0484296692555955, 0.3871042399176091], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 15, 0, 0.0, 291.6666666666667, 248, 683, 265.0, 437.60000000000014, 683.0, 683.0, 0.39346326364661754, 2.9886813734490993, 0.34561239278126066], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 15, 0, 0.0, 441.0666666666667, 246, 532, 500.0, 527.8, 532.0, 532.0, 0.39346326364661754, 0.47932842378616586, 0.3517602562757391], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 15, 0, 0.0, 476.8, 254, 620, 501.0, 582.2, 620.0, 620.0, 0.3894889904445368, 0.0483057634633361, 0.3872575431034483], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 15, 0, 0.0, 177.26666666666665, 160, 211, 175.0, 203.8, 211.0, 211.0, 0.3940524352440498, 0.15200264836074187, 0.19163878198392265], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 15, 0, 0.0, 18.8, 9, 47, 16.0, 32.60000000000001, 47.0, 47.0, 0.3958932671751696, 0.33754024914882946, 0.1921474158066985], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 15, 0, 0.0, 139.73333333333335, 55, 234, 167.0, 210.0, 234.0, 234.0, 0.39434249960565754, 0.15249963851937537, 0.19062454814921923], "isController": false}, {"data": ["http://159.89.38.11/-21", 15, 0, 0.0, 2594.933333333333, 332, 10390, 1629.0, 8684.2, 10390.0, 10390.0, 0.4891251182052369, 2.0467784487396874, 0.438238273225291], "isController": false}, {"data": ["http://159.89.38.11/-22", 15, 0, 0.0, 2020.6666666666672, 350, 10808, 679.0, 7328.000000000002, 10808.0, 10808.0, 0.48658643397022094, 3.4222612279819637, 0.4340629764492166], "isController": false}, {"data": ["http://159.89.38.11/-20", 15, 0, 0.0, 6462.466666666666, 2339, 16646, 4715.0, 13485.200000000003, 16646.0, 16646.0, 0.44353765634702386, 21.52283803113634, 0.4008587073834235], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 15, 0, 0.0, 2153.133333333333, 1741, 3800, 1973.0, 3300.2000000000003, 3800.0, 3800.0, 0.36224884080370945, 8.148099023739373, 7.6477192284703435], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 15, 0, 0.0, 101.53333333333332, 53, 188, 64.0, 186.8, 188.0, 188.0, 0.37619441727484765, 0.14553041845359016, 0.16348292547588594], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 15, 0, 0.0, 413.7333333333333, 230, 632, 475.0, 560.0, 632.0, 632.0, 0.3708190155991199, 0.04526599311512694, 0.3755266788830931], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 15, 0, 0.0, 384.0666666666667, 224, 517, 486.0, 516.4, 517.0, 517.0, 0.37190390003223167, 0.04576161269927851, 0.3671824638013537], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 15, 0, 0.0, 331.06666666666666, 230, 540, 249.0, 525.6, 540.0, 540.0, 0.37193156459211507, 0.045765016736920405, 0.374110851103397], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 15, 1, 6.666666666666667, 435.1333333333334, 194, 575, 468.0, 553.4, 575.0, 575.0, 0.37135147178966654, 0.09977653151536157, 0.34461223169856164], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 15, 0, 0.0, 171.06666666666666, 58, 232, 171.0, 221.20000000000002, 232.0, 232.0, 0.37512191462225225, 0.14474919192487556, 0.16411583764723534], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 15, 0, 0.0, 18.000000000000004, 10, 48, 14.0, 38.400000000000006, 48.0, 48.0, 0.37658164290018076, 0.3211731459630448, 0.18277448879041977], "isController": false}, {"data": ["http://159.89.38.11/-5", 15, 0, 0.0, 1258.6000000000001, 556, 4369, 683.0, 3700.0000000000005, 4369.0, 4369.0, 0.7618854124339699, 2.1204818607781393, 0.7071745003301504], "isController": false}, {"data": ["http://159.89.38.11/-6", 15, 0, 0.0, 8240.333333333334, 1010, 42425, 2995.0, 28875.200000000008, 42425.0, 42425.0, 0.28717477456780194, 34.188399963863844, 0.11554297570501408], "isController": false}, {"data": ["http://159.89.38.11/-7", 15, 0, 0.0, 4101.8, 18, 44136, 857.0, 19984.800000000014, 44136.0, 44136.0, 0.308413520848754, 4.861709465467966, 0.12438943760794473], "isController": false}, {"data": ["http://159.89.38.11/-8", 15, 0, 0.0, 4816.666666666666, 221, 27420, 2565.0, 16839.600000000006, 27420.0, 27420.0, 0.4510328652614487, 10.516054420873802, 0.18323210151246355], "isController": false}, {"data": ["http://159.89.38.11/-9", 15, 0, 0.0, 43053.26666666667, 30841, 50802, 43955.0, 50181.6, 50802.0, 50802.0, 0.2703628269137182, 137.4676163067086, 0.49001502203457037], "isController": false}, {"data": ["http://159.89.38.11/-0", 45, 0, 0.0, 16987.999999999996, 546, 50297, 5749.0, 46991.799999999996, 48748.99999999999, 50297.0, 0.7901668129938543, 139.83383861940297, 0.5676580333625988], "isController": false}, {"data": ["http://159.89.38.11/-1", 45, 0, 0.0, 1333.8222222222228, 249, 8513, 613.0, 2884.7999999999997, 6481.899999999988, 8513.0, 0.7998720204767237, 6.6271861779893, 0.5901659901082493], "isController": false}, {"data": ["http://159.89.38.11/-2", 30, 0, 0.0, 2208.5333333333338, 250, 8148, 1746.0, 5076.9000000000015, 7744.299999999999, 8148.0, 0.9300595238095237, 8.474985758463541, 0.6051139226035466], "isController": false}, {"data": ["http://159.89.38.11/-3", 15, 0, 0.0, 6775.4, 1775, 20875, 5622.0, 15956.200000000003, 20875.0, 20875.0, 0.5696923661222939, 18.955623338397267, 0.5243320950436764], "isController": false}, {"data": ["http://159.89.38.11/-4", 15, 0, 0.0, 5956.133333333333, 574, 24611, 3015.0, 20634.200000000004, 24611.0, 24611.0, 0.5112997238981491, 8.264680693322425, 0.4611018082966902], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 15, 0, 0.0, 369.79999999999995, 229, 498, 459.0, 495.0, 498.0, 498.0, 0.3741861451343328, 0.04604243582707611, 0.3679740704592511], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 15, 0, 0.0, 270.0666666666667, 248, 295, 269.0, 294.4, 295.0, 295.0, 0.3741208160822068, 2.8417106518431683, 0.32871969621389735], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 15, 0, 0.0, 402.33333333333337, 267, 527, 481.0, 524.0, 527.0, 527.0, 0.37431687170913086, 0.4561012090434956, 0.33305915922192], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 80,247)", 1, 11.11111111111111, 0.066006600660066], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 4, 44.44444444444444, 0.264026402640264], "isController": false}, {"data": ["Assertion failed", 4, 44.44444444444444, 0.264026402640264], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 1515, 9, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 4, "Assertion failed", 4, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 80,247)", 1, "", "", "", ""], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-14", 15, 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 80,247)", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template", 15, 2, "Assertion failed", 2, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 15, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/", 15, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 15, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
