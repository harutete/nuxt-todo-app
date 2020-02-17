import { TaskDetail } from '~/types/'

const filteringTasks = (tasks: TaskDetail[], terms: string): TaskDetail[] => {
  const filteredTasks = tasks
    .filter((item: { [key: string]: any }) =>
      item.status === terms
    )

    console.log(filteredTasks)
  return filteredTasks
}
export default filteringTasks