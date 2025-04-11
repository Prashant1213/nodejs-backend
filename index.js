const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const ProductRoutes=require('./routes/ProductRoutes');



const server = express();
server.use(bodyParser.json());
server.use(cors());
server.use('/Product',ProductRoutes)





mongoose.connect('mongodb+srv://prashant:Prashant%40123@leadsoft.jbrppb4.mongodb.net/')
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));


server.post('/register', async (req, res) => {
    try {
        const { fullName, userName, age, password } = req.body;

        
        const existingUser = await User.findOne({ userName: userName });
        if (existingUser) {
            return res.json({
                status: false,
                message: 'User already exists with this username'
            });
        }

        const userObj = new User({ fullName, userName, age, password });
        await userObj.save();

        res.json({
            status: true,
            message: 'User Registered Successfully'
        });
    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});


server.post('/login', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const userExist = await User.findOne({ userName: userName });
        if (!userExist) {
            return res.json({
                status: false,
                message: 'User Not Found!'
            });
        }

        if (password !== userExist.password) {
            return res.json({
                status: false,
                message: 'Wrong Password'
            });
        }

        res.json({
            status: true,
            message: 'Login Successful'
        });

    } catch (err) {
        res.json({
            status: false,
            message: err.message
        });
    }
});

server.listen(8085, () => {
    console.log('Server started listening on port 8085');
});
