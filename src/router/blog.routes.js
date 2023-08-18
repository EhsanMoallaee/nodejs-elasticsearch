const { Router } = require('express');
const { addBlog, getAllBlogs, removeBlog } = require('../controller/blog.controller');
const blogRouter = Router();

blogRouter.post('/add', addBlog);
blogRouter.get('/list/:value?', getAllBlogs); // with optional param
blogRouter.delete('/delete/:id', removeBlog);

module.exports = {
    blogRouter
}