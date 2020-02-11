interface TaskDetail {
  id: number,
  title: string,
  description: string,
  ended_date: string,
  status: string,
  tags: { [key: string]: string }[]
}

export interface TaskState {
  isLogin?: boolean,
  isLoading?: boolean,
  user?: string[] | null
  tasks: TaskDetail[] | null
}
