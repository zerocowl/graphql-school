import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const studentSchema = new Schema({
  name: {
    type: String
  },
  age: {
    type: Number
  },
  maximum_grade: {
    type: Number
  }
})

const Model = mongoose.model('Student', studentSchema)
export default Model
