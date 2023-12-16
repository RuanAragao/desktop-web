<template>
  <div
    class="mainb w-screen h-screen flex justify-center items-center bg-gradient-to-b from-blue-500 to-blue-800"
  >
    <div
      class="bootscreen w-72 flex flex-col items-center gap-8 p-8 rounded-xl"
    >
      <div class="bootscreen__logo w-48 h-48 rounded-md">
        <img src="/logo.png" alt="logo" class="w-full rounded-md" />
      </div>
      <div class="bootscreen__loading w-full h-2 bg-blue-200 rounded-full">
        <div
          :style="{ width: loadingPercentage + '%' }"
          class="bootscreen__loading__bar h-full text-center text-md text-white bg-gradient-to-r from-indigo-700 via-purple-500 to-pink-500 shadow-inner rounded-full"
        ></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'BootscreenComponent',
  props: {
    loadingPercentage: {
      type: Number,
      default: 0,
    },
  },
}
</script>

<style lang="scss">
.bootscreen {
  animation: bootscreen 0.3s ease-in-out;
  z-index: 1;

  &__loading__bar {
    transition: width 0.3s ease-in-out;
  }
}

.mainb::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    rgba(255 255 255 / 30%) 0%,
    rgba(255 255 255 / 0%) 60%
  );
  z-index: 0;
}

@keyframes bootscreen {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
