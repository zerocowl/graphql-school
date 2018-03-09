let env = process.env.NODE_ENV || 'development'
let config = require('./config')[env]
let mongoose = require('mongoose')

module.exports = function () {
  mongoose.Promise = Promise
  let db = mongoose.connect(config.db, { useMongoClient: true })
  mongoose.connection
    .on('error', function () {
      // err callback
      console.log(
        'Error: Could not connect to MongoDB. Did you forget to run `mongod`?'
          .red
      )
    })
    .on('open', function () {
      console.log('Connection extablised with MongoDB')
    })
  if (env === 'development') {
    mongoose.set('debug', (collectionName, method, query, doc) => {
      console.info(`${collectionName}.${method}`, doc) // eslint-disable-line no-console
    })
  }
  return db
}
