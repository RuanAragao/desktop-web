<template>
  <div class="desktop">
    <!-- <LauncherGrid :bootlist="apps" /> -->
    <span v-if="!isLoaded">Loading...</span>
    <component :is="LauncherGrid" v-else :bootlist="apps" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ApplicationsGatewayHttp } from '@/services/applicationsGatewayHttp'
import LauncherGrid, { type App } from '@/components/launcher-grid.vue'

const apps = ref<App[]>([])
const isLoaded = ref(false)

const fetchApps = async () => {
  try {
    const data = await getApplicationsData()
    apps.value = data.apps
    isLoaded.value = true
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

const getApplicationsData = async () => {
  return await ApplicationsGatewayHttp()
}

onMounted(async () => {
  await fetchApps()
})
</script>

<style>
html {
  position: fixed;
  height: 100%;
  width: 100%;
  overflow: hidden;
}

* {
  box-sizing: border-box;
  user-select: none;
}

.desktop {
  height: 100vh;
  width: 100vw;
  background: url('/bg.png') no-repeat center center fixed;
  background-size: cover;
}
</style>
