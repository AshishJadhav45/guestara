const Subcategory = require('../models/subcategoryModel'); // Correct model import
const db = require('../config/db'); // Import db once

exports.createSubcategory = (req, res) => {
    const { category_id, name, image_url, description, tax_applicable, tax, tax_type } = req.body;

    if (!name || !category_id) {
        return res.status(400).json({ error: 'Name and Category ID are required' });
    }

    // Fetch the parent category to apply defaults if necessary
    const query = 'SELECT * FROM categories WHERE id = ?';
    db.query(query, [category_id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Category not found' });
        }

        const category = results[0];

        const subcategoryData = {
            category_id,
            name,
            image_url,
            description,
            tax_applicable: tax_applicable !== undefined ? tax_applicable : category.tax_applicable,
            tax: tax !== undefined ? tax : category.tax,
            tax_type: tax_type || category.tax_type,
        };

        Subcategory.create(subcategoryData, (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Database error', details: err.message });
            }
            res.status(201).json({ message: 'Subcategory created successfully', subcategoryId: result.insertId });
        });
    });
};

exports.getAllSubCategories = (req, res) => {
    Subcategory.getAll((err, subcategories) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(subcategories);
    });
};

exports.getSubCategoriesByCategoryId = (req, res) => {
    const { categoryId } = req.params;
    Subcategory.getByCategoryId(categoryId, (err, subcategories) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(subcategories);
    });
};

exports.getSubCategoryByIdOrName = (req, res) => {
    const { id, name } = req.query;

    if (!id && !name) {
        return res.status(400).json({ error: 'ID or Name is required to search for a sub-category' });
    }

    Subcategory.getByIdOrName(id, name, (err, subcategory) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(subcategory);
    });
};


exports.updateSubcategory = (req, res) => {
    const { id } = req.params;
    const { name, image_url, description, tax_applicable, tax, tax_type } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Subcategory ID is required' });
    }

    // Prepare the update data
    const updateData = {};
    if (name) updateData.name = name;
    if (image_url) updateData.image_url = image_url;
    if (description) updateData.description = description;
    if (tax_applicable !== undefined) updateData.tax_applicable = tax_applicable;
    if (tax !== undefined) updateData.tax = tax;
    if (tax_type) updateData.tax_type = tax_type;

    Subcategory.update(id, updateData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Subcategory not found' });
        }
        res.status(200).json({ message: 'Subcategory updated successfully' });
    });
};

