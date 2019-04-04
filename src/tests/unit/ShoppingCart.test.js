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
    expect(added.item).to.be.an('object');
    expect(added.item.code).to.equal(item.code);
    expect(added.item.name).to.equal(item.name);
    expect(added.item.price).to.equal(item.price);
  });
});