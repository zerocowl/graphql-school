import Dataloader from 'dataloader'
import _ from 'lodash'

import Model from '../../models/school'

const batchSchool = async keys => {
  const schools = await Model.find({ name: { $in: keys } }).then(result => result)

  const schoolGroup = _.groupBy(schools, 'name')

  const data = keys.map(key => schoolGroup[key][0])

  return data
}

const SchoolLoader = new Dataloader(keys => batchSchool(keys))

export default SchoolLoader
