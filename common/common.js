
import { loadPage, getUserInfoFrom, saveUserInfo } from '../events.js';
import { putData, getData } from '../database/requesterDB.js';

function menuDiv() {
    // const div = document.getElementById('menuDiv')
    // div.addEventListener("mouseover", function( event ) {
    //     const text = document.getElementById('gameZoneHeader')
    //     text.style.color = 'red';
    // })

}
function removeItemFromCart(ctx) {
    getUserInfoFrom(ctx)
    const idUser = ctx.email
    const idProduct = ctx.value;
    console.log(idProduct, idUser)
    getData('users', idUser)
        .then(user => {
            const shoppingCart = user.shoppingCart;
            const index = shoppingCart.findIndex(product => product.id == idProduct);
            shoppingCart.splice(index, 1);
            user.shoppingCart = shoppingCart;
            updateUserCart(user);
        })
}
function addItemToCart(ctx) {
    getUserInfoFrom(ctx)
    const idUser = ctx.email
    const idProduct = ctx.params.id;
    if (!idUser) {
        ctx.redirect('#/register');
        return;
    }
    getData('users', idUser)
        .then(user => {
            if (!user['shoppingCart']) {
                user['shoppingCart'] = [];
            }
            getData('products', idProduct)
                .then(data => {
                    const obj = {
                        image: data.image,
                        name: `${data.brand} ${data.model}`,
                        price: Number(data.price),
                        id: idProduct
                    }
                    user.shoppingCart.push(obj);
                    updateUserCart(user)
                })
        })
    ctx.redirect('#/home')
}
function updateUserCart(user) {
    putData('users', user);
    saveUserInfo(user)
}


window.removeItemFromCart = removeItemFromCart;
export { menuDiv, addItemToCart };