// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data 
// CRUD to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the products
  app.get("/api/products", function(req, res) {
    // findAll returns all entries for a table when used with no options
    db.Product.findAll({}).then(function(dbProduct) {
      // We have access to the products as an argument inside of the callback function
      res.json(dbProduct);
    });
  });

  // POST route for saving a new product
  app.post("/api/products", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a text
    // property (req.body)
    db.Product.create({
      name: req.body.name,
      description:req.body.description,
      category: req.body.category,
      unit_price: req.body.unit_price,
      picture: req.body.picture,
      total_sales: req.body.total_sales,
      num_instock: req.body.num_instock
    }).then(function(dbProduct) {
      // We have access to the new product as an argument inside of the callback function
      res.json(dbProduct);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });

  // DELETE route for deleting products. We can get the id of the product to be deleted from
  // req.params.id
  app.delete("/api/products/:id", function(req, res) {
    // We just have to specify which product we want to destroy with "where"
    db.Product.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    });

  });

  // PUT route for updating products. We can get the updated product data from req.body
  app.put("/api/products", function(req, res) {

    // Update takes in an object describing the properties we want to update, and
    // we use where to describe which objects we want to update
    db.Product.update({
      name: req.body.name,
      description:req.body.description,
      category: req.body.category,
      unit_price: req.body.unit_price,
      picture: req.body.picture,
      total_sales: req.body.total_sales,
      num_instock: req.body.num_instock
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbProduct) {
      res.json(dbProduct);
    })
      .catch(function(err) {
      // Whenever a validation or flag fails, an error is thrown
      // We can "catch" the error to prevent it from being "thrown", which could crash our node app
        res.json(err);
      });
  });
};
