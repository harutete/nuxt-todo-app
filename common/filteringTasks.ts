const filteringTasks = (tasks: { [key: string]: any }[], terms: string): { [key: string]: any }[] => {
  const filteredTasks = tasks
    .filter((item: { [key: string]: any }) =>
      item.status === terms
    )

    console.log(filteredTasks)
  return filteredTasks
}
export default filteringTasks