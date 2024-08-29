import {isInViewport, makeFooterSticky, errorPixel, isPartiallyInViewport} from './util.js'


export async function scrollToSection(targetId) {
    const targetElement = document.getElementById(targetId);
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const extra = document.getElementById('extra');
    const gap = parseInt(window.getComputedStyle(header).marginBottom, 10);

    // Calculate the position to scroll to, considering the navbar height and gaps between sections.
    let targetElementUpperSpace = targetElement.getBoundingClientRect().top - header.offsetHeight - gap;

    // Check if the target element is in the top.
    if (Math.abs(targetElementUpperSpace) < errorPixel) {
        return;
    }

    // Make footer sticky for smooth scrolling.
    if (isInViewport(targetElement)) {
        if (isInViewport(footer) || isPartiallyInViewport(footer)) {
            makeFooterSticky(true);
        }
    }

    // Handle the case where there is not enough space for scrolling down.
    const leftScrollSpace = document.body.scrollHeight - window.innerHeight - window.scrollY;
    if (leftScrollSpace < targetElementUpperSpace && targetElementUpperSpace > 0.5 * errorPixel) {
        let currentMarginBottom = parseInt(window.getComputedStyle(extra).marginBottom, 10);
        let addedScrollSpace = targetElementUpperSpace - leftScrollSpace + errorPixel;
        extra.style.marginBottom = currentMarginBottom + addedScrollSpace + 'px';
        extra.style.display = 'block';
    }
    
    // Scroll to the selected section.
    window.scrollTo({
        top: targetElementUpperSpace + window.scrollY + 0.5 * errorPixel,
        behavior: 'smooth'
    });

    // Set back the footer position to normal.
    setTimeout(function () {makeFooterSticky(false)}, 1000);
}


// Dynamically reduce the extra space caused by automatic scrolling.
export function reduceExtraScrollSpace () {
    const extra = document.getElementById('extra');
    let currentMarginBottom = parseInt(window.getComputedStyle(extra).marginBottom, 10);
    if (currentMarginBottom <= 0) {
        return;
    }

    const portfolio = document.getElementById('portfolio');
    if (isInViewport(portfolio)) {
        let visibleMarginBottom = window.innerHeight - parseInt(portfolio.getBoundingClientRect().bottom, 10);
        let extraScrollSpace = currentMarginBottom - visibleMarginBottom;
        if (extraScrollSpace > 0) {
            extra.style.marginBottom = currentMarginBottom - extraScrollSpace + 'px';
        }
    } else {
        extra.style.marginBottom = 0 + 'px';
    }
}
