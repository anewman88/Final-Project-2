module.exports = function(sequelize, DataTypes) {

  // Model for the Product Inventory Table
  var  Product = sequelize.define("Product", {

    category: {
      type: DataTypes.STRING,// VARCHAR(255)
      allowNull: true,      // Must have a value
      validate: {
        len: [1, 140]        // validate string length is between 1 and 140 characters
      }
    },
    name: {
      type: DataTypes.STRING,// VARCHAR(255)
      allowNull: true,      // Must have a value
      validate: {
        len: [1, 140]        // validate string length is between 1 and 140 characters
      }
    },
    description: {
      type: DataTypes.STRING,  // VARCHAR(255)
      allowNull: true,        // Must have a value
      validate: {
        len: [1, 255]          // validate string length is between 1 and 140 characters
      }
    },
    unit_price: {
      type: DataTypes.DECIMAL(10,2),  // define 2 decimal points for currency
      allowNull: true,               // Must have a value
      validate:  {
        min: 0,
      }          
    },
    total_sales: {
      type: DataTypes.DECIMAL(10,2),  // define 2 decimal points for currency
      allowNull: true,               // Must have a value
      validate:  {
        min: 0,
      }          
    },
    num_instock: {
      type: DataTypes.INTEGER,  // integer
      allowNull: true,         // Must have a value
      validate:  {
        min: 0,
      }          
    },
    picture: {
      type: DataTypes.STRING,  // VARCHAR(255)
      allowNull: true,         // Must have a value
    }
  });
  return Product;
};
