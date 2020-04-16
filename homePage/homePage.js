import { getProductData } from '../database/requesterDB.js'

function loadHomеPageInfo(ctx){
   return getProductData()
        .then(data => {
            ctx.data = data.rows.slice(0);
            return ctx;
        })
        .catch(err => console.log(err))
}   

export { loadHomеPageInfo };
