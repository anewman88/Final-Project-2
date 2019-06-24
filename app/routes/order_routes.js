// *********************************************************************************
// This file defines the set of routes for saving data to the order table
// *********************************************************************************

// Dependencies
// =============================================================

// Require the sequelized models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the orders
    app.get("/api/orders", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Order.findAll({}).then(function(dbOrder) {
          // We have access to the orders as an argument inside of the callback function
          res.json(dbOrder);
        });
      });
  
    // GET route for getting one of the orders
    app.get("/api/orders:id", function(req, res) {
        // findAll returns all entries for a table when used with no options
        db.Order.findOne({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbOrder) {
          // We have access to the orders as an argument inside of the callback function
          res.json(dbOrder);
        });
      });
    
    // POST route for saving a new order
    app.post("/api/orders", function(req, res) {
        // create takes an argument of an object describing the item to
        // insert into the table. In this case just pass in an object with a text
        // property (req.body)
        db.Order.create({
        customer_id: req.body.customer_id,
        firstname: req.body.first_name,
        lastname: req.body.last_name,
        address1: req.body.address1,
        address2: req.body.address2,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        email: req.body.email,
        status: req.body.status,
        comment: req.body.comment,
        order_total: req.body.order_total,
        order_list: req.body.order
        })
        .then(function(dbOrder) {
        // We have access to the new order as an argument inside of the callback function
        res.json(dbOrder);
        })
        .catch(function(err) {
        // Whenever a validation or flag fails, an error is thrown
        // We can "catch" the error to prevent it from being "thrown", which could crash our node app
            res.json(err);
        });
    });
  
};