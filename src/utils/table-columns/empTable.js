/**
 * @type {Array<{field, label, sortable: boolean, visible: boolean, date?: boolean}>()}
 */
export const empTableCols = [
  { field: 'id', label: 'Emp Id', sortable: true, visible: true },
  { field: 'name', label: 'Name', sortable: true, visible: true },
  { field: 'phoneNumber', label: 'Mobile', sortable: true, visible: true },
  { field: 'gender', label: 'Gender', sortable: true, visible: false },
  { field: 'dateOfBirth', label: 'DOB', sortable: true, visible: false, date: true },
  { field: 'married', label: 'Marital Status', sortable: true, visible: false },
  { field: 'designation', label: 'Designation', sortable: true, visible: false },
  { field: 'department', label: 'Department', sortable: true, visible: true },
  { field: 'reportsToName', label: 'Reports To', sortable: true, visible: true },
  { field: 'location', label: 'Location', sortable: true, visible: true },
  { field: 'municipality', label: 'Municipality', sortable: true, visible: true },
  { field: 'city', label: 'City', sortable: true, visible: false },
  { field: 'state', label: 'State', sortable: true, visible: false },
  { field: 'userName', label: 'Username', visible: true },
  { field: 'password', label: 'Password', visible: true },
  { field: 'createdByName', label: 'Created By', sortable: true, visible: false },
  { field: 'createdDateTime', label: 'Created On', sortable: true, visible: false, date: true },
  { field: 'updatedByName', label: 'Updated By', sortable: true, visible: false },
  { field: 'updatedDateTime', label: 'Updated On', sortable: true, visible: false, date: true }
]
