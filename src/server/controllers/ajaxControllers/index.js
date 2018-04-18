'use strict'

const express = require('express');
const userController = require('./user');

const router = express.Router();

router.post('/', (req, res)=>{console.log(req.body)})
router.post('/user/register', userController.register);




module.exports = router;
