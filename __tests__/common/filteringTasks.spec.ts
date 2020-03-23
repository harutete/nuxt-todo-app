import { TaskDetail } from '~/types'
import filteringTasks from '~/common/filteringTasks'
import stubTaskData from '~/__tests__/stub/stubTaskData.json'

const taskData: TaskDetail[] = stubTaskData
let filteredTasks: TaskDetail[]
describe('filteringTasks', () => {
  it('ended_msが生成されている', () => {
    filteredTasks = filteringTasks(taskData, 'before')

    filteredTasks.forEach((task) => {
      expect(task.ended_ms).not.toBe('undefined')
    })
  })
  it('指定したステータスのタスクのみフィルタリングされている', () => {
    filteredTasks = filteringTasks(taskData, 'before')

    filteredTasks.forEach((task) => {
      expect(task.status).not.toBe('running')
      expect(task.status).not.toBe('done')
    })
  })
  it('期限日の昇順にソートされている', () => {
    const altTaskData = taskData.map((item, index) => {
      if (item.ended_ms === undefined) return item

      return {
        ...item,
        status: 'before',
        ended_ms: item.ended_ms + (1000 * index)
      }
    })

    for (let i = 0; i > altTaskData.length; i++) {
      const currentEndedMs = altTaskData[i].ended_ms
      const nextEndedMs = altTaskData[i + 1].ended_ms as number
      expect(currentEndedMs).toBeLessThan(nextEndedMs)
    }
  })
})