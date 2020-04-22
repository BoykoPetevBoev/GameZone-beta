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
function changeProduct(ctx) {
    console.log(ctx)
    const id = ctx.params.id;
    return findProductDB(id)
        .then(res => {
            console.log(ctx.info)
            ctx.info = res;
            return ctx;
        })
        .catch(err => console.log(err))
}
function loadProductPage(ctx){
    console.log(ctx)
    const id = ctx.params.id;
    return findProductDB(id)
        .then(data => {
            ctx.data = data;
            return ctx;
        })
        .catch(err => console.log(err))
}


export { productForm, changeProduct, loadProductPage }
