export default function () {
  return {
    ipstore_loading: false,
    server_list_loading: false,
    location_error: false,
    connected_ips: [],
    selected_ip: '',
    location: {},
    map_center: [0, 0],
    apex_servers: []
  }
}
