$(document).ready(function() {
  // Getting a reference to the input field where user adds a new product
  var $newName = $("input.new-name");
  var $newDescription = $("input.new-description");
  var $newCategory = $("input.new-category");
  var $newPrice = $("input.new-price");
  var $newQuantity = $("input.new-quantity");
  var $newTotalSales = $("input.new-totalsales");
  var $newPicture = $("input.new-picture");
  
  // Our new products will go inside the productContainer
  var $productContainer = $(".product-container");

  // Adding event listeners for deleting, editing, and adding products
  $(document).on("click", "button.delete", deleteProduct);
  $(document).on("submit", "#product-form", insertProduct);
  // $(document).on("click", ".product-item", editProduct);
  // $(document).on("keyup", ".product-item", finishEdit);
  // $(document).on("blur", ".product-item", cancelEdit);

  // Our initial products array
  var products = [];

  // Getting products from database when page loads
  getProducts();

  // This function resets the products displayed with new products from the database
  function initializeRows() {
    $productContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < products.length; i++) {
      rowsToAdd.push(createNewRow(products[i]));
    }
    $productContainer.prepend(rowsToAdd);
  }

  // This function grabs products from the database and updates the view
  function getProducts() {
    $.get("/api/products", function(data) {
      products = data;
      initializeRows();
    });
  }

  // This function deletes a product when the user clicks the delete button
  function deleteProduct(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/products/" + id
    }).then(getProducts);
  }

  // This function handles showing the input box for a user to edit a product
  function editProduct() {
    var currentProduct = $(this).data("product");
    $(this).children().hide();
    $(this).children("input.edit").val(currentProduct.name);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }

  // This function starts updating a product in the database if a user hits the "Enter Key"
  // While in edit mode
  function finishEdit(event) {
    var updatedProduct = $(this).data("product");
    if (event.which === 13) {
      updatedProduct.name = $(this).children("input").val().trim();
      // assign all the other values in product object here
      $(this).blur();
      updateProduct(updatedProduct);
    }
  }

  // This function updates a product in our database
  // ****NOTE*****  This updateProduct is not working.  Code needs to be added 
  // to specify which field in the product object that needs to be updated in function above. 

  function updateProduct(product) {
    $.ajax({
      method: "PUT",
      url: "/api/products",
      data: product
    }).then(getProducts);
  }

  // This function is called whenever a product item is in edit mode and loses focus
  // This cancels any edits being made
  function cancelEdit() {
    var currentProduct = $(this).data("product");
    if (currentProduct) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentProduct.name);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }

  // This function constructs a product-item row
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
    

    var $newInputRow = $(
      [
        "<li class='list-group-item product-item'>",
          "<span>",
          product.name," ",product.description, " ", product.category, " ", 
          product.num_instock, " $", product.unit_price,
          " $", product.total_sales, " ", product.picture,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>x</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", product.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("product", product);
//    return $newInputRow;
    return $newRow;
  }

  // This function inserts a new product into our database and then updates the view
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
    $newName.val("");
    $newDescription.val("");
  }
});
