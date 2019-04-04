'use strict';
const uuidv4 = require('uuid/v4');

const Products = () => {
  let items = [];

  const create = (item) => {
    item.id = uuidv4();
    items.push(item);
    return item
  };

  const getAll = () => {
    return items
  };

  return {
    create,
    getAll,
  }
};

module.exports = {
  initialize: () => {
    return Products()
  }
};