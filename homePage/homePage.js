import { getProductData } from '../database/requesterDB.js'

function getProductsData(ctx) {
    return getProductData()
        .then(data => {
            return data;
        })
        .catch(err => console.log(err))
}
function loadProductCategory(ctx) {
    const pathCategory = {
        '/mouse': 'mouse',
        '/keyboard': 'keyboard',
        '/headset': 'headset',
        '/mousepad': 'mousepad',
        '/accessoaries': 'accesoaries'
    }
    return getProductData(ctx)
        .then(data => {
            const category = data.rows.filter(product => product.doc.category == pathCategory[ctx.path])
            return category
        })
        .catch(err => console.log(err))
}

export { getProductsData, loadProductCategory  };
