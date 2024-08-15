const db = require('../config/db');

const Category = {
    create: (data, callback) => {
        const query = `INSERT INTO categories (name, image_url, description, tax_applicable, tax, tax_type) 
                       VALUES (?, ?, ?, ?, ?, ?)`;
        const values = [data.name, data.image_url, data.description, data.tax_applicable, data.tax, data.tax_type];

        db.query(query, values, (err, result) => {
            if (err) {
                return callback(err);
            }
            callback(null, result);
        });
    },

    
    
    
    getAll: (callback) => {
        const query = 'SELECT * FROM categories';
        db.query(query, callback);
    },

    getByIdOrName: (id, name, callback) => {
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
                return callback(err, null);
            }
            if (results.length === 0) {
                return callback(new Error('Category not found'), null);
            }
            return callback(null, results[0]);
        })
    },
    update: (id, data, callback) => {
        const query = `UPDATE categories 
                       SET name = ?, image_url = ?, description = ?, tax_applicable = ?, tax = ?, tax_type = ? 
                       WHERE id = ?`;
        const values = [
            data.name,
            data.image_url,
            data.description,
            data.tax_applicable,
            data.tax,
            data.tax_type,
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
   


module.exports = Category;
