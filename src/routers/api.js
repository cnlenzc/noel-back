const express = require('express')

const router = express.Router()

router
  .use('/contato', require('./contato'))

module.exports = router
