const express = require('express');
const router = express.Router();
const subcategoryController = require('../controllers/subcategoryController');

// Create a subcategory
router.post('/subcategory', subcategoryController.createSubcategory);

// Get all sub-categories
router.get('/subcategories', subcategoryController.getAllSubCategories);

// Get sub-categories by category ID
router.get('/subcategories/category/:categoryId', subcategoryController.getSubCategoriesByCategoryId);

// Get sub-category by ID or name
router.get('/subcategory', subcategoryController.getSubCategoryByIdOrName);


router.put('/subcategory/:id', subcategoryController.updateSubcategory);
module.exports = router;
