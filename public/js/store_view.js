$(document).ready(function() {

    var DebugOn = true;   // debug flag

    var shopping_cart = [];  // The shopping cart array
    var product_list = [];   // The product list array from db
    var $ProductList = $(".store-list");  // The product list for display 

    // Adding event listeners for adding a product to the shopping cart
    $(document).on("click", "button.addtocart", AddProductToCart);
  
    //******************************************************************/
    // Getting products from database when page loads and displays it on the page
    getProducts();
    
  
    //******************************************************************/
    // This function resets the products displayed with new products from the database
    function initializeRows() {
      $ProductList.empty();
      var rowsToAdd = [];
      for (var i = 0; i < product_list.length; i++) {
        rowsToAdd.push(createNewRow(product_list[i]));
      }
      $ProductList.prepend(rowsToAdd);
    }  //  function initializeRows()

    
    //******************************************************************/
    // This function constructs a product-item row
    function createNewRow(product) {
        var $newInputRow = $(
        [
            "<div class='row'>",
                "<div class='col-2'>",
                    "<a>", product.picture, "</a>",
                "</div>",
                "<div class='col-3'>",
                    "<a>", product.name, "</a>",
                "</div>",
                // "<div class='col-3'>",
                //     "<a>", product.description, "</a>",
                // "</div>",
                "<div class='col-2 text-center'>",
                    "<a class='avail_stock'>Avail: ", product.num_instock, "</a>",
                "</div>",
                "<div class='col-1'>",
                    "<input name='add-quantity' class='add-item  form-control add-quantity' value='0' type='text' />",
//                "<input name='add-quantity' class='add-item  form-control add-quantity' placeholder='1' value='1' type='text' />",
                "</div>",
                "<div class='col-2'>",
                    "<a>@ $", product.unit_price, "</a>",
                "</div>",
                "<div class='col-1'>",
                    "<button type='submit' class='btn btn-success addtocart'> Add to Cart </button>",
                "</div>",
            
            "</div>"   

        ].join("")
        ); 
        
        // Add the product object to the row.
        $newInputRow.find("button.addtocart").data("product", product);
        // couldn't get below to work. couldn't figure out syntax to get at the data
        // in the row.  Attached it to the button in the row instead.
    //  $newInputRow.data("product", product);  
        
        return $newInputRow;
    }   // function createNewRow(product)
      
    //******************************************************************/
    // This function grabs products from the database and updates the view
    function getProducts() {
      $.get("/api/products", function(data) {
        product_list = data;
        initializeRows();
      });
    }  //function getProducts()
  
    //**********************************************************************/
    // This function inserts a new product into the shopping cart array
    function AddProductToCart(event) {
    event.preventDefault();

    // Get the current product selected 
    var CurProduct = $(this).data("product");
    if (DebugOn) console.log ("In AddProduct() - CurProduct", CurProduct);

    // Get the quantity requested  
    var AddQuantity = parseInt($("input.add-quantity").val()); 
    if (DebugOn) console.log ("In AddProduct() - $(input.add-quantity').val()", $("input.add-quantity").val());
    if (DebugOn) console.log ("In AddProduct() - AddQuantity " + AddQuantity);
    
    if (AddQuantity <= 0) {
       alert ("Product Quantity Invalid");
       return;
    }
    // make sure there is enough in stock to fullfill the order
    var InstockQuantity = CurProduct.num_instock;
    if (DebugOn) console.log ("In AddProduct() - InstockQuantity " + InstockQuantity);

    if (InstockQuantity >= AddQuantity) {  // add product to the shopping cart array
        // Add the selected product to the shopping cart array
        var AddProduct = {
            id:  CurProduct.id,
            name: CurProduct.name,
            description: CurProduct.description,
            category: CurProduct.category,
            unit_price:  CurProduct.unit_price, // should it be?  parseFloat($newPrice.val().trim()),
            quantity: AddQuantity,
            picture: CurProduct.picture,
        };
    
        shopping_cart.push(AddProduct); 
        alert ("Item: " + CurProduct.name + " added to the shopping cart");
    }
    else {   // Not enough quantity in stock alert an error for now
        alert ("Not enough quantity in stock");
    }
    console.log ("In AddProductToCart - current shopping_cart ", shopping_cart);
    }  // function AddProductToCart(event)

});  //  $(document).ready(function()
