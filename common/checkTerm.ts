import { TaskDetail } from '~/types/'

const checkTerm = (tasks: TaskDetail[]) => {
  const now = new Date().getTime()

  const termCheckedTasks = tasks.map((item: TaskDetail) => {
    if (item.ended_ms === undefined) {
      return item
    }
    // TODO 調査:削除するたびにcheckTerm呼ばれてる
    if (item.ended_ms < now) {
      item.is_expired = true
    } else {
      item.is_expired = false
    }

    return item
  })

  return termCheckedTasks
}

export default checkTerm
