require('dotenv').config()

const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5052

const mongodb = require('mongodb')
const uri = process.env.MONGO_URI

async function testMongo() {
  const client = new mongodb.MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  await client.connect()
  const ret = await client.db("test").collection("test").find().toArray()
  client.close()
  return ret
}

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/test', (req, res) => res.json({ test: 'ok', datetime: new Date() }))
  .get('/test-mongo', async (req, res) => res.json(await testMongo()))
  .listen(PORT, () => console.log(`Listening on ${PORT}`))
