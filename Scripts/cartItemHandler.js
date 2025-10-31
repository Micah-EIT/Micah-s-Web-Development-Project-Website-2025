import { loadShoppingCartItems } from "./shoppingCart.js";
import { items } from "./data.js"

/** 
 * Adds an item to the cart. 
 * 
 * @param {none}
 * 
 * @returns {none}
 */
export function addToCart(event) {  
    // Finds the item id from the id of the add to cart button
    let id = event.target.id
    id = id.replaceAll('addToCartButton', '');

    let newCartItems = JSON.parse(localStorage.getItem('cartItems'))  

    // Checks if there are any items in the cart
    if (!newCartItems) {
        newCartItems = []
    }   
    
    // Checks if the item already exists in the cart, if it does, the item's quantity is increased by 1, 
    // otherwise, the item is added to the cart
    let itemInCart = false;
    for (let i = 0; i < newCartItems.length; i++) {
        if (newCartItems[i].id == id) {
            newCartItems[i].quantity = newCartItems[i].quantity + 1;
            itemInCart = true;
        }
    }
    if (!itemInCart) {
        newCartItems.push({id: id, quantity: 1});
    }

    // Updates the cart 
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))   
    if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
        loadShoppingCartItems(items)      
    }   

    // Updates the number of items icon in the menu
    findNumberOfCartItems()
    return; 
}

/** 
 * Removes an item from the cart. 
 * 
 * @param {none}
 * 
 * @returns {none}
 */ 
export function removeItem(event) { 
    let id = event.target.id     
    id = id.replaceAll('removeItemButton', '');
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))  

    let itemIndex = cartItems.findIndex(
        item => item.id == id
    )

    // Removes the item from the cart list by index
    cartItems.splice(itemIndex, 1);

    // Updates the cart 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
        loadShoppingCartItems(items)
    }

    // Updates the number of items icon in the menu
    findNumberOfCartItems()
    return;
}

/** 
 * Increases the quantity of an item in the cart by 1. 
 * 
 * @param {none}
 * 
 * @returns {none}
 */ 
export function increaseItemQuantity(event) {
    let id = event.target.id 
    id = id.replaceAll('increaseItemQuantityButton', '');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) 

    let itemIndex = cartItems.findIndex(
        item => item.id == id
    )

    cartItems[itemIndex]['quantity']++;

    // Updates the cart 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));4
    if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
        loadShoppingCartItems(items)
    }

    // Updates the number of items icon in the menu
    findNumberOfCartItems()
    return;
}

/** 
 * Decreases the quantity of an item in the cart by 1. 
 * If the item quantity is already 1, the item is deleted from the cart. 
 * 
 * @param {none}
 * 
 * @returns {none}
 */ 
export function decreaseItemQuantity(event) {
    let id = event.target.id 
    id = id.replaceAll('decreaseItemQuantityButton', '');
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) 

    let itemIndex = cartItems.findIndex(
        item => item.id == id
    )

    cartItems[itemIndex]['quantity']--;

    if (cartItems[itemIndex]['quantity'] < 1) {
        cartItems.splice(itemIndex, 1);
    }

    // Updates the cart 
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
        loadShoppingCartItems(items)
    }

    // Updates the number of items icon in the menu
    findNumberOfCartItems()
    return;
}

/** 
 * Find the total number of items in the cart and updates the number of cart items icon in the menu.
 * 
 * @param {none}
 * 
 * @returns {none}
 */ 
export function findNumberOfCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let totalNumberOfCartItems = 0;

    if (cartItems) {
        for (let i = 0; i < cartItems.length; i++) {
            totalNumberOfCartItems += cartItems[i].quantity;
        }
    }
    else {
        totalNumberOfCartItems = 0;
    }

    // Shows the number of cart items icon if the number of cart items is greater than 0, otherwise hides the icon
    document.getElementById('numberOfCartItems').innerHTML = totalNumberOfCartItems;
    if (document.getElementById('numberOfCartItems').style.display == 'none' && totalNumberOfCartItems > 0) {
        document.getElementById('numberOfCartItems').style.display = 'block';
    }
    else {
      if (totalNumberOfCartItems < 1) {
          document.getElementById('numberOfCartItems').style.display = 'none'
      }
    }
    return; 
}