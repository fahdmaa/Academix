// RTL Debug Script - Add this to your page to find overflow issues
function debugRTLOverflow() {
    console.log('=== RTL Overflow Debug ===');
    console.log('Document width:', document.documentElement.scrollWidth);
    console.log('Window width:', window.innerWidth);
    console.log('Has overflow:', document.documentElement.scrollWidth > window.innerWidth);
    
    // Find all elements that might be causing overflow
    const allElements = document.querySelectorAll('*');
    const overflowElements = [];
    
    allElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        if (rect.right > window.innerWidth || rect.left < 0) {
            overflowElements.push({
                element: element,
                tagName: element.tagName,
                className: element.className,
                id: element.id,
                rect: rect,
                styles: {
                    width: window.getComputedStyle(element).width,
                    minWidth: window.getComputedStyle(element).minWidth,
                    marginLeft: window.getComputedStyle(element).marginLeft,
                    marginRight: window.getComputedStyle(element).marginRight,
                    position: window.getComputedStyle(element).position,
                    transform: window.getComputedStyle(element).transform
                }
            });
        }
    });
    
    if (overflowElements.length > 0) {
        console.log('Found', overflowElements.length, 'elements causing overflow:');
        overflowElements.forEach((item, index) => {
            console.log(`\n${index + 1}. ${item.tagName}${item.id ? '#' + item.id : ''}${item.className ? '.' + item.className : ''}`);
            console.log('   Position:', `left: ${item.rect.left}px, right: ${item.rect.right}px`);
            console.log('   Styles:', item.styles);
            // Highlight the element
            item.element.style.outline = '3px solid red';
            item.element.style.outlineOffset = '-3px';
        });
    } else {
        console.log('No overflow elements found!');
    }
}

// Run on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', debugRTLOverflow);
} else {
    debugRTLOverflow();
}

// Also run when language changes to Arabic
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'lang') {
            if (document.documentElement.lang === 'ar') {
                setTimeout(debugRTLOverflow, 100);
            }
        }
    });
});

observer.observe(document.documentElement, { attributes: true });