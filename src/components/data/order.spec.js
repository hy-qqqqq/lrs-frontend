import moment from "moment"

export const headers1 = [
  // TODO: worker id pattern, ex: tsmc-faba-0001
  'Serial No.',   // String: serialString
  'Priority',     // Select: regular, urgent, emergency
  'Fabrication',  // Select: Fab A, Fab B, Fab C
  'Lab',          // Select: chemical, surface, composition
  'Start Time',   // String: createdAt (timestamp)
  'Update Time',  // String: (timestamp)
  'Issuer',       // String: createdBy (userID)
  'Status',       // Select: Issued (gray), Approved (yellow), Completed (green), Rejected (red)
  'Action'        // Button: Edit
]

export const headers = [
  { key: 'serialString', title: 'Serial no.'},
  { key: 'priority', title: 'Priority' },
  { key: 'factory', title: 'Fabrication' },
  { key: 'lab', title: 'Laboratory' },
  { key: 'createdAt', title: 'Create time',
    sort: (a, b) => {
      return moment(a).diff(moment(b))
    }
  },
  { key: 'updatedAt', title: 'Update time',
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
  { key: 'action', title: 'Action', sortable: false }
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
