import { addProductsDB, findProductDB, updateProduct } from '../database/requesterDB.js'
import { loadPage } from '../events.js';

function productForm(ctx) {
    const { category, brand, model, price, image } = ctx.params;
    const item = {
        _id: new Date(),
        category,
        brand,
        model,
        price,
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
    const id = ctx.params.id;
    return findProductDB(id)
        .then(res => {
            ctx.info = res;
            return ctx;
        })
        .catch(err => console.log(err))
}

export { productForm, changeProduct }
