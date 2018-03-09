import { GraphQLNonNull, GraphQLString } from 'graphql'

import schoolType from '../types/school'
import Model from '../../models/school'

const add = {
  type: schoolType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
    city: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params) {
    const uModel = new Model(params)
    const newschool = uModel.save()
    if (!newschool) {
      throw new Error('Error')
    }
    return newschool
  }
}

const updateName = {
  type: schoolType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    },
    name: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params) {
    return Model.findByIdAndUpdate(
      params.id,
      { $set: { name: params.name } },
      { new: true }
    ).catch(err => new Error(err))
  }
}

const remove = {
  type: schoolType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLString)
    }
  },
  resolve (root, params) {
    const removeschool = Model.findByIdAndRemove(params.id).exec()
    if (!removeschool) {
      throw new Error('Error')
    }
    return removeschool
  }
}

export default {
  remove,
  add,
  updateName
}
