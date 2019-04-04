'use strict';

const expect = require('expect.js');
const Products = require('../../Products');
const ShoppingCart = require('../../ShoppingCart');
const PricingRules = require('../../PricingRules');

describe('`ShoppingCart.add()` unit test', function () {
  it('should add an item to the shopping cart', function () {
    // create product first
    const products = Products.initialize();
    const item = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };
    const product = products.create(item);

    // create pricing rule
    const pricingRules = PricingRules.initialize();
    pricingRules.create({
      product: product,
      discounts: [{
        description: "sample price rule",
        getDiscount: ({ quantity }) => 0,
        getDiscountedItemPrice: ({ quantity }) => product.price,
        getFreebies: ({ quantity }) => [],
        getDiscountDuration: ({ quantity }) => {
          return {
            months: 1,
            weeks: 0,
            days: 0,
            hours: 0,
          }
        },
      }]
    });

    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    const added = shoppingCart.add(product, quantity);

    expect(added.quantity).to.equal(quantity);
    expect(added.product).to.be.an('object');
    expect(added.product.code).to.equal(item.code);
    expect(added.product.name).to.equal(item.name);
    expect(added.product.price).to.equal(item.price);
  });
});