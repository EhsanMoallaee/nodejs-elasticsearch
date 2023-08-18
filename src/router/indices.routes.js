const { Router } = require('express');
const { createNewIndex, getAllIndices, removeIndex } = require('../controller/indices.controller');
const indicesRouter = Router();

indicesRouter.post('/add', createNewIndex);
indicesRouter.get('/list', getAllIndices);
indicesRouter.delete('/delete/:indexName', removeIndex);

module.exports = {
    indicesRouter
}