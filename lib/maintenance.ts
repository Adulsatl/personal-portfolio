// Remove async/await completely
let isInMaintenanceMode = false

export function getMaintenanceStatus() {
  return isInMaintenanceMode
}

export function updateMaintenanceStatus(status) {
  isInMaintenanceMode = status
  return true
}
