
//------------------------------------------------------
//ADD ITEM TO CART
function addToCart(id) {    
    let newCartItems = JSON.parse(localStorage.getItem('cartItems'))  

    if (!newCartItems) {
        newCartItems = []
    }   
    //Update the itemInCart
    //Check if id is existing in the 'itemInCart'. If yes, just increase the quantity; otherwise add a new row at the end.
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

    findNumberOfCartItems()

    //Display updated itemInCart
    console.log(newCartItems)
    localStorage.setItem('cartItems', JSON.stringify(newCartItems))            
}

//------------------------------------------------------
//RemoveItem function 
function removeItem(id) {     
    let cartItems = JSON.parse(localStorage.getItem('cartItems'))  

    itemIndex = cartItems.findIndex(
        item => item.id == id
    )
    //If the item's quantity is 1, remove it completely from the cart
    if (cartItems[itemIndex].quantity = 1) {
        cartItems.splice(itemIndex, 1);
    }
    //If the item's quantity is greater than 1, decrease the item quantity by 1
    console.log(cartItems)
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    findNumberOfCartItems()

    //Display updated itemInCart
    return;
}

function increaseItemQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) 
    itemIndex = cartItems.findIndex(
        item => item.id == id
    )
    cartItems[itemIndex]['quantity']++;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    findNumberOfCartItems()

    //Display updated itemInCart
    return;
}

function decreaseItemQuantity(id) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) 
    itemIndex = cartItems.findIndex(
        item => item.id == id
    )
    cartItems[itemIndex]['quantity']--;
    if (cartItems[itemIndex]['quantity'] < 1) {
        cartItems.splice(itemIndex, 1);
    }
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    findNumberOfCartItems()

    //Display updated itemInCart

    return;
}

function findNumberOfCartItems() {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let totalNumberOfCartItems = 0;

    for (let i = 0; i < cartItems.length; i++) {
        totalNumberOfCartItems += cartItems[i].quantity;
    }

    document.getElementById('numberOfCartItems').innerHTML = totalNumberOfCartItems;
    console.log(totalNumberOfCartItems)
    if (document.getElementById('numberOfCartItems').style.display == 'none' && totalNumberOfCartItems > 0) {
        document.getElementById('numberOfCartItems').style.display = 'block';
    }
    else {
      if (totalNumberOfCartItems < 1) {
          document.getElementById('numberOfCartItems').style.display = 'none'
      }
    }
}