const express = require('express')

const { BadRequest, NotFound } = require('../utils/errors')
const mongo = require('../utils/mongo')

const router = express.Router()

router.post('/', async (req, res, next) => {
  try {
    if (!req.body.nome) {
      throw new BadRequest('nome não fornecido')
    }
    const ret = await mongo.add('contato', req.body)
    res.status(201).json(ret)
  } catch (error) {
    next(error)
  }
})

router.get('/', async (req, res, next) => {
  try {
    const ret = await mongo.list('contato')
    res.json(ret)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const ret = await mongo.get('contato', req.params.id)
    if (!ret.length) {
      throw new NotFound('informação não encontrada')
    }
    res.json(ret[0])
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const ret = await mongo.update('contato', req.params.id, req.body)
    if (!ret.matchedCount) {
      throw new NotFound('informação não encontrada')
    }
    res.json({ count: ret.modifiedCount })
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const ret = await mongo.del('contato', req.params.id)
    if (!ret.deletedCount) {
      throw new NotFound('informação não encontrada')
    }
    res.status(204).end()
  } catch (error) {
    next(error)
  }
})

module.exports = router
