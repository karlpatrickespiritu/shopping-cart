'use strict';

const ShoppingCart = (pricingRules) => {
  let products = [];

  /**
   * Adds an item to the cart
   * @param product
   * @param quantity
   * @returns {{product: *, quantity: number}}
   */
  const add = (product, quantity = 1) => {
    products.push({ product, quantity });
    return { product, quantity }
  };

  /**
   * Calculates the total amount including if there are pricing rules that was placed.
   * @returns {number}
   */
  const getTotalPrice = () => {
    let totalPrice = 0.00;

    getAllProducts().forEach(({ product, quantity }) => {
      const priceRule = pricingRules
        .getAll()
        .filter((ruleProduct) => ruleProduct.product.id === product.id)[0];

      // check if the item has a price rule
      if (priceRule) {
        priceRule.discounts.forEach((discount) => {
          // get the discounted item price based on the price rule
          const itemPrice = discount.getDiscountedItemPrice({ quantity });

          // get the amount for the product
          const discountAmount = discount.getDiscount({ quantity });

          // calculate the total price
          totalPrice += (itemPrice * quantity) - discountAmount;
        });

        return totalPrice
      }

      // if there is no price rule for this product, then do the regular calculation of the price.
      totalPrice += product.price * quantity;
    });

    // round of to two decimal places
    return Math.round(totalPrice * 100) / 100
  };

  /**
   * @returns {number}
   */
  const getItemsCount = () => {
    return products.length
  };

  /**
   * returns all the product that is in the cart
   * @returns {Array}
   */
  const getAllProducts = () => {
    return products
  };

  const getPricingRules = () => {
    return pricingRules.getAll()
  };

  return {
    add,
    getTotalPrice,
    getAllProducts,
    getItemsCount,
    getPricingRules,
  }
};

module.exports = {
  initialize: (pricingRules) => {
    return ShoppingCart(pricingRules)
  }
};