import { TaskDetail } from '~/types/'

const checkTerm = (tasks: TaskDetail[]) => {
  const now = new Date().getTime()

  const termCheckedTasks = tasks.map((item: TaskDetail) => {
    console.log(new Date(item.ended_ms))
    if (item.ended_ms < now) {
      console.log(item.ended_ms)
      item.is_expired = true
    } else {
      item.is_expired = false
    }

    return item
  })
  return termCheckedTasks
}

export default checkTerm