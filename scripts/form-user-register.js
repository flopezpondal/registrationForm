// Tomar el elemento formulario

const userRegisterForm = document.getElementById('user-register');

const loginSection = document.getElementById('loginSection');
const logoutSection = document.getElementById('logout');
let user;

checkIsAuth();

function checkIsAuth(){    

    user = JSON.parse(localStorage.getItem('currentUser'));
    
    if(user){
        loginSection.classList.add('d-none');
        logoutSection.classList.remove('d-none');
        const welcomeHTML = document.querySelector('.welcome');
        welcomeHTML.textContent = `Bienvenido ${user.fullname}`;
    } else{
        loginSection.classList.remove('d-none');
        logoutSection.classList.add('d-none');
    }

}

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
        showErrorMsg('El correo ya existe', errorMSG);
        return;
    }

    if(elemento.password.value != elemento.password2.value) return showErrorMsg('Las constraseñas no coinciden', errorMSG);

    if (elemento.age.valueAsNumber < 18) return showErrorMsg('Debe ser mayor de 18 años para registrarse', errorMSG);

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

function showErrorMsg(message, element, time = 3000) {
    element.innerText = message;
    setTimeout(() => {
        element.innerText = null;
    }, time);
}

function renderUser() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    usersList.innerHTML = '';
    users.forEach(user => {
        usersList.innerHTML += `<li><img class="avatar" src="${user.avatar || ''}"></div>
        <div class="data">
            <div class="name">${user.fullname}</div>
            <div class="user">${user.username}</div>
            <div class="email">${user.email}</div>
        </div>
        <div class="age">${user.age}</div>
        <div class="role">${user.role}</div>
        </li>`
    });
}

// Obtener referencia al formulario de login
const loginForm = document.getElementById('login');
const formLoginError = document.getElementById('formLoginError');
//Detectar cuando se dispara el evento submit
// Obtener valores de email y password en el input
loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputEmail = loginForm.elements.email.value;
    const inputPassword = loginForm.elements.password.value;
    const user = users.find(usr => {
        return usr.email === inputEmail;
    });
    console.log('user', user);
    
    if(!user || user.password != inputPassword){
        showErrorMsg('Credenciales incorrectas', formLoginError);
        return;
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    loginForm.requestFullscreen();
    checkIsAuth();
    // window.location.href = '/index.html';
    setTimeout(() => window.location = '/pages/login/login.html', 3000);
    window.location.href = '/login.html';
})

function logout() {
    localStorage.removeItem('currentUser');
    checkIsAuth();
    setTimeout(() => window.location = '/pages/login/login.html', 3000);
    window.location.href = '/login.html';    
}