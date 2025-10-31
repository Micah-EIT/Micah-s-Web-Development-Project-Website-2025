import { items, categories } from './data.js'
import { addShopItems, deleteItems } from './itemHandler.js'

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
    let roomItems = JSON.parse(localStorage.getItem('availableRoomItems'))
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
    let roomItems = JSON.parse(localStorage.getItem('availableRoomItems'))

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

export function filterByCategory() {
    let chosenCategory = document.getElementById('typeOfFurnitureDropdown').value;
    let filteredItems = [];
    let categoryKey = '';
    let currentRoom = localStorage.getItem('room');
    let roomItems = JSON.parse(localStorage.getItem('availableRoomItems'))

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
    let roomItems = JSON.parse(localStorage.getItem('availableRoomItems'))

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

export function addCategories(categories) {
    let categoryDropdown = document.getElementById('typeOfFurnitureDropdown');
    let furnitureCategoriesOptions = [];
    let categoryKey = '';
    let availableFurnitureCategories = [];
    let allCategories = []
    let currentRoom = localStorage.getItem('room');
    let roomItems = []

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

    localStorage.setItem('availableRoomItems', JSON.stringify(roomItems))
    
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

if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Shop') {
    let currentRoom = localStorage.getItem('room')
    window.onload = addCategories(categories, currentRoom)
    window.onload = () => {
        document.getElementById('breadcrumb').innerHTML = `← ${currentRoom} Furniture`;

        // Add events listeners to filter inputs
        document.getElementById('searchBar').addEventListener('change', searchShop);
        document.getElementById('typeOfFurnitureDropdown').addEventListener('change', filterByCategory);
        document.getElementById('sortByDropdown').addEventListener('change', sortItems);
        document.getElementById('minPrice').addEventListener('change', filterByPrice);
        document.getElementById('maxPrice').addEventListener('change', filterByPrice);
    }
}
