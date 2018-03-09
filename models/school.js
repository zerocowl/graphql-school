import mongoose from 'mongoose'
import { studentSchema } from './student'
const Schema = mongoose.Schema

export const schoolSchema = new Schema({
  name: {
    type: String
  },
  city: {
    type: String
  },
  students: {
    type: [studentSchema]
  }
})

const Model = mongoose.model('School', schoolSchema)
export default Model
