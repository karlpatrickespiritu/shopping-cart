'use strict';

const PricingRules = () => {
  let rules = [];

  const create = ({ product, discounts = [] }) => {
    rules.push({ product, discounts });

    return { product, discounts }
  };

  return {
    create,
  }
};

module.exports = {
  initialize: () => {
    return PricingRules()
  }
};