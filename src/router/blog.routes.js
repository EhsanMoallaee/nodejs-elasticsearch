const { Router } = require('express');
const { addBlog, getAllBlogs, removeBlog, updateBlog, updateBlogTypeTwo, findBlogByTitle, findBlogByMultiFields, findBlogByRegex, findBlogByRegexMultiFields } = require('../controller/blog.controller');
const blogRouter = Router();

blogRouter.post('/add', addBlog);
blogRouter.get('/list/:value?', getAllBlogs); // with optional param
blogRouter.delete('/delete/:id', removeBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.patch('/update/:id', updateBlogTypeTwo);
blogRouter.get('/findByTitle', findBlogByTitle);
blogRouter.get('/multi-fields', findBlogByMultiFields);
blogRouter.get('/regexp-search', findBlogByRegex);
blogRouter.get('/regexp-multifields-search', findBlogByRegexMultiFields);

module.exports = {
    blogRouter
}