<template>
  <q-layout view="hHh lpR fFf">
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
  beforeMount () {
    this.$q.dark.set(true)
  }
}
</script>
