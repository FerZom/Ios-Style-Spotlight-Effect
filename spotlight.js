/**
 * Adds a spotlight effect to an element with customizable options.
 * @param {HTMLElement} element - The DOM element to apply the effect to.
 * @param {Object} options - Configuration options for the spotlight effect.
 * @param {number} [options.size=100] - Size of the spotlight in pixels.
 * @param {string} [options.color='rgba(255,255,255,0.3)'] - Spotlight color on hover.
 * @param {string} [options.clickColor='rgba(255,255,255,0.5)'] - Spotlight color on click.
 * @param {number} [options.blur=10] - Blur amount in pixels.
 * @param {number} [options.hoverOpacity=1] - Opacity during hover.
 * @param {number} [options.clickScale=5] - Scale factor for click animation.
 * @param {number} [options.hoverDuration=0.3] - Hover transition duration in seconds.
 * @param {number} [options.clickDuration=1] - Click animation duration in seconds.
 * @param {number} [options.scaleDuration=0.4] - Scale animation duration in seconds.
 */
function addSpotlightEffect(element, options = {}) {
    element.classList.add('spotlight-effect');

    // Default options
    const defaults = {
        size: 100,
        color: 'rgba(255,255,255,0.3)',
        clickColor: 'rgba(255,255,255,0.5)',
        blur: 10,
        hoverOpacity: 1,
        clickScale: 5,
        hoverDuration: 0.3,
        clickDuration: 1,
        scaleDuration: 0.4
    };
    const settings = { ...defaults, ...options };

    // Apply CSS custom properties
    element.style.setProperty('--spotlight-size', `${settings.size}px`);
    element.style.setProperty('--spotlight-color', settings.color);
    element.style.setProperty('--spotlight-click-color', settings.clickColor);
    element.style.setProperty('--spotlight-blur', `${settings.blur}px`);
    element.style.setProperty('--hover-opacity', settings.hoverOpacity);
    element.style.setProperty('--click-scale', settings.clickScale);
    element.style.setProperty('--hover-duration', `${settings.hoverDuration}s`);
    element.style.setProperty('--click-duration', `${settings.clickDuration}s`);
    element.style.setProperty('--scale-duration', `${settings.scaleDuration}s`);

    // Hover (mousemove)
    element.addEventListener('mousemove', e => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        element.style.setProperty('--x', `${x}px`);
        element.style.setProperty('--y', `${y}px`);
    });

    // Hover enter
    element.addEventListener('mouseenter', () => {
        element.style.setProperty('--opacity', settings.hoverOpacity);
    });

    // Hover leave
    element.addEventListener('mouseleave', () => {
        element.style.setProperty('--opacity', '0');
    });

    // Click effect
    element.addEventListener('click', e => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Set transform-origin as percentage
        const originX = (x / rect.width) * 100;
        const originY = (y / rect.height) * 100;
        element.style.transformOrigin = `${originX}% ${originY}%`;

        // Trigger animations
        element.classList.remove('clicked', 'clicked-scale');
        void element.offsetWidth; // Force reflow
        element.classList.add('clicked', 'clicked-scale');

        // Reset after animation
        element.addEventListener('animationend', () => {
            element.classList.remove('clicked', 'clicked-scale');
            element.style.setProperty('--opacity', settings.hoverOpacity);
        }, { once: true });
    });
}

window.SpotlightEffect = {
    applyTo: function (selector, options = {}) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => addSpotlightEffect(el, options));
    }
};

