import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.json());

let products = [
  { id: 1, name: 'Laptop', price: 500000, description: 'High-performance laptop' },
  { id: 2, name: 'Smartphone', price: 10000, description: 'Latest model' }
];

let nextId = 3;

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
});

app.post('/products', (req, res) => {
  const { name, price, description } = req.body;
  
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (isNaN(parseFloat(price)) || parseFloat(price) <= 0) {
    return res.status(400).json({ message: 'Price must be a positive number' });
  }

  const newProduct = {
    id: nextId++,
    name,
    price: parseFloat(price),
    description
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const { name, price, description } = req.body;
  
  if (!name || !price || !description) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  if (isNaN(parseFloat(price))) {
    return res.status(400).json({ message: 'Price must be a number' });
  }

  const updatedProduct = {
    id: products[productIndex].id,
    name,
    price: parseFloat(price),
    description
  };

  products[productIndex] = updatedProduct;
  res.status(200).json(updatedProduct);
});

app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  products = products.filter(p => p.id !== parseInt(req.params.id));
  res.status(204).end();
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});