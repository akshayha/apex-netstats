<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-bar class="q-electron-drag bg-black text-white">
        <q-icon
          size="1.3rem"
          name="mdi-nintendo-game-boy"
        />
        <div>Apex Netstats</div>

        <q-space />

        <q-btn
          dense
          flat
          color="green-8"
          icon="minimize"
          @click="minimize"
        />
        <q-btn
          dense
          flat
          color="blue-9"
          icon="crop_square"
          @click="maximize"
        />
        <q-btn
          dense
          flat
          color="red-9"
          icon="mdi-close-thick"
          @click="closeApp"
        />
      </q-bar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-page-sticky
      position="top-left"
      :offset="[18, 18]"
    >
      <q-btn
        round
        push
        icon="mdi-home"
        color="grey-9"
        to="/"
      />
    </q-page-sticky>
    <q-page-sticky
      position="top-right"
      :offset="[18, 18]"
    >
      <q-btn
        round
        push
        icon="mdi-cog"
        color="grey-9"
        to="/settings"
      />
    </q-page-sticky>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    minimize () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().minimize()
      }
    },

    maximize () {
      if (process.env.MODE === 'electron') {
        const win = this.$q.electron.remote.BrowserWindow.getFocusedWindow()

        if (win.isMaximized()) {
          win.unmaximize()
        } else {
          win.maximize()
        }
      }
    },

    closeApp () {
      if (process.env.MODE === 'electron') {
        this.$q.electron.remote.BrowserWindow.getFocusedWindow().close()
      }
    }
  },
  beforeMount () {
    this.$q.dark.set(true)
  }
}
</script>
