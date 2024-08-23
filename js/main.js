import {navScrollOrFocusOnClick, navSetHoverColor} from './nav.js';


// Set the hover color of the navigation bar based on the device type.
document.addEventListener('DOMContentLoaded', navSetHoverColor);


// Attach event listeners to navigation bar links.
function navAddEventListeners() {
    const navLinks = document.querySelectorAll('nav a');
    for (const anchor of navLinks) {
        anchor.addEventListener('click', navScrollOrFocusOnClick);
    }
}


// Initialize event listeners when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', navAddEventListeners);
