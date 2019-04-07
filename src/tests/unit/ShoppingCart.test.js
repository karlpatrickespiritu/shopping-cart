'use strict';

const expect = require('expect.js');
const Products = require('../../Products');
const ShoppingCart = require('../../ShoppingCart');
const PricingRules = require('../../PricingRules');

describe('`ShoppingCart.add()`', function () {
``
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
  pricingRules.createProductRule({
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

  it('should add an item to the shopping cart', function () {
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
    pricingRules.createPromoCodeRule([promoCode10Percent]);

    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    const added = shoppingCart.add(product, quantity);

    shoppingCart.applyPromoCode("I<3AMAYSIM");

    expect(added.quantity).to.equal(quantity);
    expect(added.product).to.be.an('object');
    expect(added.product.code).to.equal(item.code);
    expect(added.product.name).to.equal(item.name);
    expect(added.product.price).to.equal(item.price);
    expect(shoppingCart.getTotalPrice()).to.equal(67.23);
  });

  it('should still calculate the right total even if the promo code is invalid', function () {
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
    pricingRules.createPromoCodeRule([promoCode10Percent]);

    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    shoppingCart.add(product, quantity);
    shoppingCart.applyPromoCode("not_a_valid_promo_code");

    expect(shoppingCart.getTotalPrice()).to.equal(74.7);
  });

  it('should still calculate the right total for fixed promo code discount', function () {
    // create promo code rule
    const promoCodeLess50 = {
      codes: ["I<3AMAYSIM"],
      getDiscount: () => {
        return {
          isFixed: true,
          amount: 50
        }
      }
    };
    pricingRules.createPromoCodeRule([promoCodeLess50]);

    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    shoppingCart.add(product, quantity);
    shoppingCart.applyPromoCode("I<3AMAYSIM");

    expect(shoppingCart.getTotalPrice()).to.equal(24.7);
    expect(shoppingCart.getItemsCount()).to.equal(1);

    const productRules = shoppingCart.getProductRules();
    expect(productRules.length).to.equal(1);
    expect(productRules[0].product.code).to.equal("ult_small");
    expect(productRules[0].product.name).to.equal("Unlimited 1GB");
    expect(productRules[0].product.price).to.equal(24.9);
  });

  it('should calculate the right amount without the promocode', function () {
    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    shoppingCart.add(product, quantity);

    expect(shoppingCart.getTotalPrice()).to.equal(74.7);
    expect(shoppingCart.getItemsCount()).to.equal(1);
  });

  it('should return null if getting product item in cart by code if the code is invalid', function () {
    // add to cart
    const shoppingCart = ShoppingCart.initialize(pricingRules);
    const quantity = 3;
    shoppingCart.add(product, quantity);

    expect(shoppingCart.getTotalPrice()).to.equal(74.7);
    expect(shoppingCart.getItemsCount()).to.equal(1);
    expect(shoppingCart.getProductByCode("no_a_valid_product_code")).to.equal(null);
  });
});