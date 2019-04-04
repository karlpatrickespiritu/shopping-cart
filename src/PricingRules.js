'use strict';

const PricingRules = () => {
  let rules = [];

  const create = ({ product, discounts = [] }) => {
    rules.push({ product, discounts });

    return { product, discounts }
  };

  const getAll = () => {
    return rules
  };

  return {
    create,
    getAll,
  }
};

module.exports = {
  initialize: () => {
    return PricingRules()
  }
};