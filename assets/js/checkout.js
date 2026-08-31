/* ============================================================
   SISSY'S LUXURY — Checkout Form Validation & Order Summary
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const CART_KEY = 'sissys_luxury_cart';

  // ── Populate order summary from cart ───────────────────────
  function renderOrderSummary() {
    const container = document.getElementById('order-items');
    const subtotalEl = document.getElementById('order-subtotal');
    const totalEl = document.getElementById('order-total');

    if (!container) return;

    let cart = [];
    try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { cart = []; }

    if (cart.length === 0) {
      container.innerHTML = '<p style="font-size:14px;color:var(--color-grey-dark);padding:var(--space-md) 0;">Your cart is empty.</p>';
      if (subtotalEl) subtotalEl.textContent = '$0.00';
      if (totalEl) totalEl.textContent = '$0.00';
      return;
    }

    let html = '';
    let subtotal = 0;
    cart.forEach(item => {
      const lineTotal = item.price * (item.qty || 1);
      subtotal += lineTotal;
      html += `
        <div class="order-item">
          <img src="${item.image || 'assets/images/product-blouse.jpg'}" alt="${item.name}" class="order-item-img">
          <div>
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-variant">${item.variant || 'Standard'} ${item.qty > 1 ? '× ' + item.qty : ''}</div>
            <div class="order-item-price">$${lineTotal.toFixed(2)}</div>
          </div>
        </div>`;
    });

    container.innerHTML = html;
    const tax = subtotal * 0.0875;
    const shipping = subtotal >= 350 ? 0 : 15;
    const total = subtotal + tax + shipping;

    if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    const shippingEl = document.getElementById('order-shipping');
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`;
    const taxEl = document.getElementById('order-tax');
    if (taxEl) taxEl.textContent = `$${tax.toFixed(2)}`;
    if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
  }

  renderOrderSummary();

  // ── Field references ──────────────────────────────────────
  const fields = {
    email:      { el: document.getElementById('email'),      required: true, validate: 'email' },
    phone:      { el: document.getElementById('phone'),      required: true, validate: 'phone' },
    firstName:  { el: document.getElementById('first-name'), required: true, validate: 'text' },
    lastName:   { el: document.getElementById('last-name'),  required: true, validate: 'text' },
    address:    { el: document.getElementById('address'),    required: true, validate: 'text' },
    city:       { el: document.getElementById('city'),       required: true, validate: 'text' },
    state:      { el: document.getElementById('state'),      required: true, validate: 'text' },
    zip:        { el: document.getElementById('zip'),        required: true, validate: 'zip' },
    cardNumber: { el: document.getElementById('card-number'),required: true, validate: 'card' },
    expiry:     { el: document.getElementById('expiry'),     required: true, validate: 'expiry' },
    cvv:        { el: document.getElementById('cvv'),        required: true, validate: 'cvv' },
    cardName:   { el: document.getElementById('card-name'),  required: true, validate: 'text' },
  };

  // ── Validation rules ──────────────────────────────────────
  const validators = {
    email:  (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    phone:  (v) => /^[\d\s\-\+\(\)]{7,20}$/.test(v),
    text:   (v) => v.trim().length >= 1,
    zip:    (v) => /^\d{5}(-\d{4})?$/.test(v),
    card:   (v) => /^[\d\s]{13,19}$/.test(v.replace(/\s/g, '')),
    expiry: (v) => /^\d{2}\s*\/\s*\d{2}$/.test(v),
    cvv:    (v) => /^\d{3,4}$/.test(v),
  };

  const fieldLabels = {
    email:      'Email address',
    phone:      'Phone number',
    firstName:  'First name',
    lastName:   'Last name',
    address:    'Address',
    city:       'City',
    state:      'State',
    zip:        'Zip code',
    cardNumber: 'Card number',
    expiry:     'Expiry date',
    cvv:        'CVV',
    cardName:   'Name on card',
  };

  // ── Show / clear error ────────────────────────────────────
  function showError(fieldKey, message) {
    const field = fields[fieldKey];
    if (!field || !field.el) return;
    field.el.style.borderBottomColor = 'var(--color-error)';
    // Remove existing error
    const existing = field.el.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
    const err = document.createElement('div');
    err.className = 'field-error';
    err.style.cssText = 'color:var(--color-error);font-size:11px;margin-top:4px;letter-spacing:0.02em;';
    err.textContent = message;
    field.el.parentElement.appendChild(err);
  }

  function clearError(fieldKey) {
    const field = fields[fieldKey];
    if (!field || !field.el) return;
    field.el.style.borderBottomColor = '';
    const existing = field.el.parentElement.querySelector('.field-error');
    if (existing) existing.remove();
  }

  function clearAllErrors() {
    Object.keys(fields).forEach(clearError);
  }

  // ── Validate single field ─────────────────────────────────
  function validateField(fieldKey) {
    const field = fields[fieldKey];
    if (!field || !field.el) return true;

    clearError(fieldKey);
    const value = field.el.value.trim();

    if (field.required && !value) {
      showError(fieldKey, `${fieldLabels[fieldKey]} is required`);
      return false;
    }

    if (value && !validators[field.validate](value)) {
      const msgs = {
        email:  'Enter a valid email address',
        phone:  'Enter a valid phone number',
        text:   'This field is required',
        zip:    'Enter a valid zip code (e.g. 12345)',
        card:   'Enter a valid card number',
        expiry: 'Use MM / YY format',
        cvv:    'CVV must be 3 or 4 digits',
      };
      showError(fieldKey, msgs[field.validate] || 'Invalid entry');
      return false;
    }

    return true;
  }

  // ── Auto-format card number ───────────────────────────────
  const cardInput = fields.cardNumber.el;
  if (cardInput) {
    cardInput.addEventListener('input', () => {
      let val = cardInput.value.replace(/\D/g, '').slice(0, 16);
      let formatted = '';
      for (let i = 0; i < val.length; i++) {
        if (i > 0 && i % 4 === 0) formatted += ' ';
        formatted += val[i];
      }
      cardInput.value = formatted;
      if (cardInput.style.borderBottomColor) clearError('cardNumber');
    });
  }

  // ── Auto-format expiry ────────────────────────────────────
  const expiryInput = fields.expiry.el;
  if (expiryInput) {
    expiryInput.addEventListener('input', () => {
      let val = expiryInput.value.replace(/\D/g, '').slice(0, 4);
      if (val.length >= 2) {
        val = val.slice(0, 2) + ' / ' + val.slice(2);
      }
      expiryInput.value = val;
      if (expiryInput.style.borderBottomColor) clearError('expiry');
    });
  }

  // ── Real-time blur validation ─────────────────────────────
  Object.keys(fields).forEach(key => {
    const field = fields[key];
    if (field.el) {
      field.el.addEventListener('blur', () => validateField(key));
      field.el.addEventListener('input', () => {
        if (field.el.style.borderBottomColor) clearError(key);
      });
    }
  });

  // ── Place order ───────────────────────────────────────────
  const placeBtn = document.getElementById('place-order-btn');
  if (placeBtn) {
    placeBtn.addEventListener('click', (e) => {
      e.preventDefault();

      clearAllErrors();
      let valid = true;
      Object.keys(fields).forEach(key => {
        if (!validateField(key)) valid = false;
      });

      if (!valid) {
        // Scroll to first error
        const firstError = document.querySelector('.field-error');
        if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
      }

      // Disable button to prevent double-submit
      placeBtn.disabled = true;
      placeBtn.textContent = 'Processing…';
      placeBtn.style.opacity = '0.6';
      placeBtn.style.cursor = 'not-allowed';

      // Store order data for confirmation page
      const orderData = {
        orderNumber: 'SL-' + new Date().getFullYear() + '-' + String(Math.floor(Math.random() * 90000) + 10000),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        email: fields.email.el.value.trim(),
        cart: JSON.parse(localStorage.getItem(CART_KEY)) || [],
      };
      sessionStorage.setItem('sissys_luxury_order', JSON.stringify(orderData));

      // Navigate
      window.location.href = 'confirmation.html';
    });
  }
});
