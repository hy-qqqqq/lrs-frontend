import moment from "moment"

export const headers = [
  { key: 'serialString', title: 'Serial No.'},
  { key: 'priority', title: 'Priority' },
  { key: 'factory', title: 'Fabrication' },
  { key: 'lab', title: 'Laboratory' },
  { key: 'createdAt', title: 'Create Time',
    sort: (a, b) => {
      return moment(a).diff(moment(b))
    }
  },
  { key: 'updatedAt', title: 'Update Time',
    value: item => {
      if (item.status == 'Issued') return item.createdAt
      else if (item.status == 'Approved' || item.status == 'Rejected') return item.approvedAt
      else return item.completedAt
    },
    sort: (a, b) => {
      return moment(a).diff(moment(b))
    }
  },
  { key: 'createdBy', title: 'Issuer'},
  { key: 'status', title: 'Status'},
]

export const dataTypes = {
  // { field: spec{ name: display } }
  'priority': {
    'regular': '一般',
    'urgent': '急單',
    'emergency': '特急單'
  },
  'factory': {
    'Fab A': 'Fab A',
    'Fab B': 'Fab B',
    'Fab C': 'Fab C'
  },
  'lab': {
    'chemical': '化學實驗室',
    'surface': '表面分析實驗室',
    'composition': '成分分析實驗室'
  },
  'status': {
    'Issued': 'Issued',
    'Approved': 'Approved',
    'Completed': 'Completed',
    'Rejected': 'Rejected'
  }
}
