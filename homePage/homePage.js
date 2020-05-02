import { getAllData } from '../database/requesterDB.js'
import { getUserInfoFrom, loadPage } from '../events.js'


const pathCategory = {
    '/#/home/mouse': 'mouse',
    '/#/home/keyboard': 'keyboard',
    '/#/home/headset': 'headset',
    '/#/home/mousepad': 'mousepad',
    '/#/home/accessoaries': 'accesoaries'
}
function loadHomеPage(ctx) {
    getUserInfoFrom(ctx)
    getAllData('products')
        .then(data => {
            ctx.data = data.rows.slice(0);
            loadPage(ctx, './homePage/homePage.hbs');
        })
        .catch(err => console.log(err));
}
function loadPageCategory(ctx) {
    getUserInfoFrom(ctx)
    getAllData('products')
        .then(data => {
            const category = data.rows.filter(product => product.doc.category == pathCategory[ctx.path])
            ctx.data = category.slice(0);
            loadPage(ctx);
        })
        .catch(err => console.log(err))
}

export { loadPageCategory, loadHomеPage };
