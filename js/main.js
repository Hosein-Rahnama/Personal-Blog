import {reduceExtraScrollSpace} from './scroll.js';
import {navAddEventListeners, navSetHoverColor} from './nav.js';


// Set the hover color of the navigation bar based on the device type.
document.addEventListener('DOMContentLoaded', navSetHoverColor);

// Initialize event listeners when the DOM is fully loaded.
document.addEventListener('DOMContentLoaded', navAddEventListeners);

// Handle the extra space caused by automatic scrolling.
document.addEventListener('scrollend', reduceExtraScrollSpace);
