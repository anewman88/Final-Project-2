// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require("path");
var DebugOn = true;

// Import the list of friend entries
// Using a js list of objects instead of a database 

//shopping_list = require("../public/js/store_view.js").shopping_list;
//if (DebugOn) console.log ("Loaded htmlRoutes.js - shopping_cart ", shopping_cart );


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------

  app.get("/inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });

  app.get("/storefront", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/storefront.html"));
  });

  app.get("/view_cart", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/view_cart.html"));
  });

  app.get("/checkout", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/checkout.html"));
  });

  app.get("/customer_login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer_login.html"));
  });

  app.get("/order_summary", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/order_summary.html"));
  });

  // If no matching route is found default to home
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

};
