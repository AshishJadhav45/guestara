const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Create an item
router.post('/item', itemController.createItem);

// Get all items
router.get('/items', itemController.getAllItems);

// Get all items by category ID
router.get('/items/category/:categoryId', itemController.getItemsByCategoryId);

// Get all items by sub-category ID
router.get('/items/subcategory/:subcategoryId', itemController.getItemsBySubcategoryId);

// Get an item by ID or name
router.get('/item', itemController.getItemByIdOrName);
router.put('/item/:id', itemController.updateItem);
router.get('/items/search', itemController.searchItemByName);
module.exports = router;
