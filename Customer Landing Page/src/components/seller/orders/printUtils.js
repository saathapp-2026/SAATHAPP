/**
 * Print utilities for invoices, labels, barcodes, QR, GST, packing slips.
 */

function openPrintWindow(title, html, paper = 'A4') {
  const w = window.open('', '_blank', 'width=900,height=700');
  if (!w) return { success: false, error: 'Popup blocked' };
  const pageCss =
    paper === 'thermal'
      ? '@page { size: 80mm auto; margin: 4mm; } body { width: 72mm; font-size: 12px; }'
      : '@page { size: A4; margin: 16mm; }';
  w.document.write(`<!DOCTYPE html><html><head><title>${title}</title>
    <style>
      ${pageCss}
      body { font-family: system-ui, sans-serif; color: #111; }
      h1 { font-size: 18px; margin: 0 0 8px; }
      table { width: 100%; border-collapse: collapse; margin-top: 12px; }
      th, td { border: 1px solid #ddd; padding: 6px 8px; text-align: left; font-size: 12px; }
      .muted { color: #666; font-size: 12px; }
      .barcode { font-family: monospace; letter-spacing: 3px; font-size: 20px; padding: 8px; border: 1px dashed #333; display: inline-block; }
      .qr { width: 96px; height: 96px; border: 2px solid #111; display: flex; align-items: center; justify-content: center; font-size: 10px; text-align: center; }
      .row { display: flex; justify-content: space-between; gap: 16px; }
      @media print { .no-print { display: none; } }
    </style></head><body>${html}
    <p class="no-print muted"><button onclick="window.print()">Print</button></p>
    </body></html>`);
  w.document.close();
  setTimeout(() => {
    try {
      w.focus();
      w.print();
    } catch {
      // ignore
    }
  }, 250);
  return { success: true };
}

export function printInvoice(order, { gst = false, paper = 'A4' } = {}) {
  const itemsRows = order.items
    .map(
      (i) =>
        `<tr><td>${i.name}<br/><span class="muted">${i.sku}</span></td><td>${i.qty}</td><td>₹${i.price}</td><td>${i.gst}%</td><td>₹${i.price * i.qty}</td></tr>`
    )
    .join('');
  const html = `
    <h1>${gst ? 'GST Tax Invoice' : 'Invoice'} — ${order.invoiceNumber}</h1>
    <p class="muted">Order ${order.id} · ${new Date(order.createdAt).toLocaleString('en-IN')}</p>
    <div class="row">
      <div><strong>Bill To</strong><br/>${order.customer.name}<br/>${order.customer.phone}<br/>${order.customer.address}</div>
      <div><strong>Seller</strong><br/>SAATHAPP Seller<br/>GSTIN: 29AAAAA0000A1Z5</div>
    </div>
    <table>
      <thead><tr><th>Item</th><th>Qty</th><th>Price</th><th>GST</th><th>Total</th></tr></thead>
      <tbody>${itemsRows}</tbody>
    </table>
    <p style="text-align:right;margin-top:12px">
      Delivery: ₹${order.deliveryCharge} · Packing: ₹${order.packingCharge} · Platform: ₹${order.platformFee}<br/>
      Taxes: ₹${order.taxes} · Discount: ₹${order.discount}<br/>
      <strong>Grand Total: ₹${order.amount}</strong>
    </p>
  `;
  return openPrintWindow(gst ? 'GST Invoice' : 'Invoice', html, paper);
}

export function printShippingLabel(order) {
  const html = `
    <h1>Shipping Label</h1>
    <p><strong>To:</strong> ${order.customer.name}<br/>${order.customer.address}<br/>${order.customer.phone}</p>
    <p><strong>Order:</strong> ${order.id}</p>
    <p><strong>Partner:</strong> ${order.deliveryPartner || 'Saath Delivery'}</p>
    <div class="barcode">${order.id.replace('-', '')}</div>
  `;
  return openPrintWindow('Shipping Label', html, 'thermal');
}

export function printBarcode(order) {
  return openPrintWindow(
    'Barcode',
    `<h1>Barcode</h1><div class="barcode">*${order.id}*</div><p class="muted">${order.id}</p>`,
    'thermal'
  );
}

export function printQR(order) {
  return openPrintWindow(
    'QR Code',
    `<h1>QR Code</h1><div class="qr">QR<br/>${order.id}</div><p class="muted">Scan to verify package</p>`,
    'thermal'
  );
}

export function printPackingSlip(order) {
  const rows = order.items.map((i) => `<tr><td>☐ ${i.name}</td><td>${i.sku}</td><td>${i.qty}</td></tr>`).join('');
  return openPrintWindow(
    'Packing Slip',
    `<h1>Packing Slip — ${order.id}</h1><table><thead><tr><th>Item</th><th>SKU</th><th>Qty</th></tr></thead><tbody>${rows}</tbody></table>`,
    'A4'
  );
}

export function downloadPdfPlaceholder(order, type = 'invoice') {
  const content = `${type.toUpperCase()} for ${order.id}\nInvoice: ${order.invoiceNumber}\nCustomer: ${order.customer.name}\nAmount: ₹${order.amount}\n`;
  const blob = new Blob([content], { type: 'application/pdf' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type}-${order.id}.pdf`;
  a.click();
  URL.revokeObjectURL(url);
  return { success: true };
}
