import { items } from './data.js'

function loadItemDetail(itemList) {
    let itemId = localStorage.getItem('currentItemID');
    let itemIndex = items.findIndex(
        item => item.id == itemId
    );
    document.title = `Rehome - ${itemList[itemIndex]['title']}`;

    let pageElements = `
            <div id="itemDetailImageContainer">
                <img src="${itemList[itemIndex]['image']}" alt="${itemList[itemIndex]['description']}" id="itemDetailImage">
            </div>
            <div id="itemDetailInformation">
                <h2 id="itemDetailHeading">${itemList[itemIndex]['title']}</h2>
                <div id="addToCartContainer">
                    <h3 id="itemDetailSubheading">$${itemList[itemIndex]['price']}</h3>
                    <button onclick="addToCart(${itemList[itemIndex]['id']})" class="CTAButtonLarge">Add To Cart</button>
                </div>
                <p id="itemDetailDescription">${itemList[itemIndex]['description']}</p>
            </div>
    `
    document.getElementById('itemDetailContainer').innerHTML = pageElements;
}

window.onload = loadItemDetail(items)