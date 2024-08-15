const db = require('../config/db');

const Item = {
    create: (itemData, callback) => {
        const query = 'INSERT INTO items (subcategory_id, category_id, name, image_url, description, tax_applicable, tax, base_amount, discount, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        db.query(query, [
            itemData.subcategory_id, 
            itemData.category_id, 
            itemData.name, 
            itemData.image_url, 
            itemData.description, 
            itemData.tax_applicable, 
            itemData.tax, 
            itemData.base_amount, 
            itemData.discount, 
            itemData.total_amount
        ], callback);
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM items';
        db.query(query, callback);
    },

    getByCategoryId: (categoryId, callback) => {
        const query = 'SELECT * FROM items WHERE category_id = ?';
        db.query(query, [categoryId], callback);
    },

    getBySubcategoryId: (subcategoryId, callback) => {
        const query = 'SELECT * FROM items WHERE subcategory_id = ?';
        db.query(query, [subcategoryId], callback);
    },

    getByIdOrName: (id, name, callback) => {
        let query = 'SELECT * FROM items WHERE ';
        let params = [];

        if (id) {
            query += 'id = ?';
            params.push(id);
        } else if (name) {
            query += 'name = ?';
            params.push(name);
        } else {
            return callback(new Error('ID or Name must be provided'), null);
        }

        db.query(query, params, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(new Error('Item not found'), null);
            }
            return callback(null, results[0]);
        });
    },
    
    update: (id, data, callback) => {
        const query = `UPDATE items 
                       SET subcategory_id = ?, category_id = ?, name = ?, image_url = ?, description = ?, tax_applicable = ?, tax = ?, base_amount = ?, discount = ?, total_amount = ? 
                       WHERE id = ?`;
        const values = [
            data.subcategory_id,
            data.category_id,
            data.name,
            data.image_url,
            data.description,
            data.tax_applicable,
            data.tax,
            data.base_amount,
            data.discount,
            data.total_amount,
            id
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },
    searchByName: (name, callback) => {
        const query = 'SELECT * FROM items WHERE name LIKE ?';
        db.query(query, [`%${name}%`], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        });
    }
};

module.exports = Item;
