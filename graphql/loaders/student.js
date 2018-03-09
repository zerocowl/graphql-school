import Dataloader from 'dataloader'
import _ from 'lodash'

import Model from '../../models/school'

const batchStudent = async keys => {
  const students = await Model.find({ 'students.name': { $in: keys } }).then(res => {
    let result = []
    res.forEach(list => {
      list.students.forEach(student => {
        result.push(student)
      })
    })
    return result
  })

  const studentGroup = _.groupBy(students, 'name')

  const data = keys.map(key => studentGroup[key][0])

  return data
}

const StudentLoader = new Dataloader(keys => batchStudent(keys))

export default StudentLoader
