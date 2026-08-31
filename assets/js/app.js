/* ============================================================
   SISSY'S LUXURY — Global Application JavaScript
   Navigation, Cart Drawer, Scroll Animations
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Scroll Reveal (IntersectionObserver) ──────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (revealElements.length) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── Header scroll effect ──────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 60) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ── Mobile Menu ───────────────────────────────────────────
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileClose = document.getElementById('mobile-menu-close');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    }

    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Cart Drawer ───────────────────────────────────────────
  const cartBtn = document.getElementById('cart-btn');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartClose = document.getElementById('cart-close');

  function openCart() {
    if (cartOverlay) cartOverlay.classList.add('active');
    if (cartDrawer) cartDrawer.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    if (cartOverlay) cartOverlay.classList.remove('active');
    if (cartDrawer) cartDrawer.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (cartBtn) cartBtn.addEventListener('click', openCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);
  if (cartClose) cartClose.addEventListener('click', closeCart);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCart();
  });

  // ── Cart State (localStorage) ─────────────────────────────
  const CART_KEY = 'sissys_luxury_cart';

  function getCart() {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY)) || [];
    } catch { return []; }
  }

  function saveCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    updateCartUI();
  }

  function addToCart(product) {
    const cart = getCart();
    const qty = product.qty || 1;
    const existing = cart.find(item => item.id === product.id && item.variant === product.variant);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ ...product, qty });
    }
    saveCart(cart);
    showToast(product.name + ' added to bag');
    openCart();
  }

  function removeFromCart(id, variant) {
    let cart = getCart();
    cart = cart.filter(item => !(item.id === id && item.variant === variant));
    saveCart(cart);
  }

  function updateItemQty(id, variant, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === id && i.variant === variant);
    if (!item) return;
    item.qty += delta;
    if (item.qty < 1) item.qty = 1;
    saveCart(cart);
  }

  function updateCartUI() {
    const cart = getCart();
    const countEl = document.getElementById('cart-count');
    const bodyEl = document.getElementById('cart-drawer-body');
    const footerEl = document.getElementById('cart-drawer-footer');
    const subtotalEl = document.getElementById('cart-subtotal-amount');

    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    if (countEl) {
      if (totalItems > 0) {
        countEl.style.display = 'flex';
        countEl.textContent = totalItems;
      } else {
        countEl.style.display = 'none';
      }
    }

    if (!bodyEl) return;

    if (cart.length === 0) {
      bodyEl.innerHTML = `
        <div class="cart-empty">
          <p class="headline-sm" style="margin-bottom: var(--space-sm);">Your bag is empty</p>
          <p class="body-md text-grey">Discover our curated collections</p>
          <a href="collection.html" class="btn btn-primary" style="margin-top: var(--space-md);">Shop Now</a>
        </div>`;
      if (footerEl) footerEl.style.display = 'none';
      return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
      subtotal += item.price * item.qty;
      html += `
        <div class="cart-item" data-item-id="${item.id.replace(/'/g,"\\'")}" data-item-variant="${(item.variant||'').replace(/'/g,"\\'")}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2280%22 height=%22100%22 fill=%22%23E8DDC9%22%3E%3Crect width=%2280%22 height=%22100%22/%3E%3C/svg%3E'">
          <div class="cart-item-details">
            <div>
              <div class="cart-item-name">${item.name}</div>
              <div class="label-caps text-grey" style="margin-top:4px;">${item.variant || ''}</div>
            </div>
            <div class="cart-item-row">
              <div class="cart-qty-controls">
                <button class="qty-btn cart-qty-minus" data-qty-action="minus">-</button>
                <span class="cart-qty-value">${item.qty}</span>
                <button class="qty-btn cart-qty-plus" data-qty-action="plus">+</button>
              </div>
              <span class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</span>
              <button class="btn-ghost cart-item-remove" style="font-size:11px;">Remove</button>
            </div>
          </div>
        </div>`;
    });

    bodyEl.innerHTML = html;
    if (footerEl) footerEl.style.display = 'block';
    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  }

  // Cart event delegation (qty +/- / remove)
  document.addEventListener('click', (e) => {
    const target = e.target.closest('.cart-item-remove, .cart-qty-minus, .cart-qty-plus');
    if (!target) return;
    const itemEl = target.closest('.cart-item');
    if (!itemEl) return;
    const id = itemEl.dataset.itemId;
    const variant = itemEl.dataset.itemVariant || 'Default';
    if (target.classList.contains('cart-item-remove')) {
      removeFromCart(id, variant);
      updateCartUI();
    } else if (target.classList.contains('cart-qty-minus')) {
      updateItemQty(id, variant, -1);
      updateCartUI();
    } else if (target.classList.contains('cart-qty-plus')) {
      updateItemQty(id, variant, +1);
      updateCartUI();
    }
  });

  // ── Toast notification ──────────────────────────────────
  function showToast(msg) {
    let toast = document.getElementById('cart-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cart-toast';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.className = 'cart-toast visible';
    clearTimeout(toast._hide);
    toast._hide = setTimeout(() => { toast.className = 'cart-toast'; }, 2400);
  }

  // ── Auth ───────────────────────────────────────────────────
  const USERS_KEY = 'sissys_luxury_users';
  const SESSION_KEY = 'sissys_luxury_session';

  function getUsers() { try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; } }
  function saveUsers(u) { localStorage.setItem(USERS_KEY, JSON.stringify(u)); }
  function getSession() { try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch { return null; } }
  function saveSession(s) { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); }
  function clearSession() { sessionStorage.removeItem(SESSION_KEY); }

  window.SissyAuth = {
    register(name, email, password) {
      const users = getUsers();
      if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, message: 'An account with this email already exists.' };
      }
      users.push({ name, email: email.toLowerCase(), password, created: Date.now() });
      saveUsers(users);
      saveSession({ name, email: email.toLowerCase() });
      return { success: true };
    },
    login(email, password) {
      const users = getUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) return { success: false, message: 'No account found with this email.' };
      if (user.password !== password) return { success: false, message: 'Incorrect password.' };
      saveSession({ name: user.name, email: user.email });
      return { success: true };
    },
    logout() { clearSession(); },
    getUser() { return getSession(); },
    isLoggedIn() { return !!getSession(); },
  };

  function updateAccountIcon() {
    const link = document.getElementById('account-link');
    if (!link) return;
    const session = getSession();
    if (session) {
      const initial = session.name.charAt(0).toUpperCase();
      link.innerHTML = '<span style="width:20px;height:20px;border-radius:50%;background:var(--color-gold);color:var(--color-charcoal);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;line-height:1;">' + initial + '</span>';
    } else {
      link.innerHTML = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';
    }
  }

  // Expose cart functions globally
  window.SissysCart = {
    add: addToCart,
    remove: (id, variant) => { removeFromCart(id, variant); updateCartUI(); },
    get: getCart,
  };

  // Initial UI updates
  updateCartUI();
  updateAccountIcon();

  // ── Search Overlay ─────────────────────────────────────────
  (function initSearch() {
    // Inject overlay HTML
    const overlay = document.createElement('div');
    overlay.className = 'search-overlay';
    overlay.id = 'search-overlay';
    overlay.innerHTML = `
      <button class="search-overlay-close" id="search-overlay-close" aria-label="Close search">&times;</button>
      <div class="search-overlay-inner">
        <input type="text" class="search-overlay-input" id="search-overlay-input" placeholder="Search collections..." autocomplete="off">
        <div class="search-overlay-hint">Press <strong style="color:var(--color-gold);">Enter</strong> to search &middot; <strong style="color:var(--color-gold);">Esc</strong> to close</div>
      </div>`;
    document.body.appendChild(overlay);

    const searchBtns = document.querySelectorAll('.nav-action-btn[aria-label="Search"]');
    const searchOverlay = document.getElementById('search-overlay');
    const searchInput = document.getElementById('search-overlay-input');
    const searchClose = document.getElementById('search-overlay-close');

    if (!searchOverlay) return;

    function openSearch() {
      searchOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (searchInput) setTimeout(() => searchInput.focus(), 100);
    }

    function closeSearch() {
      searchOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (searchInput) searchInput.value = '';
    }

    searchBtns.forEach(btn => btn.addEventListener('click', openSearch));
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) { e.preventDefault(); openSearch(); }
    });
    if (searchInput) {
      searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && searchInput.value.trim()) {
          window.location.href = 'collection.html?search=' + encodeURIComponent(searchInput.value.trim());
        }
      });
    }
  })();

  // ── Add to Cart buttons ───────────────────────────────────
  document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const data = btn.dataset;
      addToCart({
        id: data.productId,
        name: data.productName,
        price: parseFloat(data.productPrice),
        image: data.productImage,
        variant: data.productVariant || 'Default',
        qty: parseInt(data.productQty, 10) || 1,
      });
    });
  });

  // ── Newsletter subscription ──────────────────────────────
  const newsletterForm = document.querySelector('.newsletter-input-group');
  if (newsletterForm) {
    const input = newsletterForm.querySelector('input[type="email"]');
    const btn = newsletterForm.querySelector('button');
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = (input && input.value || '').trim();
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        input.style.borderBottomColor = 'var(--color-error)';
        return;
      }
      input.style.borderBottomColor = '';
      const msg = document.createElement('div');
      msg.textContent = 'Thank you for subscribing!';
      msg.style.cssText = 'font-size:12px;color:var(--color-gold);margin-top:var(--space-sm);text-align:center;';
      newsletterForm.parentElement.appendChild(msg);
      btn.disabled = true;
    });
  }

});
