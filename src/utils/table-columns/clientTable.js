/**
 * @type {Array<{field, label, sortable: boolean, visible: boolean, date?: boolean}>()}
 */
export const clientTableCols = [
  { field: 'id', label: 'Client Id', sortable: true, visible: true },
  { field: 'name', label: 'Name', sortable: true, visible: true },
  { field: 'phoneNumber', label: 'Mobile', sortable: true, visible: true },
  { field: 'gender', label: 'Gender', sortable: true, visible: true },
  { field: 'dateOfBirth', label: 'DOB', sortable: true, visible: true, date: true },
  { field: 'married', label: 'Marital Status', sortable: true, visible: true },
  { field: 'address', label: 'Address', sortable: true, visible: true },
  { field: 'location', label: 'Location', sortable: true, visible: true },
  { field: 'municipality', label: 'Municipality', sortable: true, visible: true },
  { field: 'city', label: 'City', sortable: true, visible: false },
  { field: 'state', label: 'State', sortable: true, visible: false },
  { field: 'createdByName', label: 'Created By', sortable: true, visible: false },
  { field: 'createdDateTime', label: 'Created On', sortable: true, visible: false, date: true },
  { field: 'updatedByName', label: 'Updated By', sortable: true, visible: false },
  { field: 'updatedDateTime', label: 'Updated On', sortable: true, visible: false, date: true }
]
