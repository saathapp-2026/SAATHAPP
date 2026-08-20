import re

with open("src/pages/Checkout.jsx", "r") as f:
    content = f.read()

# Disable "Continue to Delivery" if selectedAddress is empty
step1_btn = r'<button onClick={handleNext} className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors">Continue to Delivery</button>'
step1_btn_new = r'<button disabled={!selectedAddress} onClick={handleNext} className="w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed dark:disabled:bg-slate-700">Continue to Delivery</button>'
content = content.replace(step1_btn, step1_btn_new)

# Add payment gateway check to handleConfirm
handle_confirm_old = r"""  const handleConfirm = () => {
    onConfirmOrder({
      address: selectedAddress,
      deliveryMethod,
      paymentMethod,
      orderBreakdown: totals
    });
  };"""

handle_confirm_new = r"""  const [paymentError, setPaymentError] = useState('');

  const handleConfirm = () => {
    if (paymentMethod !== 'cod' && !import.meta.env.VITE_PAYMENT_GATEWAY_KEY) {
      setPaymentError("Payment Configuration Error: VITE_PAYMENT_GATEWAY_KEY is missing. Real payment gateways cannot be initialized. Please configure your payment provider in .env.local or select Cash on Delivery.");
      return;
    }
    setPaymentError('');
    onConfirmOrder({
      address: selectedAddress,
      deliveryMethod,
      paymentMethod,
      orderBreakdown: totals
    });
  };"""

content = content.replace(handle_confirm_old, handle_confirm_new)

# Render the payment error in step 4
step4_error_injection = r"""              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">"""
step4_error_replacement = r"""              {paymentError && (
                <div className="p-4 rounded-xl bg-red-50 text-red-600 border border-red-200 text-sm font-semibold">
                  {paymentError}
                </div>
              )}
              <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3 pt-4">"""

content = content.replace(step4_error_injection, step4_error_replacement)

with open("src/pages/Checkout.jsx", "w") as f:
    f.write(content)

