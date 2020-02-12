import Vue from 'vue'

const dateFormat = (date: number, format: string): string => {
  const d = new Date(date * 1000)
  const year = d.getFullYear().toString()
  const month = (d.getMonth() + 1).toString()
  const day = d.getDate().toString()
  const hour = d.getHours().toString()
  const minute = d.getMinutes().toString()
  let formatDateText = format

  formatDateText = formatDateText.replace(/YYYY/, year)
  formatDateText = formatDateText.replace(/MM/, month)
  formatDateText = formatDateText.replace(/DD/, day)
  formatDateText = formatDateText.replace(/hh/, hour)
  formatDateText = formatDateText.replace(/mm/, minute)

  return formatDateText
}

Vue.prototype.$dateFormat = dateFormat