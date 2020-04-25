#   Thesis work
Info...
 
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
const remoteUsersDB = new PouchDB('http://USERNAME:PASSWORD@localhost:5984/users', { skip_setup: true });
const remoteProductsDB = new PouchDB('http://USERNAME:PASSWORD@localhost:5984/products', { skip_setup: true });
usersDB.sync(remoteUsersDB)
productsDB.sync(remoteProductsDB)

//  Users ---------------
function addUsersDB(user) {...
}
function findUsersDB(user) {...
}
function showUserData() {...
}
function generateTable(data) {...
}
function fillLine(columnType, data) {...
}
function printTable(table) {...
}

// Products ----------------
function addProductsDB(item) {
}
function findProductDB(item) {
}
function updateProduct(id, obj) {
}
function getProductData() {
}
function showProductsData() {
}

window.showProductsData = showProductsData
window.showUserData = showUserData;
export { addUsersDB, findUsersDB, showUserData, addProductsDB, showProductsData, findProductDB, updateProduct }
```
#  

- index.html
- stykes.css
- events.js
- database 
    - database.css  
    -  database.hbs 
    - requesterDB.js    
- common    
    - common.css  
    - footer.hbs 
    - header.hbs 
    - userInfo.hbs 
- loginReguster 
    - login.hbs  
    - loginRegister.css 
    - loginRegister.js      
    - register.hbs
- homePage 
    - homePage.css 
    - homePage.hbs 
    - homePage.js              
    - menu.hbs
- products 
    - addProductForm.hbs 
    - changeProductForm.hbs
    - product.js              


