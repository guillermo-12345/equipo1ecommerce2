
const connection = require('../../src/components/service/dbConfig');
exports.getProducts = (req, res) => {
  connection.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).send('Error obteniendo productos');
    }
    res.json(results);
  });
};

exports.addProduct = (req, res) => {
    const { title, description, price, purchase_price, category, stock, img, supplier_id } = req.body;
    const query = `INSERT INTO products (title, description, price, purchase_price, category, stock, img, supplier_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [title, description, price, purchase_price, category, stock, img, supplier_id];
  
    connection.query(query, values, (err, results) => {
      if (err) {
        return res.status(500).send('Error agregando producto');
      }
      res.json({ message: 'Producto agregado exitosamente', id: results.insertId });
    });
  };
  