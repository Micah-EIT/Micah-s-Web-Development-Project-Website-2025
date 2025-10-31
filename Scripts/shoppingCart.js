import { items } from './data.js'
import { decreaseItemQuantity, increaseItemQuantity, removeItem } from './cartItemHandler.js';

/** 
 * Loads items in the shopping cart.
 * 
 * @param {array} itemList - array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array.
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}} 
 * 
 * @returns {none}
 */ 
export function loadShoppingCartItems(itemList) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));

    let cartCards = ''
    let totalPrice = 0

    if(cartItems == null) {
        return;
    }

    // Creates a card for each item in the cart
    for (let i = 0; i < cartItems.length; i++) {
        let item = itemList.find(
          item => item.id == cartItems[i]['id']
        );

        totalPrice += (item['price'] * cartItems[i]['quantity'])
        
        cartCards +=
        `<div id='' class='cartCard'>
            <div class="cartItemImage">
                <img src="${item['images'][0]}" alt="${item['description']}">
            </div>
            <h3>${item['title']}</h3>
            <h4>$${item['price']}</h4>
            <div class='cartItemsQuantity'>
              <button id='decreaseItemQuantityButton${item['id']}' class='quantityButton'>-</button>
              <h4>${cartItems[i].quantity}</h4>
              <button id='increaseItemQuantityButton${item['id']}' class='quantityButton'>+</button>
            </div>
            <button id="removeItemButton${item['id']}" class="CTAButtonBrown">Remove</button>
        </div>`;
    }

    document.getElementById('cartItemContainer').innerHTML = cartCards;
    for (let i = 0; i < cartItems.length; i++) {
        let item = itemList.find(
            item => item.id == cartItems[i]['id']
        );

        document.getElementById(`decreaseItemQuantityButton${item['id']}`).addEventListener('click', decreaseItemQuantity);
        document.getElementById(`increaseItemQuantityButton${item['id']}`).addEventListener('click', increaseItemQuantity);
        document.getElementById(`removeItemButton${item['id']}`).addEventListener('click', removeItem);
    }

    document.getElementById('cartTotal').innerHTML = `Total: $${totalPrice}`
}

if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
    window.onload = loadShoppingCartItems(items)
}