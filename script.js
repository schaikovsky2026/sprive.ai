const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Subtle parallax — hero only, so it never fights scroll on lower sections.
// Inner pages have no .hero .container so this is a no-op there.
if (!prefersReducedMotion) {
    const heroContainer = document.querySelector('.hero .container');
    if (heroContainer) {
        document.addEventListener('mousemove', (e) => {
            const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
            const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
            heroContainer.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;
        });
    }
}

document.addEventListener('contextmenu', event => event.preventDefault());

// Scroll reveals — fire once per section, then unobserve.
const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.25 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Tagline rotation — only runs if a tagline element is present (homepage).
const taglines = [
    'Your Private AI Solution',
    'Bespoke AI for Your Business',
    'Private AI. Built for One.',
    'Your Data. Your Model. Your AI.'
];
const taglineEl = document.querySelector('.tagline-line');
if (taglineEl && !prefersReducedMotion) {
    let taglineIndex = 0;
    setInterval(() => {
        taglineEl.classList.remove('is-visible');
        setTimeout(() => {
            taglineIndex = (taglineIndex + 1) % taglines.length;
            taglineEl.textContent = taglines[taglineIndex];
            taglineEl.classList.add('is-visible');
        }, 1200);
    }, 6000);
}
