'use strict';

const expect = require('expect.js');
const Products = require('../../Products');

describe('`Products.create()` unit test', function () {
  it('should create a product item', function () {
    const products = Products.initialize();

    const item = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    const product = products.create(item);

    expect(product).to.be.an('object');
    expect(product.id.length).to.be.greaterThan(0);
    expect(product.code).to.equal(item.code);
    expect(product.name).to.equal(item.name);
    expect(product.price).to.equal(item.price);
  });
});

describe('`Products.getAll()` unit test', function () {
  it('should return all items', function () {
    const products = Products.initialize();

    const item1 = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    products.create(item1);
    expect(products.getAll()).to.have.length(1);

    const item2 = {
      code: "ult_medium",
      name: "Unlimited 2GB",
      price: 29.90,
    };

    products.create(item2);
    expect(products.getAll()).to.have.length(2);
  });
});