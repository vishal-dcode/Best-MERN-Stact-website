export const ITEMS_PER_PAGE = 12;
export function DISCOUNTED_PRICE(item) {
  if (!item || typeof item.price !== 'number' || typeof item.discountPercentage !== 'number') {
    return 0;
  }
  return Math.round(item.price * (1 - item.discountPercentage / 100) * 100) / 100;
}

