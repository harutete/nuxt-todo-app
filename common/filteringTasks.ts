import { TaskDetail } from '~/types/'

const filteringTasks = (tasks: TaskDetail[], terms: string): TaskDetail[] => {
  const filteredTasks = tasks
    .filter((item: TaskDetail) =>
      item.status === terms
    )
    .sort((a: any , b: any): number =>
      a.ended_date.seconds * 1000 - b.ended_date.seconds * 1000 // 値が秒単位で返却されるためミリ秒に変換
    )

  return filteredTasks
}
export default filteringTasks