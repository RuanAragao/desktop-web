<template>
  <div class="flex flex-col w-full h-full">
    <VPdfViewer src="/docs/curriculo.pdf" />
  </div>
</template>

<script setup>
  import { VPdfViewer } from '@vue-pdf-viewer/viewer'
</script>
