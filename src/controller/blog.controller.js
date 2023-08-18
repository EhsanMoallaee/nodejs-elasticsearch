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
        if(!blogs || blogs.length == 0) throw createHttpError.BadRequest('Blog not found');
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
        const blog = (await elasticClient.search({
            index: blogIndex,
            query: {
                match: { _id: id }
            }
        })).hits.hits?.[0] || [];
        if(!blog || blog.length == 0) throw createHttpError.BadRequest('Blog not found');
        const payload = blog?._source || {};
        const updateResult = await elasticClient.index({
            index: blogIndex,
            id,
            body: { ...payload, ...data}
        })
        if(!updateResult  || updateResult.result != 'updated') throw createHttpError.BadRequest('Blog update failed');
        return res.status(200).json({
            status: 200,
            message: 'Blog updated successfully'
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
        const { title } = req.query;
        if(!title || title.trim() == '') throw createHttpError.BadRequest('Search text can not be empty');
        const result = await elasticClient.search({
            index: blogIndex,
            query: {
                match: { title }
            }
        })
        const blogs = result.hits?.hits;
        if(!blogs || blogs.length == 0) throw createHttpError.BadRequest('Blog not found');
        return res.status(200).json({
            status: 200,
            message: 'Blog found successfully',
            data: {
                blogs
            }
        })
    } catch (error) {
        next(error);
    }
}

async function findBlogByMultiFields(req, res, next) {
    try {
        const { searchText } = req.query;
        if(!searchText || searchText.trim() == '') throw createHttpError.BadRequest('Search text can not be empty');
        const result = await elasticClient.search({
            index: blogIndex,
            query: {
                multi_match: { 
                    query: searchText,
                    fields: ['title', 'text']
                 }
            }
        })
        const blogs = result.hits?.hits;
        if(!blogs || blogs.length == 0) throw createHttpError.BadRequest('Blog not found');
        return res.status(200).json({
            status: 200,
            message: 'Blog found successfully',
            data: {
                blogs
            }
        })
    } catch (error) {
        next(error);
    }
}

async function findBlogByRegex(req, res, next) {
    try {
        const { searchText } = req.query;
        const result = await elasticClient.search({
            index: blogIndex,
            query: {
                regexp: { 
                    title: `.*${searchText}.*`
                 }
            }
        })
        const blogs = result.hits?.hits;
        if(!blogs || blogs.length == 0) throw createHttpError.BadRequest('Blog not found');
        return res.status(200).json({
            status: 200,
            message: 'Blog found successfully',
            data: {
                blogs
            }
        })
    } catch (error) {
        next(error);
    }
}

async function findBlogByRegexMultiFields(req, res, next) {
    try {
        const { searchText } = req.query;
        const result = await elasticClient.search({
            index: blogIndex,
            query: {
                bool: { 
                    should: [
                        { regexp: { title: `.*${searchText}.*` } },
                        { regexp: { text: `.*${searchText}.*` } },
                        { regexp: { author: `.*${searchText}.*` } },
                    ]
                 }
            }
        })
        const blogs = result.hits?.hits;
        if(!blogs || blogs.length == 0) throw createHttpError.BadRequest('Blog not found');
        return res.status(200).json(blogs)
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
    findBlogByRegex,
    findBlogByMultiFields,
    findBlogByRegexMultiFields
}
