var controllers = require('./controllers');
// var express = require('express');

module.exports = function(app){
    app.use('/api', controllers.AjaxController);
    // add controller base route here
}