'use strict';

const Products = require('../../Products');
const PricingRules = require('../../PricingRules');

function CreateProducts() {
  const products = Products.initialize();

  products.create({
    code: "ult_small",
    name: "Unlimited 1GB",
    price: 24.90,
  });

  products.create({
    code: "ult_medium",
    name: "Unlimited 2GB",
    price: 29.90,
  });

  products.create({
    code: "ult_large",
    name: "Unlimited 5GB",
    price: 44.90,
  });

  products.create({
    code: "1gb",
    name: "1 GB Data-pack",
    price: 9.90,
  });

  return products
}

function CreatePricingRules(products) {
  const productSmall = products.getProductByCode("ult_small");
  const productLarge = products.getProductByCode("ult_large");
  const productMedium = products.getProductByCode("ult_medium");
  const product1GB = products.getProductByCode("1gb");

  // create a pricing rule for this particular product
  const pricingRules = PricingRules.initialize();

  // create pricing rule for `productSmall`
  pricingRules.createProductRule({
    product: productSmall,
    discounts: [{
      description: "A 3 for 2 deal on Unlimited 1GB Sims. So for example, if you buy 3 Unlimited 1GB Sims, you will pay the price of 2 only for the first month.",
      getDiscount: ({ quantity }) => {
        if (quantity >= 3) {
          return productSmall.price // 1 is free if charge
        }
        return 0
      },
      getDiscountedItemPrice: ({ quantity }) => productSmall.price, // since this scenario doesn't have any price discount
      getFreebies: ({ quantity }) => [],
      getDiscountDuration: ({ quantity }) => ({
        months: 1,
        weeks: 0,
        days: 0,
        hours: 0,
      }),
    }]
  });

  // create pricing rule for `productMedium`
  pricingRules.createProductRule({
    product: productMedium,
    discounts: [{
      description: "We will bundle in a free 1 GB Data-pack free-of-charge with every Unlimited 2GB sold.",
      getDiscount: ({ quantity }) => 0,
      getDiscountedItemPrice: ({ quantity }) => productMedium.price, // since this scenario doesn't have any price discount
      getFreebies: ({ quantity }) => {
        const freebies = [];

        product1GB.price = 0; // this is now free

        for (let i = 0; i < quantity; i++) {
          freebies.push(product1GB)
        }

        return freebies
      },
      getDiscountDuration: ({ quantity }) => ({
        months: 0,
        weeks: 0,
        days: 0,
        hours: 0,
      }),
    }]
  });

  // create pricing rule for `productLarge`
  pricingRules.createProductRule({
    product: productLarge,
    discounts: [{
      description: "The Unlimited 5GB Sim will have a bulk discount applied; whereby the price will drop to $39.90 each for the first month, if the customer buys more than 3.",
      getDiscount: ({ quantity }) => 0,
      getDiscountedItemPrice: ({ quantity }) => {
        if (quantity >= 4) {
          productLarge.price = 39.90
        }
        return productLarge.price
      },
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

  // create promo code rule
  const promoCode10PercentDiscount = {
    codes: ["I<3AMAYSIM"],
    getDiscount: () => {
      return {
        isPercentage: true,
        percentage: .10
      }
    }
  };
  pricingRules.createPromoCodeRule([promoCode10PercentDiscount]);

  return pricingRules;
}

function LogShoppingCart(shoppingCart) {
  console.log("Items:");
  shoppingCart
    .getAllProducts()
    .forEach(({ product, quantity }) => {
      console.log(`${product.code} ${product.name} $${product.price} (QTY x ${quantity})`)
    });

  const freebies = shoppingCart.getFreebies();
  if (freebies.length) {
    console.log("\n Free:");
    shoppingCart
      .getFreebies()
      .forEach((product) => {
        console.log(`${product.code} ${product.name}`)
      });
  }

  console.log("=======================================");
  console.log("Cart Total: $", shoppingCart.getTotalPrice());
}

module.exports ={
  CreateProducts,
  CreatePricingRules,
  LogShoppingCart,
};