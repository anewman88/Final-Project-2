$(document).ready(function() {

    var shopping_cart = [
        {
            id: 1,
            category: "category 1",
            name: "item 1",
            description: "description 1",
            picture: "picture 1",
            unit_price: "1.00",
            quantity: 1,
            total_cost: "1.00",
        },
        {
            id: 2,
            category: "category 2",
            name: "item 2",
            description: "description 2",
            picture: "picture 2",
            unit_price: "2.00",
            quantity: 1,
            total_cost: "2.00",
        },
        {
            id: 3,
            category: "category 3",
            name: "item 3",
            description: "description 3",
            picture: "picture 3",
            unit_price: "3.00",
            quantity: 1,
            total_cost: "3.00"
        },
        {
            id: 4,
            category: "category 4",
            name: "item 4",
            description: "description 4",
            picture: "picture 4",
            unit_price: "4.00",
            quantity: 2,
            total_cost: "8.00",
        },
    ]

console.log ("In file cart_view.js");
console.log ("In file cart_view.js shopping_cart: ", shopping_cart);
    var DebugOn = true;   // debug flag
    var Working = false;

    var $CartList = $(".cart-list");  // The product list for display 

    // Adding event listeners for deleting a product to the shopping cart
    $(document).on("click", "button.delete", DeleteItemFromCart);

        //******************************************************************/
    // Get the shopping cart and display it
    getShoppingCart();
    
    //******************************************************************/
    // This function gets the items from shopping_cart and displays them
    function initializeRows() {
      $CartList.empty();
      var rowsToAdd = [];
      var CartTotal = 0.00;

      for (var i = 0; i < shopping_cart.length; i++) {
        rowsToAdd.push(createNewRow(shopping_cart[i]));
        CartTotal += parseFloat(shopping_cart[i].total_cost);
      }
      
      // Add last row showing cart total
      var $CartTotalRow = $(
        [
            "<div class='row'>",
                "<div class='col-8'>",
                    "<a> </a>",
                "</div>",
                "<div class='col-3'>",
                    "<a> Cart Total = $", CartTotal, "</a>",
                "</div>",
            "</div>"   
        ].join("")
        ); 
        
      rowsToAdd.push($CartTotalRow);

      // display the shopping cart on page
      $CartList.prepend(rowsToAdd);
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
                    "<a class='avail_stock'>Quantity: ", product.quantity, "</a>",
                "</div>",
                "<div class='col-2'>",
                    "<a>@ $", product.unit_price, "</a>",
                "</div>",
                "<div class='col-2'>",
                    "<a>= $", product.total_cost, "</a>",
                "</div>",
                "<div class='col-1'>",
                    "<button class='delete btn btn-danger'>X</button>",
                 "</div>",
            
            "</div>"   

        ].join("")
        ); 
        
        // Add the product object to the row.
        $newInputRow.find("button.delete").data("product", product);
        $newInputRow.find("button.delete").data("id", product.id);
    
        return $newInputRow;
    }   // function createNewRow(product)
      
    //******************************************************************/
    // This function gets the shopping cart from the storefront view
    function getShoppingCart() {
    //   $.get("/api/shoppingcart", function(data) {
    //     shopping_cart = data;
         initializeRows();
    //   });
    }  //function getShoppingCart()
  
  // This function deletes a product from the shopping cart arraywhen the user clicks the delete button
  function DeleteItemFromCart(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    // $.ajax({
    //   method: "DELETE",
    //   url: "/api/products/" + id
    // }).then(getProducts);
  }


});  //  $(document).ready(function()


