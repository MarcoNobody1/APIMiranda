-- -----------------------------------------------------
-- Schema mirandaDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mirandaDB` DEFAULT CHARACTER SET utf8 ;
USE `mirandaDB` ;

-- -----------------------------------------------------
-- Table `mirandaDB`.`room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `room` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `number` VARCHAR(10) NOT NULL,
    `type` VARCHAR(45) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` INT NOT NULL,
    `discount` INT NOT NULL,
    `availability` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `mirandaDB`.`booking`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `booking` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(45) NOT NULL,
    `apellido` VARCHAR(45) NOT NULL,
    `order_date` DATE NOT NULL,
    `check_in` DATETIME NOT NULL,
    `check_out` DATETIME NOT NULL,
    `special_request` VARCHAR(255) NOT NULL,
    `room_id` INT NOT NULL,
    `price` VARCHAR(45) NOT NULL,
    `status` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`room_id`)
        REFERENCES `room` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- -----------------------------------------------------
-- Table `mirandaDB`.`contact`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `contact` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `date` DATETIME NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `phone` VARCHAR(45) NOT NULL,
    `subject` VARCHAR(45) NOT NULL,
    `comment` VARCHAR(255) NOT NULL,
    `archived` BINARY NOT NULL,
    PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `mirandaDB`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `photo` VARCHAR(255) NOT NULL,
    `username` VARCHAR(45) NOT NULL,
    `position` VARCHAR(45) NOT NULL,
    `email` VARCHAR(45) NOT NULL,
    `password` VARCHAR(45) NOT NULL,
    `start_date` DATE NOT NULL,
    `job_description` VARCHAR(255) NOT NULL,
    `contact` VARCHAR(45) NOT NULL,
    `activity` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `mirandaDB`.`photos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `photos` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `photo_url` VARCHAR(255) NOT NULL,
    `room_id` INT NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`room_id`)
        REFERENCES `room` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE
);


-- -----------------------------------------------------
-- Table `mirandaDB`.`amenity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `amenity` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `amenity` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`id`)
);


-- -----------------------------------------------------
-- Table `mirandaDB`.`room amenities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `room_amenities` (
    `room_id` INT NOT NULL,
    `amenity_id` INT NOT NULL,
    FOREIGN KEY (`room_id`)
        REFERENCES `room` (`id`)
        ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`amenity_id`)
        REFERENCES `amenity` (`id`)
);