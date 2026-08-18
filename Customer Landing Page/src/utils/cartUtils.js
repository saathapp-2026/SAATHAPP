export const calculateDiscountValue = (base, discountStr) => {
  if (!discountStr) return 0;
  const isPercentage = discountStr.includes('%');
  const val = parseFloat(discountStr.replace(/[^0-9.]/g, ''));
  if (isNaN(val)) return 0;
  if (isPercentage) {
    return base * (val / 100);
  }
  return val;
};

export const isEligibleForPlus = (item) => {
  return item.category === 'grocery' || item.brand === 'SaathApp Official' || item.productTier === 'PREMIUM';
};

export const calculateCartTotals = (cartItems, isPlusMember = false, appliedCoupon = null) => {
  let subtotalBase = 0;
  let promoDiscountTotal = 0;
  let memberDiscountTotal = 0;
  let itemCount = 0;

  cartItems.forEach(item => {
    const basePrice = item.price;
    const qty = item.quantity;
    itemCount += qty;
    subtotalBase += basePrice * qty;

    // RULE 1: PRODUCT PROMOTION
    let itemPromoDiscount = 0;
    if (item.promotion?.active) {
      itemPromoDiscount = calculateDiscountValue(basePrice, item.promotion.discount);
    }
    promoDiscountTotal += itemPromoDiscount * qty;

    const effectiveItemPrice = basePrice - itemPromoDiscount;

    // RULE 2: PLUS BENEFIT
    if (isPlusMember && isEligibleForPlus(item)) {
      memberDiscountTotal += (effectiveItemPrice * 0.05) * qty;
    }
  });

  const effectiveSubtotal = subtotalBase - promoDiscountTotal - memberDiscountTotal;

  // RULE 3: COUPON
  let couponDiscountValue = 0;
  if (appliedCoupon) {
      if (appliedCoupon.code === 'SAATH50') {
          couponDiscountValue = 50;
      } else if (appliedCoupon.code === 'PLUS10' && isPlusMember) {
          couponDiscountValue = effectiveSubtotal * 0.1;
      }
  }

  const subtotalAfterCoupon = Math.max(0, effectiveSubtotal - couponDiscountValue);

  // RULE 4: DELIVERY BENEFIT
  let deliveryFee = 50;
  let deliveryDiscount = 0;
  if (isPlusMember && subtotalAfterCoupon > 499) {
    deliveryFee = 0;
    deliveryDiscount = 50;
  }

  const finalTotal = subtotalAfterCoupon + deliveryFee;

  // RULE 5: CASHBACK
  const cashbackEarned = isPlusMember ? finalTotal * 0.05 : 0;

  return {
    subtotalBase,
    promoDiscountTotal,
    memberDiscountTotal,
    couponDiscountValue,
    effectiveSubtotal,
    deliveryFee,
    deliveryDiscount,
    finalTotal,
    cashbackEarned,
    itemCount
  };
};
