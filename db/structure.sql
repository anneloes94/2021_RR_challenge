# Drivers table
# ------------------------------------------------------------

-- DROP TABLE IF EXISTS `drivers`;

CREATE TABLE `drivers` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (id)
);


# Orders table
# ------------------------------------------------------------

-- DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `driver_id` INT DEFAULT NULL,
  `description` text,
  `cost` decimal(22,2) NOT NULL DEFAULT '0.00',
  `revenue` decimal(22,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (id),
  CONSTRAINT fk_driver FOREIGN KEY (driver_id) REFERENCES drivers(id) ON DELETE SET NULL
);
