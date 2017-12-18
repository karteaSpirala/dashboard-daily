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
    var arrayRatings = data[city][classyear]['ratings'];
    var arrayScoreJedi = [];
    for (var i = 0; i < arrayRatings.length; i++) {
        arrayScoreJedi[i] = arrayRatings[i].jedi;
    }
    var arrayScoreTeachers = [];
    for (var i = 0; i < arrayRatings.length; i++) {
        arrayScoreTeachers[i] = arrayRatings[i].teacher;
    }

    //
    // gráficas
    google.charts.setOnLoadCallback(drawActiveChart);
    google.charts.setOnLoadCallback(drawTargetChart);
    google.charts.setOnLoadCallback(drawJediChart);

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
            'colors': ['#c0c0c0', '#FFBF43'],
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
            'title': 'Estudiantes que cumplen meta',
            'width': 500,
            'height': 400,
            'colors': ['#c0c0c0', '#FFBF43'],
        };
        var targetChart = new google.visualization.PieChart(document.getElementById('chart-target'));
        targetChart.draw(targetData, options);
    }

    function drawJediChart() {
        var data = google.visualization.arrayToDataTable([
            ['Sprint', 'Jedis', 'Teachers'],
            ['1', arrayScoreJedi[0], arrayScoreTeachers[0]],
            ['2', arrayScoreJedi[1], arrayScoreTeachers[1]],
            ['3', arrayScoreJedi[2], arrayScoreTeachers[2]],
            ['4', arrayScoreJedi[3], arrayScoreTeachers[3]]
        ]);

        var options = {
            title: 'Puntaje Jedis y Teachers',
            hAxis: { title: 'Sprint', titleTextStyle: { color: '#333' } },
            vAxis: { minValue: 0 },
            height: 400,
            width: 500,

        };

        var chart = new google.visualization.ColumnChart(document.getElementById('chart-jedi'));
        chart.draw(data, options);
    }
}