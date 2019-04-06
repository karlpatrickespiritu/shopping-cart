'use strict';
const uuidv4 = require('uuid/v4');

const Products = () => {
  let items = [];

  const create = ({ code, name, price }) => {
    const id = uuidv4();
    items.push({ id, code, name, price });
    return { id, code, name, price } // return new object, avoid reference
  };

  const getAll = () => {
    return items
  };

  const getProductByCode = (code) => {
    const product = items.filter((item) => item.code === code);
    if (product.length) {
      const { id, code, name, price } = product[0];
      return { id, code, name, price }; // return new object, avoid reference
    }
    return null
  };

  return {
    create,
    getAll,
    getProductByCode,
  }
};

module.exports = {
  initialize: () => {
    return Products()
  }
};