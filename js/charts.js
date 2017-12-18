getIndex.addEventListener('change', getAndDraw);

function getAndDraw(e) {
    e.preventDefault();
    google.charts.load('current', { 'packages': ['corechart'] });
    var selectedIndex = (event.target.selectedIndex);
    var city = event.target[selectedIndex].dataset.city;
    var classyear = event.target[selectedIndex].dataset.classyear;
    var totalStudentsGeneration = data[city][classyear]['students'].length;
    var numberCity = document.getElementById('number-city')
    var numberGeneration = document.getElementById('number-generation')
    var totalStudentsCity = 0
    if (data[city]['2017-2'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2017-2']['students'].length
    }
    if (data[city]['2017-1'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2017-1']['students'].length
    }
    if (data[city]['2016-2'] !== undefined) {
        totalStudentsCity = totalStudentsCity + data[city]['2016-2']['students'].length
    }
    numberCity.innerText = totalStudentsCity
    numberGeneration.innerText = totalStudentsGeneration
    countActive = 0
    for (var j = 0; j < data[city][classyear]['students'].length; j++) {
        if (data[city][classyear]['students'][j]['active'] === true) {
            countActive = countActive + 1;
        }
    }
    countInactive = totalStudentsGeneration - countActive;
    var numberCity = document.getElementById('number-city')
    var numberGeneration = document.getElementById('number-generation')
    numberGeneration.innerText = totalStudentsGeneration
        //
    var ratings = data[city][classyear]['ratings'];
    var arrayScoreJedi = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayScoreJedi[i] = ratings[i].jedi;
    }
    var arrayScoreTeachers = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayScoreTeachers[i] = ratings[i].teacher;
    }

    var arrayRecommend = [];
    for (var i = 0; i < ratings.length; i++) {
        arrayRecommend[i] = 100 - ratings[i]['student']['no-cumple']
    }

    var arrayPromoters = [];
    var arrayPassive = [];
    var arrayDetractors = [];

    for (var i = 0; i < ratings.length; i++) {
        arrayPromoters[i] = ratings[i]['nps']['promoters'];
        arrayPassive[i] = ratings[i]['nps']['passive'];
        arrayDetractors[i] = ratings[i]['nps']['detractors'];
    }

    promoters = eval(arrayPromoters.join('+')) / arrayPromoters.length
    passive = eval(arrayPassive.join('+')) / arrayPassive.length
    detractors = eval(arrayDetractors.join('+')) / arrayDetractors.length


    //
    // gráficas
    google.charts.setOnLoadCallback(drawActiveChart);
    google.charts.setOnLoadCallback(drawTargetChart);
    google.charts.setOnLoadCallback(drawJediChart);
    google.charts.setOnLoadCallback(drawRecommendChart);
    google.charts.setOnLoadCallback(drawNPSChart);
    google.charts.setOnLoadCallback(drawTeacherChart);

    // gráfica de estudiantes activas - inactivas
    function drawActiveChart() {
        var activeData = new google.visualization.DataTable();
        activeData.addColumn('string', 'Estudiantes');
        activeData.addColumn('number', 'Numero');
        activeData.addRows([
            ['Inactivas', countInactive],
            ['Activas', countActive],
        ]);
        var options = {
            'title': 'Estudiantes activas',
            'width': 500,
            'height': 400,
            'pieHole': 0.4,
        };
        var activeChart = new google.visualization.PieChart(document.getElementById('chart-active'));
        activeChart.draw(activeData, options);
    }

    // gráfica de estudiantes que cumplen la meta 
    function drawTargetChart() {
        var targetData = new google.visualization.DataTable();
        targetData.addColumn('string', 'Estudiantes');
        targetData.addColumn('number', 'Numero');
        targetData.addRows([
            ['Cumplen meta', countInactive],
            ['No cumplen meta', countActive],
        ]);
        var options = {
            'title': 'Net Promoter Score',
            'width': 550,
            'height': 400,
        };
        var targetChart = new google.visualization.PieChart(document.getElementById('chart-target'));
        targetChart.draw(targetData, options);
    }

    function drawNPSChart() {
        var NPSData = new google.visualization.DataTable();
        NPSData.addColumn('string', 'Estudiantes');
        NPSData.addColumn('number', 'Numero');
        NPSData.addRows([
            ['Promotoras', promoters],
            ['Pasivas', passive],
            ['Detractoras', detractors],
        ]);
        var options = {
            'title': 'Net Promote Score',
            'width': 500,
            'height': 400,
            'pieHole': 0.4,
        };
        var activeChart = new google.visualization.PieChart(document.getElementById('chart-nps'));
        activeChart.draw(NPSData, options);
    }

    // Gráfica de estudiantes satisfechas
    function drawRecommendChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Porcentaje'],
            ['1', arrayRecommend[0]],
            ['2', arrayRecommend[1]],
            ['3', arrayRecommend[2]],
            ['4', arrayRecommend[3]]
        ]);

        var options = {
            title: 'Porcentaje de estudiantes satisfechas',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 550,

        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart-recommend'));
        chart.draw(data, options);
    }

    // gráfica de rating de jedi y teachers
    function drawJediChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Puntaje'],
            ['1', arrayScoreJedi[0]],
            ['2', arrayScoreJedi[1]],
            ['3', arrayScoreJedi[2]],
            ['4', arrayScoreJedi[3]],
        ]);
        var options = {
            title: 'Puntaje Jedis',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 500,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-jedi'));
        chart.draw(data, options);
    }

    function drawTeacherChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Puntaje'],
            ['1', arrayScoreTeachers[0]],
            ['2', arrayScoreTeachers[1]],
            ['3', arrayScoreTeachers[2]],
            ['4', arrayScoreTeachers[3]],
        ]);
        var options = {
            title: 'Puntaje Teachers',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 500,
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart-teacher'));
        chart.draw(data, options);
    }

}