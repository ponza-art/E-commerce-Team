const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');


app.use(cors())


app.use(express.static(path.join(__dirname, '../frontend/E-commerce/src/app/login/login.component.html')));

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/E-commerce/src/app/login/login.component.html'));
});

app.get('/admin/products', (req, res) => {
  res.json({ products: [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }] });
});

app.get('/admin/products/:id', (req, res) => {
  const productId = req.params.id;
  res.json({ product: { id: productId, name: `Product ${productId}` } });
});

app.get('/admin/orders', (req, res) => {
  res.json({ orders: [{ id: 1, status: 'Shipped' }, { id: 2, status: 'Processing' }] });
});

app.get('/admin/orders/:id', (req, res) => {
  const orderId = req.params.id;
  res.json({ order: { id: orderId, status: 'Shipped' } });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  
  
});
