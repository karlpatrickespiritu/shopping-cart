'use strict';

const ShoppingCart = (pricingRules) => {
  let products = [];
  let freebies = [];
  let promoCode = null;

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
      .getProductRules()
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
    totalPrice = Math.round(totalPrice * 100) / 100;

    if (!promoCode) {
      return totalPrice
    }

    // validate promo code, if not valid, then just return total price
    const isCodeValid = isPromoCodeValid(promoCode);
    if (!isCodeValid) {
      return totalPrice
    }

    // apply promo code discount
    const promoCodeDiscount = getPromoCodeDiscount(promoCode);

    if (promoCodeDiscount.isPercentage) {
      totalPrice = totalPrice - (totalPrice * promoCodeDiscount.percentage);
    }

    if (promoCodeDiscount.isFixed) {
      totalPrice = totalPrice - promoCodeDiscount.amount;
    }

    // round of to two decimal places
    return Math.round(totalPrice * 100) / 100;
  };

  /**
   * return a boolean if the promo code is valid or not
   * @param code
   * @returns {boolean}
   */
  const isPromoCodeValid = (code) => {
    let isCodeValid = false;

    pricingRules
      .getPromoCodeRules()
      .forEach((promoCodeRule) => {
        promoCodeRule.map((rule) => {
          isCodeValid = rule.codes.filter((code) => code === promoCode).length;
        })
      });

    return Boolean(isCodeValid)
  };

  /**
   * returns the discounted price for a promo code
   * @param promoCode
   * @returns {*}
   */
  const getPromoCodeDiscount = (promoCode) => {
    let discount = null;

    pricingRules
      .getPromoCodeRules()
      .forEach((promoCodeRule) => {
        promoCodeRule.map((rule) => {
          const isCodeValid = rule.codes.filter((code) => code === promoCode).length;
          if (isCodeValid) {
            discount = rule.getDiscount()
          }
        })
      });

    return discount
  };

  /**
   * return a product by code
   * @param code
   * @returns {*}
   */
  const getProductByCode = (code) => {
    const product = products.filter(({ product }) => product.code === code);
    if (product.length) {
      return product[0]
    }
    return null
  };

  /**
   * returns the items count
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

  const getProductRules = () => {
    return pricingRules.getProductRules()
  };

  const applyPromoCode = (code) => {
    return promoCode = code
  };

  return {
    add,
    getTotalPrice,
    getAllProducts,
    getProductByCode,
    getFreebies,
    getItemsCount,
    getProductRules,
    applyPromoCode
  }
};

module.exports = {
  initialize: (pricingRules) => {
    return ShoppingCart(pricingRules)
  }
};