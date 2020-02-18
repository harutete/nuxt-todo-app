import { TaskDetail } from '~/types/'

const filteringTasks = (tasks: TaskDetail[], terms: string): TaskDetail[] => {
  const filteredTasks = tasks
    .filter((item: TaskDetail) =>
      item.status === terms
    )

  return filteredTasks
}
export default filteringTasks