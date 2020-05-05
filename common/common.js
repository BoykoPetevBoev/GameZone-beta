
import { loadPage, getUserInfoFrom, saveUserInfo } from '../events.js';
import { putData, getData } from '../database/requesterDB.js';


let totalPrice = 0;
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
            const removedProduct = shoppingCart.splice(index, 1)[0];
            user.totalPrice -= Number(removedProduct.price);
            user.shoppingCart = shoppingCart;
            updateUserCart(user);
        })
        .then(res => {
            getUserInfoFrom(ctx)
            location.reload();
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
            getData('products', idProduct)
                .then(data => {
                    const obj = {
                        image: data.image,
                        name: `${data.brand} ${data.model}`,
                        price: data.price,
                        id: idProduct
                    }
                    user.shoppingCart.push(obj);
                    user.totalPrice += Number(obj.price);
                    updateUserCart(user);
                })
        })
    getUserInfoFrom(ctx)
    ctx.redirect('#/home')
    location.reload();
}
function updateUserCart(user) {
    putData('users', user);
    saveUserInfo(user)
}

window.removeItemFromCart = removeItemFromCart;
export { menuDiv, addItemToCart };
