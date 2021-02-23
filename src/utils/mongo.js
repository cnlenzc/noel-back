const { MongoClient, ObjectId } = require('mongodb')

const MONGO_URI = process.env.MONGO_URI
const MONGO_DB = process.env.MONGO_DB

const conn = {
  client: null,
  db: null
}

async function connect() {
  try {
    if (!conn.db) {
      conn.client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      await conn.client.connect()
      conn.db = conn.client.db(MONGO_DB)
    }
    return conn.db
  } catch (error) {
    console.error('mongo', `Erro no connect`, error)
    throw error
  }
}

async function add(table, content) {
  const db = await connect()
  const res = await db.collection(table).insertOne(content)
  return { _id: res.insertedId }
}

async function list(table) {
  const db = await connect()
  return db.collection(table).find().toArray()
}

async function get (table, id) {
  const db = await connect()
  return db.collection(table).find({ _id: ObjectId(id) }).toArray()
}

async function del (table, id) {
  const db = await connect()
  return db.collection(table).deleteOne({ _id: ObjectId(id) })
}

async function update (table, id, content) {
  const db = await connect()
  return db.collection(table).updateOne({ _id: ObjectId(id) }, { $set: content })
}

module.exports = {
  add,
  del,
  get,
  list,
  update
}
