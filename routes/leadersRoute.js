const express =require('express')

const leaderRoute = express.Router()

leaderRoute.get('/', (req, res) => {
    res.json({"leaders": []})
})

leaderRoute.get('/:leaderId', (req, res) => {
    res.json({"leaders": {id: req.params.leaderId}})
})

leaderRoute.post('/', (req, res) => {
    res.json({"newLeader": {...req.body}})
})

leaderRoute.put('/:leaderId', (req, res) => {
    res.json({"msg": `you updated obj with id -  ${req.params.leaderId}`})
})

leaderRoute.delete('/:leaderId', (req, res) => {
    res.json({"msg": `leader with id - ${req.params.leaderId} was deleted`})
})

module.exports = leaderRoute
