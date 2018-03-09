import { mergeSchemas } from 'graphql-tools'
import { GraphQLSchema, GraphQLObjectType } from 'graphql'

import { studentQueryType } from './queries/student'
import { schoolQueryType } from './queries/school'

import mutationsSchool from './mutations/school'

const studentSchema = new GraphQLSchema({
  query: studentQueryType
})

const schoolSchema = new GraphQLSchema({
  query: schoolQueryType,
  mutation: new GraphQLObjectType({
    name: 'MutationsSchool',
    fields: () => ({ ...mutationsSchool })
  })
})

const schema = mergeSchemas({
  schemas: [
    schoolSchema,
    studentSchema
  ]
})

export default schema
