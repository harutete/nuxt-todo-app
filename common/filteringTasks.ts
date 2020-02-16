const filteringTasks = (tasks: any, terms: string): any => {
  if (tasks === null) return

  const filteredTasks = tasks
    .filter((item: { [key: string]: any }) =>
      item.status === terms
    )

    console.log(filteredTasks)
  return filteredTasks
}
export default filteringTasks