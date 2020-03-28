import { TaskDetail } from '~/types'
import checkTerm from '~/common/checkTerm'
import stubTaskData from '~/__tests__/stub/stubTaskData.json'

const taskData: TaskDetail[] = stubTaskData
describe('checkTerm', () => {
  it('ended_msがundefinedの場合はitemを返す', () => {
    const altTaskData = taskData.map(task => {
      return {
        ...task,
        ended_ms: undefined
      }
    })
    const checkData = checkTerm(altTaskData)
    checkData.forEach((task, index) => {
      expect(task).toEqual(altTaskData[index])
    })
  })
})