import { findNumberOfCartItems } from "./cartItemHandler.js";

/**
 * Opens or closes the menu for mobile devices based on whether the menu is currently open or closed.
 * 
 * @param {none}
 * 
 * @returns {none}
 */
function openCloseNav() {
    const menu = document.getElementById('menuOverlay');

    if (menu.style.display == 'none') {
        menu.style.display = 'flex';
        document.getElementById('shopNowButton').style.display = 'none';
        return;
    }
    else {
        menu.style.display = 'none';
        document.getElementById('shopNowButton').style.display = 'block';
        return;
    }
}

/**
 * Adds the links to the main nav bar and removes the curtain menu for large screens
 * 
 * @param {none}
 * 
 * @returns {none}
 */
function responsiveMenu() {
    const menu = document.getElementById('menuOverlay');
    const navBar = document.getElementById('navBar');
    const links = document.getElementById('links');
    let title = document.getElementsByTagName('title')[0].innerHTML

    if (window.innerWidth > 1200) {
        navBar.innerHTML += links.innerHTML;
        menu.innerHTML = '';
        document.getElementById('hamburgerMenuIcon').remove();
        
        // Highlights the link for the page that is currently open
        if (title == 'Rehome - Home') {
            document.getElementById('homeLink').style.backgroundColor = '#FFFFFF'
        }
        if (title == 'Rehome - Shop') {
            document.getElementById('shopLink').style.backgroundColor = '#FFFFFF'
        }
        if (title == 'Rehome - What We Buy') {
            document.getElementById('whatWeBuyLink').style.backgroundColor = '#FFFFFF'
        }
        if (title == 'Rehome - Contact Us') {
            document.getElementById('contactUsLink').style.backgroundColor = '#FFFFFF'
        }
        if (title == 'Rehome - Cart') {
            document.getElementById('shoppingCart').style.backgroundColor = '#FFFFFF'
        }
    }
    else {
        document.getElementById('hamburgerMenuIcon').addEventListener('click', openCloseNav)
    }

    // Updates the number of cart items icon
    findNumberOfCartItems()
}

// The responsive menu changes when the page loads
window.onload = responsiveMenu()

// Reloads the window when the page is resized, with a timeout so that it isn't constantly called while the page is being resized
// This is used to trigger changes based on device width, which are usually triggered when the page loads
// Based on code from the 'Debouncing' section of 'Optimizing window.onresize' by Ben Centra 
// https://bencentra.com/code/2015/02/27/optimizing-window-resize.html
let timeout = false, 
    delay = 250, 
    calls = 0;

window.addEventListener('resize', function() {
  clearTimeout(timeout);
  timeout = setTimeout(location.reload(), delay);

});
