import { TaskDetail } from '~/types/'

const filteringTasks = (tasks: TaskDetail[], terms: string): TaskDetail[] => {
  const filteredTasks = tasks
    .map((item: TaskDetail) => {
      const period = item.ended_date.seconds
      item.ended_ms = period * 1000
      return item
    })
    .filter((item: TaskDetail) =>
      item.status === terms
    )
    .sort((a: any , b: any): number =>
      a.ended_ms - b.ended_ms
    )

  return filteredTasks
}
export default filteringTasks