const express = require('express')

const router = express.Router()

router
  .use('/contato', require('./contato'))
  .use('/produto', require('./produto'))

module.exports = router
