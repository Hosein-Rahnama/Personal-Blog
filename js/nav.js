import {scrollToSection} from './scroll.js';
import {isMobileOrTablet, errorPixel} from './util.js'


// Scroll or focus on the selection section.
export function navScrollOrFocusOnClick(event) {
    if (Math.abs(document.body.scrollHeight - window.innerHeight) < 2 * errorPixel) {
        navFocusOnClick(event);
    } else {
        navScrollOnClick(event);
    }
}


// Scroll to the selected section.
export function navScrollOnClick(event) {
    event.preventDefault();

    // Color selected section in navigation bar.
    const navLinks = document.querySelectorAll('nav a');
    for (const link of navLinks) {
        link.classList.remove('selected');
    }
    event.target.classList.add('selected');

    let targetId = event.target.getAttribute('href').substring(1);
    scrollToSection(targetId);
}


// Focus on the selected section.
export function navFocusOnClick(event) {
    event.preventDefault();

    const navLinks = document.querySelectorAll('nav a');
    if (!event.target.classList.contains('selected')) {
        for (const link of navLinks) {
            link.classList.remove('selected');
            let elementId = link.getAttribute('href').substring(1);
            document.getElementById(elementId).style.display = 'none';
        }
        event.target.classList.add('selected');
        let targetId = event.target.getAttribute('href').substring(1);
        document.getElementById(targetId).style.display = 'block';
    } else {
        for (const link of navLinks) {
            link.classList.remove('selected');
            let elementId = link.getAttribute('href').substring(1);
            document.getElementById(elementId).style.display = 'block';
        }
    }
}


// Set the hovering color for navigation bar.
export function navSetHoverColor() {
    if (isMobileOrTablet()) {
        document.documentElement.style.setProperty('--nav-hover-color', 'white');
    }
}


// Attach event listeners to navigation bar links.
export function navAddEventListeners() {
    const navLinks = document.querySelectorAll('nav a');
    for (const anchor of navLinks) {
        anchor.addEventListener('click', navScrollOrFocusOnClick);
    }
}
