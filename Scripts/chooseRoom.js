/** 
 * Opens the shop and adds items based on the room chosen by the user. 
 * 
 * @param {string} room the room chosen by the user. 
 * 
 * @returns {none}
 */ 
function openShop(room) {
    localStorage.setItem('room', room)
    window.location = 'shop.html';
}