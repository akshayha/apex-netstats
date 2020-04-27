export function setLocation (state, payload) {
  state.location = payload
}

export function setSelectedIP (state, payload) {
  state.selected_ip = payload
}

export function setConnectedIPs (state, payload) {
  state.connected_ips = payload
}

export function setIPStoreLoading (state, payload) {
  state.ipstore_loading = payload
}

export function setLocationError (state, payload) {
  state.location_error = payload
}

export function setMapCenter (state, payload) {
  state.map_center = payload
}

export function setApexServers (state, payload) {
  state.apex_servers = payload
}

export function apexServerListLoading (state, payload) {
  state.server_list_loading = payload
}
