-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ecommerce
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ecommerce` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `ecommerce` ;

-- -----------------------------------------------------
-- Table `ecommerce`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`category` (
  `idcategory` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcategory`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ecommerce`.`customers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`customers` (
  `idcustomers` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(25) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idcustomers`))
ENGINE = InnoDB
AUTO_INCREMENT = 9
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ecommerce`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`products` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `name_product` VARCHAR(245) NOT NULL,
  `price` DECIMAL(10,3) UNSIGNED NOT NULL,
  `quantity` INT NOT NULL,
  `image_url` VARCHAR(345) NOT NULL,
  `idcategory` INT NOT NULL,
  PRIMARY KEY (`idproducts`),
  INDEX `idcategory_idx` (`idcategory` ASC) VISIBLE,
  CONSTRAINT `idcategory`
    FOREIGN KEY (`idcategory`)
    REFERENCES `ecommerce`.`category` (`idcategory`))
ENGINE = InnoDB
AUTO_INCREMENT = 18
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ecommerce`.`orders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`orders` (
  `id_orders` INT NOT NULL AUTO_INCREMENT,
  `orderdate` DATETIME NOT NULL,
  `totalprice` DECIMAL(10,3) NOT NULL,
  `id_customers` INT NOT NULL,
  PRIMARY KEY (`id_orders`),
  INDEX `idcustomers_idx` (`id_customers` ASC) VISIBLE,
  CONSTRAINT `idcustomers`
    FOREIGN KEY (`id_customers`)
    REFERENCES `ecommerce`.`customers` (`idcustomers`))
ENGINE = InnoDB
AUTO_INCREMENT = 16
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `ecommerce`.`orderitems`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ecommerce`.`orderitems` (
  `id_orderitems` INT NOT NULL AUTO_INCREMENT,
  `order_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  `idproducts` INT NOT NULL,
  PRIMARY KEY (`id_orderitems`),
  INDEX `order_id_idx` (`order_id` ASC) VISIBLE,
  INDEX `idproducts_idx` (`idproducts` ASC) VISIBLE,
  CONSTRAINT `idproducts`
    FOREIGN KEY (`idproducts`)
    REFERENCES `ecommerce`.`products` (`idproducts`),
  CONSTRAINT `order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `ecommerce`.`orders` (`id_orders`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
