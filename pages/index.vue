<template>
  <div class="desktop">
    <BootscreenComponent
      v-if="!isLoaded"
      :loading-percentage="loadedTotal"
      :class="startFinish ? 'finish' : ''"
    />
    <component :is="LauncherGrid" v-else :bootlist="apps" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { ApplicationsGatewayHttp } from '@/services/applicationsGatewayHttp'
import LauncherGrid, { type App } from '@/components/launcher-grid.vue'
import BootscreenComponent from '@/components/bootscreen-component.vue'

const apps = ref<App[]>([])
const isLoaded = ref(false)
const startFinish = ref(false)

const loadedTotal = ref(0)
const loadedProcesses = ref(0)

const processesList = ['LOAD_APPS'] as const

const processesCompleted = reactive<string[]>([])

const bootLoadingProgress = () => {
  const loadingInterval = setInterval(() => {
    if (processesCompleted.length < processesList.length) {
      loadedProcesses.value += 1
    } else {
      clearInterval(loadingInterval)
    }
  }, 10)
}

watch(processesCompleted, () => {
  loadedTotal.value = Math.round(
    (processesCompleted.length / processesList.length) * 100,
  )
  if (loadedTotal.value === 100) {
    const finishBootScreen = () => {
      const finishTimeout = setTimeout(() => {
        if (!startFinish.value) {
          startFinish.value = true
          finishBootScreen()
        }
        isLoaded.value = true
        clearTimeout(finishTimeout)
      }, 400)
    }

    finishBootScreen()
  }
})

bootLoadingProgress()

const fetchApps = async () => {
  try {
    const data = await getApplicationsData()
    apps.value = data.apps
    processesCompleted.push('LOAD_APPS')
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

.finish {
  animation: finish 0.3s ease-in-out;
}

@keyframes finish {
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
}
</style>
