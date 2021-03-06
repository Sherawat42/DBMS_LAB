'use strict'

const express = require('express');
const userController = require('./user');

const router = express.Router();

router.post('/', (req, res)=>{console.log(req.body)})
router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/roles', userController.updateRoles)
router.post('/user/profile', userController.updateProfile)
router.post('/user/request-reset-password', userController.requestResetPassword)
router.post('/user/reset-password', userController.resetPassword)
router.post('/user/logout', userController.logout)
router.post('/user/loggedInCheck', userController.loggedInCheck)
router.post('/user/updateRoles', userController.updateRoles)

router.get('/user/confirm?*', userController.confirm)
router.get('/user/reset-password?*', userController.resetPassword)
router.get('/user/roles', userController.getRoles)

module.exports = router;
