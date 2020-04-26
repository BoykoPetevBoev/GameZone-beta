import { addProductsDB, findProductDB, updateProduct } from '../database/requesterDB.js'
import { loadPage } from '../events.js';

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
    addProductsDB(item)
        .then(res => {
            ctx.redirect('#/home')
        })
        .catch(err => {
            console.log(err);
        })
}
function loadChangeProductPage(ctx) {
    console.log(ctx)
    const id = ctx.params.id;
    findProductDB(id)
        .then(res => {
            ctx.info = res;
            loadPage(ctx, './products/changeProductInfo.hbs')
        })
        .catch(err => console.log(err))
}

function loadProductPage(ctx){
    const id = ctx.params.id;
    return findProductDB(id)
        .then(data => {
            ctx.data = data;
            loadPage(ctx, './products/productPage.hbs')
        })
        .catch(err => console.log(err))
}


export { productForm, loadChangeProductPage, loadProductPage }
