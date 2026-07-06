-- Active: 1781862800631@@127.0.0.1@3306
-- Enable the extension (Run this once)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- User Role Table
CREATE TABLE role (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    role_name VARCHAR(50) NOT NULL,
    role_description TEXT
);

-- Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id UUID NOT NULL,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role (id)
);

-- Category Table
CREATE TABLE category (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    image VARCHAR(255),
    description TEXT
);

-- Product Table
CREATE TABLE product (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name VARCHAR(200) NOT NULL,
    price INTEGER NOT NULL,
    slug VARCHAR(200) UNIQUE NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT,
    category_id UUID NOT NULL,
    CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE RESTRICT
);