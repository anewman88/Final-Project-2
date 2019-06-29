# InventoryPro and Customer Order Application

Team Project #2

SMU Programming Bootcamp Spring 2019

Team Bazooka Developers:
- Alpha
- Ann
- Chris
- Terra

##  Project Description

Inventory Pro is an inventory management and e-commerce store application to manage inventory/product data in realtime.  The application is deployed as two separate apps/servers: 

- An e-commerce website that allows customers to view and purchase products from The Smelly Candle Company. This working app can be found on Heroku [here](https://frozen-bayou-45394.herokuapp.com/).  Click on the blue Inventory button to see current product inventory and to add a new product to or delete an existing product from the products table.  Click on the red Storefront button to see the online store.  The source code for the e-commerce site can be found on Github [here](https://github.com/anewman88/MyCO).

- An inventory app with secure signup and login features that allow a user or system admin to access and manage the inventory database for The Smelly Candle Company.  This working app can be found on Heroku [here](https://young-forest-30276.herokuapp.com/).  The source code for the user login and authentication can be found on Github [here](https://github.com/cglerupcoding/InventoryPro).

## Instructions for Using the Smelly Candle Company Storefront App

- The application landing page gives you two button options:  Inventory or Storefront

### The Smelly Candle Company Storefront (the red botton on the landing page)

Click the Storefront button to go to The Smelly Candle Company Website.  The site lists all the products available for purchase.  Use the << and >> buttons to page through the product list.  Hover over an item and click it to add it to the Shopping Cart.  Click the View Cart button to view the current contents in the shopping cart.  To check out, click the Checkout button, fill in the required customer information, then click Submit to submit the order.  Your Order Summary will be shown including your order number and date and time of your order.

### The Smelly Candle Company Inventory Page (the blue botton on the landing page)

Click the Inventory button to go to The Smelly Candle Company Inventory view page.  The page lists all the products in inventory.  On this page products can be added to and deleted from the products table in the database. 

## Project Requirements
Our project meets the following project requirements:

1. Your project must use a Node and Express Web Server and be backed by a MySQL Database and an ORM.  

- We used Sequelize for our ORM. 

2. Have both GET and POST routes for retrieving and adding new data.  

- The Storefront performs a GET to retrieve current products and a POST to save each customer order. It also performs an update of a product's instock quantity and total sales with each processed order. The Inventory app of this server uses GET to display the current product list and POST to insert a new product into the database.  It also allows a user to delete a product.

3. Be deployed using Heroku (with Data)

- This deployed storefront app can be found on Heroku [here](https://frozen-bayou-45394.herokuapp.com/) and the user authentication [here](https://young-forest-30276.herokuapp.com/).  

4. Utilize at least one new library, package, or technology that we haven’t discussed:
    
 - The app utilizes Passport for user authentication.  Passport is an Express-compatible authentication middleware for Node.js.

5. Have a polished frontend / UI

- Please see the apps on Heroku [here](https://frozen-bayou-45394.herokuapp.com/) and [here](https://young-forest-30276.herokuapp.com/)
 
6. Have folder structure that meets MVC Paradigm

 - Please see the Github repos [here](https://github.com/anewman88/MyCO) and [here](https://github.com/cglerupcoding/InventoryPro)

7. Meet good quality coding standards (indentation, scoping, naming)

- Please see the Github repos [here](https://github.com/anewman88/MyCO) and [here](https://github.com/cglerupcoding/InventoryPro)
  
8. Must not expose sensitive API key information on the server, see Protecting-API-Keys-In-Node.md

 - No sensitive API key information used
 
 ## Instructions for Deploying the Application Locally
 
 Instructions for local deployment of The Smelly Candle Company website are located below.  Instructions for local deployment of the Inventory Pro user login and authentication can be found [here](https://github.com/cglerupcoding/InventoryPro).
 
 ### Running the app on your computer from a Bash Window

* Using a Bash command line window, clone or download the [repo](https://github.com/anewman88/MyCO) to the desired directory on your computer.

* Execute "npm install" in the cloned project directory to install the needed program packages.

* Create a .env file and insert the following lines and your password where indicated.
```
# MySQL Info
MySQL_PW="MyPasswordGoesHere"
```
* In MySQL, run the schema file to create a database called "inventory_pro"

* Start the server software by executing the command "node server.js" (This assumes that you have node installed on your computer).  This will create the needed tables in the database.  Note: if you do not create the "inventory_pro" database first, the server will not start correctly.

* In MySQL, run the seed file to insert the initial products into the products table

* Open an internet window and goto url "http://localhost:8080".

 
 
    
