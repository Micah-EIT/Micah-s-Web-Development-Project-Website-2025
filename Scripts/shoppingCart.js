/*const items = [
    {id: 1, title: 'Pink and yellow wooden armchairs', price: 200, description: 'Two wooden armchairs with pink seats and yellow cushions', image: 'Images/two-chairs.jpg', category: 'Armchairs', added: new Date(2025, 9, 25)},
    {id: 2, title: 'Wooden end table', price: 100, description: 'Small wooden table with a glass top', image: 'Images/wooden-table.jpg', category: 'End Tables', added: new Date(2025, 10, 4)},
    {id: 3, title: 'Blue L-shaped couch', price: 350, description: 'Blue L-shaped couch', image: 'Images/blue-couch.jpg', category: 'Couches', added: new Date(2025, 10, 10)},
    {id: 4, title: 'Wooden drawers', price: 250, description: 'A set of wooden drawers with golden handles', image: 'Images/wooden-drawers.jpeg', category: 'Drawers', added: new Date(2025, 10, 4)},
    {id: 5, title: 'Wooden dining table with black chairs', price: 450, description: 'A wooden dining table with black chairs', image: 'Images/wooden-dining-table.jpg', category: 'Dining Tables', added: new Date(2025, 10, 22)}   
]*/


import { items } from './data.js'

function loadShoppingCartItems(itemList) {
    let cartItems = JSON.parse(localStorage.getItem('cartItems'));
    let cartCards = ''
    let totalPrice = 0

    if(cartItems == null) {
      return;
    }

    for (let i = 0; i < cartItems.length; i++) {
      let item = itemList.find(
        item => item.id == cartItems[i]['id']
      );

      totalPrice += (item['price'] * cartItems[i]['quantity'])
      
      cartCards +=
      `<div id='' class='cartCard'>
          <div class="cartItemImage">
              <img src="${item['image']}" alt="${item['description']}">
          </div>
          <h3>${item['title']}</h3>
          <h4>$${item['price']}</h4>
          <div class='cartItemsQuantity'>
            <button class='quantityButton' onclick='decreaseItemQuantity(${item['id']})'>-</button>
            <h4>${cartItems[i].quantity}</h4>
            <button class='quantityButton' onclick='increaseItemQuantity(${item['id']})'>+</button>
          </div>
          <button onclick="removeItem(${item['id']})" class="CTAButtonBrown">Remove</button>
      </div>`
    }

    document.getElementById('cartItemContainer').innerHTML = cartCards;
    document.getElementById('cartTotal').innerHTML = `Total: $${totalPrice}`
}

if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
  window.onload = loadShoppingCartItems(items)
  console.log(JSON.parse(localStorage.getItem('cartItems')))
}

//------------------------------------------------------
//DISPLAY ALL ITEMS IN THE CART            
let itemInCart = [];
let totalPrice = 0.0;
//
function displayCart() {
  //--------------------  
  //Update the item table              
  let itemTable = document.getElementById("itemTable");
  //Delete all rows except the th
  for(var i = 1; i<itemTable.rows.length;){
    itemTable.deleteRow(i);
  }
  //Update the item table
  let totalPrice = 0;
  for (let index = 0; index < itemInCart.length; index++) {
    //Create a row using the inserRow() method and specify the index where you want to add the row
    let row = itemTable.insertRow(-1); // We are adding at the end                
    //Create table cells: arr.findIndex(p => p.property == someValue)
    row.insertCell(0).innerText = items.find(item => item.id == itemInCart[index].id).title;
    row.insertCell(1).innerHTML = itemInCart[index].quantity;
    row.insertCell(2).innerHTML = itemInCart[index].quantity * items.find(item => item.id == itemInCart[index].id).price;
    row.insertCell(3).innerHTML = '<button onclick="removeItem(' + itemInCart[index].id + ')">REMOVE</button>'; 

    //Update totalPrice 
    totalPrice += itemInCart[index].quantity * items.find(item => item.id == itemInCart[index].id).price;
  }
  //--------------------  
  //Update totalPrice
  document.getElementById("totalPrice").innerHTML = totalPrice;
}