// Consider a constant for errors.
export const errorPixel = 2;


// Check if an element is in viewport.
export function isInViewport(element) {
    const header = document.querySelector('header')
    const rect = element.getBoundingClientRect();
    let status = (rect.top - header.offsetHeight >= 0) && 
                 (rect.left >= 0) && 
                 (rect.bottom <= window.innerHeight + errorPixel) && 
                 (rect.right <= window.innerWidth + errorPixel);
    return status;
}


export function isPartiallyInViewport(element) {
    const rect = element.getBoundingClientRect();
    let status = (window.innerHeight - rect.bottom < 0) && (window.innerHeight - rect.top >= 0);
    return status;
}


// Make footer stick to the bottom of the page.
export function makeFooterSticky(status) {
    const footer = document.querySelector('footer');
    if (status) {
        const root = document.documentElement;
        const rect = footer.getBoundingClientRect();
        let bottom = (window.innerHeight - rect.bottom) + 'px';
        root.style.setProperty('--footer-bottom', bottom);
        footer.classList.add('sticky-footer');
    } else {
        footer.classList.remove('sticky-footer');
    }
}


// Dectect the device is mobile or tablet.
export function isMobileOrTablet() {
    return /android|mobile|iphone|ipad/i.test(navigator.userAgent.toLowerCase());
}
