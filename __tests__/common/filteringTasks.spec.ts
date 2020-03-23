import { TaskDetail } from '~/types'
import filteringTasks from '~/common/filteringTasks'
import stubTaskData from '~/__tests__/stub/stubTaskData.json'

const taskData: TaskDetail[] = stubTaskData
describe('filteringTasks', () => {
  it('ended_msが生成されている', () => {
    console.log(taskData)
    const filteredTasks: TaskDetail[] = filteringTasks(taskData, 'before')

    filteredTasks.forEach((task) => {
      expect(task.ended_ms).not.toBe('undefined')
    })
  })
})