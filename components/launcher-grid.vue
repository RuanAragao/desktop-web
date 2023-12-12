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
          @click.prevent="() => openApp(element)"
          @touchend.prevent="() => openApp(element)"
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
import { defineAsyncComponent } from 'vue'
import draggable from 'vuedraggable'
import AppLauncher from '~/components/app-launcher.vue'
import WindowComponent from '~/components/window-component.vue'

let pidCounter = 1

type App = {
  name: string
  icon: string
  slug: string
  app: () => Promise<typeof import('*.vue')>
  command: string
  pid?: number
}

export default {
  name: 'LauncherGrid',
  components: {
    AppLauncher,
    WindowComponent,
    draggable,
  },

  setup() {
    return {
      apps: [
        {
          name: 'About',
          slug: 'about',
          command: 'run application.about',
        },
        {
          name: 'xTerm',
          slug: 'xterm',
          command: 'run application.xterm',
        },
      ],
    }
  },

  data() {
    return {
      loadedApps: [] as App[],
      runningApps: [] as App[],
      dragging: false as boolean,
    }
  },

  async mounted() {
    this.loadedApps = await Promise.all(
      this.apps.map(
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
    openApp(app: App) {
      const pid = pidCounter++
      const appInstance = { ...app, pid }
      this.runningApps.push(appInstance)
    },
  },
}
</script>
