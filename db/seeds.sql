-- CREATE DATABASE	inventory_pro;
use inventory_pro;
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Gag", "Cut Grass", "Smells like fresh cut grass!", 8.99, 0.00, 12, "ProdPic1.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Traditional", "Sweet Magnolia", "Smells like Sweet Magnolias! ", 8.99, 0.00, 1, "ProdPic2.jpg" , NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Food", "Chocolate Chip Cookie", "Smells like freshly baked Chocolate Chip Cookies!", 8.99, 0.00, 0, "ProdPic3.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Gag", "Highschool Gym Locker", "Smells like a Highschool Gym Locker!", 8.99, 0.00, 8, "ProdPic4.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Traditional", "Leather Jacket", "Smells like a new Leather Jacket!", 8.99, 0.00, 2, "ProdPic5.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Food", "Cup O'Coffee", "Smells like a fresh Cup O'Coffee", 8.99, 0.00, 3, "ProdPic6.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Gag", "Beautiful Skunk", "Smells like a Skunk! ", 8.99, 0.00, 12, "ProdPic7.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Traditional", "Lovely Lilac", "Smells like lovely purple lilacs!", 8.99, 0.00, 1, "ProdPic8.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Food", "Fresh Popcorn", "Smells like hot buttered popcorn from a movie theater!", 8.99, 0.00, 2, "ProdPic9.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Gag", "Dog Fart", "Smells like when when best friend has indigestion!", 8.99, 0.00, 5, "ProdPic10.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Traditional", "Heavenly Rose", "Smells like Heavenly Roses!", 8.99, 0.00, 2, "ProdPic11.jpg", NOW(), now());
insert into Products (category, name, description, unit_price, total_sales, num_instock, picture, createdAt, updatedAt)
values("Food", "Citrus Orange", "Smells like a Citrus Orange!", 8.99, 0.00, 10, "ProdPic12.jpg", NOW(), now());


select * from products;

