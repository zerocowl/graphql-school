import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql'
import Model from '../../models/school'
import SchoolType from '../types/school'

export const schoolQueryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => {
    return {
      school: {
        type: SchoolType,
        args: {
          name: { type: GraphQLString }
        },
        resolve: (root, args, { loaders }) => loaders.school.load(args.name)
      },
      schools: {
        type: new GraphQLList(SchoolType),
        resolve: (root, args) => Model.find(args).then(result => result)
      }
    }
  }
})
