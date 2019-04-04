'use strict';

const expect = require('expect.js');
const Products = require('../../Products');
const ShoppingCart = require('../../ShoppingCart');

describe('`ShoppingCart.add()` unit test', function () {
  it('should add an item to the shopping cart', function () {
    const products = Products.initialize();
    const shoppingCart = ShoppingCart.initialize();

    const item = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    const product = products.create(item);
    const quantity = 3;
    const added = shoppingCart.add(product, quantity);

    expect(added.quantity).to.equal(quantity);
    expect(added.product).to.be.an('object');
    expect(added.product.code).to.equal(item.code);
    expect(added.product.name).to.equal(item.name);
    expect(added.product.price).to.equal(item.price);
  });
});