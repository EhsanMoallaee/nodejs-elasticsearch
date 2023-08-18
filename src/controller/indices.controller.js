const createHttpError = require("http-errors");
const { elasticClient } = require("../../config/elastic.config");

async function createNewIndex(req, res, next) {
    try {
        const { indexName } = req.body;
        if(!indexName || indexName.trim() == '') throw createHttpError.BadRequest('Index name is required');
        const result = await elasticClient.indices.create({index: indexName});
        if(!result) throw createHttpError.InternalServerError('Internal server error occured!');
        return res.status(201).json({
            status: 201,
            message: 'Elastic search index created successfully',
            data: {
                result
            }
        })
    } catch (error) {
        next(error);
    }
}

async function removeIndex(req, res, next) {
    try {
        const { indexName } = req.params;
        const removeResult = await elasticClient.indices.delete({index: indexName});
        if(!removeResult || !removeResult.acknowledged) throw createHttpError.NotFound('Indice not found');
        return res.status(200).json({
            status: 200,
            message: `Elastic index: (${indexName}) removed successfully`
        })
    } catch (error) {
        next(error);
    }
}

async function getAllIndices(req, res, next) {
    try {
        const indices = await elasticClient.indices.getAlias();
        const regexp = /^\.+/
        const foundIndices = Object.keys(indices).filter(item => !regexp.test(item));
        if(!indices || foundIndices.length == 0) throw createHttpError.NotFound('Indices not found');
        return res.status(200).json({
            status: 200,
            message: 'Elastic indices found successfully',
            data: {
                indices: Object.keys(indices).filter(item => !regexp.test(item))
            }
        })
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createNewIndex,
    removeIndex,
    getAllIndices    
}
