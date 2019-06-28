// ********************************************************************************
// * File: inv_view.js                                                            * 
// * Javascript file for the inventory view. The purpose of this file is to       *
// * manage the input, display and deletion of products from the products db      * 
// ********************************************************************************

$(document).ready(function() {
  // Define references to the input fields where user adds a new product
  var $newName = $("input.new-name");
  var $newDescription = $("input.new-description");
  var $newCategory = $("input.new-category");
  var $newPrice = $("input.new-price");
  var $newQuantity = $("input.new-quantity");
  var $newTotalSales = $("input.new-totalsales");
  var $newPicture = $("input.new-picture");
  
  // Define reference to display product list
  var $productContainer = $(".product-container");

  // Event listeners for deleting and adding products
  $(document).on("click", "button.delete", deleteProduct);
  $(document).on("submit", "#product-form", insertProduct);

  // Initial products array
  var products = [];

  // Get products from database when page loads
  getProducts();

  // ********************************************************************************
  // * Function: initializeRows()                                                   *
  // * This function displays row-by-row the products from the product table        *
  // ********************************************************************************
  function initializeRows() {
    $productContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      rowsToAdd.push(createNewRow(products[i]));
    }
    $productContainer.prepend(rowsToAdd);
  }  // function initializeRows()

  // ********************************************************************************
  // * Function: getProducts()                                                      *
  // * This function gets products from the products table and updates the view     *
  // ********************************************************************************
  function getProducts() {
    $.get("/api/products", function(data) {
      products = data;
      initializeRows();
    });
  }   // getProducts()

  // ********************************************************************************
  // * Function: createNewRow(product)                                              *
  // * This function constructs a new product row with the elements in the product  *
  // * object                                                                       *
  // ********************************************************************************
  function createNewRow(product) {

    var $newRow = $(
      [
          "<div class='row product-row'>",
          "<div class='col-2'>",
            "<p class='prod-name' type='text'>",product.name,"</p>",
          "</div>",
          "<div class='col-4'>",
            "<p class='prod-description' type='text'>", product.description, "</p>",
          "</div>",
          "<div class='col-1'>",
            "<p class='prod-category' type='text'>", product.category, "</p>",
          "</div>",
          "<div class='col-1'>",
            "<p class='prod-instock' type='text'>", product.num_instock, "</p>",
          "</div>",
          "<div class='col-1'>",
            "<p class='prod-unitprice' type='text'>$", product.unit_price, "</p>",
          "</div>",
          "<div class='col-1'>",
            "<p class='prod-sales' type='text'>$", product.total_sales, "</p>",
          "</div>",
          "<div class='col-1'>",
            "<p class='prod-picture' type='text'>", product.picture, "</p>",
          "</div>",
          "<div class='col-1'>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
          "</div>",

        "</div>"  
      ].join("")
      );
    $newRow.find("button.delete").data("id", product.id);
    $newRow.find("input.edit").css("display", "none");
    $newRow.data("product", product);
    return $newRow;
  }  // function createNewRow(product)

  // ********************************************************************************
  // * Function: insertProduct(event)                                               *
  // * This event handler function inserts a new product into the products table    *
  // * when the user clicks the Add button and displays the product list when done  *
  // ********************************************************************************
  function insertProduct(event) {
    event.preventDefault();
    var product = {
      name: $newName.val().trim(),
      description: $newDescription.val().trim(),
      category: $newCategory.val().trim(),
      unit_price: parseFloat($newPrice.val().trim()),
      num_instock: parseInt($newQuantity.val().trim()),
      total_sales: parseFloat($newTotalSales.val().trim()),
      picture: $newPicture.val().trim(),
    };

    $.post("/api/products", product, getProducts);

    // Clear the form  
    $newName.val("");
    $newDescription.val("");
    $newCategory.val("");
    $newPrice.val("");
    $newQuantity.val("");
    $newTotalSales.val("");
    $newPicture.val("");
    
  }  // insertProduct(event)

  // ********************************************************************************
  // * Function: deleteProduct(event)                                               *
  // * This event handler function deletes a product from the products table when   *
  // * the user clicks the delete button for a particular product in the list       *
  // ********************************************************************************
  function deleteProduct(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    }).then(getProducts);
  }  // deleteProduct(event)

});
