#   Thesis work
![Sitemap](https://github.com/BoykoPetevBoev/GameZone/blob/master/README/Sitemap.png)
| Page ID  | Template      | Page Name      |  URL              |
| -------- | ------------- | -------------- | ----------------  |
|   0.0    | homePage.hbs  |    Home        | /home             |
|   0.1    | homePage.hbs  |    Mouse       | /home/mouse       |
|   0.2    | homePage.hbs  |    Keyboard    | /home/keyboard    |
|   0.3    | homePage.hbs  |    Headset     | /home/headset     |
|   0.4    | homePage.hbs  |    Mousepad    | /home/mousepad    |
|   0.5    | homePage.hbs  |    Accessories | /home/accessories |
|   1.0    | login.hbs     |    Login       | /login            |
|   2.0    | register.hbs  |    Register    | /register         |
 
## PushNotifications 

A push notification is the delivery of information to a computing device from an application server where the request for the transaction is initiated by the server rather than by an explicit request from the client. While 'push notification' is most often used to refer to notifications on mobile devices, web applications also leverage this technology.

* Push notifications are the first and often most important communications channel used by apps.
* Nearly every major app uses push notifications for transactions and re-engagement.
* Push notification technology is rapidly evolving from a simple message delivery system to a rich and interactive medium.
 
![PushNotifications](https://github.com/BoykoPetevBoev/GameZone/blob/master/README/ReadmePushNotifications.jpg)

```
'use strict';

const applicationServerPublicKey = 'BKTY4jTJ_YSMRf4miX6GE74Z1Jg_ANPdowdcsric6mj8Wa6R2F77Sh_xWcGuA5k5iLlAB';
let isSubscribed = false;
let swRegistration = null;

function something() {...
}
function main(pushButton) {...
}
function urlB64ToUint8Array(base64String) {...
}
function initializeUI(pushButton) {...
}
function updateBtn(pushButton) {...
}
function subscribeUser(pushButton) {...
}
function updateSubscriptionOnServer(subscription) {...
}

window.something = something;
export { something }
```
#  

## PouchDB & CouchDB

Use PouchDB as a local database and CouchDB as a cloud database. 
Live sync set. Each entry in CouchDB automatically generates an entry in PouchDB.

![CouchDB](https://github.com/BoykoPetevBoev/GameZone/blob/master/README/ReadmeCouchDB.jpg)
```
'use strict';

const usersDB = new PouchDB('users');
const productsDB = new PouchDB('items');
const remoteUsersDB = new PouchDB('http://BoykoBoev:ma78lmts2@localhost:5984/users', { skip_setup: true });
const remoteProductsDB = new PouchDB('http://BoykoBoev:ma78lmts2@localhost:5984/products', { skip_setup: true });
usersDB.sync(remoteUsersDB);
productsDB.sync(remoteProductsDB);
const db = {
    users: usersDB,
    products: productsDB
};

function getData(name, id) {...
}
function putData(name, obj) {...
}
function getAllData(name) {...
}
function errorHandler(err) {...
}

export { getData, putData, getAllData }
```
#  

## Sammy

Sammy is a tiny javascript framework built on top of jQuery inspired by Ruby's Sinatra.
Like Sinatra, a Sammy application revolves around 'routes'. Routes in Sammy are a little different, though. Not only can you define 'get' and 'post' routes, but you can also bind routes to custom events triggered by your application.

```
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
        });
    })
    app.run();
})()
```
#

## Handlebars

Handlebars is a simple templating language.
It uses a template and an input object to generate HTML or other text formats. Handlebars templates look like regular text with embedded Handlebars expressions.
```
<p>{{firstname}} {{lastname}}</p>
```
A handlebars expression is a {{, some contents, followed by a }}. When the template is executed, these expressions are replaced with values from an input object.
