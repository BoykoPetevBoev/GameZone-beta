import { addUsersDB, findUsersDB, showUserData } from '../database/requesterDB.js'

function register(ctx) {
    let errors = checkForEmpty('registerRequired');
    if (errors) { return }

    const { firstName, lastName, email, phone, password, rePassword } = ctx.params;
    if (firstName.length <= 2 || 50 <= firstName.length) {
        errorMsg(true, 'registerFirstName');
        errors = true;
    }
    if (lastName.length <= 2 || 50 <= lastName.length) {
        errorMsg(true, 'registerLasttName');
        errors = true;
    }
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        errorMsg(true, 'registerEmail');
        errors = true;
    }
    if (phone.length != 10 && !Number(phone)) {
        errorMsg(true, 'registerPhone');
        errors = true;
    }
    if (password.length < 3 || 15 < password.length) {
        errorMsg(true, 'registerPassword');
        errors = true;
    }
    if (password != rePassword) {
        errorMsg(true, 'registerRePassword');
        errors = true;
    }
    if (errors) { return }
    addNewUser(ctx, firstName, lastName, email, phone, password);
}

function login(ctx) {
    const errors = checkForEmpty('loginRequired');
    if (errors) { return }

    const { email, password } = ctx.params;
    findUsersDB(email)
        .then(user => {
            if (user.password == password) {
                console.log(user)
                saveUserInfo(user);
                loadPage(ctx, './templates/pages/homePage.hbs');
                return user
            }
            else {
                errorMsg(true, 'loginPassword');
                errorMsg(true, 'loginEmail');
            }
        })
        .then(res => {
            console.log(res)
            printUserInfo(res)
        })
        .catch(err => {
            errorMsg(true, 'loginPassword');
            errorMsg(true, 'loginEmail');
        })
}

function logout(ctx) {
    sessionStorage.clear();
    ctx.redirect('/home');
}


function errorMsg(error, elementID) {
    const element = document.getElementById(elementID);
    const msg = {
        loginEmail: 'Invalid email!',
        loginPassword: 'Invalid password!',
        registerFirstName: 'Your first name must be between 2 and 50 characters!',
        registerLasttName: 'Your last name must be between 2 and 50 characters!',
        registerEmail: 'Enter a valid email address!',
        registerPhone: 'Enter a valid phone number!',
        registerPassword: 'Password must be between 3 and 15 caracter long!',
        registerRePassword: 'Password and Repeat password must be the same!'
    }
    if (error) {
        classList(true, element, 'errorBox')
        element.value = '';
        element.placeholder = msg[elementID];
    }
    else {
        classList(false, element, 'errorBox')
    }
}
function checkForEmpty(elementsClass) {
    let errors = false;
    const msg = {
        email: 'Enter your email!',
        password: 'Enter your password!',
        firstName: 'Enter your first name!',
        lastName: 'Enter your last name!',
        phone: 'Enter your phone number!',
        rePassword: 'Repeat your password!'
    }
    const inputs = document.getElementsByClassName(elementsClass);
    for (let input of inputs) {
        if (input.value == '') {
            classList(true, input, 'errorBox');
            input.placeholder = msg[input.name];
            errors = true;
        }
        else {
            classList(false, input, 'errorBox');
        }
    }
    return errors;
}
function classList(operation, element, className) {
    if (operation == true) {
        element.classList.add(className);
    }
    else {
        element.classList.remove(className);
    }
}
function addNewUser(ctx, firstName, lastName, email, phone, password) {
    const user = {
        _id: email,
        date: new Date(),
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        password: password,
        address: '',
        img: ''
    }
    addUsersDB(user)
        .then(res => {
            saveUserInfo(res);
            loadPage(ctx, './templates/homePages/homePage.hbs');
        })
        .catch(err => {
            console.log(err);
        })
}
function saveUserInfo(res) {
    sessionStorage.setItem('email', res._id);
    sessionStorage.setItem('code', res._rev);
    sessionStorage.setItem('firstName', res.firstName);
    sessionStorage.setItem('lastName', res.lastName);
    sessionStorage.setItem('phone', res.phone);
    sessionStorage.setItem('address', res.address);
    if (res._id == 'admin') {
        sessionStorage.setItem('admin', true)
    }
}
function loadPage(ctx, path) {
    getUserInfo(ctx);
    ctx.loadPartials(templatesPaths)
        .partial(path)
}


export { register, login, logout }
