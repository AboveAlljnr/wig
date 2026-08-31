/* ============================================================
   SISSY'S LUXURY — Shared Site Layout
   Injects the announcement bar, navigation, mobile menu, footer,
   and cart drawer into every page from a single source of truth.
   ============================================================ */

(function () {
  // Mark the current page for active nav highlighting
  var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
  if (path === '') path = 'index.html';

  var navLinks = [
    { href: 'collection.html', label: 'Collections' },
    { href: 'collection.html?cat=tops', label: 'Tops' },
    { href: 'collection.html?cat=dresses', label: 'Dresses' },
    { href: 'about.html', label: 'Our Process' },
    { href: 'ai-stylist-app/index.html', label: 'AI Stylist' },
  ];

  function navLinkList() {
    var base = path;
    var html = '';
    navLinks.forEach(function (link) {
      var isActive = (base === link.href) || (link.href.indexOf('collection') === 0 && base === 'collection.html');
      html += '<li><a href="' + link.href + '" class="nav-link' + (isActive ? ' active' : '') + '">' + link.label + '</a></li>';
    });
    return html;
  }

  var announcement = '<div class="announcement-bar">Complimentary Shipping on Orders Over <span>$350</span> &mdash; Handcrafted with Intention</div>';

  var header = '' +
    '<header class="site-header" id="site-header">' +
      '<nav class="nav-container">' +
        '<a href="index.html" class="nav-logo">SISSY\'S <span>LUXURY</span></a>' +
        '<ul class="nav-links">' + navLinkList() + '</ul>' +
        '<div class="nav-actions">' +
          '<button class="nav-action-btn" aria-label="Search">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>' +
          '</button>' +
          '<a href="account.html" class="nav-action-btn" aria-label="Account" id="account-link">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
          '</a>' +
          '<button class="nav-action-btn" id="cart-btn" aria-label="Shopping bag">' +
            '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>' +
            '<span class="cart-count" id="cart-count" style="display:none;">0</span>' +
          '</button>' +
          '<button class="nav-mobile-toggle" id="mobile-toggle" aria-label="Menu"><span></span><span></span><span></span></button>' +
        '</div>' +
      '</nav>' +
    '</header>';

  var mobileMenu = '' +
    '<div class="mobile-menu" id="mobile-menu">' +
      '<button class="mobile-menu-close" id="mobile-menu-close" aria-label="Close menu">&times;</button>' +
      '<a href="index.html">Home</a>' +
      '<a href="collection.html">Collections</a>' +
      '<a href="collection.html?cat=tops">Tops</a>' +
      '<a href="collection.html?cat=dresses">Dresses</a>' +
      '<a href="about.html">Our Process</a>' +
      '<a href="ai-stylist-app/index.html">AI Stylist</a>' +
      '<a href="account.html">Account</a>' +
    '</div>';

  var footer = '' +
    '<footer class="site-footer">' +
      '<div class="footer-container">' +
      '<div class="footer-grid">' +
        '<div class="footer-brand">' +
          '<div class="footer-brand-name">SISSY\'S LUXURY</div>' +
          '<p class="footer-brand-text">Luxury ready-to-wear fashion, handcrafted with intention. For women who demand nothing less than extraordinary.</p>' +
        '</div>' +
        '<div class="footer-column">' +
          '<div class="footer-column-title">Shop</div>' +
          '<a href="collection.html">All Collections</a>' +
          '<a href="collection.html?cat=tops">Tops &amp; Blouses</a>' +
          '<a href="collection.html?cat=dresses">Dresses &amp; Gowns</a>' +
          '<a href="collection.html?cat=bottoms">Skirts &amp; Trousers</a>' +
          '<a href="collection.html?cat=outerwear">Outerwear</a>' +
        '</div>' +
          '<div class="footer-column">' +
            '<div class="footer-column-title">Sissy\'s</div>' +
            '<a href="about.html">Our Process</a>' +
            '<a href="#">Sustainability</a>' +
            '<a href="#">Style Guide</a>' +
            '<a href="#">Size Guide</a>' +
          '</div>' +
          '<div class="footer-column">' +
            '<div class="footer-column-title">Support</div>' +
            '<a href="#">Contact Us</a>' +
            '<a href="#">Shipping &amp; Returns</a>' +
            '<a href="#">FAQ</a>' +
            '<a href="#">Privacy Policy</a>' +
          '</div>' +
        '</div>' +
        '<div class="footer-bottom">' +
          '<span class="footer-copyright">&copy; 2026 SISSY\'S LUXURY. All rights reserved.</span>' +
          '<div class="footer-social">' +
            '<a href="#" aria-label="Instagram"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg></a>' +
            '<a href="#" aria-label="Pinterest"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2C6.48 2 2 6.48 2 12c0 4.25 2.67 7.9 6.44 9.34-.09-.78-.17-1.99.04-2.85.18-.78 1.17-4.97 1.17-4.97s-.3-.6-.3-1.48c0-1.39.8-2.42 1.8-2.42.85 0 1.26.64 1.26 1.4 0 .85-.54 2.13-.82 3.31-.24.99.49 1.8 1.46 1.8 1.76 0 3.11-1.85 3.11-4.53 0-2.37-1.7-4.02-4.13-4.02-2.81 0-4.46 2.11-4.46 4.29 0 .85.33 1.76.73 2.26.08.1.09.18.07.28l-.27 1.11c-.04.18-.15.22-.34.13C6.76 14.74 5.9 12.88 5.9 11.7c0-3.05 2.22-5.85 6.4-5.85 3.36 0 5.97 2.39 5.97 5.59 0 3.34-2.1 6.03-5.03 6.03-.98 0-1.91-.51-2.22-1.12l-.6 2.3c-.22.84-.81 1.89-1.21 2.53A10 10 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2Z"/></svg></a>' +
            '<a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>' +
          '</div>' +
        '</div>' +
      '</div>' +
    '</footer>';

  var cartDrawer = '' +
    '<div class="cart-overlay" id="cart-overlay"></div>' +
    '<div class="cart-drawer" id="cart-drawer">' +
      '<div class="cart-drawer-header">' +
        '<span class="cart-drawer-title">Shopping Bag</span>' +
        '<button id="cart-close" aria-label="Close cart">&times;</button>' +
      '</div>' +
      '<div class="cart-drawer-body" id="cart-drawer-body">' +
        '<div class="cart-empty"><p class="headline-sm">Your bag is empty</p></div>' +
      '</div>' +
      '<div class="cart-drawer-footer" id="cart-drawer-footer" style="display:none;">' +
        '<div class="cart-subtotal"><span class="label-caps">Subtotal</span><span id="cart-subtotal-amount">$0.00</span></div>' +
        '<a href="checkout.html" class="btn btn-primary" style="width:100%;">Proceed to Checkout</a>' +
      '</div>' +
    '</div>';

  var footerMinimal = '' +
    '<footer class="site-footer">' +
      '<div class="footer-container">' +
        '<div class="footer-bottom" style="border: none; padding: var(--space-md) 0;">' +
          '<span class="footer-copyright">&copy; 2026 SISSY\'S LUXURY. All rights reserved.</span>' +
        '</div>' +
      '</div>' +
    '</footer>';

  document.addEventListener('DOMContentLoaded', function () {
    var layoutMounts = document.querySelectorAll('[data-site-layout]');
    if (!layoutMounts.length) return;

    layoutMounts.forEach(function (mount) {
      var region = mount.getAttribute('data-site-layout');
      var html = '';
      if (region === 'top' || region === 'all') html += announcement + header + mobileMenu;
      if (region === 'footer') html += footer;
      if (region === 'footer-minimal') html += footerMinimal;
      if (region === 'cart' || region === 'all') html += cartDrawer;
      mount.outerHTML = html;
    });
  });
})();
