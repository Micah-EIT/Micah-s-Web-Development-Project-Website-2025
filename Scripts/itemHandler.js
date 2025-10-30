// Shop item information: {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, category: {string}, added: {date}}
const items = [
    {id: 1, title: 'Pink and yellow wooden armchairs', price: 200, description: 'Two wooden armchairs with pink seats and yellow cushions', image: 'Images/two-chairs.jpg', category: 'Armchairs', added: new Date(2025, 9, 25)},
    {id: 2, title: 'Wooden end table', price: 100, description: 'Small wooden table with a glass top', image: 'Images/wooden-table.jpg', category: 'End Tables', added: new Date(2025, 10, 4)},
    {id: 3, title: 'Blue L-shaped couch', price: 350, description: 'Blue L-shaped couch', image: 'Images/blue-couch.jpg', category: 'Couches', added: new Date(2025, 10, 10)},
    {id: 4, title: 'Wooden drawers', price: 250, description: 'A set of wooden drawers with golden handles', image: 'Images/wooden-drawers.jpeg', category: 'Drawers', added: new Date(2025, 10, 4)},
    {id: 5, title: 'Wooden dining table with black chairs', price: 450, description: 'A wooden dining table with black chairs', image: 'Images/wooden-dining-table.jpg', category: 'Dining Tables', added: new Date(2025, 10, 22)}   
]
/*
Image sources: 
Pink and yellow wooden armchairs: https://unsplash.com/photos/two-chairs-next-to-each-other-Rt42FVatg90 Tanya Paquet
Wooden end table: https://unsplash.com/photos/a-small-wooden-table-with-a-glass-top-oz65UblZ2LQ Sean Foster
Blue L-shaped couch: https://unsplash.com/photos/a-blue-couch-sitting-on-top-of-a-wooden-table-Eax4KNMMA9k Marcel Costa
Wooden drawers: https://www.vecteezy.com/photo/55970663-a-wooden-chest-with-two-drawers-on-the-side?autodl_token=d8e6f65cd77502f04f12b1386ed39a214e24e4168013f52e0b1fd75488bcfd347fd1885a50a8ade0206cca2e3265d4e70a81e105acdb84f9c03cf8eb50199fa0 Oleg Gapeenko
Wooden dining table with black chairs: https://unsplash.com/photos/a-dining-room-table-with-chairs-zGKRmwzplVc ONNO
*/

//
let roomItems = []

// Allowed types of furniture by room: {roomName: [(list of names of categories of items)]}
const categories = {
    livingRoom: ['Couches', 'End Tables', 'Armchairs'],
    bedroom: ['End Tables', 'Drawers'],
    diningRoom: ['Dining Tables'],
    all: []
}

/** 
 * Returns shop items currently shown on screen.
 * 
 * @param {none}
 * 
 * @returns {array} array containing dictionaries with item information. 
 * Each dictionary relates to one item, as per items in the 'items' array in itemHandler.js. 
 * {id: {number}, title: {string}, price: {number}, description: {string}, image: {string (image file path url)}, 
 * category: {string}, added: {date}}
 */ 

function findItemsToFilter() {
    let shownItemDivs = document.getElementsByClassName('itemCard');
    let shownItemIds = [];
    let shownItems = [];

    for (let i = 0; i < shownItemDivs.length; i ++) {
        shownItemIds.push(Number(shownItemDivs[i]['id']));
    }

    shownItems = roomItems.filter(
        item => shownItemIds.includes(item['id'])
    );

    return shownItems;
}

/** 
 * Searches the items by name based on search input.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

function searchShop() {
    let userInput = document.getElementById('searchBar').value.toLowerCase();

    let filteredItems = roomItems.filter (
        item => {return item.title.toLowerCase().includes(userInput)}
    );

    addShopItems(filteredItems);
}

/** 
 * Sorts the items shown on screen from lowest to highest price, highest to lowest price, or newest to oldest.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

function sortItems() {
    let sortedItems = [];
    let sortByValue = '';
    let ascending = false;
    let itemsToSort = findItemsToFilter();

    // Sort by options are defined by two values, the sortByValue, which is the item property which is being compared, 
    // and ascending, which controls whether items that are higher/greater when their sortByValue is compared 
    // are shown first (if false) or last (if true).
    switch (document.getElementById('sortByDropdown').value) {
        case 'lowestPrice':
            sortByValue = 'price';
            ascending = true;
            break;
        case 'highestPrice':
            sortByValue = 'price';
            ascending = false;
            break;
        case 'newest':
            sortByValue = 'added';
            ascending = false;
            break;
    }

    if (ascending) {
        sortedItems = itemsToSort.sort(
        (item1, item2) => (item1[sortByValue] > item2[sortByValue]) ? 1: -1
        );
    }
    else {
        sortedItems = itemsToSort.sort(
        (item1, item2) => (item1[sortByValue] < item2[sortByValue]) ? 1: -1
        );
    }

    addShopItems(sortedItems);
}

/** 
 * Filters the items shown based on category as selected by the user.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

function filterByCategory() {
    let chosenCategory = document.getElementById('typeOfFurnitureDropdown').value;
    let filteredItems = [];
    let categoryKey = '';
    let currentRoom = localStorage.getItem('room');

    categoryKey = getCategoryKey();

    // 'currentRoom' is the room the user chose to shop by, as it is displayed to users.
    // It can include spaces, therefore, it must be converted to camel case in order to be used as a key in a dictionary.
    switch (currentRoom) {
        case 'Living Room':
            categoryKey = 'livingRoom';
            break;
        case 'Bedroom':
            categoryKey = 'bedroom';
            break;
        case 'Dining Room':
            categoryKey = 'diningRoom';
            break;
    }

    deleteItems()

    if (chosenCategory == 'All') {
        filteredItems = roomItems.filter(
            item => categories[categoryKey].includes(item['category'])
        );
    }
    else {
        filteredItems = roomItems.filter(
            item => item['category'] == chosenCategory
        );
    }

    addShopItems(filteredItems);
}

/** 
 * Filters the items shown based on minimum and maximum price as input by the user.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

function filterByPrice() {
    let minPrice = document.getElementById('minPrice').value;
    let maxPrice = document.getElementById('maxPrice').value;
    let filteredItems = [];

    if (minPrice == '' && maxPrice == '') {
        filteredItems = roomItems
    }
    else {
        if (minPrice == '' && maxPrice != '') {
            filteredItems = roomItems.filter(
                item => item.price <= maxPrice
            );
        }
        else {
            if (minPrice != '' && maxPrice == '') {
                filteredItems = roomItems.filter(
                item => item.price >= minPrice
            );
            }
            else {
                filteredItems = roomItems.filter(
                item => item.price >= minPrice && item.price <= maxPrice
            );
            }
        }
    }

    addShopItems(filteredItems);
}

/** 
 * Returns the category key based on the current room as chosen by the user. 
 * 
 * @param {string} currentRoom - the user's chosen room
 * 
 * @returns {none}
 */
function getCategoryKey() {
    let currentRoom = localStorage.getItem('room');
    let categoryKey = '';
    // 'currentRoom' is the room the user chose to shop by, as it is displayed to users.
    // It can include spaces, therefore, it must be converted to camel case in order to be used as a key in a dictionary.
    switch (currentRoom) {
        case 'Living Room':
            categoryKey = 'livingRoom';
            break;
        case 'Bedroom':
            categoryKey = 'bedroom';
            break;
        case 'Dining Room':
            categoryKey = 'diningRoom';
            break;
        case 'All':
            categoryKey = 'all';
            break;
    }

    return categoryKey;
}

/** 
 * Adds all of the categories of furniture to the type of furniture dropdown based on the room selected by the user. 
 * 
 * @param {dictionary} categories - dictionary of all allowed categories based on room type. 
 * Keys are room names and values are arrays containing the names of each available type of furniture. 
 * {roomName: ['furniture 1', 'furniture 2', 'furniture 3']}
 * 
 * @param {string} currentRoom - the user's chosen room
 * 
 * @returns {none}
 */

function addCategories(categories) {
    let categoryDropdown = document.getElementById('typeOfFurnitureDropdown');
    let furnitureCategoriesOptions = [];
    let categoryKey = '';
    let availableFurnitureCategories = [];
    let allCategories = []
    let currentRoom = localStorage.getItem('room');

    categoryKey = getCategoryKey(currentRoom);

    let categoryKeys = Object.keys(categories);
    categoryKeys.forEach(function(key){
        for (let i = 0; i < categories[key].length; i++) {
            if (!allCategories.includes(categories[key][i])) {
                allCategories.push(categories[key][i]);
            }
        }
    });

    allCategories.forEach(function(category){
        categories['all'].push(category)
    });

    if (categoryKey == 'all') {
        roomItems = items.slice()
    }
    else {
        roomItems = items.filter(
            item => categories[categoryKey].includes(item.category)
        );
    }
    
    // Checks whether categories have already been added to the current list of categories and whether they are part
    // of the allowed list of categories for that room. 
    for (let i = 0; i < items.length; i++) {
        if (!availableFurnitureCategories.includes(items[i]['category'])) {
            if (categories[categoryKey].includes(items[i]['category'])) {
                availableFurnitureCategories.push(items[i]['category']);
            }
        }
    }

    // Updates category options in the dropdown menu
    furnitureCategoriesOptions = '<option value="All">All</option>'
    for (let i = 0; i < availableFurnitureCategories.length; i++) {
            furnitureCategoriesOptions += `<option value="${availableFurnitureCategories[i]}">${availableFurnitureCategories[i]}</option>`;
    }

    categoryDropdown.innerHTML = furnitureCategoriesOptions
}

/** 
 * Deletes all item cards.
 * This is done to reset the shop when new items are added.
 * 
 * @param {none}
 * 
 * @returns {none}
 */

function deleteItems() {
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

function addShopItems(itemList) {
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
        /*onclick='openItemPage(${itemList[i]['id']})'*/
        let newItem = `
            <div id='${itemList[i]['id']}' class='itemCard'>
                <div class='openItemPageContainer' onclick='openItemPage(${itemList[i]['id']})'>
                    <h3>${itemList[i]['title']}</h3>
                    <div class="newItemImage">
                        <img src="${itemList[i]['image']}" alt="${itemList[i]['description']}">
                    </div>
                    <h4>$${itemList[i]['price']}</h4>
                </div>
                <button onclick="addToCart(${itemList[i]['id']})" class="CTAButton">Add To Cart</button>
            </div>
        `;
        allItems.push(newItem);
    }
    return allItems;
}

/**
 * Loads the item detail page for the user's chosen item.
 *  
 * @param {array} itemId - the id of the item for the requested item detail page. 
 * Determines which item detail page is opened. 
 * 
 * @returns {none}
 */ 

function openItemPage(itemId) {
    localStorage.setItem('currentItemID', itemId);
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
            itemsByDateAdded = itemList.sort(
            (item1, item2) => (item1['added'] < item2['added']) ? 1: -1
            );

            let shopItems = createItemCards(itemsByDateAdded);

            for (let i = 0; i < 3; i++) {
                document.getElementById('homeItemsContainer').innerHTML += shopItems[i]
            };
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