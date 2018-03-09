import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from 'graphql'

import studentType from './student'

const SchoolType = new GraphQLObjectType({
  name: 'school',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    city: {
      type: GraphQLString
    },
    students: {
      type: new GraphQLList(studentType)
    }
  })
})

export default SchoolType
