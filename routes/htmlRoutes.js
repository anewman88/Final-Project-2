// ===============================================================================
// DEPENDENCIES
// Include the path package to get the correct file path for the html
// ===============================================================================
var path = require("path");
var DebugOn = false;

if (DebugOn) console.log ("Loaded htmlRoutes.js ");

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // HTML GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases the user is shown an HTML page of content
  // ---------------------------------------------------------------------------
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  if (DebugOn) console.log("/inventory path is:" + path.join(__dirname, "../public/inventory.html"));
  app.get("/inventory", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/inventory.html"));
  });

  if (DebugOn) console.log("/storefront path is:" + path.join(__dirname, "../public/storefront.html"));
  app.get("/storefront", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/storefront.html"));
  });

  if (DebugOn) console.log("/customer_login path is:" + path.join(__dirname, "../public/customer_login.html"));
  app.get("/customer_login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/customer_login.html"));
  });

  //  If no matching route is found default to home
  if (DebugOn) console.log("* default home is:" + path.join(__dirname, "../public/home.html"));
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
  });

};
