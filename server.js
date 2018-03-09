import express from 'express'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'
import bodyParser from 'body-parser'
import compression from 'compression'
import StundentLoader from './graphql/loaders/student'
import SchoolLoader from './graphql/loaders/school'
import cors from 'cors'
import schema from './graphql/schema'
import { Engine } from 'apollo-engine'
const mongoose = require('./config/mongoose')
const db = mongoose()

const GRAPHQL_PORT = 4000
const ENGINE_API_KEY = '' // KEY

const engine = new Engine({
  engineConfig: {
    apiKey: ENGINE_API_KEY
  },
  graphqlPort: GRAPHQL_PORT
})

engine.start()

const graphQLServer = express()
const loaders = {
  student: StundentLoader,
  school: SchoolLoader
}
const helperMiddleware = [
  bodyParser.json(),
  bodyParser.text({ type: 'application/graphql' }),
  (req, res, next) => {
    if (req.is('application/graphql')) {
      req.body = { query: req.body }
    }
    next()
  }
]

graphQLServer.use(engine.expressMiddleware())
graphQLServer.use('*', cors())
graphQLServer.use(compression())
graphQLServer.use('/graphql',
  ...helperMiddleware,
  graphqlExpress({
    schema,
    graphiql: true,
    tracing: false,
    context: {
      loaders
    }
  })
)

graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
)
