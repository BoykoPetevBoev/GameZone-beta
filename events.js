
import { showUserData, updateProduct, getProductData } from './database/requesterDB.js';
import { register, login, logout } from './loginRegister/loginRegister.js';
import { productForm, loadChangeProductPage, loadProductPage } from './products/product.js';
import { loadPageCategory, loadHomеPage } from './homePage/homePage.js';
// import { pushNotifications } from "./pushNotifications/pushNotifications.js"

const commonPaths = {
    header: './common/header.hbs',
    footer: './common/footer.hbs',
    menu: './homePage/menu.hbs',
    userInfo: './common/userInfo.hbs'
};
const templatesPaths = {
    '/#/login': './LoginRegister/login.hbs',
    '/#/register': './LoginRegister/register.hbs',
    '/#/productForm': './products/addProductForm.hbs',
    '/#/database': './database/databaseInfo.hbs',
    '/#/home/mouse': './homePage/homePage.hbs',
    '/#/home/keyboard': './homePage/homePage.hbs',
    '/#/home/headset': './homePage/homePage.hbs',
    '/#/home/mousepad': './homePage/homePage.hbs',
    '/#/home/accessoaries': './homePage/homePage.hbs'
};
function saveUserInfo(res) {
    sessionStorage.setItem('email', res._id);
    sessionStorage.setItem('code', res._rev);
    sessionStorage.setItem('firstName', res.firstName);
    sessionStorage.setItem('lastName', res.lastName);
    sessionStorage.setItem('phone', res.phone);
    sessionStorage.setItem('address', res.address);
    if (res._id == 'admin') {
        sessionStorage.setItem('admin', true);
    }
}
function getUserInfoFrom(ctx) {
    ctx.email = sessionStorage.getItem('email');
    ctx.code = sessionStorage.getItem('code');
    ctx.firstName = sessionStorage.getItem('firstName');
    ctx.lastName = sessionStorage.getItem('lastName');
    ctx.phone = sessionStorage.getItem('phone');
    ctx.address = sessionStorage.getItem('address');
    ctx.admin = sessionStorage.getItem('admin');
}
(() => {
    const app = Sammy('#eventsHolder', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function (ctx) { ctx.redirect('/') });
        this.get('/', function (ctx) { ctx.redirect('#/home') });
        this.get('#/home', loadHomеPage);
        this.get('#/register', loadPage);
        this.post('#/register', register);
        this.get('#/login', loadPage);
        this.post('#/login', login);
        this.get('#/logout', logout);
        this.get('#/productForm', loadPage);
        this.post('#/productForm', productForm);
        this.get('#/database', loadPage);
        this.get('#/home/mouse', loadPageCategory);
        this.get('#/home/keyboard', loadPageCategory);
        this.get('#/home/headset', loadPageCategory);
        this.get('#/home/mousepad', loadPageCategory);
        this.get('#/home/accessoaries', loadPageCategory);
        this.get('#/home/mouse/:id', loadProductPage);
        this.get('#/home/keyboard/:id', loadProductPage);
        this.get('#/home/headset/:id', loadProductPage);
        this.get('#/home/mousepad/:id', loadProductPage);
        this.get('#/home/accessoaries/:id', loadProductPage);
        this.get('#/productForm/:id', loadChangeProductPage);
        this.post('#/changeProductInfo', function (ctx) {
            updateProduct(ctx.params._id, ctx.params)
                .then(res => ctx.redirect('#/home'))
                .catch(err => console.log(err))
        });
    })
    app.run();
})()

function loadPage(ctx, p) {
    let path = '';
    templatesPaths.hasOwnProperty(ctx.path)
        ? path = templatesPaths[ctx.path]
        : path = p;
    getUserInfoFrom(ctx);
    ctx.loadPartials(commonPaths)
        .partial(path);
};


export { loadPage, saveUserInfo, getUserInfoFrom }

