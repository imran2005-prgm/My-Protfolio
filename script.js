// Main script: progress bars, mobile menu, and scroll-activated nav highlighting
document.addEventListener('DOMContentLoaded', () => {
    // Progress Bar
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const value = bar.getAttribute('data-progress') || '0';
        bar.style.width = value + '%';
    });

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menuToggle');
    const sideBar = document.getElementById('sideBar');

    if (menuToggle && sideBar) {
        menuToggle.addEventListener('click', () => sideBar.classList.toggle('active'));

        // Close menu when a link is clicked
        const menuLinks = sideBar.querySelectorAll('a');
        menuLinks.forEach(link => link.addEventListener('click', () => sideBar.classList.remove('active')));

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            const isClickInsideMenu = sideBar.contains(event.target);
            const isClickOnMenuButton = menuToggle.contains(event.target);
            if (!isClickInsideMenu && !isClickOnMenuButton && sideBar.classList.contains('active')) {
                sideBar.classList.remove('active');
            }
        });
    }

    // Scroll-activated nav highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.side-bar a[href^="#"]');

    const setActiveLink = (id) => {
        navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === '#' + id));
    };

    if ('IntersectionObserver' in window && sections.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, { root: null, rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        sections.forEach(sec => observer.observe(sec));
    } else {
        // Fallback: on scroll check
        const onScroll = () => {
            const scrollPos = window.scrollY || document.documentElement.scrollTop;
            for (let sec of sections) {
                const top = sec.offsetTop - 120;
                const height = sec.offsetHeight;
                if (scrollPos >= top && scrollPos < top + height) {
                    setActiveLink(sec.id);
                    break;
                }
            }
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();
    }
});