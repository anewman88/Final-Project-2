var shopping_cart = [];  // The shopping cart array
var DebugOn = true;   // debug flag

$(document).ready(function() {
    if (DebugOn) console.log ("Loading store_view.js from public");
    
    var product_list = [];   // The product list array from db
    var $ProductList = $(".store-list");  // The product list for display 
    var $CartList = $(".shoppingcart-list");  // The shopping cart list for display 

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
      $ProductList.append(rowsToAdd);
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
        $newInputRow.find("button.addtocart").data("id", product.id);
        
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
    
  //********************************************************************** */
//  Not in production file
//********************************************************************** */

//********************************************************************** */
//  Everything below goes into production file
//********************************************************************** */

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
       InfoAlert ("Uh-Oh! Something went wrong!","Product Quantity is Invalid");
       return;
    }
    // make sure there is enough in stock to fullfill the order
    var InstockQuantity = CurProduct.num_instock;
    if (DebugOn) console.log ("In AddProduct() - InstockQuantity " + InstockQuantity);

    if (InstockQuantity >= AddQuantity) {  // add product to the shopping cart array
        var TotalCost = parseFloat(CurProduct.unit_price) * AddQuantity;
        // Add the selected product to the shopping cart array
        var AddProduct = {
            id:  CurProduct.id,
            name: CurProduct.name,
            description: CurProduct.description,
            category: CurProduct.category,
            unit_price:  CurProduct.unit_price, // should it be?  parseFloat($newPrice.val().trim()),
            quantity: AddQuantity,
            total_cost: TotalCost,
            picture: CurProduct.picture,
        };
    
        shopping_cart.push(AddProduct); 
        InfoAlert ("Item: " + CurProduct.name, " added to Shopping Cart");
//        DisplayShoppingCart();
    }
    else {   // Not enough quantity in stock alert an error for now
        InfoAlert ("Uh-Oh! Something went wrong!","Not enough quantity in stock");
    }
    console.log ("In AddProductToCart - current shopping_cart ", shopping_cart);
    }  // function AddProductToCart(event)

    //*****************************************************************************************/
    //******************** Code for managing the view shopping cart modal *********************/
    $("#ViewCartBtn").click(function(){
        
        if (DebugOn) console.log ("View Cart Button Clicked");
        
        DisplayShoppingCart();
    });

    //******************************************************************/
    // This function gets the items from shopping_cart and displays them
    function initCartRows() {

    $CartList.empty();
    var rowsToAdd = [];
    var CartTotal = 0.00;
    var $ShoppingCartTotal = $("#CartTotal");  // The shopping cart total div 

    for (var i = 0; i < shopping_cart.length; i++) {
        if (DebugOn) console.log ("displaying products in shopping cart ", shopping_cart[i]);
        rowsToAdd.push(createNewCartRow(shopping_cart[i]));
        CartTotal += parseFloat(shopping_cart[i].total_cost);
    }
    
    // Add last row showing cart total
    var $CartTotalRow = $(
        [
            "<hr>",
            "<div class='row'>",
                "<div class='col-8'>",
                    "<a> </a>",
                "</div>",
                "<div class='col-3'>",
                "<a> Cart Total = $", CartTotal.toFixed(2), "</a>",
                "</div>",
            "</div>"   
        ].join("")
        ); 
        
    rowsToAdd.push($CartTotalRow);

    // display the shopping cart on page
    $CartList.append(rowsToAdd);

    // Display the cart total
    $ShoppingCartTotal.text("$ "+CartTotal.toFixed(2));

    }  //  function initCartRows()

        
    //******************************************************************/
    // This function constructs a product-item row in the cart
    function createNewCartRow(product) {
        var $newInputRow = $(
        [
            "<div class='row'>",
                "<div class='col-2 text-center'>",
                    "<a>", product.id, "</a>",
                "</div>",
                "<div class='col-4'>",
                    "<a>", product.name, "</a>",
                "</div>",
                // "<div class='col-3'>",
                //     "<a>", product.description, "</a>",
                // "</div>",
                "<div class='col-2 text-center'>",
                    "<a>", product.quantity, "</a>",
                "</div>",
                "<div class='col-2'>",
                    "<a>$", product.unit_price, "</a>",
                "</div>",
                "<div class='col-2'>",
                    "<a>$", product.total_cost.toFixed(2), "</a>",
                "</div>",
                // "<div class='col-1'>",
                //     "<button class='delete btn btn-danger'>X</button>",
                // "</div>",
            
            "</div>"   

        ].join("")
        ); 
        
        // Add the product object to the row.
        $newInputRow.find("button.delete").data("product", product);
        $newInputRow.find("button.delete").data("id", product.id);

        return $newInputRow;
    }   // function createNewCartRow(product)
    
    //******************************************************************/
    // This function gets the shopping cart from the storefront view
    function DisplayShoppingCart() {
        // Display the Cart modal 
        $("#CartModal").modal("show");
        initCartRows();
    }  //function DisplayShoppingCart()

    //*****************************************************************************************/
    //******************** Code for managing the checkout process *********************/
    $("#CheckOutBtn").click(function(){

        if (DebugOn) console.log ("Checkout Button Clicked");

        // Display the Checkout modal and wait for submit button
        $("#CheckoutModal").modal("show");       
    });
    
    // function to perform the checkout process
    function Checkout() {
       if (DebugOn) console.log ("In Checkout ")
       
    }

    var CustomerData;

    $("#order-submit").on("click", function() {  
        
        if (DebugOn) console.log ("Submit Button Clicked");

        // Get the input customer data
        CustomerData = {
            name: $("#CustomerName").val(),
            addr1: $("#CustomerAddr1").val(),
            addr2: $("#CustomerAddr2").val(),
            city: $("#CustomerCity").val(),
            state: $("#CustomerState").val(),
            city: $("#CustomerCity").val(),
            zip: $("#CustomerZip").val(),
            email: $("#CustomerEmail").val(),
            order: shopping_cart,
        };

        if (DebugOn) console.log ("before validateForm CustomerData: ", CustomerData);
        
        if (validateForm(CustomerData) == true) {
            var OrderNumber=0;

            if (DebugOn) console.log ("after call validateForm() data is valid ", CustomerData);
    
            // for each item in the shopping_cart update the product in the products table
            if (DebugOn) console.log ("shopping cart length " + shopping_cart.length);
            for (var i = 0; i < shopping_cart.length; i++) {
                
                if (DebugOn) console.log ("updating database with products in shopping cart ", shopping_cart[i]);
                updateProduct(shopping_cart[i].id, shopping_cart[i].total_cost, shopping_cart[i].quantity);
            }
            
            // Add the order to the customer order table


            // notify the customer that their order is complete. might need
            // to do this inside post
            InfoAlert("Congratulations!", "Your order was successfully submitted");
        
            // hide the customer Checkout modal 
            $("#CheckoutModal").modal("hide");       
            if (DebugOn) console.log ("Hide Checkout Modal");

            // Display order Summary
            DisplayOrderSummary(shopping_cart, CustomerData, OrderNumber);

        } else {  // some part of the input for was invalid
            InfoAlert("Uh-Oh! Something went wrong!","Please fill out all fields before submitting!");
        }


      function validateForm(CustomerData) {

        if (DebugOn) {
          console.log ("In validateForm()");
          console.log ("Input User Data ", CustomerData);
        }
             
        var isValid = true;

        // validate the name field
        if ((CustomerData.name === "") || (CustomerData.name === undefined))
           return false;

        // validate the address field
        if ((CustomerData.addr1 === "") || (CustomerData.addr1 === undefined)) 
           return false;
                    
        // validate the city field
        if ((CustomerData.city === "") || (CustomerData.city === undefined)) 
           return false;
                  
        // validate the state field
        if ((CustomerData.state === "") || (CustomerData.state === undefined)) 
           return false;            
                  
        // validate the zip code field
        if ((CustomerData.zip === "") || (CustomerData.zip === undefined)) 
          return false;
                  
        return isValid;
      }  //function validateForm()
 
      function DisplayOrderSummary(Customer, Cart, PO) {
        $("#OrderSummaryModal").modal("show");       
 
      }  // function DisplayOrderSummary()


    });  //  $("#submit").on("click", function()

    function InfoAlert (str1, str2) {
        $("#AlertModal").modal("show");
        $(".alert-msg1").text(str1);
        $(".alert-msg2").text(str2);
    }  // function InfoAlert()

    //******************************************************************/
    // This function grabs products from the database and updates the view
    function updateProduct(cur_id, sales_total, quantity) {

        $.post("/api/update_product_total_sale", {cur_id, sales_total});
        $.post("/api/update_product_quantity", {cur_id, quantity});
    }  //function updateProduct()
    

//**************************************************************************/
// function ProcessOrder()  
// The purpose of this function is to process the user's order and to
// update the new quantity in the product database
//**************************************************************************/
function ProcessOrder(Item, Quantity) {

    if (DebugON) console.log ("in ProcessOrder ", Item);

    var Total = Quantity * Item.unit_price;

//    var query = "UPDATE products SET stock_quantity = stock_quantity + " + updateProduct.add_quantity + " WHERE item_id = " + updateProduct.item_id;
    var query = "UPDATE products SET stock_quantity = stock_quantity - " + Quantity + 
          ", product_sales = product_sales + " + Total + " WHERE item_id = " + Item.item_id;

    connection.query(query, function(err, res) {
        if (err) {
           console.error("*** In ProcessOrder() query error: " + query + " " + err.stack + " *** ".red);
           return;
        }  // if 
   
        console.log ("--------------------------------------------------------------------------------");
        console.log ("  Your Bamazon Order Summary: ");
        console.log (" ");
        console.log("     Product #" + Item.item_id + ": " + Item.product_name);
        console.log("     Unit cost of $" + Item.unit_price + " with quantity of " + Quantity);
        console.log("     Your total cost is: $" + Total);
        console.log (" ");
        console.log ("  Thank you for your order");
        console.log ("--------------------------------------------------------------------------------");
        
        // display the updated product list
        DisplayProducts();
        
    });  // connection.query

}  // function ProcessOrder()

//**************************************************************************/

});  //  $(document).ready(function()

