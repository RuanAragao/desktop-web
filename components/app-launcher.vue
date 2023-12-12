<template>
  <figure class="launcher flex flex-col items-center w-24 h-32 py-2 gap-1">
    <img class="flex mx-2 w-[64px] rounded" :src="icon" alt="icon" />
    <figcaption class="px-1 w-full text-center text-gray-900 dark:text-white">
      {{ name }}
    </figcaption>
  </figure>
</template>

<script lang="ts">
export default {
  name: 'AppLauncher',
  props: {
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: '/launcher-ico.png',
    },
    slug: {
      type: String,
      required: true,
    },
    command: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
figure {
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

figure:hover {
  transform: scale(1.1);
}
</style>
