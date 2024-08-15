const Category = require('../models/categoryModel');
const db = require('../config/db'); 

// logic for create category 
exports.createCategory = (req, res) => {
    const { name, image_url, description, tax_applicable, tax, tax_type } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    const categoryData = {
        name,
        image_url,
        description,
        tax_applicable,
        tax,
        tax_type,
    };

    Category.create(categoryData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ message: 'Category created successfully', categoryId: result.insertId });
    });
};


// logic for get all categories
exports.getAllCategories = (req, res) => {
    Category.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(200).json(results);
    });
};

// logic for category by name or id 
exports.getCategoryByIdOrName = (req, res) => {
    const { id, name } = req.query;

    if (!id && !name) {
        return res.status(400).json({ error: 'ID or Name is required to search for a category' });
    }

    let query = 'SELECT * FROM categories WHERE ';
    let params = [];

    if (id) {
        query += 'id = ?';
        params.push(id);
    } else if (name) {
        query += 'name = ?';
        params.push(name);
    }

    db.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json(results[0]);
    });
    
};

// logic for update category
exports.updateCategory = (req, res) => {
    const { id } = req.params;
    const { name, image_url, description, tax_applicable, tax, tax_type } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Category ID is required' });
    }

    const categoryData = {
        name,
        image_url,
        description,
        tax_applicable,
        tax,
        tax_type
    };

    Category.update(id, categoryData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(200).json({ message: 'Category updated successfully' });
    });
};


