import { putData, getData } from '../database/requesterDB.js';
import { loadPage, getUserInfoFrom, saveUserInfo } from '../events.js';
import { showPushNotification } from '../pushNotifications/pushNotifications.js';
import { loadHomеPage } from '../homePage/homePage.js';

function productForm(ctx) {
    const { category, brand, model, price, image, imageTwo } = ctx.params;
    console.log(ctx.params)
    const item = ctx.params;
    item.price = Number(price).toFixed(2);
    item['_id'] = new Date();
    item.moreInfo = createTuple(ctx.params.moreInfo);

    console.log(item);
    const options ={
        body: `NEW ${item.brand} ${item.model}`,
        icon: item.image
    }
    showPushNotification(options);
    // putData('products', item)
    //     .then(res => {
    //         const options ={
    //             body: `NEW ${item.brand} ${item.model}`,
    //             icon: item.image
    //         }
    //         showPushNotification(options);
    //         ctx.redirect('#/home')
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
}
function createTuple(text){
    if(!text){
        return;
    }
    const result = [];
    const arr = text.split(', ');
    arr.forEach(element => {
        resulr.push(element.split('-'));
    });
    return result;
}
function loadChangeProductPage(ctx) {
    console.log(ctx)
    const id = ctx.params.id;
    getData('products', id)
        .then(res => {
            ctx.info = res;
            console.log(ctx);
            loadPage(ctx, './products/productForm.hbs');
        })
        .catch(err => console.log(err))
}
function loadProductPage(ctx){
    const id = ctx.params.id;
    return getData('products', id)
        .then(data => {
            ctx.data = data;
            loadPage(ctx, './products/productPage.hbs');
        })
        .catch(err => console.log(err))
}

export { productForm, loadChangeProductPage, loadProductPage }
