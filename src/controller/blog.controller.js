const createHttpError = require("http-errors");
const { elasticClient } = require("../../config/elastic.config");
const blogIndex = 'blog';

async function getAllBlogs(req, res, next) {
    try {
        const value = req.params.value;
        const blogs = await elasticClient.search({
            index: blogIndex,
            q: value
        })
        return res.status(200).json({
            status: 200,
            message: 'Blogs found successfully',
            data: {
                blogs: blogs.hits.hits
            }
        })
    } catch (error) {
        next(error);
    }
}

async function addBlog(req, res, next) {
    try {
        const { title, author, text } = req.body;
        const createdResult = await elasticClient.index({
            index: blogIndex,
            document: {
                title,
                author,
                text,
            }
        })
        if(!createdResult || createdResult.result != 'created') throw createHttpError.BadRequest('Blog creation failed');
        return res.status(201).json({
            status: 201,
            message: 'Blog created successfully',
            data: {
                createdResult
            }
        })
    } catch (error) {
        next(error);
    }
}

async function removeBlog(req, res, next) {
    try {
        const {id} = req.params;
        const deleteResult = await elasticClient.deleteByQuery({
            index: blogIndex,
            query: {
                match: { _id: id }
            }
        })
        if(!deleteResult  || deleteResult.deleted == 0) throw createHttpError.BadRequest('Blog deletion failed');
        return res.status(200).json({
            status: 200,
            message: 'Blog deleted successfully'
        })
    } catch (error) {
        next(error);
    }
}

async function updateBlog(req, res, next) {
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key];
        })
        const blog = await elasticClient.search({
            index: blogIndex,
            query: {
                match: { _id: id }
            }
        }).hits.hits?.[0] || {};
        const payload = blog?._source || {};
        const updateResult = await elasticClient.index({
            index: blogIndex,
            id,
            body: { ...payload, ...data}
        })
        if(!updateResult  || updateResult.result != 'updated') throw createHttpError.BadRequest('Blog update failed');
        return res.status(200).json({
            status: 200,
            message: 'Blog updated successfully',
            data: {
                updateResult
            }
        })
    } catch (error) {
        next(error);
    }
}

async function updateBlogTypeTwo(req, res, next) {
    try {
        const {id} = req.params;
        const data = req.body;
        Object.keys(data).forEach(key => {
            if(!data[key]) delete data[key];
        });

        const updateResult = await elasticClient.update({
            index: blogIndex,
            id,
            doc: data
        })
        if(!updateResult  || updateResult.result != 'updated') throw createHttpError.BadRequest('Blog update failed');
        return res.status(200).json({
            status: 200,
            message: 'Blog updated successfully',
            data: {
                updateResult
            }
        })
    } catch (error) {
        next(error);
    }
}

async function findBlogByTitle(req, res, next) {
    try {
        
    } catch (error) {
        next(error);
    }
}

async function findBlogByMultiFields(req, res, next) {
    try {
        
    } catch (error) {
        next(error);
    }
}

async function findBlogByRegex(req, res, next) {
    try {
        
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllBlogs,
    addBlog,
    removeBlog,
    updateBlog,
    updateBlogTypeTwo,
    findBlogByTitle,
    findBlogByRegex
}
