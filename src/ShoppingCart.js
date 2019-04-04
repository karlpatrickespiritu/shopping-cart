'use strict';

const ShoppingCart = (pricingRules) => {
  let products = [];
  let freebies = [];

  /**
   * Adds an item to the cart
   * @param product
   * @param quantity
   * @returns {{product: *, quantity: number}}
   */
  const add = (product, quantity = 1) => {
    products.push({ product, quantity });

    const priceRule = getProductPriceRule(product);
    if (priceRule) {
      priceRule.discounts.forEach((discount) => {
        // add freebies if there is any
        discount
          .getFreebies({ quantity })
          .forEach((freebie) => freebies.push(freebie));
      })
    }

    return { product, quantity }
  };

  /**
   * Returns a price rule for a particular product, if there is any.
   * @param product
   * @returns {T}
   */
  const getProductPriceRule = (product) => {
    return pricingRules
      .getAll()
      .filter((ruleProduct) => ruleProduct.product.id === product.id)[0];
  };

  /**
   * Calculates the total amount including if there are pricing rules that was placed.
   * @returns {number}
   */
  const getTotalPrice = () => {
    let totalPrice = 0.00;

    getAllProducts().forEach(({ product, quantity }) => {
      const priceRule = getProductPriceRule(product);

      // if there is no price rule for this product, then do the regular calculation of the price.
      if (!priceRule) {
        return totalPrice += product.price * quantity;
      }

      priceRule.discounts.forEach((discount) => {
        // get the discounted item price based on the price rule
        const discountedItemPrice = discount.getDiscountedItemPrice({ quantity });

        // get the amount for the product
        const discountAmount = discount.getDiscount({ quantity });

        // calculate the total price
        totalPrice += (discountedItemPrice * quantity) - discountAmount;
      });

      return totalPrice
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

  /**
   * returns all the product that is in the cart
   * @returns {Array}
   */
  const getFreebies = () => {
    return freebies
  };

  const getPricingRules = () => {
    return pricingRules.getAll()
  };

  return {
    add,
    getTotalPrice,
    getAllProducts,
    getFreebies,
    getItemsCount,
    getPricingRules,
  }
};

module.exports = {
  initialize: (pricingRules) => {
    return ShoppingCart(pricingRules)
  }
};