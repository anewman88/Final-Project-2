// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies and inits
// =============================================================

// Sets up the Express App
// =============================================================
var express = require("express");
var app = express();
var PORT = process.env.PORT || 8080;  // Define the port

// Require the database models for syncing
var db = require("./app/models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
console.log ("requiring product_routes.js");
require("./app/routes/product_routes.js")(app);
console.log ("requiring order_routes.js");
require("./app/routes/order_routes.js")(app);
console.log ("requiring htmlRoutes.js");
require("./routes/htmlRoutes.js")(app);

// Sync the sequelize models and then starting our Express app
// force: false --> do not drop the table
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function(err) {
    if (!err) 
       console.log("\n\n\n\n\n\n\n\nInventoryPro Customer Order Storefront listening on PORT " + PORT);
  });
  }).catch(function(err){
    console.log(err,"\n\n\n\n\n\n\n\n***ERROR*** Database did not sync correctly");
});
