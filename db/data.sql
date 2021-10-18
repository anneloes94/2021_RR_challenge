-- TRUNCATE TABLE `drivers`;
-- TRUNCATE TABLE `orders`;

INSERT INTO drivers (name) 
  VALUES ("Steve Williams"), ("Chris Horton"), ("Alex Novak");

INSERT INTO orders (driver_id, description, cost, revenue)
  VALUES (1, "Construction Materials", 100.00, 4200.00), 
         (1, "Construction Materials", 71.38, 3848.45),
         (1, "Wood and Lumber", 263.88, 1950.52),
         (1, "Wood and Lumber", 116.98, 4991.45),
         (2, "Meat", 279.17, 6739.72),
         (2, "Meat", 537.91, 3618.08),
         (2, "Fresh Produce", 420.69, 5345.91),
         (2, "Farm Supplies", 171.13, 7429.78),
         (2, "Cheetos", 310.38, 7231.98),
         (3, "Rose Rocket Swag", 350.79, 5404.24);

