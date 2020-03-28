import { TaskDetail } from '~/types'
import checkTerm from '~/common/checkTerm'
import stubTaskData from '~/__tests__/stub/stubTaskData.json'

const taskData: TaskDetail[] = stubTaskData
let now: {[key: string]: any}
let year: number
let month: number
let day: number
describe('checkTerm', () => {
  describe('ended_msが付与されていない', () => {
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
  describe('ended_msが付与されている', () => {
    beforeEach(() => {
      now = new Date()
      year = now.getFullYear()
      month = now.getMonth()
      day = now.getDate()
    })
    it('ended_msが現在時刻より前の場合は{is_expired: true}を含めたデータが返却される', () => {
      const beforeDay = day - 1
      const beforeDate = new Date(year, month, beforeDay).getTime()
      const altTaskData = taskData.map(task => {
        return {
          ...task,
          ended_ms: beforeDate
        }
      })
      const checkData = checkTerm(altTaskData)
      checkData.forEach((task) => {
        expect(task.is_expired).toBeTruthy()
      })
    })
    it('ended_msが現在時刻より後の場合は{is_expired: false}を含めたデータが返却される', () => {
      const afterDay = day + 1
      const afterDate = new Date(year, month, afterDay).getTime()
      const altTaskData = taskData.map(task => {
        return {
          ...task,
          ended_ms: afterDate
        }
      })
      const checkData = checkTerm(altTaskData)
      checkData.forEach((task) => {
        expect(task.is_expired).toBeFalsy()
      })
    })
  })
})