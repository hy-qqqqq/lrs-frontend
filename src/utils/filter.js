import moment from 'moment';
export const filter = {
  formatDate(value, fmtStr = 'MMMM Do YYYY, h:mm:ss a') {
    return moment(value).format(fmtStr);
  }
}