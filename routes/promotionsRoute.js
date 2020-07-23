const express = require('express')
const Promotion = require('../models/promotion.model')

const promotionsRoute = express.Router()

promotionsRoute.route('/')
  .get( async (req, res, next) => {
    const promotions = await Promotion.find()
    res.json({promotions})
  })

  .post(async (req, res, next) => {
    const newPromotion = await Promotion.create(req.body)
    res.json(newPromotion)
  })

promotionsRoute.route('/:promoId')
  .get(async (req, res) => {
    const promotion = await Promotion.findById(req.params.promoId)
    res.json(promotion)
  })

  .patch(async (req, res) => {
    res.json({"msg": `you updated obj with id -  ${req.params.promoId}`})
  })

  .delete((req, res) => {
    res.json({"msg": `obj with id - ${req.params.promoId} was deleted`})
  })

module.exports = promotionsRoute
