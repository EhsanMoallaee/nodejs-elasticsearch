const { Router } = require('express');
const { addBlog, getAllBlogs, removeBlog, updateBlog } = require('../controller/blog.controller');
const blogRouter = Router();

blogRouter.post('/add', addBlog);
blogRouter.get('/list/:value?', getAllBlogs); // with optional param
blogRouter.delete('/delete/:id', removeBlog);
blogRouter.put('/update/:id', updateBlog);

module.exports = {
    blogRouter
}