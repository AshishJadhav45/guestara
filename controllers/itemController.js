const Item = require('../models/itemModel');

exports.createItem = (req, res) => {
    const { subcategory_id, category_id, name, image_url, description, tax_applicable, tax, base_amount, discount } = req.body;

    if (!name || (!subcategory_id && !category_id)) {
        return res.status(400).json({ error: 'Name and either Subcategory ID or Category ID are required' });
    }

    const total_amount = base_amount - (discount || 0);

    const itemData = {
        subcategory_id: subcategory_id || null,
        category_id: category_id || null,
        name,
        image_url,
        description,
        tax_applicable,
        tax,
        base_amount,
        discount,
        total_amount
    };

    Item.create(itemData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        res.status(201).json({ message: 'Item created successfully', itemId: result.insertId });
    });
};


exports.getAllItems = (req, res) => {
    Item.getAll((err, items) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(items);
    });
};

exports.getItemsByCategoryId = (req, res) => {
    const { categoryId } = req.params;
    Item.getByCategoryId(categoryId, (err, items) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(items);
    });
};

exports.getItemsBySubcategoryId = (req, res) => {
    const { subcategoryId } = req.params;
    Item.getBySubcategoryId(subcategoryId, (err, items) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(items);
    });
};

exports.getItemByIdOrName = (req, res) => {
    const { id, name } = req.query;

    if (!id && !name) {
        return res.status(400).json({ error: 'ID or Name is required to search for an item' });
    }

    Item.getByIdOrName(id, name, (err, item) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(200).json(item);
    });
};


exports.updateItem = (req, res) => {
    const { id } = req.params;
    const { subcategory_id, category_id, name, image_url, description, tax_applicable, tax, base_amount, discount } = req.body;

    if (!id) {
        return res.status(400).json({ error: 'Item ID is required' });
    }

    // Prepare the update data
    const updateData = {
        subcategory_id: subcategory_id || null,
        category_id: category_id || null,
        name: name || null,
        image_url: image_url || null,
        description: description || null,
        tax_applicable: tax_applicable !== undefined ? tax_applicable : null,
        tax: tax !== undefined ? tax : null,
        base_amount: base_amount !== undefined ? base_amount : null,
        discount: discount !== undefined ? discount : null,
        total_amount: base_amount ? base_amount - (discount || 0) : null
    };

    Item.update(id, updateData, (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Item not found' });
        }
        res.status(200).json({ message: 'Item updated successfully' });
    });
};


exports.searchItemByName = (req, res) => {
    const { name } = req.query;

    if (!name) {
        return res.status(400).json({ error: 'Item name is required for search' });
    }

    Item.searchByName(name, (err, items) => {
        if (err) {
            return res.status(500).json({ error: 'Database error', details: err.message });
        }
        if (items.length === 0) {
            return res.status(404).json({ message: 'No items found with the provided name' });
        }
        res.status(200).json(items);
    });
};
