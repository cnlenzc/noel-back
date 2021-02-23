const express = require('express')

const { BadRequest, NotFound } = require('../utils/errors')
const mongo = require('../utils/mongo')

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    res.json({ test: 'ok', datetime: new Date() })
  } catch (error) {
    next(error)
  }
})

router.get('/mongo', async (req, res, next) => {
  try {
    res.json(await mongo.list('test'))
  } catch (error) {
    next(error)
  }
})

module.exports = router
