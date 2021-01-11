/**
 * @type {Array<{field, label, sortable: boolean, visible: boolean, date?: boolean}>()}
 */
export const adminTableCols = [
  { field: 'id', label: 'Admin Id', sortable: true, visible: true },
  { field: 'name', label: 'Name', sortable: true, visible: true },
  { field: 'phoneNumber', label: 'Mobile', sortable: true, visible: true },
  { field: 'designation', label: 'Designation', sortable: true, visible: true },
  { field: 'department', label: 'Department', sortable: true, visible: true },
  { field: 'reportsToName', label: 'Reports To', sortable: true, visible: true },
  { field: 'location', label: 'Location', sortable: true, visible: true },
  { field: 'municipality', label: 'Municipality', sortable: true, visible: true },
  { field: 'city', label: 'City', sortable: true, visible: true },
  { field: 'state', label: 'State', sortable: true, visible: true },
  { field: 'createdByName', label: 'Created By', sortable: true, visible: false },
  { field: 'createdDateTime', label: 'Created On', sortable: true, visible: false, date: true },
  { field: 'updatedByName', label: 'Updated By', sortable: true, visible: false },
  { field: 'updatedDateTime', label: 'Updated On', sortable: true, visible: false, date: true }
]
