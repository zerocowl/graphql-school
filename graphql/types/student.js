import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLFloat
} from 'graphql'

const StudentType = new GraphQLObjectType({
  name: 'student',
  fields: () => ({
    name: {
      type: GraphQLString
    },
    age: {
      type: GraphQLInt
    },
    maximum_grade: {
      type: GraphQLFloat
    }
  })
})

export default StudentType
