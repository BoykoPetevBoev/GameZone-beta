
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

function getData(name, id) {
    return db[name].get(id)
        .then(res => { return res; })
        .catch(errorHandler);
}
function putData(name, obj) {
    return db[name].put(obj)
        .then(res => { return res; })
        .catch(errorHandler);
}
function getAllData(name) {
    return db[name].allDocs({
        include_docs: true,
        attachments: true
    })
        .then(res => { return res; })
        .catch(errorHandler);
}
function errorHandler(err) {
    console.log(err);
    return err;
}


//  Users ---------------
function showUserData() {
    getAllData('usersDB')
        .then(res => {
            const table = generateTable(res.rows);
            printTable(table);
        })
        .catch(err => { console.log(err); })
}
function generateTable(data) {
    const table = [];
    const headers = Object.keys(data[0].doc)
    table.push(fillLine('th', headers));
    data.map(line => {
        const info = Object.values(line.doc);
        table.push(fillLine('td', info));
    })
    return table;
}
function fillLine(columnType, data) {
    const line = [];
    data.map(info => {
        const column = document.createElement(columnType);

        if (info.startsWith('https')) {
            const img = document.createElement('img');
            img.src = info;
            column.appendChild(img);
        }
        else {
            column.textContent = info;
        }
        line.push(column);
    })
    return line;
}
function printTable(table) {
    const div = document.getElementById('dbInfo');
    div.innerHTML = '';
    table.map(line => {
        const tr = document.createElement('tr')
        line.map(info => { tr.appendChild(info) })
        div.appendChild(tr);
    })
}

// Products ----------------
function updateProduct(id, obj) {
    return productsDB.get(id)
        .then(doc => {
            return productsDB.put({
                _id: id,
                _rev: doc._rev,
                category: obj.category,
                brand: obj.brand,
                model: obj.model,
                price: Number(obj.price).toFixed(2),
                image: obj.image,
                imageTwo: obj.imageTwo
            });
        })
        .then(res => { console.log(res) })
        .catch(err => { console.log(err); });
}
// function getProductData() {
//     return productsDB.allDocs({
//         include_docs: true,
//         attachments: true
//     })
//         .then(res => { return res; })
//         .catch(err => { return err; })
// }
function showProductsData() {
    productsDB.allDocs({
        include_docs: true,
        attachments: true
    })
        .then(res => {
            const table = generateTable(res.rows);
            printTable(table);
        })
        .catch(err => { console.log(err); })
}






window.showProductsData = showProductsData
window.showUserData = showUserData;
export { getData, putData, getAllData, showProductsData, updateProduct }
