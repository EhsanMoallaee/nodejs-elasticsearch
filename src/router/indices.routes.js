const { Router } = require('express');
const { createNewIndex, getAllIndices } = require('../controller/indices.controller');
const indicesRouter = Router();

indicesRouter.post('/add', createNewIndex);
indicesRouter.get('/list', getAllIndices);

module.exports = {
    indicesRouter
}