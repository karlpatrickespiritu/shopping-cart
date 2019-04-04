'use strict';

const ShoppingCart = (pricingRules) => {
  let items = [];

  const add = (item, quantity = 1) => {
    items.push({ item, quantity });
    return { item, quantity }
  };

  const getTotalPrice = () => {
    const prices = items.map((item) => item.price);

    const calculateTotal = (sum, price) => sum + price;

    return prices.reduce(calculateTotal);
  };

  const getItemsCount = () => {
    return items.length
  };

  return {
    add,
    getTotalPrice,
    getItemsCount,
  }
};

module.exports = {
  initialize: (pricingRules) => {
    return ShoppingCart(pricingRules)
  }
};