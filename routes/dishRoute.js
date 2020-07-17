const express = require('express')
const Dishes = require('../models/dish.model')
const Comment = require('../models/comment.model')

const dishRouter = express.Router()

dishRouter.route('/')
  .get(async (req, res) => {
    const dishes = await Dishes.find()
    res.json({"dishes": dishes})
  })
  .post( async (req, res, next) => {
    try {
      const newDish = await Dishes.create(req.body)
      console.log(req.body)
      res.json({"newDish": newDish})
    } catch (e) {
      next(e)
      console.log(e)
    }
  })

dishRouter.route('/:dishId')
  .get(async (req, res) => {
    const dish = await Dishes.findById(req.params.dishId)
    res.json(dish)
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
      res.json({"msg": `dish with id - ${id} was deleted`})
    } catch (e) {
      next(e)
      console.log(e)
    }
  })

dishRouter.route('/:dishId/comments')
  .post(async (req, res, next) => {
    const id = req.params.dishId
    const dish = await Dishes.findById(id)
    const comment = await Comment.create(req.body)
    console.log('created comment - ', comment)
    if (dish != null) {
      dish.comments.push(comment._id)
      await dish.save()
      res.status(201)
    } else {
      res.json({"msg": `comments for dish with id - ${req.params.dishId} not found`})
      return next()
    }
  })

module.exports = dishRouter
