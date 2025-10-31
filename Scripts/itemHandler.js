import { items, categories } from './data.js'
import { addToCart } from './cartItemHandler.js';
import { addCategories, filterByCategory } from './shopFilter.js'

/** 
 * Deletes all item cards.
 * This is done to reset the shop when new items are added.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

export function deleteItems() {
    let itemCards = document.getElementsByClassName('itemCard')

    while (itemCards[0]){
        itemCards[0].parentNode.removeChild(itemCards[0]);
    }
}

/**
 * Adds items to the shop in columns based on the device width
 * 
 * @param {array} itemList - array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array.
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}}
 * 
 * @returns {none}
 */

export function addShopItems(itemList) {
    deleteItems();

    let shopItems = createItemCards(itemList);

    // Items in the 'firstRow' div are placed in the same row as the filter menu, directly to the right of it
    let firstRow = document.getElementById('shopItemsFirstRow');
    // Items in the 'otherRows' div are placed below the filter menu
    let otherRows = document.getElementById('shopItemsLowerRows');

    // If the device width is less than 800px, display the shop items and filter menu in one column
    if (window.innerWidth < 800) {
        for (let i = 0; i < shopItems.length; i++) {
            otherRows.innerHTML += shopItems[i];
        }
    }
    else {
        // If the device width is greater than 800px and less than 1200px, display the shop items and filter menu in two columns
        if (window.innerWidth < 1200) {
            if (shopItems.length >= 2) {
                firstRow.innerHTML += shopItems[0]
                for (let i = 1; i < shopItems.length; i++) {
                    otherRows.innerHTML += shopItems[i];
                }
            }
            else {
                if (shopItems.length == 1) {
                    firstRow.innerHTML += shopItems[0];
                    document.getElementById(`addToCartButton${shopItems[0]['id']}`).addEventListener('click', addToCart)
                }
            }
        }
        else {
            // If the device width is greater than 1200px, display the shop items and filter menu in four columns
            if (shopItems.length >= 4) {
                for (let i = 0; i < 3; i++) {
                    firstRow.innerHTML += shopItems[i];
                }
                for (let i = 3; i < shopItems.length; i++) {
                    otherRows.innerHTML += shopItems[i];
                }
            }
            else {
                for (let i = 0; i < shopItems.length; i++) {
                    firstRow.innerHTML += shopItems[i];
                }
            }
        }
    }

    // Add event listeners
    for (let i = 0; i < itemList.length; i++) {
        document.getElementById(`addToCartButton${itemList[i]['id']}`).addEventListener('click', addToCart)
        document.getElementById(`openItemPage${itemList[i]['id']}`).addEventListener('click', openItemPage)
    }
}

/**
 * Creates html code for an item card for each item in the itemList
 * 
 * @param {array} itemList - array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array.
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}}
 * 
 * @returns {array} allItems - array containing strings which contain the html code for an item. 
 * Each item in the array is code for an html div relating to one shop item, with each item having an individual card containing 
 * the item's id (not displayed to users), title, image, and price, and an add to cart button. 
 */

function createItemCards(itemList) {
    let allItems = [];
    
    for (let i = 0; i < itemList.length; i++) {
        // The div's id is the same as the item's id in the 'items' array, so the two can be easily compared
        let newItem = `
            <div id='${itemList[i]['id']}' class='itemCard'>
                <div id='openItemPage${itemList[i]['id']}' class='openItemPageContainer'>
                    <h3 id="itemHeading${itemList[i]['id']}">${itemList[i]['title']}</h3>
                    <div id="itemImageContainer${itemList[i]['id']}" class="newItemImage">
                        <img id="itemImage${itemList[i]['id']}" src="${itemList[i]['images'][0]}" alt="${itemList[i]['description']}">
                    </div>
                    <h4 id="itemPrice${itemList[i]['id']}">$${itemList[i]['price']}</h4>
                </div>
                <button id="addToCartButton${itemList[i]['id']}" class="CTAButton">Add To Cart</button>
            </div>
        `;
        allItems.push(newItem);
    }
    return allItems;
}

/**
 * Loads the item detail page for the user's chosen item.
 *  
 * @param {none} 
 * 
 * @returns {none}
 */ 

function openItemPage(event) {
    let id = event.target.id;
    let includesOpenItemPageContainer = id.includes('openItemPage');

    // Finds the 'openItemPage' container associated with an element
    if (!includesOpenItemPageContainer) {
        id = document.getElementById(event.target.id).parentElement.id;
        includesOpenItemPageContainer = id.includes('openItemPage');
        if (!includesOpenItemPageContainer) {
            id = document.getElementById(id).parentElement.id;
        }
    }
    id = id.replaceAll('openItemPage', '');

    localStorage.setItem('currentItemID', id);
    window.open('item-page.html', '_self');
}

/**
 * Adds new items to the home page or all items to the shop page when the page is loaded based on the page title. 
 *  
 * @param {array} itemList - array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array.
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}}
 * 
 * @returns {none}
 */ 

function loadItems(itemList) {
    switch(document.getElementsByTagName('title')[0].innerHTML) {
        case 'Rehome - Home':
            // Sorts items by the date they were added (from newest to oldest) and displays the 3 newest items
            let itemsByDateAdded = itemList.sort(
            (item1, item2) => (item1['added'] < item2['added']) ? 1: -1
            );

            let shopItems = createItemCards(itemsByDateAdded);

            for (let i = 0; i < 3; i++) {
                document.getElementById('homeItemsContainer').innerHTML += shopItems[i]
            };

            // Add event listeners
            for (let i = 0; i < 3; i++) {
                document.getElementById(`addToCartButton${itemsByDateAdded[i]['id']}`).addEventListener('click', addToCart)
                document.getElementById(`openItemPage${itemList[i]['id']}`).addEventListener('click', openItemPage)
            }
            return;
        case 'Rehome - Shop':
            let currentRoom = localStorage.getItem('room');
    
            // If no room has been chosen, redirect the user to the 'choose-room' page
            if (currentRoom == null) {
                window.open('choose-room.html', '_self');
            }

            addCategories(categories, currentRoom);
            document.getElementById('breadcrumb').innerHTML = `← ${currentRoom} Furniture`;
            filterByCategory(itemList);
            return;
    }
}

// The responsive shop grid changes when the page loads and when it is resized
window.onload = loadItems(items);