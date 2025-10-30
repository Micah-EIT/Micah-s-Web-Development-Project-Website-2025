const menu = document.getElementById('menuOverlay');
const navBar = document.getElementById('navBar');
const links = document.getElementById('links');

/**
 * Opens or closes the menu for mobile devices based on whether the menu is currently open or closed.
 * 
 * @param {none}
 * 
 * @returns {none}
 */
function openCloseNav() {
    if (menu.style.display == 'none') {
        menu.style.display = 'flex';
        return;
    }
    else {
        menu.style.display = 'none';
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
function responsiveMenu(pageTitle) {
    if (window.innerWidth > 1200) {
        navBar.innerHTML += links.innerHTML;
        menu.innerHTML = '';
        document.getElementById('hamburgerMenuIcon').remove();
        
        // Highlights the link for the page that is currently open
        if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Home') {
            document.getElementById('homeLink').style.backgroundColor = '#FFFFFF'
        }
        if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Shop') {
            document.getElementById('shopLink').style.backgroundColor = '#FFFFFF'
        }
        if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - What We Buy') {
            document.getElementById('whatWeBuyLink').style.backgroundColor = '#FFFFFF'
        }
        if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Contact Us') {
            document.getElementById('contactUsLink').style.backgroundColor = '#FFFFFF'
        }
        if (document.getElementsByTagName('title')[0].innerHTML == 'Rehome - Cart') {
            document.getElementById('shoppingCartMenuContainer').style.backgroundColor = '#FFFFFF'
        }
    }

    // Hides the number of cart items if there are no items in the cart 
    if (document.getElementById('numberOfCartItems').innerHTML == 0) {
        document.getElementById('numberOfCartItems').style.display = 'none';
    }
    
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