var data = document.forms['data']
button = document.getElementById('button')
button.addEventListener('click', validate)

function validate(e) {
    e.preventDefault();
    var user = data.querySelector('input[type="text"]')
    var password = data.querySelector('input[type="password"]')
    if (user.value === 'amalia@laboratoria.la' && password.value === 'amalia@laboratoria.la') {
        window.location.href = 'dashboard.html'
    } else {
        alert('Ingresa una cuenta válida')
    }
}