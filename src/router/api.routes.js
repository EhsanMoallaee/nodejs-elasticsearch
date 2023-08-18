const { Router } = require('express');
const { indicesRouter } = require('./indices.routes');
const apiRouter = Router();

apiRouter.get('/', (req, res) => {
    return res.render('pages/index', {message: 'Hi express elastic search'})
})
apiRouter.use('/indices', indicesRouter);

module.exports = {
    apiRouter
}