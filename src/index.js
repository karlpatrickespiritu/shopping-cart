const Products = require('./Products');


Products.create({
  test: "ha"
});
console.log(Products.getAll());