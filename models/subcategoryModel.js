const db = require('../config/db');

const Subcategory = {
    create: (data, callback) => {
        const query = `INSERT INTO subcategories (category_id, name, image_url, description, tax_applicable, tax, tax_type) 
                       VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [
            data.category_id,
            data.name,
            data.image_url,
            data.description,
            data.tax_applicable,
            data.tax,
            data.tax_type,
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    getAll: (callback) => {
        const query = 'SELECT * FROM subcategories';
        db.query(query, callback);
    },

    getByCategoryId: (categoryId, callback) => {
        const query = 'SELECT * FROM subcategories WHERE category_id = ?';
        db.query(query, [categoryId], callback);
    },

    getByIdOrName: (id, name, callback) => {
        let query = 'SELECT * FROM subcategories WHERE ';
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
                return callback(new Error('Sub-category not found'), null);
            }
            return callback(null, results[0]);
        });
    },

    update: (id, data, callback) => {
        const query = `UPDATE subcategories 
                       SET name = ?, image_url = ?, description = ?, tax_applicable = ?, tax = ?, tax_type = ?
                       WHERE id = ?`;
        const values = [
            data.name || null,
            data.image_url || null,
            data.description || null,
            data.tax_applicable !== undefined ? data.tax_applicable : null,
            data.tax !== undefined ? data.tax : null,
            data.tax_type || null,
            id
        ];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    }
};

module.exports = Subcategory;
