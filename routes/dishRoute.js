const express = require('express')
const Dishes = require('../models/dish.model')
const Comment = require('../models/comment.model')

const dishRouter = express.Router()

dishRouter.route('/')
  .get(async (req, res, next) => {
    try {
      const dishes = await Dishes.find().populate('comments')
      res.json({"dishes": dishes})
    } catch (e) {
      next(e)
    }
  })
  .post( async (req, res, next) => {
    try {
      const newDish = await Dishes.create(req.body)
      res.json(newDish).status(201)
    } catch (e) {
      next(e)
      console.log(e)
    }
  })

dishRouter.route('/:dishId')
  .get(async (req, res, next) => {
    try {
      const dish = await Dishes.findById(req.params.dishId)
      res.json(dish)
    } catch (e) {
      next(e)
    }
  })

  .patch(async (req, res, next) => {
    try {
      const updatedDish = await Dishes.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
      }, {new: true})
      res.json(updatedDish)
    } catch (e) {
      next(e)
      console.log(e)
    }
  })

  .delete(async (req, res, next) => {
    try {
      await Dishes.findByIdAndDelete(id)
      res.status(204)
    } catch (e) {
      next(e)
    }
  })

dishRouter.route('/:dishId/comments')
  .post(async (req, res, next) => {
    const id = req.params.dishId
    const dish = await Dishes.findById(id)
    const comment = await Comment.create(req.body)
    console.log('created comment - ', comment)
    if (dish != null) {
      // await dish.populate('comments').push(comment._id)
      dish.comments.push(comment._id)
      await dish.save()
      res.status(201).json(dish)
    } else {
      res.json({"msg": `comments for dish with id - ${req.params.dishId} not found`}).status(404)
      return next()
    }
  })

module.exports = dishRouter
