var classroomTab = document.getElementById('classroom');
var feedbackTab = document.getElementById('feedback');
var studentsTab = document.getElementById('students');
var teachersTab = document.getElementById('teachers');
var getIndex = document.getElementById('filter');

//Función para mostrar el contenido de la tab seleccionada y ocultar las demás
function showHide(e) {
    var selectedTab = e.target.dataset.selectedtab;
    if (selectedTab === 'tab-aula') {
        classroomTab.style.display = 'block';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'none';
    } else if (selectedTab === 'tab-feedback') {
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'block';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'none';
    } else if (selectedTab === 'tab-alumnas') {
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'block';
        teachersTab.style.display = 'none';
    } else if (selectedTab === 'tab-profesores') {
        classroomTab.style.display = 'none';
        feedbackTab.style.display = 'none';
        studentsTab.style.display = 'none';
        teachersTab.style.display = 'block';
    }
}

//Función para recargar la página, acceder a cada tab y crear un evento para cada una de ellas.
function pageLoad() {
    classroomTab.style.display = 'none';
    feedbackTab.style.display = 'none';
    studentsTab.style.display = 'none';
    teachersTab.style.display = 'none';
    var tabElements = document.getElementsByClassName('tab');
    for (var i = 0; i < tabElements.length; i++) {
        tabElements[i].addEventListener('click', showHide);
    }
}
pageLoad();
//Variable para asignarle evento al select
getIndex.addEventListener('change', select);

function select() {
    var selectedIndex = (event.target.selectedIndex);
    var searchInput = document.getElementById('search-input');
    searchInput.style.display = 'inline-block';
    var teachers = document.getElementById('container');
    teachers.style.display = 'inline-block';
    var classroom = document.getElementById('classroom');
    classroom.style.display = 'inline-block';
    var feedback = document.getElementById('feedback');
    feedback.style.display = 'inline-block';

    var city = event.target[selectedIndex].dataset.city;
    var classyear = event.target[selectedIndex].dataset.classyear;
    getData(city, classyear);
    getLength(city, classyear);
    getActive(city, classyear);
    getMeetTarget(city, classyear)
}

//Función para acceder a los datos
function getData(city, classyear) {
    var students = data[city][classyear]['students'];
    document.getElementById("student-container").innerHTML = "";
    for (var i = 0; i < students.length; i++) {
        var name = students[i]['name'];
        var photo = students[i]['photo'];
        var status = students[i]['active'];
        if (status === true) {
            status = 'Activa';
        } else if (status === false) {
            status = 'Inactiva';
        }
        paintStudents(name, photo, status);
    }
}

//Función para mostrar a las estudiantes según la opción seleccionada en el select
function paintStudents(name, photo, status) {
    var studentContainer = document.getElementById('student-container');
    var studentName = document.createElement('p');
    var studentPhoto = document.createElement('img');
    var studentStatus = document.createElement('p');
    var studentDiv = document.createElement('div');
    var studentLink = document.createElement('a');
    studentDiv.classList.add('container-students');
    studentPhoto.src = photo;
    studentLink.href = 'views/perfil-alumna/index.html';
    studentName.innerText = name;
    studentStatus.innerText = status;
    studentContainer.appendChild(studentDiv);
    studentDiv.appendChild(studentLink);
    studentLink.appendChild(studentPhoto);
    studentDiv.appendChild(studentName);
    studentDiv.appendChild(studentStatus);
}

//Función para hacer la búsqueda de estudiantes
var searchStudent = document.forms['search-student'].querySelector('input');
searchStudent.addEventListener('keyup', searching)

function searching(e) {
    var searched = e.target.value.toLowerCase();
    studentArray = Array.from(document.getElementsByClassName('container-students'));
    studentArray.forEach(function(eachStudent) {
        var studentName = eachStudent.children[1].textContent;
        if (studentName.toLowerCase().indexOf(searched) !== -1) {
            eachStudent.style.display = 'inline-block';
        } else {
            eachStudent.style.display = 'none';
        }
    })
}

function getLength(city, classyear) {
    console.log(data[city][classyear]['students'].length);
}

function getActive(city, classyear) {
    countActive = 0
    for (var i = 0; i < data[city][classyear]['students'].length; i++) {
        if (data[city][classyear]['students'][i]['active'] === true) {
            countActive = countActive + 1;
        }
    }
    console.log(countActive);
}

function getMeetTarget(city, classyear) {
    for (var i = 0; i < data[city][classyear]['students'].length; i++) {
        data[city][classyear]['students'][i]['sprints']
    }
}