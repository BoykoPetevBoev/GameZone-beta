import { showUserData, updateProduct } from './database/requesterDB.js';
import { register, login, logout } from './loginRegister/loginRegister.js';
import { productForm, changeProduct, loadProductPage } from './products/product.js';
import { getProductsData, loadProductCategory } from './homePage/homePage.js';
// import { pushNotifications } from "./pushNotifications/pushNotifications.js"

const templatesPaths = {
    header: './common/header.hbs',
    footer: './common/footer.hbs',
    menu: './homePage/menu.hbs',
    userInfo: './common/userInfo.hbs'
};
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
function getUserInfoFrom(ctx) {
    ctx.email = sessionStorage.getItem('email');
    ctx.code = sessionStorage.getItem('code');
    ctx.firstName = sessionStorage.getItem('firstName')
    ctx.lastName = sessionStorage.getItem('lastName')
    ctx.phone = sessionStorage.getItem('phone')
    ctx.address = sessionStorage.getItem('address')
    ctx.admin = sessionStorage.getItem('admin')
}
(() => {
    const app = Sammy('#eventsHolder', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function (ctx) {
            ctx.redirect('/');
        });
        this.get('#/home', function (ctx) {
            ctx.redirect('/');
        });
        this.get('/', function (ctx) {
            loadHomеPage(ctx);
        });
        this.post('/register', function (ctx) {
            const success = register(ctx)
            if (success) {
                success
                    .then(res => {
                        if (res) {
                            saveUserInfo(res);
                            ctx.redirect('#/home');
                        }
                    })
                    .catch(err => console.log(err));
            }
        });
        this.get('/logout', function (ctx) {
            logout(ctx);
            ctx.redirect('#/home');
        });
        this.post('/login', function (ctx) {
            const success = login(ctx);
            if (success) {
                success
                    .then(res => {
                        if (res) {
                            saveUserInfo(res);
                            ctx.redirect('#/home');
                        }
                    })
                    .catch(err => console.log(err))
            }
        });
        this.get('/login', function (ctx) {
            loadPage(ctx, './LoginRegister/login.hbs');
        });
        this.get('/register', function (ctx) {
            loadPage(ctx, './LoginRegister/register.hbs');
        });
        this.get('#/addProduct', function (ctx) {
            loadPage(ctx, './products/addProductForm.hbs');
        });
        this.post('#/addProduct', productForm)
        this.get('#/database', function (ctx) {
            loadPage(ctx, './database/databaseInfo.hbs');
        });
        this.get('/mouse', function(ctx){
            getUserInfoFrom(ctx)
            loadProductCategory(ctx)
                .then(data => {
                    ctx.data = data.slice(0);
                    loadPage(ctx, './homePage/homePage.hbs');
                })
                .catch(err => console.log(err));
        });
        this.get('/keyboard', function(ctx){
            getUserInfoFrom(ctx)
            loadProductCategory(ctx)
                .then(data => {
                    ctx.data = data.slice(0);
                    loadPage(ctx, './homePage/homePage.hbs');
                })
                .catch(err => console.log(err));
        });
        this.get('/headset', function(ctx){
            getUserInfoFrom(ctx)
            loadProductCategory(ctx)
                .then(data => {
                    ctx.data = data.slice(0);
                    loadPage(ctx, './homePage/homePage.hbs');
                })
                .catch(err => console.log(err));
        });
        this.get('/mousepad', function(ctx){
            getUserInfoFrom(ctx)
            loadProductCategory(ctx)
                .then(data => {
                    ctx.data = data.slice(0);
                    loadPage(ctx, './homePage/homePage.hbs');
                })
                .catch(err => console.log(err));
        });
        this.get('/accessoaries', function(ctx){
            getUserInfoFrom(ctx)
            loadProductCategory(ctx)
                .then(data => {
                    ctx.data = data.slice(0);
                    loadPage(ctx, './homePage/homePage.hbs');
                })
                .catch(err => console.log(err));
        });
        this.get('/mouse/:id', function(ctx) {
            // loadProductPage(ctx)
            //     .then(ctx => loadPage(ctx, './products/productPage.hbs'))
            //     .catch(err => console.log(err))
                loadPage(ctx, './products/changeProductInfo.hbs')
        } )
        this.get('/keyboard/:id', loadProductPage)
        this.get('/headset/:id', loadProductPage)
        this.get('/mousepad/:id', loadProductPage)
        this.get('/accessoaries/:id', loadProductPage)
        
        this.get('/:id', function (ctx) {
            changeProduct(ctx)
                .then(ctx => {
                    loadPage(ctx, './homePage/homePage.hbs')
                })
                .catch(err => console.log(err))
        });
        this.post('#/changeProductInfo', function (ctx) {
            updateProduct(ctx.params._id, ctx.params)
                .then(res => ctx.redirect('#/home'))
                .catch(err => console.log(err))
        });
    })
    app.run();
})()
function loadHomеPage(ctx) {
    getUserInfoFrom(ctx)
    getProductsData(ctx)
        .then(data => {
            ctx.data = data.rows.slice(0);
            loadPage(ctx, './homePage/homePage.hbs');
        })
        .catch(err => console.log(err));
}
function loadPage(ctx, path) {
    console.log(ctx)
    console.log(path)
    getUserInfoFrom(ctx);
    ctx.loadPartials(templatesPaths)
        .partial(path);
};


export { loadPage }
