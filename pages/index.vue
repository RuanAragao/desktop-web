<template>
  <div class="desktop">
    <LauncherGrid :bootlist="apps" />
  </div>
</template>

<script>
import LauncherGrid from '@/components/launcher-grid.vue'
export default {
  components: {
    LauncherGrid,
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
}
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
