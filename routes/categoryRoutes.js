const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.post('/category', categoryController.createCategory);

router.get('/categories', categoryController.getAllCategories);

router.get('/category', categoryController.getCategoryByIdOrName);

router.put('/category/:id', categoryController.updateCategory);


module.exports = router;
