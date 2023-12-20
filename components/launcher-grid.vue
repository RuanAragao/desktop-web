<template>
  <span class="overflow-hidden h-full">
    <draggable
      v-model="loadedApps"
      class="max-h-screen h-screen flex flex-col p-2 content-start flex-wrap"
      ghost-class="ghost"
      item-key="pid"
      @start="dragging = true"
      @end="dragging = false"
    >
      <template #item="{ element }">
        <AppLauncher
          v-bind="element"
          role="button"
          tabindex="0"
          :disabled="dragging"
          @click.prevent="() => openApp(element)"
          @touchend.prevent="() => openApp(element)"
          @keydown.enter.prevent="() => openApp(element)"
        />
      </template>
    </draggable>
    <WindowComponent
      v-for="app in runningApps"
      :key="app.pid"
      :title="app.name"
      :on-close="() => runningApps.splice(runningApps.indexOf(app), 1)"
    >
      <component :is="app.app" />
    </WindowComponent>
  </span>
</template>

<script lang="ts">
import { defineAsyncComponent, ref, markRaw } from 'vue'
import draggable from 'vuedraggable'
import AppLauncher from '@/components/app-launcher.vue'
import WindowComponent from '@/components/window-component.vue'
import type { Application } from '@/types'

let pidCounter = 1

export default {
  name: 'LauncherGrid',
  components: {
    AppLauncher,
    WindowComponent,
    draggable,
  },

  props: {
    bootlist: {
      type: Array as () => Application[],
      required: true,
    },
  },

  setup(props) {
    const installedApps = ref([] as Application[])
    installedApps.value = props.bootlist

    return {
      installedApps,
    }
  },

  data() {
    return {
      loadedApps: [] as Application[],
      runningApps: [] as Application[],
      dragging: false as boolean,
    }
  },

  async mounted() {
    this.loadedApps = await Promise.all(
      this.installedApps.map(
        async (app) =>
          await {
            ...app,
            icon: new URL(`/applications/${app.slug}/icon.png`, import.meta.url)
              .href,
            app: markRaw(
              defineAsyncComponent(
                () => import(`~/applications/${app.slug}/index.vue`),
              ),
            ),
          },
      ),
    )
  },

  methods: {
    openApp(app: Application) {
      const pid = pidCounter++
      const appInstance = { ...app, pid }
      this.runningApps.push(appInstance)
    },
  },
}
</script>
