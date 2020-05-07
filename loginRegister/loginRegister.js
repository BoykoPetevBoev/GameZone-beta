import { putData, getData } from '../database/requesterDB.js';
import { loadPage, saveUserInfo } from '../events.js';


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
    addNewUser(ctx, firstName, lastName, email, phone, password)
        .then(res => {
            if (res) {
                saveUserInfo(res);
                ctx.redirect('#/home');
            }
        })
        .catch(err => console.log(err));
}
function login(ctx) {
    const errors = checkForEmpty('loginRequired');
    if (errors) { return false }

    const { email, password } = ctx.params;
    getData('users', email)
        .then(user => {
            if (user.password == password) {
                saveUserInfo(user);
                ctx.redirect('#/home');
            }
            else {
                errorMsg(true, 'loginPassword');
                errorMsg(true, 'loginEmail');
                return false
            }
        })
        .catch(err => {
            errorMsg(true, 'loginPassword');
            errorMsg(true, 'loginEmail');
            return false
        })
}
function logout(ctx) {
    sessionStorage.clear();
    ctx.redirect('#/home');
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
    operation == true
        ? element.classList.add(className)
        : element.classList.remove(className)
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
        img: '',
        shoppingCart: [],
        totalPrice: 0
    }
    return putData('users', user)
        .then(res => {
            return res;
        })
        .catch(err => {
            console.log(err);
        })
}

export { register, login, logout }
