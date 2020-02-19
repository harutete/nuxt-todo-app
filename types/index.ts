export interface TaskDetail {
  id: number | null,
  title: string | null,
  description: string | null,
  ended_date: string | null,
  status: string | null,
  tags: { [key: string]: string }[] | []
}

export interface TaskState {
  isLogin?: boolean,
  isLoading?: boolean,
  user?: string[] | null,
  tasks: TaskDetail[] | null,
  taskItem: TaskDetail
}
