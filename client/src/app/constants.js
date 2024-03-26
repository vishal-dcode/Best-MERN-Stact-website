export const ITEMS_PER_PAGE = 12;
export function DISCOUNT_PRICE(item) {
  return Math.round(item.price * (1 - item.discountPercentage / 100), 2);
}
