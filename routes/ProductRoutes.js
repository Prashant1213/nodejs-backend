const express = require('express');
const router = express.Router();
const Product = require('../models/Product');


router.post('/add', async (req, res) => {
    try {
        const { productName, productPrice, productUnit, productDescription } = req.body;

        const existingProduct = await Product.findOne({
            productName,
            productPrice,
            productUnit,
            productDescription
        });

        if (existingProduct) {
            return res.json({
                status: false,
                message: "Product already exists!"
            });
        }

        const productObj = new Product({
            productName,
            productPrice,
            productUnit,
            productDescription
        });

        await productObj.save();

        res.json({
            status: true,
            message: "Product added successfully!"
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});


router.get('/get', async (req, res) => {
    try {
        const products = await Product.find();
        res.json({
            status: true,
            message: products
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});


router.put('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, productPrice, productUnit, productDescription } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { productName, productPrice, productUnit, productDescription },
            { new: true }
        );

        if (!updatedProduct) {
            return res.json({
                status: false,
                message: "Product not found!"
            });
        }

        res.json({
            status: true,
            message: "Product updated successfully!"
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});


router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.json({
                status: false,
                message: "Product not found!"
            });
        }

        res.json({
            status: true,
            message: "Product deleted successfully!"
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

module.exports = router;
