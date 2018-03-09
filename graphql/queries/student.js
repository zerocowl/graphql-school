import {
  GraphQLList,
  GraphQLObjectType,
  GraphQLString
} from 'graphql'

import studentType from '../types/student'
import Model from '../../models/school'

export const studentQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      student: {
        type: studentType,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (root, args, { loaders }) => loaders.student.load(args.name)
      },
      students: {
        type: new GraphQLList(studentType),
        resolve: (root, args) => Model.find().then(res => {
          let result = []
          res.forEach(list => {
            list.students.forEach(student => {
              result.push(student)
            })
          })
          return result
        })
      }
    }
  }
})
