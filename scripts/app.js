import { get, post, put, del } from './requester.js'

function saveUserInfo(res) {
    sessionStorage.setItem('username', res.username);
    sessionStorage.setItem('authtoken', res._kmd.authtoken);
    sessionStorage.setItem('id', res._id);
}
function getUserInfo(ctx) {
    ctx.username = sessionStorage.getItem('username');
    ctx.loggedIn = sessionStorage.getItem('authtoken');
    ctx.id = sessionStorage.getItem('id');
}
const templatesPaths = {
    header: 'SoftBay/templates/common/header.hbs',
    footer: 'SoftBay/templates/common/footer.hbs',
    notifications: 'SoftBay/templates/common/notifications.hbs'
};
const notifications = {
    error: () => document.getElementById('errorNotification'),
    loading: () => document.getElementById('loadingNotification'),
    success: () => document.getElementById('successNotification')
};

(() => {
    const app = Sammy('#body', function () {
        this.use('Handlebars', 'hbs');

        this.get('index.html', function (ctx) {
            ctx.redirect('/home');
        });
        this.get('/home', function (ctx) {
            loadPage(ctx, 'SoftBay/templates/page/homePage.hbs');
        });
        this.get('/login', function (ctx) {
            loadPage(ctx, 'SoftBay/templates/forms/login.hbs');
        });
        this.post('/login', function (ctx) {
            const { username, password } = ctx.params;
            if (ctx.params.username.length < 1) {
                notificationHandler('error', 'Invalid username.');
            }
            else if (ctx.params.password.length < 1) {
                notificationHandler('error', 'Invalid password.');
            }
            else {
                notificationHandler('loading');
                post('user', 'login', 'Basic', { username, password })
                    .then(res => saveUserInfo(res))
                    .then(res => ctx.redirect('/home'))
                    .catch(err => notificationHandler('error', 'Invalid credentials. Please retry your request with correct credentials.'));
            }
        });
        this.get('/register', function (ctx) {
            loadPage(ctx, 'SoftBay/templates/forms/register.hbs');
        });
        this.post('/register', function (ctx) {
            const { username, password, rePassword } = ctx.params
            if (username.length < 5) {
                notificationHandler('error', 'Username must be at least 5 symbols.');
            }
            else if (password.length < 5) {
                notificationHandler('error', 'Password must be at least 5 symbols.');
            }
            else if (password != rePassword) {
                notificationHandler('error', 'Password and re-password must be the same.');
            }
            else {
                notificationHandler('loading')
                post('user', '', 'Basic', { username, password })
                    .then(res => saveUserInfo(res))
                    .then(res => ctx.redirect('/home'))
                    .catch(err => notificationHandler('error', 'Invalid credentials. Please retry your request with different credentials.'));
            }
        });
        this.get('/logout', function (ctx) {
            notificationHandler('loading');
            post('user', '_logout', 'Kinvey', {})
                .then(res => sessionStorage.clear())
                .then(res => ctx.redirect('/home'))
        });
        this.get('/profile', function(ctx){
            loadPage(ctx, 'SoftBay/templates/page/profile.hbs')
        });
        this.get('/dashboard', function(ctx){
            loadPage(ctx, 'SoftBay/templates/page/dashboard.hbs')
        });
        this.get('/createOffer', function(ctx){
            loadPage(ctx, 'softBay/templates/forms/createOffer.hbs')
        });
    });
    function notificationHandler(type, text) {
        notifications.error().style.display = 'none';
        notifications.loading().style.display = 'none';
        notifications.success().style.display = 'none';
        if (type === 'error') {
            notifications.error().innerHTML = text;
            notifications.error().style.display = 'block';
        }
        if (type === 'loading') {
            notifications.loading().style.display = 'block';
        }
        if (type === 'success') {
            notifications.success().innerHTML = text;
            notifications.success().style.display = 'block';
        }
    }
    function loadPage(ctx, path) {
        getUserInfo(ctx);
        ctx.loadPartials(templatesPaths)
            .then(function () {
                this.partial(path)
            })
    }
    app.run();
})()
