// Tomar el elemento formulario

const userRegisterForm = document.getElementById('user-register');
const formEl = userRegisterForm.elements;
const errorMSG = document.getElementById('form-error');
const usersList = document.getElementById('users-list');

// Tomar el elemento input uno por uno

const fullname = document.getElementById('fullname');
const username = document.getElementById('username');
const email = document.getElementById('email');

let users = JSON.parse(localStorage.getItem('users')) || [];

console.log(users);
renderUser();

function registrarUsuario(ev) {
    ev.preventDefault();
    const elemento = ev.target.elements;
    const email = elemento.email.value;

    const emailExist = users.some(usr => email === usr.email);

    if (emailExist) {
        showErrorMsg('El correo ya existe');
        return;
    }

    if(elemento.password.value != elemento.password2.value) return showErrorMsg('Las constraseñas no coinciden');

    if (elemento.age.valueAsNumber < 18) return showErrorMsg('Debe ser mayor de 18 años para registrarse');

    console.log(ev);
    const user = {
        fullname: elemento.fullname.value,
        username: elemento.username.value,
        email: elemento.email.value,
        age: elemento.age.valueAsNumber,
        gen: elemento.gen.value,
        password: elemento.password.value,
        id: Date.now(),
        createdAt: new Date(),
        role: 'CLIENT',
        avatar: elemento.avatar.value
    }
    users.push(user);
    console.log(users);
    localStorage.setItem('users', JSON.stringify(users));
    renderUser();
}

function showErrorMsg(message, time = 3000) {
    errorMSG.innerText = message;
    setTimeout(() => {
        errorMSG.innerText = null;
    }, time);
}

function renderUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    usersList.innerHTML = '';
    users.forEach(user => {
        usersList.innerHTML += `<li>${user.fullname}</li>`
    });
}