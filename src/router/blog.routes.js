const { Router } = require('express');
const { addBlog, getAllBlogs } = require('../controller/blog.controller');
const blogRouter = Router();

blogRouter.post('/add', addBlog);
blogRouter.get('/list/:value?', getAllBlogs); // with optional param

module.exports = {
    blogRouter
}