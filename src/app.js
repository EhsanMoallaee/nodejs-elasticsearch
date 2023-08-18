const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const { apiRouter } = require('./router/api.routes');
require('dotenv').config();
const app = express();

//configs and builtin middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.set('views', 'views');
app.set('layout', './layouts/master');
app.use(apiRouter);

app.use((req, res, next) => {
    return res.status(404).json({
        status: 404,
        message: 'Requested page not found!'
    })
});
app.use((err, req, res, next) => {
    // console.log('err : ', err);
    return res.status(err.status || err.statusCode || 500).json({
        status: err.status || err.statusCode || 500,
        message: err.message || 'Internal server error occured!'
    })
});

module.exports = {
    app
}