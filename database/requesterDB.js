const usersDB = new PouchDB('users');
const productsDB = new PouchDB('items');

//  Users ------------------------------------------------------
function addUsersDB(user) {
    return usersDB.put(user)
        .then(res => { return res; })
        .catch(err => { return err; })
}
function findUsersDB(user) {
    return usersDB.get(user)
        .then(res => { return res; })
        .catch(err => { return err; })
}

function showUserData() {
    usersDB.allDocs({
        include_docs: true,
        attachments: true
    })
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
        const column = document.createElement(columnType)
        column.textContent = info;
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


// Products -------------------------------------------------------------------------------

function addProductsDB(item) {
    return productsDB.put(item)
        .then(res => { return res; })
        .catch(err => { return err; })
}
function getProductData() {
    return productsDB.allDocs({
        include_docs: true,
        attachments: true
    })
        .then(res => { return res; })
        .catch(err => { return err; })
}
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
export { addUsersDB, findUsersDB, showUserData, addProductsDB, showProductsData, getProductData }
