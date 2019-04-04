'use strict';

const expect = require('expect.js');
const Products = require('../../Products');
const PricingRules = require('../../PricingRules');
const ShoppingCart = require('../../ShoppingCart');

describe('SCENARIO #1', function () {
  it('should calculate the expected amounts for scenario #1', function () {
    // create products first
    const products = Products.initialize();

    const productSmall = products.create({
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    });

    const productLarge = products.create({
      code: "ult_large",
      name: "Unlimited 5GB",
      price: 44.90,
    });

    // create a pricing rule for this particular product
    const pricingRules = PricingRules.initialize();

    // create pricing rule for `productSmall`
    pricingRules.create({
      product: productSmall,
      discounts: [{
        description: "If you purchase 3 pieces, you only get to pay for 2 for the 1st month.",
        getDiscount: ({ quantity }) => {
          if (quantity >= 3) {
            return productSmall.price // 1 is free if charge
          }
          return 0
        },
        getDiscountedItemPrice: ({ quantity }) => {
          return productSmall.price // since this scenario doesn't have any di
        },
        getDiscountDuration: ({ quantity }) => ({
          months: 1,
          weeks: 0,
          days: 0,
          hours: 0,
        }),
      }]
    });

    // create pricing rule for `productLarge`
    pricingRules.create({
      product: productLarge,
      discounts: [{
        description: "If you get 3 pieces, you only get to pay the 2. But only for the 1st month.",
        getDiscount: ({ quantity }) => 0,
        getDiscountedItemPrice: ({ quantity }) => {
          if (quantity >= 4) {
            productLarge.price = 39.90
          }
          return productLarge.price
        },
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

    // add rules to shopping cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);

    // the to cart
    shoppingCart.add(productSmall, 3);
    shoppingCart.add(productLarge, 1);

    expect(shoppingCart.getTotalPrice()).to.equal(94.7);

    // ============================LOG============================
    shoppingCart
      .getAllProducts()
      .forEach(({ product, quantity }) => {
        console.log(`${product.code} ${product.name} $${product.price} (QTY x ${quantity})`)
      });
    console.log("=========================================");
    console.log("Cart Total: ", shoppingCart.getTotalPrice())
  });
});