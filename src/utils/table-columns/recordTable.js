/**
 * @type {Array<{field, label, sortable: boolean, visible: boolean, date?: boolean}>()}
 */
export const recordTableCols = [
  { field: 'recordId', label: 'Record Id', sortable: true, visible: true },
  { field: 'clientId', label: 'Client Id', sortable: true, visible: true },
  { field: 'clientName', label: 'Client', sortable: true, visible: true },
  { field: 'employeeId', label: 'Emp Id', sortable: true, visible: true },
  { field: 'employeeName', label: 'Employee', sortable: true, visible: true },
  { field: 'municipality', label: 'Municipality', sortable: true, visible: true },
  { field: 'location', label: 'Location', sortable: true, visible: true },
  { field: 'scannedDateTime', label: 'Scanned On', sortable: true, visible: true, date: true, withTime: true }
]
