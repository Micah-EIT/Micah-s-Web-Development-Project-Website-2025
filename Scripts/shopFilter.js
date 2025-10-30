let currentRoom = localStorage.getItem('room');

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

    for (i = 0; i < shownItemDivs.length; i ++) {
        shownItemIds.push(Number(shownItemDivs[i]['id']));
    }

    shownItems = items.filter(
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

    let filteredItems = items.filter (
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

    console.log(`1 ${chosenCategory}`)

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
        filteredItems = items.filter(
            item => categories[categoryKey].includes(item['category'])
        );
    }
    else {
        filteredItems = items.filter(
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
        filteredItems = items
    }
    else {
        if (minPrice == '' && maxPrice != '') {
            filteredItems = items.filter(
                item => item.price <= maxPrice
            );
        }
        else {
            if (minPrice != '' && maxPrice == '') {
                filteredItems = items.filter(
                item => item.price >= minPrice
            );
            }
            else {
                filteredItems = items.filter(
                item => item.price >= minPrice && item.price <= maxPrice
            );
            }
        }
    }

    addShopItems(filteredItems);
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

function addCategories(categories, currentRoom) {
    let categoryDropdown = document.getElementById('typeOfFurnitureDropdown');
    let furnitureCategoriesOptions = [];
    let categoryKey = '';
    let availableFurnitureCategories = [];

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

    // Checks whether categories have already been added to the current list of categories and whether they are part
    // of the allowed list of categories for that room. 
    for (i = 0; i < items.length; i++) {
        if (availableFurnitureCategories.includes(items[i]['category'])) {
            continue;
        }
        else {
            if (categories[categoryKey].includes(items[i]['category'])) {
                availableFurnitureCategories.push(items[i]['category']);
            }
        }
    }

    // Updates category options in the dropdown menu
    furnitureCategoriesOptions = '<option value="All">All</option>'
    for (i = 0; i < availableFurnitureCategories.length; i++) {
            furnitureCategoriesOptions += `<option value="${availableFurnitureCategories[i]}">${availableFurnitureCategories[i]}</option>`;
    }

    categoryDropdown.innerHTML = furnitureCategoriesOptions
}

window.onload = addCategories(categories, currentRoom)
window.onload = () => {
    document.getElementById('breadcrumb').innerHTML = `← ${currentRoom} Furniture`;
}