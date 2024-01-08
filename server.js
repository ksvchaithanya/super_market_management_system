const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001; // Change the port to your desired value
const mongoUrl = 'mongodb://localhost:27017/supermarket';

app.use(bodyParser.json());
app.use(cors());

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch(error => {
        console.error('Error connecting to MongoDB:', error);
    });

// Product model
const Product = mongoose.model('Product', {
    name: String,
    price: Number
});

// Worker model
const Worker = mongoose.model('Worker', {
    Name: String,
    Role: String
});

// Endpoint to add product details
app.post('/add-product', (req, res) => {
    const { name, price } = req.body;
    const product = new Product({ name, price });
    product.save()
        .then(() => {
            console.log('Product added:', product);
            res.status(200).json({ message: 'Product added successfully' });
        })
        .catch(error => {
            console.error('Error adding product:', error);
            res.status(500).json({ error: 'Error adding product' });
        });
});

// Endpoint to get all products
app.get('/get-products', (req, res) => {
    Product.find({})
        .then(products => {
            res.json(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
            res.status(500).json({ error: 'Error fetching products' });
        });
});

// Endpoint to add worker details
app.post('/add-worker', (req, res) => {
    const { Name, Role } = req.body;
    const worker = new Worker({ Name, Role });
    worker.save()
        .then(() => {
            console.log('Worker added:', worker);
            res.status(200).json({ message: 'Worker added successfully' });
        })
        .catch(error => {
            console.error('Error adding worker:', error);
            res.status(500).json({ error: 'Error adding worker' });
        });
});

// Endpoint to get all workers
app.get('/get-workers', (req, res) => {
    Worker.find({})
        .then(workers => {
            res.json(workers);
        })
        .catch(error => {
            console.error('Error fetching workers:', error);
            res.status(500).json({ error: 'Error fetching workers' });
        });
});
