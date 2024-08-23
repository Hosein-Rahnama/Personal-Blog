import {isInViewport, makeFooterSticky, isMobileOrTablet, errorPixel} from './util.js'


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


function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    const header = document.querySelector('header');
    const extra = document.getElementById('extra');
    const gap = parseInt(window.getComputedStyle(header).marginBottom, 10);

    // Calculate the position to scroll to, considering the navbar height and gaps between sections.
    const targetElementUpperSpace = targetElement.getBoundingClientRect().top - header.offsetHeight - gap;

    // Check if the target element is in the top.
    if (Math.abs(targetElementUpperSpace) < 2) {
        return;
    }

    // Make footer sticky.
    const footer = document.querySelector('footer');
    if (isInViewport(targetElement) && isInViewport(footer)) {
        makeFooterSticky(true);
    }

    // Handle the case where there is not enough space for scrolling down.
    const leftScrollSpace = document.body.scrollHeight - window.innerHeight - window.scrollY;
    if (leftScrollSpace < targetElementUpperSpace && targetElementUpperSpace > 0.5 * errorPixel) {
        let currentMarginBottom = parseInt(window.getComputedStyle(extra).marginBottom, 10);
        let addedScrollSpace = targetElementUpperSpace - leftScrollSpace;
        extra.style.marginBottom = currentMarginBottom + addedScrollSpace + 'px';
        extra.style.display = 'block';
    }
    
    // Scroll to the selected section.
    window.scrollTo({
        top: targetElementUpperSpace + window.scrollY + 0.25 * errorPixel,
        behavior: 'smooth'
    });

    // Set back the footer position to normal.
    setTimeout(function () { makeFooterSticky(false) }, 1000);
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
