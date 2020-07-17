const express = require('express')

const promotionsRoute = express.Router()

promotionsRoute.get('/', (req, res) => {
    res.json({"promotions": []})
})

promotionsRoute.get('/:promoId', (req, res) => {
    res.json({"promotion": {id: req.params.promoId}})
})

promotionsRoute.post('/', (req, res) => {
    res.json({"newPromo": {...req.body}})
})

promotionsRoute.put('/:promoId', (req, res) => {
    res.json({"msg": `you updated obj with id -  ${req.params.promoId}`})
})

promotionsRoute.delete('/:promoId', (req, res) => {
    res.json({"msg": `obj with id - ${req.params.promoId} was deleted`})
})

module.exports = promotionsRoute
