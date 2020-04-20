<template>
  <q-card
    dark
    bordered
    class="bg-grey-9 q-ma-lg"
    style="min-width:700px"
  >
    <q-card-section>
      <q-input
        filled
        dark
        standout="bg-grey-8"
        v-model="ipaddress"
        @keyup.enter="ipupdate()"
      >
        <template v-slot:after>
          <q-btn
            round
            dense
            flat
            @click="ipupdate()"
            icon="mdi-send"
          />
        </template>
      </q-input>
    </q-card-section>
    <q-card-section>
      <div class="text-h8">
        Network Info
      </div>
    </q-card-section>

    <q-separator
      dark
      inset
    />
    <q-card-section v-if="ipstore_loading">
      <q-spinner-dots
        color="primary"
        size="6em"
      />
    </q-card-section>
    <q-card-section v-else-if="location_error">
      Invalid Input!
    </q-card-section>
    <q-card-section v-else>
      <q-list
        bordered
        separator
      >
        <q-item>
          <q-item-section>IPv4: {{ location.ipv4 }}</q-item-section>
        </q-item>
        <q-item>
          <q-item-section>{{ location.city_name }}, {{ location.subdivision_1_name }}, {{ location.country_name }}</q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
    <q-card-section>
      <q-card>
        <div
          id="map"
        >
          <l-map

            :zoom="zoom"
            :center="map_center"
          >
            <l-tile-layer
              :url="url"
              :attribution="attribution"
            />
            <l-marker :lat-lng="map_center" />
          </l-map>
        </div>
      </q-card>
    </q-card-section>
    <q-card-section>
      <line-chart
        v-if="dataCollection"
        style="max-height:250px"
        :chart-data="dataCollection"
        :options="options"
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { LMap, LTileLayer, LMarker } from 'vue2-leaflet'
import L from 'leaflet'
import ping from 'ping'
import 'leaflet/dist/leaflet.css'
import LineChart from '../../helpers/LineChart.js'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LineChart
  },
  data () {
    return {
      ipaddress: '',
      zoom: 8,
      url: 'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>  contributors',
      ping_frequency: 3,
      ping_array: new Array(10),
      dataCollection: null,
      options: {
        maintainAspectRatio: false,
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            ticks: {
              display: false
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }],
          yAxes: [{
            height: '100px',
            ticks: {
              beginAtZero: true
            },
            gridLines: {
              color: 'rgba(0, 0, 0, 0)'
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapState('ipstore', ['selected_ip', 'location', 'connected_ips', 'ipstore_loading', 'location_error', 'map_center'])
  },
  methods: {
    ...mapActions('ipstore', ['setLocation', 'setSelectedIP', 'setConnectedIPs', 'getLocationInfo', 'setMapCenter']),
    ipupdate () {
      this.setSelectedIP(this.ipaddress)
      this.getLocationInfo()
    },
    fillData () {
      this.dataCollection = {
        labels: new Array(10),
        datasets: [{
          backgroundColor: 'rgba(200, 200, 200, 0.7)',
          data: this.ping_array
        }]
      }
    }
  },
  mounted () {
    this.getLocationInfo()
    var thisInstance = this
    setInterval(() => {
      ping.promise.probe(this.selected_ip, {
        timeout: 10
      }).then(function (res) {
        thisInstance.ping_array.push(res.time)
        if (thisInstance.ping_array.length >= 10) { thisInstance.ping_array.shift() }
        thisInstance.fillData()
      })
    }, thisInstance.ping_frequency * 1000)
    delete L.Icon.Default.prototype._getIconUrl
    // eslint-disable-next-line
    L.Icon.Default.mergeOptions({  
      iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
      iconUrl: require('leaflet/dist/images/marker-icon.png'),
      shadowUrl: require('leaflet/dist/images/marker-shadow.png')
    })
  }

}
</script>

<style>
#map{
    height:200px;
    width:100%;
}
</style>
