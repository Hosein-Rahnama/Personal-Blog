// Consider a constant for errors.
export const errorPixel = 2;


// Check if an element is in viewport.
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    let status = (rect.top >= 0) && 
                 (rect.left >= 0) && 
                 (rect.bottom <= viewportHeight + errorPixel) && 
                 (rect.right <= viewportWidth + errorPixel);
    return status;
}


// Make footer stick to the bottom of the page.
export function makeFooterSticky(status) {
    const footer = document.querySelector('footer');
    if (status) {
        footer.classList.add('sticky-footer');
    } else {
        footer.classList.remove('sticky-footer');
    }
}


// Dectect the device is mobile or tablet.
export function isMobileOrTablet() {
    return /android|mobile|iphone|ipad/i.test(navigator.userAgent.toLowerCase());
}
