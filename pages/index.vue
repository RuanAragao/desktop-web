<template>
  <div class="desktop">
    <LauncherGrid />
  </div>
</template>

<script>
export default {
  setup() {
    return {}
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
