import https from 'https'

import L from 'leaflet'

export function setLocation ({ commit }, payload) {
  commit('setLocation', payload)
}

export function setSelectedIP ({ commit }, payload) {
  commit('setSelectedIP', payload)
}

export function setConnectedIPs ({ commit }, payload) {
  commit('setConnectedIPs', payload)
}

export async function getLocationInfo ({ state, commit, dispatch }) {
  commit('setIPStoreLoading', true)
  https.get(`https://ipvigilante.com/${state.selected_ip}`, (resp) => {
    var json = ''
    resp.on('data', function (chunk) {
      json += chunk
    })
    resp.on('end', () => {
      var loc = JSON.parse(json)
      if (loc.status === 'success') {
        commit('setLocationError', false)
        commit('setLocation', loc.data)

        dispatch('setMapCenter', L.latLng(state.location.latitude, state.location.longitude))
      } else {
        commit('setLocationError', true)
      }
      commit('setIPStoreLoading', false)
    })
  })
}

export function setMapCenter ({ state, commit }, payload) {
  commit('setMapCenter', payload)
}
