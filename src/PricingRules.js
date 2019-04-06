'use strict';

const PricingRules = () => {
  let productRules = [];
  let promoCodeRules = [];

  const createProductRule = ({ product, discounts = [] }) => {
    productRules.push({ product, discounts });

    return { product, discounts }
  };

  const createPromoCodeRule = (promoCodeRule) => {
    promoCodeRules.push(promoCodeRule);

    return promoCodeRule
  };

  const getProductRules = () => {
    return productRules
  };

  const getPromoCodeRules = () => {
    return promoCodeRules
  };

  return {
    createProductRule,
    createPromoCodeRule,
    getProductRules,
    getPromoCodeRules,
  }
};

module.exports = {
  initialize: () => {
    return PricingRules()
  }
};