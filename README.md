#### Inventory Management System

### Project Overview
This project is a simple inventory management system built using Node.js and Express. It allows users to create, retrieve, edit, and search for categories, subcategories, and items within an inventory. The project is flexible enough to work with any SQL-based database.

## Features
Create Categories, Subcategories, and Items
Get Categories, Subcategories, and Items by various filters
Edit Categories, Subcategories, and Items
Search for Items by their name
Prerequisites
Before setting up the project, ensure you have the following installed:

Node.js
MySQL 
Project Setup
1. Clone the repository
bash
Copy code
git clone https://github.com/AshishJadhav45/guestara.git
cd guestara
2. Install dependencies

npm install
3. Configure the Database
Update the database configuration in config/db.js to match your SQL database credentials.

4. Run SQL Table Creation Scripts
Create the necessary tables in your database by running the following SQL scripts:

## sql

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    tax_applicable BOOLEAN DEFAULT FALSE,
    tax DECIMAL(10, 2),
    tax_type VARCHAR(50)
);

CREATE TABLE subcategories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    tax_applicable BOOLEAN DEFAULT FALSE,
    tax DECIMAL(10, 2),
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    subcategory_id INT,
    category_id INT,
    name VARCHAR(255) NOT NULL,
    image_url VARCHAR(255),
    description TEXT,
    tax_applicable BOOLEAN,
    tax DECIMAL(10, 2),
    base_amount DECIMAL(10, 2) NOT NULL,
    discount DECIMAL(10, 2),
    total_amount DECIMAL(10, 2),
    FOREIGN KEY (subcategory_id) REFERENCES subcategories(id) ON DELETE SET NULL,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);
5. Start the Application



npm start
The application should now be running on http://localhost:3000.

API Endpoints
CREATE
Create Category

Method: POST
URL: /api/category
Body:
json

{
    "name": "Electronics",
    "image_url": "http://example.com/image.jpg",
    "description": "All kinds of electronics",
    "tax_applicable": true,
    "tax": 18,
    "tax_type": "GST"
}
Create Subcategory

Method: POST
URL: /api/subcategory
Body:
json

{
    "category_id": 1,
    "name": "Mobile Phones",
    "image_url": "http://example.com/image.jpg",
    "description": "Smartphones and accessories",
    "tax_applicable": true,
    "tax": 18
}
Create Item

Method: POST
URL: /api/item
Body:
json
Copy code
{
    "category_id": 1,
    "subcategory_id": 1,
    "name": "iPhone 13",
    "image_url": "http://example.com/image.jpg",
    "description": "Latest Apple iPhone",
    "tax_applicable": true,
    "tax": 18,
    "base_amount": 1000,
    "discount": 50,
    "total_amount": 950
}
GET
Get All Categories

Method: GET
URL: /api/categories
Get Category by ID or Name

Method: GET
URL: /api/category
Query Parameters: id or name
Get All Subcategories

Method: GET
URL: /api/subcategories
Get Subcategories by Category ID

Method: GET
URL: /api/subcategories/category/:categoryId
Get Subcategory by ID or Name

Method: GET
URL: /api/subcategory
Query Parameters: id or name
Get All Items

Method: GET
URL: /api/items
Get Items by Category ID

Method: GET
URL: /api/items/category/:categoryId
Get Items by Subcategory ID

Method: GET
URL: /api/items/subcategory/:subcategoryId
Get Item by ID or Name

Method: GET
URL: /api/item
Query Parameters: id or name
EDIT
Edit Category

Method: PUT
URL: /api/category/:id
Body: (same as category creation)
Edit Subcategory

Method: PUT
URL: /api/subcategory/:id
Body: (same as subcategory creation)
Edit Item

Method: PUT
URL: /api/item/:id
Body: (same as item creation)
SEARCH
Search Item by Name
Method: GET
URL: /api/items/search
Query Parameters: name (the name or part of the name of the item)
