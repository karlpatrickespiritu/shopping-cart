'use strict';

const expect = require('expect.js');
const mock = require('./mock');
const ShoppingCart = require('../../ShoppingCart');

// create the list of products as mock
const products = mock.CreateProducts();

// the products
const productSmall = products.getProductByCode("ult_small");
const productLarge = products.getProductByCode("ult_large");
const productMedium = products.getProductByCode("ult_medium");
const product1GB = products.getProductByCode("1gb");

// create a mock of the pricing rules
const pricingRules = mock.CreatePricingRules({ productSmall, productLarge, productMedium, product1GB });

describe('SCENARIO #1', function () {
  it('should calculate the expected amounts for scenario #1', function () {
    const shoppingCart = ShoppingCart.initialize(pricingRules);

    // get products
    const productSmall = products.getProductByCode("ult_small");
    const productLarge = products.getProductByCode("ult_large");

    // add products to cart
    shoppingCart.add(productSmall, 3);
    shoppingCart.add(productLarge, 1);

    expect(shoppingCart.getProductByCode("ult_small").quantity).to.equal(3);
    expect(shoppingCart.getProductByCode("ult_large").quantity).to.equal(1);
    expect(shoppingCart.getTotalPrice()).to.equal(94.7);

    mock.LogShoppingCart(shoppingCart);
  });
});

describe('SCENARIO #2', function () {
  it('should calculate the expected amounts for scenario #2', function () {
    const shoppingCart = ShoppingCart.initialize(pricingRules);

    // get products
    const productSmall = products.getProductByCode("ult_small");
    const productLarge = products.getProductByCode("ult_large");

    // add products to cart
    shoppingCart.add(productSmall, 2);
    shoppingCart.add(productLarge, 4);

    expect(shoppingCart.getProductByCode("ult_small").quantity).to.equal(2);
    expect(shoppingCart.getProductByCode("ult_large").quantity).to.equal(4);
    expect(shoppingCart.getTotalPrice()).to.equal(209.4);

    mock.LogShoppingCart(shoppingCart);
  });
});

describe('SCENARIO #3', function () {
  it('should calculate the expected amounts for scenario #3', function () {
    const shoppingCart = ShoppingCart.initialize(pricingRules);

    // get products
    const productSmall = products.getProductByCode("ult_small");
    const productMedium = products.getProductByCode("ult_medium");

    // add products to cart
    shoppingCart.add(productSmall, 1);
    shoppingCart.add(productMedium, 2);

    expect(shoppingCart.getProductByCode("ult_small").quantity).to.equal(1);
    expect(shoppingCart.getProductByCode("ult_medium").quantity).to.equal(2);
    expect(shoppingCart.getTotalPrice()).to.equal(84.7);

    mock.LogShoppingCart(shoppingCart);
  });
});

describe('SCENARIO #4', function () {
  it('should calculate the expected amounts for scenario #4', function () {
    const shoppingCart = ShoppingCart.initialize(pricingRules);

    // get products
    const productSmall = products.getProductByCode("ult_small");
    const product1GB = products.getProductByCode("1gb");

    // add products to cart
    shoppingCart.add(productSmall, 1);
    shoppingCart.add(product1GB, 1);

    // apply promo code
    shoppingCart.applyPromoCode("I<3AMAYSIM");

    expect(shoppingCart.getProductByCode("ult_small").quantity).to.equal(1);
    expect(shoppingCart.getProductByCode("1gb").quantity).to.equal(1);
    expect(shoppingCart.getTotalPrice()).to.equal(31.32);

    mock.LogShoppingCart(shoppingCart);
  });
});