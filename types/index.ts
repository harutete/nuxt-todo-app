export interface TaskDetail {
  id: number | null,
  title: string | null,
  description: string | null,
  ended_date: { seconds: number, nanoseconds: number } | null,
  status: string | null,
  tags: { [key: string]: string }[] | [],
  is_expired?: boolean,
  ended_ms?: number
}

export interface IndexState {
  isLogin?: boolean,
  isLoading?: boolean,
  user?: string[] | null,
  tasks: TaskDetail[] | null,
  taskItem: TaskDetail
}
