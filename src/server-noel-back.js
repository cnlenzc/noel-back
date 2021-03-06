require('dotenv').config()

const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const express = require('express')
const path = require('path')

const handleErrors = require('./middlewares/handleErrors')
const routerApi = require('./routers/api')
const routerTest = require('./routers/test')

express()
  .use(cors())
  .use(compression())
  .use(bodyParser.json({ limit: '10mb' }))
  .use(express.static(path.join(__dirname, '../public')))
  .use('/api', routerApi)
  .use('/test', routerTest)
  .use(handleErrors)
  .listen(process.env.PORT, () => console.log(`Listening on http://localhost:${process.env.PORT}`))
