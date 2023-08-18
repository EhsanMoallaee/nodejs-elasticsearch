const { Router } = require('express');
const { addBlog, getAllBlogs, removeBlog, updateBlog, updateBlogTypeTwo, findBlogByTitle, findBlogByMultiFields } = require('../controller/blog.controller');
const blogRouter = Router();

blogRouter.post('/add', addBlog);
blogRouter.get('/list/:value?', getAllBlogs); // with optional param
blogRouter.delete('/delete/:id', removeBlog);
blogRouter.put('/update/:id', updateBlog);
blogRouter.patch('/update/:id', updateBlogTypeTwo);
blogRouter.get('/findByTitle', findBlogByTitle);
blogRouter.get('/multi-fields', findBlogByMultiFields);

module.exports = {
    blogRouter
}