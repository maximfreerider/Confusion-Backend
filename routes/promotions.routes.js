const express = require('express')
const Promotion = require('../models/promotion.model')

const promotionsRoutes = express.Router()

promotionsRoutes.route('/')
  .get( async (req, res, next) => {
    try {
      const promotions = await Promotion.find()
      res.json({promotions})
    } catch (error) {
      next(error)
    }
  })

  .post(async (req, res, next) => {
    try {
      const newPromotion = await Promotion.create(req.body)
      res.json(newPromotion).status(201)
    } catch (error) {
      next(error)
    }
  })

promotionsRoutes.route('/:promoId')
  .get(async (req, res) => {
    try {
      const promotion = await Promotion.findById(req.params.promoId)
      res.json(promotion)
    } catch (error) {
      next(error)
    }
  })

  .patch(async (req, res) => {
    const updatedPromotion = await Promotion.findByIdAndUpdate(req.params.promoId, {
      $set: req.body
    }, {new: true})
    res.json(updatedPromotion)
  })

  .delete(async (req, res) => {
    await Promotion.findByIdAndDelete(req.params.promoId)
    res.status(204)
  })

module.exports = promotionsRoutes
