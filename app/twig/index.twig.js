const template = require( './index.twig' );

const tabButtons = [
  {
    title: "My fonts",
    partial: "my-fonts"
  },
  {
    title: "Buy fonts",
    partial: "buy-font",
    isActive: true
  }
];

module.exports = template( { tabButtons } );