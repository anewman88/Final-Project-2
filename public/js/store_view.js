var DebugOn = true;   // debug flag
var ItemsPerPage = 8;
var CurPage = 0;
var ProductIndex = 0;

$(document).ready(function() {

    var product_list = [];   // The product list array from db
    var shopping_cart = [];  // The shopping cart array
    var $ProductList = $(".store-list");  // The product list for [old] display 
    var $ProductDisplay = $(".product-list");  // The product list for [new] display  
    var $CartList = $(".shoppingcart-list");  // The shopping cart list for display 
//    var $ShoppingCartTotal = $("#CartTotal");  // The shopping cart total div 
    var $OrderSummaryTotal = $("#SummaryTotal");  // The order summary total div 
    var $OrderList = $(".order-summary-list"); // Order Summary Modal
    var OrderTotal = 0.00;

    // Adding event listeners for adding a product to the shopping cart
    $(document).on("click", "button.addtocart", AddProductToCart);
    $(document).on("click", "button.store-item", ItemClicked);
  
    //******************************************************************/
    // Get products from database when page loads and display them on the page
    getProducts();
    if (DebugOn) console.log ("Got product_list ", product_list);

    //**********************************************************************/
    function DisplayProducts() {

        var firstIndex = ProductIndex;
        var lastIndex = ProductIndex + ItemsPerPage;
        if (lastIndex > product_list.length)
           lastIndex = product_list.length;

        // make sure there are products in the array to display
        if (product_list.length > 0) {
            
            // first hide all the boxes on the page
            for(var i=0; i<ItemsPerPage; i++) {
                var BoxId = "#box_"+i;
                $(BoxId).hide();
            }

            // populate each product box on the page
            CurBox=0;
            for (var i=firstIndex; i<lastIndex; i++) {
               var TitleStr = product_list[i].name + " <br> $" + product_list[i].unit_price;
               $("#title_"+CurBox).text(TitleStr);
               var AvailStr = "Available: " + product_list[i].num_instock;
               $("#avail_"+CurBox).text(AvailStr);

               // show the box
               var BoxId = "#box_"+CurBox;
               $(BoxId).show();
               CurBox++;
            }  // for


        }  // if (product_list.length > 0)
    
    }  // DisplayProducts()  
    
 
    //******************************************************************/
    // This function constructs an HTML product-item
    function CreateProductItem(product) {
        var $ProductItem = $(
        [
                "<div class='col-3'>",
                "<p class='item-title'>", product.name, "<br> $", product.unit_price, "</p>",
//                "<button class='store-item addtocart' value='" + index + "'></button>",
                "<button class='store-item addtocart'></button>",
                "<p class='hidden buy-me'>Click to add to cart!</p>",
//                "<a class='avail_stock'>Avail: ", product.num_instock, "</a>",
                "</div>"
        ].join("")
        ); 
        
        // Add the product object to the row.
        // $newInputRow.find("button.addtocart").data("product", product);
        // $newInputRow.find("button.addtocart").data("id", product.id);
        
        return $ProductItem;
    }   // function CreateProductItem(product, index)

 //******************************************************************************************** */ 
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
        if (DebugOn) console.log("New Row ", $newInputRow);
        return $newInputRow;
    }   // function createNewRow(product)
      
    //******************************************************************/
    // This function grabs products from the database and updates the view
    function getProducts() {
      $.get("/api/products", function(data) {
        product_list = data;
        ProductIndex = 0;  // reset the index into the product array
        DisplayProducts();   
        initializeRows();    // This is unique to my mock storefront
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
    function ItemClicked(event) {
        event.preventDefault();
        
        console.log ("In ItemClicked handler");
        console.log ("this ", this);
        console.log ("this.id", this.id);
        
        // Get the current product selected 
        var CurBox = parseInt(this.id);

        alert ("Clicked Box ID is: " + CurBox);
    
        var CurProduct = product_list[(CurPage*ItemsPerPage)+CurBox];

        console.log ("Clicked on product ", CurProduct);

    //************************** */    
    

    // Get the quantity requested  
//    var AddQuantity = parseInt($("input.add-quantity").val()); 
    var AddQuantity = 1;  // no way at this point to enter quantity

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
//        InfoAlert ("Item: " + CurProduct.name, " added to Shopping Cart");
        DisplayShoppingCart();
    }
    else {   // Not enough quantity in stock alert an error for now
        InfoAlert ("Uh-Oh! Something went wrong!","Not enough quantity in stock");
    }
    console.log ("In AddProductToCart - current shopping_cart ", shopping_cart);
    } // 

    //**********************************************************************/
    // This function inserts a new product into the shopping cart array
    function AddProductToCart(event) {
    event.preventDefault();

    // Get the current product selected 
    var CurProduct = $(this).data("product");

    //************************** */    
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
//        InfoAlert ("Item: " + CurProduct.name, " added to Shopping Cart");
        DisplayShoppingCart();
    }
    else {   // Not enough quantity in stock alert an error for now
        InfoAlert ("Uh-Oh! Something went wrong!","Not enough quantity in stock");
    }
    console.log ("In AddProductToCart - current shopping_cart ", shopping_cart);
    }  // function AddProductToCart(event)
 
    //*****************************************************************************************/
    //******************** Test summary page modal *********************/
    $("#TestSummaryBtn").click(function(){
        
        if (DebugOn) console.log ("Test Summary Page Button Clicked");

        // populate the "hidden" order summary page
        $("#customer_email").text("Ann@gmail.com");
        $("#customer_first_name").text("Ann");
        $("#customer_last_name").text("Newman");
        $("#customer_address1").text("4404 Oak Knoll Dr");
        $("#customer_address2").text("");
        $("#customer_city").text("Plano");
        $("#customer_state").text("TX");
        $("#customer_zip").text("75093");
        $("#PO_number").text("1");
        $("#created").text("June 23, 2019");
        
        
        $("#OrderSummaryModal").modal("show");

    });


    //*****************************************************************************************/
    //******************** Code for managing the view shopping cart modal *********************/
    $("#ViewCartBtn").click(function(){
        
        if (DebugOn) console.log ("View Cart Button Clicked");
        
        DisplayShoppingCart();
    });

    //******************************************************************/
    // This function gets the items from shopping_cart and displays them
    function EmptyShoppingCart() {

        $CartList.empty();
//        $ShoppingCartTotal.text(0.00);
        shopping_cart = [];

    }  // function EmptyShoppingCart()

    //******************************************************************/
    // This function gets the items from shopping_cart and displays them
    // It also populates the "hidden" Order Summary page
    function initCartRows() {
        if (DebugOn) console.log ("in initCartRows shopping_cart.length: " + shopping_cart.length);
        $CartList.empty();
        var rowsToAdd = [];
        var CartTotal = 0.00;
        
        for (var i = 0; i < shopping_cart.length; i++) {
            rowsToAdd.push(createNewCartRow(shopping_cart[i]));
            CartTotal += parseFloat(shopping_cart[i].total_cost);
        }
        
        OrderTotal = CartTotal;
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

        if (DebugOn) console.log ("In initCartRows rowsToAdd", rowsToAdd);

        // display the shopping cart on page
        $CartList.append(rowsToAdd);
        
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

        // check for items in the shopping cart
        if (shopping_cart.length > 0) {  // There are items in the cart
           // Display the Checkout modal and wait for submit button
           $("#CheckoutModal").modal("show");             
        }
        else {  // Alert the customer that there are no items in the shopping cart
            InfoAlert("Uh-Oh! Something appears to be wrong!", "There are no items in your shopping cart");
            // disable the checkout modal
            $("#CheckoutModal").modal("hide");       
        }
    });  // $("#CheckOutBtn").click(function()
    
    var Customer;

    $("#order-submit").on("click", function() {  
        
        if (DebugOn) console.log ("Submit Button Clicked");
 
        // Create Customer object (to be sent to database);
        Customer = {
            customer_id: 0,
            first_name: $("#CustomerFirstName").val(),
            last_name: $("#CustomerLastName").val(),
            addr1: $("#CustomerAddr1").val(),
            addr2: $("#CustomerAddr2").val(),
            city: $("#CustomerCity").val(),
            state: $("#CustomerState").val(),
            zip: $("#CustomerZip").val(),
            email: $("#CustomerEmail").val(),
            comment: $("#CustomerComment").val(),
            status: "inprocess",
            order_total: OrderTotal,
            order: JSON.stringify(shopping_cart)
        };
//********** For Test */
// Customer.first_name = "Ann";
// Customer.last_name = "Newman";
// Customer.addr1 = "4404 Oak Knoll Dr";
// Customer.addr2 = ""; $("#CustomerAddr2").val(),
// Customer.city = "Plano";
// Customer.state = "TX";
// Customer.zip = "75093";
// Customer.email = "ann@gmail.com";
// Customer.comment = "My Comment";
// Customer.status = "inprocess";
// Customer.order_total= OrderTotal;
// Customer.order = JSON.stringify(shopping_cart);
// if (DebugOn) console.log ("about to post order JSON ", Customer.order);
//********** For Test */

        // populate the "hidden" order summary page
        $("#customer_email").text(Customer.email);
        $("#customer_first_name").text(Customer.first_name);
        $("#customer_last_name").text(Customer.last_name);
        $("#customer_address1").text(Customer.addr1);
        $("#customer_address2").text(Customer.addr2);
        $("#customer_city").text(Customer.city);
        $("#customer_state").text(Customer.state);
        $("#customer_zip").text(Customer.zip);
        $("#customer_comment").text(Customer.comment);

        if (DebugOn) console.log ("before validateForm Customer: ", Customer);
        
        if (validateForm(Customer) == true) {

            if (DebugOn) console.log ("after call validateForm() data is valid ", Customer);
    
            // update the product database by subtracting the ordered quantities
            // and updating the total sales field.
            // Add/post the input customer data to the order database  
            
            if (DebugOn) console.log ("after call validateForm() data is valid ", Customer);
    
            // for each item in the shopping_cart update the product in the products table
            if (DebugOn) console.log ("shopping cart length " + shopping_cart.length);
            for (var i = 0; i < shopping_cart.length; i++) {
                
                if (DebugOn) console.log ("updating database with products in shopping cart ", shopping_cart[i]);
                updateProduct(shopping_cart[i].id, shopping_cart[i].total_cost, shopping_cart[i].quantity);
            }
            
            // Add the order to the customer order table and get back the purchase order
            // Need to do this
            $.post("/api/orders", Customer, function (CustomerReturn) {
                var PO_number = CustomerReturn.id;           // generated by the database 
                var DateCreated = CustomerReturn.createdAt;  // generated by the database
                
                if (DebugOn) console.log ("successful post CustomerReturn", CustomerReturn);

                // notify the customer that their order is complete. might need
                // to do this inside post
                InfoAlert("Congratulations!", "Your order was successfully submitted");
            
                // hide the customer Checkout modal 
                $("#CheckoutModal").modal("hide");       
                if (DebugOn) console.log ("Hide Checkout Modal");

                // Populate and Display the order Summary Page
                DisplayOrderSummary(PO_number, DateCreated);

                // Empty the shopping cart
                EmptyShoppingCart();

            })
            .fail(function(response) {
                alert('Order Post Error: ' + response.responseText);
            });  // $.post("/api/orders", Customer, function (getCustomer)
 
            
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
        if ((CustomerData.first-name === "") || (CustomerData.first-name === undefined))
           return false;

        if ((CustomerData.last-name === "") || (CustomerData.last-name === undefined))
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
 
      function DisplayOrderSummary(PO, DateCreated) {

        // The customer data was populated on the summary page when it was submitted

        // Populate the Purchase Order number field
        $("#PO_number").text(PO);

        // Populate the Date field
        $("#DateCreated").text(DateCreated);

        // Populate the modal with the shopping cart info
        initSummaryRows();

        //  Show the Order Summary Modal
        $("#OrderSummaryModal").modal("show");

      }  // function DisplayOrderSummary()

    });  //  $("#submit").on("click", function()  Submit of User Data

    //*****************************************************************************************/
    //******************** Code for managing the Order Summary modal *********************/

    //******************************************************************/
    // This function constructs a product-item row in the cart
    function createNewSummaryRow(product) {
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
//        $newInputRow.find("button.delete").data("product", product);
//        $newInputRow.find("button.delete").data("id", product.id);

        return $newInputRow;
    }   // function createNewSummaryRow(product)

    //******************************************************************/
    // This function gets the items from shopping_cart and populates them
    // on the "hidden" Order Summary page
    function initSummaryRows() {
        if (DebugOn) console.log ("in initSummaryRows shopping_cart.length: " + shopping_cart.length);
        $OrderList.empty();
        var rowsToAdd = [];
        var CartTotal = 0.00;
        
        for (var i = 0; i < shopping_cart.length; i++) {
            rowsToAdd.push(createNewSummaryRow(shopping_cart[i]));
            CartTotal += parseFloat(shopping_cart[i].total_cost);
        }
        OrderTotal = CartTotal;

        // Add last row showing cart total
        var $CartTotalRow = $(
            [
                "<hr>",
                "<div class='row'>",
                    "<div class='col-8'>",
                        "<a> </a>",
                    "</div>",
                    "<div class='col-3'>",
                        "<a> Order Total = $", CartTotal.toFixed(2), "</a>",
                    "</div>",
                "</div>"   
            ].join("")
            ); 
            
        rowsToAdd.push($CartTotalRow);

        if (DebugOn) console.log ("In initSummaryRows rowsToAdd", rowsToAdd);

        // populate the "hidden" order summary modal with the shopping cart info
        $OrderList.append(rowsToAdd);

    }  //  function initSummaryRows()

    //********************************************************************************* */
    //******************************************************************/
    // This function updates the sales_total and quantity for the cur_id
    // in the database
    function updateProduct(cur_id, sales, quantity) {
        if (DebugOn) console.log ("in updateProduct id: " + cur_id + " total: " + sales + " quant: ", quantity);
        var id = parseInt(cur_id);
        var total_sales = (parseFloat(sales)).toFixed(2);
        if (DebugOn) console.log ("total_sales " + total_sales);

        $.post("/api/update_totalsales", {id, total_sales});
        $.post("/api/update_product_quantity", {id, quantity});
      
    }  //function updateProduct()

    function InfoAlert (str1, str2) {
        $("#AlertModal").modal("show");
        $(".alert-msg1").text(str1);
        $(".alert-msg2").text(str2);
    }  // function InfoAlert()

});  //  $(document).ready(function()

