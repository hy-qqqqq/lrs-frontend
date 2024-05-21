import moment from 'moment'

export const filter = {
  formatDate(value, fmtStr = 'MMMM Do YYYY, hh:mm:ss a') {
    return moment.utc(value).format(fmtStr)
  }
}