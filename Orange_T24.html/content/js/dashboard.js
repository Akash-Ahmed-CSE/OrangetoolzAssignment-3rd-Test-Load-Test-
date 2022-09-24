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

    var data = {"OkPercent": 99.46369636963696, "KoPercent": 0.5363036303630363};
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
    createTable($("#apdexTable"), {"supportsControllersDiscrimination": true, "overall": {"data": [0.6337301587301587, 500, 1500, "Total"], "isController": false}, "titles": ["Apdex", "T (Toleration threshold)", "F (Frustration threshold)", "Label"], "items": [{"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-19"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-18"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/message/template-17"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-16"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-15"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/message/template-14"], "isController": false}, {"data": [0.7708333333333334, 500, 1500, "http://159.89.38.11/message/template-13"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/message/template-12"], "isController": false}, {"data": [0.7291666666666666, 500, 1500, "http://159.89.38.11/message/template-11"], "isController": false}, {"data": [0.7291666666666666, 500, 1500, "http://159.89.38.11/message/template-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-12"], "isController": false}, {"data": [0.020833333333333332, 500, 1500, "http://159.89.38.11/-13"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-10"], "isController": false}, {"data": [0.020833333333333332, 500, 1500, "http://159.89.38.11/-11"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-18"], "isController": false}, {"data": [0.020833333333333332, 500, 1500, "http://159.89.38.11/-19"], "isController": false}, {"data": [0.08333333333333333, 500, 1500, "http://159.89.38.11/-16"], "isController": false}, {"data": [0.041666666666666664, 500, 1500, "http://159.89.38.11/-17"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-14"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-15"], "isController": false}, {"data": [0.0, 500, 1500, "Broadcast"], "isController": true}, {"data": [0.0, 500, 1500, "Form Numbers"], "isController": true}, {"data": [0.0, 500, 1500, "Teplate"], "isController": true}, {"data": [0.7708333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-11"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-22"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/virtual/number/manage-12"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/message/template-21"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-20"], "isController": false}, {"data": [0.6666666666666666, 500, 1500, "http://159.89.38.11/virtual/number/manage-10"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-15"], "isController": false}, {"data": [0.7291666666666666, 500, 1500, "http://159.89.38.11/broadcast-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-16"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-8"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-13"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-14"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/virtual/number/manage-19"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://159.89.38.11/broadcast-5"], "isController": false}, {"data": [0.8958333333333334, 500, 1500, "http://159.89.38.11/broadcast-4"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-7"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-18"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-6"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-1"], "isController": false}, {"data": [0.0, 500, 1500, "Dashboard"], "isController": true}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/broadcast-0"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://159.89.38.11/broadcast-3"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-2"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-22"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-20"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/virtual/number/manage-21"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/broadcast-14"], "isController": false}, {"data": [0.7708333333333334, 500, 1500, "http://159.89.38.11/broadcast-13"], "isController": false}, {"data": [0.8333333333333334, 500, 1500, "http://159.89.38.11/broadcast-12"], "isController": false}, {"data": [0.8541666666666666, 500, 1500, "http://159.89.38.11/broadcast-11"], "isController": false}, {"data": [0.7291666666666666, 500, 1500, "http://159.89.38.11/broadcast-10"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/message/template"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/broadcast-19"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-18"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/broadcast-17"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/broadcast-16"], "isController": false}, {"data": [0.9583333333333334, 500, 1500, "http://159.89.38.11/broadcast-15"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/broadcast"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/broadcast-22"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://159.89.38.11/broadcast-21"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/broadcast-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-5"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-4"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/virtual/number/manage-3"], "isController": false}, {"data": [0.9166666666666666, 500, 1500, "http://159.89.38.11/virtual/number/manage-2"], "isController": false}, {"data": [0.9, 500, 1500, "http://159.89.38.11/virtual/number/manage-1"], "isController": false}, {"data": [0.68, 500, 1500, "http://159.89.38.11/virtual/number/manage-0"], "isController": false}, {"data": [0.75, 500, 1500, "http://159.89.38.11/virtual/number/manage-9"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-7"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/virtual/number/manage-6"], "isController": false}, {"data": [0.4166666666666667, 500, 1500, "http://159.89.38.11/-21"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/-22"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-20"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/virtual/number/manage"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-6"], "isController": false}, {"data": [0.8958333333333334, 500, 1500, "http://159.89.38.11/message/template-5"], "isController": false}, {"data": [0.8958333333333334, 500, 1500, "http://159.89.38.11/message/template-4"], "isController": false}, {"data": [0.8541666666666666, 500, 1500, "http://159.89.38.11/message/template-3"], "isController": false}, {"data": [0.7916666666666666, 500, 1500, "http://159.89.38.11/message/template-9"], "isController": false}, {"data": [0.9791666666666666, 500, 1500, "http://159.89.38.11/message/template-8"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-7"], "isController": false}, {"data": [0.3125, 500, 1500, "http://159.89.38.11/-5"], "isController": false}, {"data": [0.0625, 500, 1500, "http://159.89.38.11/-6"], "isController": false}, {"data": [0.375, 500, 1500, "http://159.89.38.11/-7"], "isController": false}, {"data": [0.20833333333333334, 500, 1500, "http://159.89.38.11/-8"], "isController": false}, {"data": [0.0, 500, 1500, "http://159.89.38.11/-9"], "isController": false}, {"data": [0.14084507042253522, 500, 1500, "http://159.89.38.11/-0"], "isController": false}, {"data": [0.4295774647887324, 500, 1500, "http://159.89.38.11/-1"], "isController": false}, {"data": [0.28125, 500, 1500, "http://159.89.38.11/-2"], "isController": false}, {"data": [0.041666666666666664, 500, 1500, "http://159.89.38.11/-3"], "isController": false}, {"data": [0.041666666666666664, 500, 1500, "http://159.89.38.11/-4"], "isController": false}, {"data": [0.875, 500, 1500, "http://159.89.38.11/message/template-2"], "isController": false}, {"data": [1.0, 500, 1500, "http://159.89.38.11/message/template-1"], "isController": false}, {"data": [0.8125, 500, 1500, "http://159.89.38.11/message/template-0"], "isController": false}]}, function(index, item){
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
    createTable($("#statisticsTable"), {"supportsControllersDiscrimination": true, "overall": {"data": ["Total", 2424, 13, 0.5363036303630363, 4197.931105610554, 10, 103461, 481.0, 10009.5, 24560.0, 65113.75, 14.607337415031576, 492.1278330811148, 24.65611398837861], "isController": false}, "titles": ["Label", "#Samples", "FAIL", "Error %", "Average", "Min", "Max", "Median", "90th pct", "95th pct", "99th pct", "Transactions/s", "Received", "Sent"], "items": [{"data": ["http://159.89.38.11/message/template-19", 24, 0, 0.0, 266.95833333333326, 222, 506, 251.5, 364.0, 496.25, 506.0, 0.3242016534284325, 0.03989200032420165, 0.3180542750715945], "isController": false}, {"data": ["http://159.89.38.11/message/template-18", 24, 0, 0.0, 291.7916666666667, 228, 545, 256.5, 489.5, 533.0, 545.0, 0.3240353198498636, 0.04018797423919207, 0.32516923250884344], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 24, 1, 4.166666666666667, 241.12500000000006, 12, 468, 238.0, 265.0, 418.0, 468.0, 0.3263840724572641, 0.06968331820407164, 0.31597208056246856], "isController": false}, {"data": ["http://159.89.38.11/message/template-16", 24, 0, 0.0, 259.3333333333333, 226, 502, 252.5, 271.0, 445.25, 502.0, 0.32535314372475127, 0.0400336876067565, 0.3312575831006154], "isController": false}, {"data": ["http://159.89.38.11/message/template-15", 24, 0, 0.0, 262.12499999999994, 226, 514, 253.0, 270.5, 453.75, 514.0, 0.32560474297575603, 0.040382619490157236, 0.3299238814120392], "isController": false}, {"data": ["http://159.89.38.11/message/template-14", 24, 0, 0.0, 475.91666666666663, 249, 555, 493.0, 528.0, 548.25, 555.0, 0.3254369669274682, 0.040361811327918426, 0.32180864136846243], "isController": false}, {"data": ["http://159.89.38.11/message/template-13", 24, 0, 0.0, 448.20833333333337, 232, 533, 489.5, 532.0, 532.75, 533.0, 0.32537960954446854, 0.040036944143167025, 0.3198454023183297], "isController": false}, {"data": ["http://159.89.38.11/message/template-12", 24, 0, 0.0, 475.66666666666663, 233, 534, 497.0, 529.5, 533.0, 534.0, 0.32536196518626975, 0.040352509354156504, 0.3245941024754623], "isController": false}, {"data": ["http://159.89.38.11/message/template-11", 24, 0, 0.0, 486.95833333333326, 252, 553, 509.5, 528.5, 548.5, 553.0, 0.3241447306222228, 0.039884996150781324, 0.3198977171432045], "isController": false}, {"data": ["http://159.89.38.11/message/template-10", 24, 0, 0.0, 489.74999999999994, 264, 545, 502.5, 525.0, 540.75, 545.0, 0.3252208791804434, 0.04001741286790612, 0.31873657616944007], "isController": false}, {"data": ["http://159.89.38.11/-12", 24, 0, 0.0, 21737.625, 9616, 70444, 18795.5, 36051.5, 62466.75, 70444.0, 0.307605547153367, 26.559215669939245, 0.2804697713465433], "isController": false}, {"data": ["http://159.89.38.11/-13", 24, 0, 0.0, 13820.166666666666, 1433, 49552, 9767.0, 31183.5, 45783.75, 49552.0, 0.4009556108725797, 17.29121071888, 0.36010303723875237], "isController": false}, {"data": ["http://159.89.38.11/-10", 24, 1, 4.166666666666667, 12263.958333333336, 3903, 54216, 7257.5, 36077.5, 50883.25, 54216.0, 0.4023740066391711, 20.413227757309794, 0.688616876026892], "isController": false}, {"data": ["http://159.89.38.11/-11", 24, 0, 0.0, 11132.791666666666, 1421, 34748, 7063.0, 23411.5, 32230.25, 34748.0, 0.5096407033041706, 21.075932483224328, 0.4597052047056825], "isController": false}, {"data": ["http://159.89.38.11/-18", 24, 0, 0.0, 13815.541666666664, 2424, 27280, 12889.0, 24764.5, 27223.5, 27280.0, 0.48536817198212223, 40.02012255546342, 0.44539481667239667], "isController": false}, {"data": ["http://159.89.38.11/-19", 24, 0, 0.0, 4800.791666666666, 1389, 15875, 4048.5, 10675.0, 14994.25, 15875.0, 0.5363967547996334, 10.64674222783452, 0.48069670115995794], "isController": false}, {"data": ["http://159.89.38.11/-16", 24, 0, 0.0, 4190.166666666667, 1043, 10720, 3051.0, 8872.5, 10441.5, 10720.0, 0.481685900652283, 8.730086552935273, 0.44954214751630706], "isController": false}, {"data": ["http://159.89.38.11/-17", 24, 0, 0.0, 7670.875000000001, 1393, 27564, 6018.0, 19672.5, 27060.25, 27564.0, 0.4654139275117808, 11.076760573622666, 0.43071998564973724], "isController": false}, {"data": ["http://159.89.38.11/-14", 24, 1, 4.166666666666667, 29607.208333333336, 11584, 57231, 27291.5, 49219.5, 55418.75, 57231.0, 0.3572225943290913, 50.57336435774354, 0.30913940983850563], "isController": false}, {"data": ["http://159.89.38.11/-15", 24, 0, 0.0, 14242.874999999998, 6549, 26395, 14164.0, 24424.5, 26032.75, 26395.0, 0.4590402233995754, 35.37120096398447, 0.4257179675994109], "isController": false}, {"data": ["Broadcast", 24, 1, 4.166666666666667, 1909.25, 1548, 2551, 1826.5, 2230.5, 2494.0, 2551.0, 0.3193697769734391, 4.071080983525842, 6.696291193711077], "isController": true}, {"data": ["Form Numbers", 24, 1, 4.166666666666667, 2432.916666666666, 1762, 7153, 2192.0, 3282.5, 6409.0, 7153.0, 0.48511309198957003, 19.449884596143352, 10.239644604127504], "isController": true}, {"data": ["Teplate", 24, 1, 4.166666666666667, 1920.4583333333335, 1537, 2388, 1919.0, 2213.5, 2376.75, 2388.0, 0.39550443294551924, 5.042214819674697, 8.298866169127583], "isController": true}, {"data": ["http://159.89.38.11/virtual/number/manage-11", 24, 0, 0.0, 496.3333333333333, 454, 532, 494.5, 528.5, 531.5, 532.0, 0.4271298652761216, 0.052556995141397785, 0.42132495906672124], "isController": false}, {"data": ["http://159.89.38.11/message/template-22", 24, 0, 0.0, 258.83333333333337, 225, 473, 253.5, 267.0, 421.5, 473.0, 0.3253751982755114, 0.040036401350307074, 0.31825231999295023], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-12", 24, 0, 0.0, 466.58333333333326, 243, 523, 485.0, 515.5, 521.5, 523.0, 0.4277998609650452, 0.05305720931890697, 0.42658135550168447], "isController": false}, {"data": ["http://159.89.38.11/message/template-21", 24, 0, 0.0, 272.79166666666663, 232, 516, 254.0, 388.5, 512.75, 516.0, 0.32430679422733905, 0.03958823171720447, 0.3181574222339333], "isController": false}, {"data": ["http://159.89.38.11/message/template-20", 24, 0, 0.0, 280.3333333333334, 224, 519, 253.5, 496.5, 514.0, 519.0, 0.3253840209330387, 0.040037486950744994, 0.3220740435065551], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-10", 24, 0, 0.0, 505.95833333333326, 471, 536, 509.0, 530.0, 535.0, 536.0, 0.42731999145360017, 0.05258038957339221, 0.41859136858129764], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-15", 24, 0, 0.0, 253.9583333333334, 226, 484, 243.0, 261.5, 428.5, 484.0, 0.42974555481941734, 0.05329852095904883, 0.4352362817161172], "isController": false}, {"data": ["http://159.89.38.11/broadcast-9", 24, 0, 0.0, 483.0416666666667, 254, 559, 503.5, 530.0, 553.5, 559.0, 0.31776715611635575, 0.039410575026149586, 0.3159310991433527], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-16", 24, 0, 0.0, 264.66666666666663, 237, 486, 256.5, 266.5, 431.25, 486.0, 0.4293150635922938, 0.05282587696545803, 0.43689655519381787], "isController": false}, {"data": ["http://159.89.38.11/broadcast-8", 24, 0, 0.0, 169.12499999999997, 59, 269, 165.5, 200.0, 252.75, 269.0, 0.31810409956658314, 0.1227191149084788, 0.13917054356038014], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-13", 24, 0, 0.0, 481.41666666666663, 239, 517, 493.0, 514.5, 516.75, 517.0, 0.42740370060370775, 0.05259068972272185, 0.41992552713123077], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-14", 24, 0, 0.0, 579.25, 233, 2911, 488.0, 529.0, 2316.0, 2911.0, 0.4271298652761216, 2.6788077960098953, 0.42062976071829006], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-19", 24, 0, 0.0, 266.50000000000006, 229, 534, 245.5, 372.0, 520.75, 534.0, 0.4290617848970251, 0.05279471181350114, 0.4207165890481979], "isController": false}, {"data": ["http://159.89.38.11/broadcast-5", 24, 0, 0.0, 374.0, 228, 528, 355.0, 518.0, 525.5, 528.0, 0.3177335010260144, 0.03878582776196465, 0.32179308433176673], "isController": false}, {"data": ["http://159.89.38.11/broadcast-4", 24, 0, 0.0, 353.6666666666667, 237, 533, 257.5, 520.0, 530.0, 533.0, 0.3177713635039589, 0.039100773243651195, 0.31376301704048937], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-17", 24, 0, 0.0, 259.41666666666663, 230, 490, 249.5, 273.5, 437.75, 490.0, 0.42880880487412676, 0.052763583412246066, 0.43303128740910146], "isController": false}, {"data": ["http://159.89.38.11/broadcast-7", 24, 0, 0.0, 13.375, 10, 22, 13.0, 16.5, 20.75, 22.0, 0.3187420314492138, 0.2717400326710582, 0.15470194299830003], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-18", 24, 0, 0.0, 262.08333333333337, 223, 531, 239.0, 381.0, 525.25, 531.0, 0.4286096972944013, 0.0531576480042861, 0.429900270113403], "isController": false}, {"data": ["http://159.89.38.11/broadcast-6", 24, 0, 0.0, 68.49999999999997, 54, 171, 58.0, 122.5, 171.0, 171.0, 0.3185643367225039, 0.12319480209190582, 0.13843860336085376], "isController": false}, {"data": ["http://159.89.38.11/broadcast-1", 24, 0, 0.0, 285.2083333333333, 259, 373, 282.0, 307.0, 357.0, 373.0, 0.3176367823393949, 2.4127005495778078, 0.278992007795336], "isController": false}, {"data": ["Dashboard", 24, 3, 12.5, 66553.95833333333, 53698, 103461, 64237.5, 86561.5, 101615.5, 103461.0, 0.21881040078771744, 296.7472448551065, 4.4679488348346155], "isController": true}, {"data": ["http://159.89.38.11/broadcast-0", 24, 0, 0.0, 379.87500000000006, 283, 570, 303.0, 549.5, 566.0, 570.0, 0.31753592125109154, 0.38681601604879473, 0.2805055684554524], "isController": false}, {"data": ["http://159.89.38.11/broadcast-3", 24, 0, 0.0, 333.70833333333337, 228, 524, 259.0, 517.5, 522.5, 524.0, 0.3177335010260144, 0.03909611438406037, 0.3196210779770967], "isController": false}, {"data": ["http://159.89.38.11/broadcast-2", 24, 0, 0.0, 311.20833333333337, 238, 497, 258.5, 493.0, 497.0, 497.0, 0.3177713635039589, 0.039100773243651195, 0.31252172265180206], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-22", 24, 0, 0.0, 272.91666666666663, 232, 510, 253.5, 392.5, 508.5, 510.0, 0.429023435405159, 0.052789993028369175, 0.41942208085304156], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 24, 1, 4.166666666666667, 259.20833333333337, 230, 476, 247.0, 304.0, 443.25, 476.0, 0.42943028914972803, 0.09993130792835672, 0.4070466546933152], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-21", 24, 0, 0.0, 308.75, 227, 517, 254.5, 505.0, 516.25, 517.0, 0.429238280900685, 0.0523972510865094, 0.42088965222756786], "isController": false}, {"data": ["http://159.89.38.11/broadcast-14", 24, 0, 0.0, 434.37500000000006, 239, 597, 485.5, 568.5, 595.25, 597.0, 0.31782186084699526, 0.03941735969489102, 0.31412325032444316], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 24, 1, 4.166666666666667, 470.16666666666674, 200, 619, 490.5, 578.0, 617.75, 619.0, 0.3176788267062, 0.06782473973500291, 0.29906483295388364], "isController": false}, {"data": ["http://159.89.38.11/broadcast-12", 24, 0, 0.0, 445.0416666666667, 235, 625, 488.0, 514.5, 598.25, 625.0, 0.3168735146554001, 0.03929974254026934, 0.3159709615130711], "isController": false}, {"data": ["http://159.89.38.11/broadcast-11", 24, 0, 0.0, 441.95833333333337, 231, 520, 483.0, 518.0, 519.5, 520.0, 0.3176830317550664, 0.039089904297986686, 0.3133655621665983], "isController": false}, {"data": ["http://159.89.38.11/broadcast-10", 24, 0, 0.0, 479.1666666666667, 239, 532, 503.0, 529.0, 531.5, 532.0, 0.31673133264708214, 0.03897280069680893, 0.3102616415261171], "isController": false}, {"data": ["http://159.89.38.11/message/template", 24, 1, 4.166666666666667, 1920.4583333333335, 1537, 2388, 1919.0, 2213.5, 2376.75, 2388.0, 0.31941228140221994, 4.072129677227235, 6.702225197303627], "isController": false}, {"data": ["http://159.89.38.11/broadcast-19", 24, 0, 0.0, 270.33333333333337, 221, 536, 250.0, 396.0, 533.0, 536.0, 0.31841640905894686, 0.03918014408342509, 0.3122232513632202], "isController": false}, {"data": ["http://159.89.38.11/broadcast-18", 24, 0, 0.0, 250.83333333333334, 231, 311, 250.0, 271.0, 303.25, 311.0, 0.31857702263224263, 0.03951101745536603, 0.3195362796177076], "isController": false}, {"data": ["http://159.89.38.11/broadcast-17", 24, 0, 0.0, 267.20833333333326, 228, 529, 247.5, 316.5, 476.0, 529.0, 0.31853051256868314, 0.03919418416372468, 0.32166708418496004], "isController": false}, {"data": ["http://159.89.38.11/broadcast-16", 24, 0, 0.0, 258.875, 221, 378, 252.5, 308.0, 366.25, 378.0, 0.31844175832924226, 0.03918326323191847, 0.3240652822190083], "isController": false}, {"data": ["http://159.89.38.11/broadcast-15", 24, 0, 0.0, 294.0416666666667, 231, 875, 256.0, 448.5, 786.0, 875.0, 0.3188097768331562, 0.039539884431455896, 0.32288311138416576], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 24, 1, 4.166666666666667, 1909.25, 1548, 2551, 1826.5, 2230.5, 2494.0, 2551.0, 0.31238610923100957, 3.9820585431092828, 6.549863209051387], "isController": false}, {"data": ["http://159.89.38.11/broadcast-22", 24, 0, 0.0, 268.4166666666667, 227, 524, 248.0, 370.0, 511.75, 524.0, 0.31842063365706097, 0.03918066390702118, 0.31129452084328396], "isController": false}, {"data": ["http://159.89.38.11/broadcast-21", 24, 0, 0.0, 311.3333333333333, 231, 530, 253.0, 516.0, 526.75, 530.0, 0.3183868400106129, 0.03886558105598302, 0.3121942574290263], "isController": false}, {"data": ["http://159.89.38.11/broadcast-20", 24, 0, 0.0, 256.5, 222, 517, 247.0, 265.0, 455.0, 517.0, 0.31814205042551497, 0.03914638511095204, 0.31475039933455284], "isController": false}, {"data": ["http://159.89.38.11/", 24, 3, 12.5, 66553.95833333333, 53698, 103461, 64237.5, 86561.5, 101615.5, 103461.0, 0.2190340597962983, 297.0505677060517, 4.472515788705143], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-5", 24, 0, 0.0, 452.25, 228, 527, 490.0, 521.5, 526.25, 527.0, 0.42760168902667167, 0.05219747180501363, 0.43306502440892974], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-4", 24, 0, 0.0, 416.4166666666667, 237, 524, 482.0, 522.5, 523.75, 524.0, 0.42729716737586126, 0.05257758114195168, 0.4219072698381612], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-3", 24, 0, 0.0, 438.95833333333337, 239, 531, 494.5, 523.0, 530.5, 531.0, 0.42729716737586126, 0.05257758114195168, 0.42983563524845547], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-2", 24, 0, 0.0, 420.62499999999994, 228, 516, 482.5, 514.0, 515.75, 516.0, 0.4291538516558186, 0.05280604034046205, 0.4220641517952936], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-1", 25, 0, 0.0, 343.76, 250, 776, 274.0, 559.4000000000001, 714.7999999999998, 776.0, 0.41256167797085663, 3.038081634610624, 0.36316708644817397], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-0", 25, 0, 0.0, 660.92, 279, 5633, 509.0, 550.8, 4108.699999999996, 5633.0, 0.41235753047322155, 8.839527974334867, 0.3693499286621472], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-9", 24, 0, 0.0, 719.2083333333334, 241, 6137, 497.0, 545.5, 4743.0, 6137.0, 0.39898922729086317, 8.500275863645431, 0.41030496180509374], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-8", 24, 0, 0.0, 165.79166666666666, 161, 176, 165.0, 173.0, 175.5, 176.0, 0.429938017269177, 0.16547785259395936, 0.20909094980473647], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-7", 24, 0, 0.0, 20.5, 13, 52, 17.0, 37.0, 50.5, 52.0, 0.43108867853358, 0.36737960950550536, 0.20922956370233325], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-6", 24, 0, 0.0, 159.29166666666669, 55, 194, 167.0, 186.0, 192.25, 194.0, 0.4299072116934762, 0.16593830607602192, 0.20781647440260811], "isController": false}, {"data": ["http://159.89.38.11/-21", 24, 0, 0.0, 2275.166666666666, 336, 11355, 1144.0, 6108.5, 10119.75, 11355.0, 0.6439322797885756, 2.694579901263717, 0.5776944541332403], "isController": false}, {"data": ["http://159.89.38.11/-22", 24, 0, 0.0, 3442.958333333333, 337, 11318, 1508.0, 10595.0, 11230.5, 11318.0, 0.6881720430107526, 4.84005376344086, 0.6146953405017921], "isController": false}, {"data": ["http://159.89.38.11/-20", 24, 0, 0.0, 7735.833333333333, 3460, 18766, 5760.5, 16038.5, 18195.0, 18766.0, 0.545404963185165, 26.465988887373875, 0.4935630851740751], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 24, 1, 4.166666666666667, 2432.916666666666, 1762, 7153, 2192.0, 3282.5, 6409.0, 7153.0, 0.3925994994356382, 15.740690331010454, 8.286891061818062], "isController": false}, {"data": ["http://159.89.38.11/message/template-6", 24, 0, 0.0, 62.41666666666668, 52, 175, 56.5, 65.0, 148.25, 175.0, 0.3279808677827127, 0.1267295866074479, 0.14253074820635464], "isController": false}, {"data": ["http://159.89.38.11/message/template-5", 24, 0, 0.0, 358.3333333333333, 235, 641, 255.5, 527.5, 614.5, 641.0, 0.3253928440690375, 0.03972080616077118, 0.3297091716718413], "isController": false}, {"data": ["http://159.89.38.11/message/template-4", 24, 0, 0.0, 351.75, 235, 641, 256.5, 528.5, 613.5, 641.0, 0.3253928440690375, 0.040038572610057346, 0.32144724399040087], "isController": false}, {"data": ["http://159.89.38.11/message/template-3", 24, 0, 0.0, 371.12500000000006, 230, 641, 260.5, 520.5, 612.0, 641.0, 0.3253928440690375, 0.040038572610057346, 0.3274848065268381], "isController": false}, {"data": ["http://159.89.38.11/message/template-9", 24, 0, 0.0, 488.45833333333337, 232, 582, 496.5, 536.5, 572.5, 582.0, 0.3256665988194586, 0.0403902910645227, 0.3239439158016148], "isController": false}, {"data": ["http://159.89.38.11/message/template-8", 24, 0, 0.0, 175.66666666666669, 54, 609, 166.5, 175.5, 500.75, 609.0, 0.325472273830673, 0.1254159518707875, 0.14239411980091946], "isController": false}, {"data": ["http://159.89.38.11/message/template-7", 24, 0, 0.0, 26.374999999999996, 10, 302, 12.5, 30.0, 234.25, 302.0, 0.32810641584753986, 0.2797502375353739, 0.15924696159787824], "isController": false}, {"data": ["http://159.89.38.11/-5", 24, 0, 0.0, 2821.791666666667, 338, 16995, 714.5, 8902.5, 15055.25, 16995.0, 0.6514834821792123, 1.8132108634870654, 0.6054639783924646], "isController": false}, {"data": ["http://159.89.38.11/-6", 24, 0, 0.0, 12193.666666666668, 995, 30312, 13083.0, 28817.5, 30293.75, 30312.0, 0.4829168175781722, 57.490995613505575, 0.1942985633224677], "isController": false}, {"data": ["http://159.89.38.11/-7", 24, 0, 0.0, 10605.083333333332, 19, 100172, 1503.0, 47344.0, 87299.75, 100172.0, 0.22074446069368944, 3.4794917473763602, 0.08903072486962281], "isController": false}, {"data": ["http://159.89.38.11/-8", 24, 0, 0.0, 6187.583333333334, 234, 34754, 2646.5, 25251.5, 33640.25, 34754.0, 0.49232789037498975, 11.478275390785264, 0.2000082054648396], "isController": false}, {"data": ["http://159.89.38.11/-9", 24, 1, 4.166666666666667, 57488.625, 31421, 93199, 58063.5, 68246.0, 87337.75, 93199.0, 0.2438776547098872, 118.84889667589677, 0.4241561928411747], "isController": false}, {"data": ["http://159.89.38.11/-0", 71, 0, 0.0, 21206.59154929577, 506, 69261, 3431.0, 61757.399999999994, 65560.4, 69261.0, 0.9939383758206992, 171.27897054757602, 0.7121785011829266], "isController": false}, {"data": ["http://159.89.38.11/-1", 71, 0, 0.0, 2372.5915492957743, 246, 30649, 1069.0, 4520.599999999999, 7778.999999999993, 30649.0, 0.9944952586388022, 8.3309359154609, 0.7313583570868293], "isController": false}, {"data": ["http://159.89.38.11/-2", 48, 1, 2.0833333333333335, 2360.9166666666656, 227, 11201, 1792.5, 4911.700000000005, 8893.85, 11201.0, 0.7977529957286975, 7.094681361041401, 0.5127971577972046], "isController": false}, {"data": ["http://159.89.38.11/-3", 24, 0, 0.0, 9556.083333333332, 979, 35899, 8140.5, 19641.0, 33070.75, 35899.0, 0.48766611126915105, 16.226327874182143, 0.4494084508473199], "isController": false}, {"data": ["http://159.89.38.11/-4", 24, 0, 0.0, 8004.750000000002, 737, 40258, 3683.5, 29142.5, 40049.75, 40258.0, 0.48383194903636806, 7.820689863720668, 0.43689773002177246], "isController": false}, {"data": ["http://159.89.38.11/message/template-2", 24, 0, 0.0, 359.75, 229, 524, 264.5, 520.0, 523.0, 524.0, 0.32663726931242854, 0.04019169524742773, 0.3214006529342915], "isController": false}, {"data": ["http://159.89.38.11/message/template-1", 24, 0, 0.0, 275.7083333333335, 257, 290, 276.5, 288.0, 289.5, 290.0, 0.32695765898316165, 2.483659567257915, 0.2877642482017329], "isController": false}, {"data": ["http://159.89.38.11/message/template-0", 24, 0, 0.0, 388.0416666666667, 266, 672, 294.0, 543.0, 643.0, 672.0, 0.32687750265587967, 0.3987809767508376, 0.2908326608509711], "isController": false}]}, function(index, item){
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
    createTable($("#errorsTable"), {"supportsControllersDiscrimination": false, "titles": ["Type of error", "Number of errors", "% in errors", "% in all samples"], "items": [{"data": ["Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, 7.6923076923076925, 0.041254125412541254], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 82,061)", 1, 7.6923076923076925, 0.041254125412541254], "isController": false}, {"data": ["Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, 23.076923076923077, 0.12376237623762376], "isController": false}, {"data": ["Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 518,560; received: 86,245)", 1, 7.6923076923076925, 0.041254125412541254], "isController": false}, {"data": ["Assertion failed", 7, 53.84615384615385, 0.2887788778877888], "isController": false}]}, function(index, item){
        switch(index){
            case 2:
            case 3:
                item = item.toFixed(2) + '%';
                break;
        }
        return item;
    }, [[1, 1]]);

        // Create top5 errors by sampler
    createTable($("#top5ErrorsBySamplerTable"), {"supportsControllersDiscrimination": false, "overall": {"data": ["Total", 2424, 13, "Assertion failed", 7, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 3, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 82,061)", 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 518,560; received: 86,245)", 1], "isController": false}, "titles": ["Sample", "#Samples", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors", "Error", "#Errors"], "items": [{"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template-17", 24, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-10", 24, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-14", 24, 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 150,941; received: 82,061)", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage-20", 24, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast-13", 24, 1, "Non HTTP response code: java.net.SocketException/Non HTTP response message: Socket closed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/message/template", 24, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/broadcast", 24, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/", 24, 3, "Assertion failed", 3, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/virtual/number/manage", 24, 1, "Assertion failed", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-9", 24, 1, "Non HTTP response code: org.apache.http.ConnectionClosedException/Non HTTP response message: Premature end of Content-Length delimited message body (expected: 518,560; received: 86,245)", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": ["http://159.89.38.11/-2", 48, 1, "Non HTTP response code: org.apache.http.NoHttpResponseException/Non HTTP response message: fonts.googleapis.com:443 failed to respond", 1, "", "", "", "", "", "", "", ""], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}, {"data": [], "isController": false}]}, function(index, item){
        return item;
    }, [[0, 0]], 0);

});
