'use strict';

const expect = require('expect.js');
const Products = require('../../Products');
const PricingRules = require('../../PricingRules');

describe('`PricingRules.createProductRule()` unit test', function () {
  it('should add an item to the shopping cart', function () {
    // create a product first
    const products = Products.initialize();
    const product = products.create({
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    });

    // create a pricing rule for this particular product
    const pricingRules = PricingRules.initialize();
    const rule = pricingRules.createProductRule({
      product,
      discounts: [{
        description: "If you purchase 3 pieces, you only get to pay for 2 for the 1st month.",

        // dynamically set the discount amount depending on the set condition
        // for this one, if the quantity is >= 3 then less 1 item
        getDiscount: ({ quantity }) => {
          if (quantity >= 3) {
            return product.price * (quantity - 1)
          }
          return 0
        },

        // dynamically set the discounted price per product for a certain condition.
        // for this one, no discount was added. just the regular price.
        getDiscountedItemPrice: ({ quantity }) => {
          return product.price
        },

        // dynamically set the discounted duration per product for a certain condition.
        // for this one, discount duration will just be for a month if 3 items were bought.
        getDiscountDuration: ({ quantity }) => {
          let duration = {
            months: 0,
            weeks: 0,
            days: 0,
            hours: 0,
          };

          if (quantity >= 3) {
            duration.months = 1;
            return duration
          }

          return duration
        },
      }]
    });

    expect(rule).to.be.an('object');
    expect(rule.product.code).to.equal(product.code);
    expect(rule.discounts.length).to.equal(1);

    expect(rule.discounts[0].getDiscount({ quantity: 3 })).to.equal(49.8);
    expect(rule.discounts[0].getDiscount({ quantity: 2 })).to.equal(0); // no discount if only 3 were bought

    expect(rule.discounts[0].getDiscountedItemPrice({ quantity: 3 })).to.equal(24.90); // no price discount for this one

    // check duration
    const duration = rule.discounts[0].getDiscountDuration({ quantity: 3});
    expect(duration.months).to.equal(1);
    expect(duration.weeks).to.equal(0);
    expect(duration.days).to.equal(0);
    expect(duration.hours).to.equal(0);
  });
});

describe('`PricingRules.createPromoCodeRule()` unit test', function () {
  it('should add an item to the shopping cart', function () {
    // create a pricing rule for this particular product
    const pricingRules = PricingRules.initialize();

    // create promo code rule
    const promoCode10Percent = {
      codes: ["I<3AMAYSIM"],
      getDiscount: () => {
        return {
          isPercentage: true,
          percentage: .10
        }
      }
    };

    const rule = pricingRules.createPromoCodeRule([promoCode10Percent]);
    expect(rule.length).to.equal(1);
    expect(rule[0].codes[0]).to.equal("I<3AMAYSIM");
    expect(rule[0].getDiscount()).to.eql({
      isPercentage: true,
      percentage: .10
    });
  });
});
