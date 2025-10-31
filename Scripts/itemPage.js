import { items } from './data.js'
import { addToCart } from './cartItemHandler.js';

let imageIndex = 0;

/** 
 * Loads the item detail page.  
 * 
 * @param {array} itemList array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array in itemHandler.js. 
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}}
 * 
 * @returns {none}
 */
function loadItemDetail(itemList) {
    let itemId = localStorage.getItem('currentItemID');
    let itemIndex = itemList.findIndex(
        item => item.id == itemId
    );

    document.title = `Rehome - ${itemList[itemIndex]['title']}`;

    let pageElements = `
            <div id="itemDetailImageContainer">
                <img src="${itemList[itemIndex]['images'][0]}" alt="${itemList[itemIndex]['description']}" id="itemDetailImage">
                <a id="prev${itemList[itemIndex]['id']}" class="prev">&#10094;</a>
                <a id="next${itemList[itemIndex]['id']}" class="next">&#10095;</a>
            </div>
            <div id="itemDetailInformation">
                <h2 id="itemDetailHeading">${itemList[itemIndex]['title']}</h2>
                <div id="addToCartContainer">
                    <h3 id="itemDetailSubheading">$${itemList[itemIndex]['price']}</h3>
                    <button id="addToCartButton${itemList[itemIndex]['id']}" class="CTAButtonLarge">Add To Cart</button>
                </div>
                <p id="itemDetailDescription">${itemList[itemIndex]['description']}</p>
            </div>
    `
    document.getElementById('itemDetailContainer').innerHTML = pageElements;

    // Adds events listeners
    document.getElementById(`addToCartButton${itemList[itemIndex]['id']}`).addEventListener('click', addToCart)
    document.getElementById(`prev${itemList[itemIndex]['id']}`).addEventListener('click', prevImage)
    document.getElementById(`next${itemList[itemIndex]['id']}`).addEventListener('click', nextImage)
}

/** 
 * Goes to the previous image in the item detail image slideshow.  
 * 
 * @param {none} 
 * 
 * @returns {none}
 */
function prevImage(event) {  
    // Finds the item id from the id of the add to cart button
    let id = event.target.id
    id = id.replaceAll('prev', '');

    let item = items.find(
        item => item.id == id
    )
    
    imageIndex--; 

    // Checks if the image is the first image, and if it is, goes to the last image
    if (imageIndex < 0) {
        imageIndex = (item['images'].length - 1)
    }

    document.getElementById('itemDetailImage').src = item['images'][imageIndex]
}

/** 
 * Goes to the next image in the item detail image slideshow.  
 * 
 * @param {none} 
 * 
 * @returns {none}
 */
function nextImage(event) {  
    // Finds the item id from the id of the add to cart button
    let id = event.target.id
    id = id.replaceAll('next', '');

    let item = items.find(
        item => item.id == id
    )
    
    imageIndex++; 

    // Checks if the image is the last image, and if it is, goes to the first image
    if (imageIndex >= item['images'].length) {
        imageIndex = 0
    }

    document.getElementById('itemDetailImage').src = item['images'][imageIndex]
}

window.onload = loadItemDetail(items)