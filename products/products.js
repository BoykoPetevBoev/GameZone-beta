import { putData, getData } from '../database/requesterDB.js';
import { loadPage } from '../events.js';
import { showPushNotification } from '../pushNotifications/pushNotifications.js';

function productForm(ctx) {
    const { category, brand, model, price, image } = ctx.params;
    const item = {
        _id: new Date(),
        category,
        brand,
        model,
        price: Number(price).toFixed(2),
        image
    }
    putData('products', item)
        .then(res => {
            const options ={
                body: `NEW ${item.brand} ${item.model}`,
                icon: item.image
            }
            showPushNotification(options);
            ctx.redirect('#/home')
        })
        .catch(err => {
            console.log(err);
        })
}
function loadChangeProductPage(ctx) {
    console.log(ctx)
    const id = ctx.params.id;
    getData('products', id)
        .then(res => {
            ctx.info = res;
            loadPage(ctx, './products/changeProductInfo.hbs')
        })
        .catch(err => console.log(err))
}
function loadProductPage(ctx){
    const id = ctx.params.id;
    return getData('products', id)
        .then(data => {
            ctx.data = data;
            loadPage(ctx, './products/productPage.hbs')
        })
        .catch(err => console.log(err))
}


export { productForm, loadChangeProductPage, loadProductPage }
