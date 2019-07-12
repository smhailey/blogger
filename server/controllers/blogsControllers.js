import express from 'express'
import _blogsService from '../services/blogsService'

export default class BlogController {

  async getAllBlogs(req, res, next) {
    try {
      let blogs = await _blogsService.find()
      res.send(blogs)
    } catch (error) {
      next(error)
    }
  }

  async getBlogsBySlug(req, res, next) {
    try {
      if (!req.query.slug) {
        return next()
      }
      let blogs = await _blogsService.find({ slug: { $in: [req.query.slug] } })
      if (!req.query.slug) {
        return res.status(400).send("No blog with that title")
      }
      res.send(blogs)
    } catch (error) { next(error) }
  }

  async getBlogsByTag(req, res, next) {
    try {
      if (!req.query.tags) {
        return next()
      }
      let blogs = await _blogsService.find({ tags: { $in: [req.query.tags] } })
      if (!req.query.tags) {
        return res.status(400).send("No blog with that tag")
      }
      res.send(blogs)
    } catch (error) { next(error) }
  }

  async getOneBlogById(req, res, next) {
    try {
      let blog = await _blogsService.findById(req.params.blogId)
      if (!blog) {
        return res.status(400).send("Blog not found.")
      }
      res.send(blog)
    } catch (error) { next(error) }
  }

  async createBlog(req, res, next) {
    try {
      let blog = await _blogsService.create(req.body)
      res.send(blog)
    } catch (error) { next(error) }
  }

  async editBlogById(req, res, next) {
    try {
      let editedBlog = await _blogsService.findByIdAndUpdate(req.params.blogId, req.body, { new: true })
      res.send(editedBlog)
    } catch (error) { next(error) }
  }

  async deleteBlogById(req, res, next) {
    try {
      let deleteBlog = await _blogsService.findByIdAndDelete(req.params.blogId)
      res.send("Blog Delorted")
    } catch (error) { next(error) }
  }

  constructor() {
    this.router = express.Router()
      //NOTE Retrieve all blogs:
      .get('', this.getAllBlogs)
      //NOTE Retrieve blogs by query for title(slug):
      .get('', this.getBlogsBySlug)
      //NOTE Retrieve all blogs by query for a tag:
      .get('', this.getBlogsByTag)
      //NOTE Retrieve a blog by id:
      .get('/:blogId', this.getOneBlogById)
      //NOTE Create a blog:
      .post('', this.createBlog)
      //NOTE Edit a blog by id:
      .put('/:blogId', this.editBlogById)
      //NOTE Delete a blog by id:
      .delete('/:blogId', this.deleteBlogById)
  }
}