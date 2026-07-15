/**
 * Hamburger Menu Controller
 * Handles sidebar open/close on small screens via the hamburger button.
 */
(function () {
    const btn = document.getElementById('hamburger-btn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!btn || !sidebar || !overlay) return;

    function openMenu() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        btn.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden'; // prevent background scroll
    }

    function closeMenu() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        btn.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', function () {
        const isOpen = sidebar.classList.contains('open');
        isOpen ? closeMenu() : openMenu();
    });

    // Close when clicking on the overlay
    overlay.addEventListener('click', closeMenu);

    // Close when a menu link is clicked (navigating away)
    document.querySelectorAll('.sidebar-menu a').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeMenu();
    });
})();
