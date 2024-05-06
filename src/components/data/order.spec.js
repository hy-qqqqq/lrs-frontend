export const columns = [
  // TODO: serial no pattern
  // TODO: worker id pattern, ex: tsmc-faba-0001
  'Serial No.',   // String: serialNo
  'Priority',     // Select: 一般, 急單, 特急單
  'Fabrication',  // Select: Fab A, Fab B, Fab C
  'Lab',          // Select: 化學實驗室, 表面分析實驗室, 成分分析實驗室
  'Start Time',   // String: createdAt (timestamp)
  'End Time',     // String: completedAt (timestamp)
  'Issuer',       // String: createdBy (userID)
  'Status',       // Select: Issued (gray), Approved (yellow), Completed (green), Rejected (red)
  'Actions'       // Button: Attachment, Edit, Delete
]

// TODO: temporary mock data, need to remove later
export const data = [
  {
    serialNo: '0001',
    priority: '一般',
    factory: 'Fab A',
    lab: '化學實驗室',
    status: 'Issued',
    filePath: '',
    createdAt: '2024-05-02T09:30:26',
    createdBy: 'tsmc-0001',
    approvedAt: '2024-05-02T09:30:26',
    approvedBy: 'tsmc-0002',
    completedAt: '2024-05-02T09:30:26',
    completedBy: 'tsmc-0003'
  },
  {
    serialNo: '0002',
    priority: '特急',
    factory: 'Fab B',
    lab: '表面分析實驗室',
    status: 'Approved',
    filePath: '',
    createdAt: '2024-05-02T09:30:26',
    createdBy: 'tsmc-0001',
    approvedAt: '2024-05-02T09:30:26',
    approvedBy: 'tsmc-0002',
    completedAt: '2024-05-02T09:30:26',
    completedBy: 'tsmc-0003'
  },
  {
    serialNo: '0003',
    priority: '急件',
    factory: 'Fab C',
    lab: '成分分析實驗室',
    status: 'Rejected',
    filePath: '',
    createdAt: '2024-05-02T09:30:26',
    createdBy: 'tsmc-0001',
    approvedAt: '2024-05-02T09:30:26',
    approvedBy: 'tsmc-0002',
    completedAt: '2024-05-02T09:30:26',
    completedBy: 'tsmc-0003'
  },
  {
    serialNo: '0004',
    priority: '急件',
    factory: 'Fab C',
    lab: '成分分析實驗室',
    status: 'Completed',
    filePath: '',
    createdAt: '2024-05-02T09:30:26',
    createdBy: 'tsmc-0001',
    approvedAt: '2024-05-02T09:30:26',
    approvedBy: 'tsmc-0002',
    completedAt: '2024-05-02T09:30:26',
    completedBy: 'tsmc-0003'
  },
]