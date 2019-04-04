'use strict';

const expect = require('expect.js');
const Products = require('../../Products');

describe('`Products.create()` unit test', function () {
  it('should create a product item', function () {
    const item = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    const product = Products.create(item);
    expect(product).to.be.an('object');
    expect(product.id.length).to.be.greaterThan(0);
    expect(product.code).to.equal(item.code);
    expect(product.name).to.equal(item.name);
    expect(product.price).to.equal(item.price);
  });
});

describe('`Products.clear()` unit test', function () {
  it('should clear all items', function () {
    Products.clear();
    expect(Products.getAll()).to.have.length(0);

    const item1 = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    Products.create(item1);
    expect(Products.getAll()).to.have.length(1);

    Products.clear()
    expect(Products.getAll()).to.have.length(0);
  });
});

describe('`Products.getAll()` unit test', function () {
  it('should return all items', function () {
    Products.clear();

    const item1 = {
      code: "ult_small",
      name: "Unlimited 1GB",
      price: 24.90,
    };

    Products.create(item1);
    expect(Products.getAll()).to.have.length(1);

    const item2 = {
      code: "ult_medium",
      name: "Unlimited 2GB",
      price: 29.90,
    };

    Products.create(item2);
    expect(Products.getAll()).to.have.length(2);
  });
});