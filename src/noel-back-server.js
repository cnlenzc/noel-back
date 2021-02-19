const { ok } = require('assert')
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5052

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/test', (req, res) => res.send({ test: 'ok', datetime: new Date() }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
