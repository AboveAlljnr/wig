/* ============================================================
   SISSY'S LUXURY — Order Confirmation (reads from sessionStorage)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  const orderData = sessionStorage.getItem('maison_creme_order');

  if (!orderData) {
    document.querySelector('.confirm-page').innerHTML = `
      <p style="font-size:14px;color:var(--color-grey-dark);">No order data found.</p>
      <a href="collection.html" class="btn btn-primary" style="margin-top:var(--space-md);">Shop Now</a>`;
    return;
  }

  try {
    const order = JSON.parse(orderData);

    const orderNumEl = document.getElementById('confirm-order-number');
    const dateEl = document.getElementById('confirm-date');
    const itemsEl = document.getElementById('confirm-items');
    const totalEl = document.getElementById('confirm-total');
    const emailRow = document.getElementById('confirm-email-row');
    const emailEl = document.getElementById('confirm-email');

    if (orderNumEl) orderNumEl.textContent = order.orderNumber || 'MC-2026-00000';
    if (dateEl) dateEl.textContent = order.date || new Date().toLocaleDateString();
    if (emailEl && order.email) { emailEl.textContent = order.email; if (emailRow) emailRow.style.display = 'flex'; }

    if (itemsEl && order.cart && order.cart.length) {
      let html = '';
      let subtotal = 0;
      order.cart.forEach(item => {
        const line = item.price * (item.qty || 1);
        subtotal += line;
        html += `
          <div class="confirm-detail-row">
            <span class="confirm-detail-label">${item.name}${item.qty > 1 ? ' × ' + item.qty : ''}</span>
            <span class="confirm-detail-value">$${line.toFixed(2)}</span>
          </div>`;
      });
      itemsEl.innerHTML = html;
      const total = subtotal + subtotal * 0.0875;
      if (totalEl) totalEl.textContent = `$${total.toFixed(2)}`;
    }

    // Clear cart + session data only when leaving the page
    const clearStorage = () => {
      sessionStorage.removeItem('maison_creme_order');
      localStorage.removeItem('maison_creme_cart');
    };
    window.addEventListener('beforeunload', clearStorage);
    // Also clear on navigating away via link click
    document.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setTimeout(clearStorage, 50));
    });
  } catch {
    // silent
  }
});
