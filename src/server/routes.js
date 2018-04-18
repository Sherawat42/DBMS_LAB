var controllers = require('./controllers');
// var express = require('express');

module.exports = function(app){
    app.use('/ajax', controllers.AjaxController);
    // add controller base route here
}