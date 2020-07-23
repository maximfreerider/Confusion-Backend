const express = require('express')
const Leader = require('../models/leaders.model')

const leaderRoute = express.Router()

leaderRoute.route('/')
  .get(async (req, res) => {
    const leaders = await Leader.find()
    res.json({leaders})
  })
  .post(async (req, res) => {
    const newLeader = await Leader.create(req.body)
    res.json(newLeader).status(201)
  })


leaderRoute.route('/:leaderId')
  .get(async (req, res) => {
    const leader = await Leader.findById(req.params.leaderId)
    res.json(leader)
  })

  .patch(async (req, res) => {
    const updatedLeader = await Leader.findByIdAndUpdate(req.params.leaderId, {
      $set: req.body
    }, {new: true})
    res.json(updatedLeader)
  })

  .delete(async (req, res) => {
    try {
      await Leader.deleteOne({_id: req.params.leaderId})
      console.log('deleted')
      res.status(204)
    } catch (error) {
      console.log(error)
    }
  })

module.exports = leaderRoute
