<template>
  <div ref="windowRef" class="window bg-white rounded-lg shadow-lg">
    <header
      class="title-bar bg-gray-200 px-4 py-2 flex items-center justify-between rounded-t-lg"
      @mousedown.left.prevent="mousedownTitleBar"
      @touchstart.prevent="touchstartTitleBar"
    >
      <div class="title text-gray-800">{{ title }}</div>
      <div class="controls flex space-x-2">
        <button class="minimize w-4 h-4 bg-gray-400 rounded-full"></button>
        <button
          class="maximize w-4 h-4 bg-gray-400 rounded-full"
          @click.prevent="maximizeWindow"
          @touchend.prevent="maximizeWindow"
        ></button>
        <button
          class="close w-4 h-4 bg-gray-400 rounded-full"
          @click.prevent="onClose"
          @touchend.prevent="onClose"
        ></button>
      </div>
    </header>
    <div class="content">
      <slot></slot>
    </div>
    <div
      class="resize-handle bottom-right"
      @mousedown.prevent="startResize"
    ></div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'WindowComponent',
  props: {
    title: {
      type: String,
      default: 'Window',
    },
    onClose: {
      type: Function,
      default: () => {},
    },
    windowSize: {
      type: Object,
      default: () => ({
        width: 340,
        height: 230,
      }),
    },
  },

  data: () => ({
    dragging: false,
    resizing: false,
    initialMouseX: 0,
    initialMouseY: 0,
    initialWindowX: 0,
    initialWindowY: 0,
    initialWidth: 0,
    initialHeight: 0,
  }),

  mounted() {
    this.$refs.windowRef.style.width = `${this.windowSize.width}px`
    this.$refs.windowRef.style.height = `${this.windowSize.height}px`
  },

  methods: {
    // DnD
    mousedownTitleBar(event) {
      this.dragging = true

      // Store initial mouse position
      this.initialMouseX = event.clientX
      this.initialMouseY = event.clientY

      // Store initial window position
      this.initialWindowX = this.$refs.windowRef.offsetLeft
      this.initialWindowY = this.$refs.windowRef.offsetTop

      // Register mousemove and mouseup event listeners
      document.addEventListener('mousemove', this.dragWindow)
      document.addEventListener('mouseup', this.stopDrag)
    },
    touchstartTitleBar(event) {
      this.dragging = true

      // Store initial mouse position
      this.initialMouseX = event.touches[0].clientX
      this.initialMouseY = event.touches[0].clientY

      // Store initial window position
      this.initialWindowX = this.$refs.windowRef.offsetLeft
      this.initialWindowY = this.$refs.windowRef.offsetTop

      // Register mousemove and mouseup event listeners
      document.addEventListener('touchmove', this.touchDragWindow)
      document.addEventListener('touchend', this.touchStopDrag)
    },
    dragWindow(event) {
      // Calculate new window position based on mouse movement
      const newWindowX =
        this.initialWindowX + (event.clientX - this.initialMouseX)
      const newWindowY =
        this.initialWindowY + (event.clientY - this.initialMouseY)

      // Update window position
      this.$refs.windowRef.style.left = `${newWindowX}px`
      this.$refs.windowRef.style.top = `${newWindowY}px`
    },
    touchDragWindow(event) {
      // Calculate new window position based on mouse movement
      const newWindowX =
        this.initialWindowX + (event.touches[0].clientX - this.initialMouseX)
      const newWindowY =
        this.initialWindowY + (event.touches[0].clientY - this.initialMouseY)

      // Update window position
      this.$refs.windowRef.style.left = `${newWindowX}px`
      this.$refs.windowRef.style.top = `${newWindowY}px`
    },
    stopDrag() {
      // Remove mousemove and mouseup event listeners
      this.dragging = false
      document.removeEventListener('mousemove', this.dragWindow)
      document.removeEventListener('mouseup', this.stopDrag)
    },
    touchStopDrag() {
      // Remove mousemove and mouseup event listeners
      this.dragging = false
      document.removeEventListener('touchmove', this.touchDragWindow)
      document.removeEventListener('touchend', this.stopDrag)
    },
    startResize(event) {
      this.resizing = true
      this.initialMouseX = event.clientX
      this.initialMouseY = event.clientY
      this.initialWidth = this.$refs.windowRef.offsetWidth
      this.initialHeight = this.$refs.windowRef.offsetHeight

      document.addEventListener('mousemove', this.resizeWindow)
      document.addEventListener('mouseup', this.stopResize)
    },
    resizeWindow(event) {
      const newWidth = this.initialWidth + (event.clientX - this.initialMouseX)
      const newHeight =
        this.initialHeight + (event.clientY - this.initialMouseY)

      this.$refs.windowRef.style.width = `${newWidth}px`
      this.$refs.windowRef.style.height = `${newHeight}px`
    },
    stopResize() {
      this.resizing = false
      document.removeEventListener('mousemove', this.resizeWindow)
      document.removeEventListener('mouseup', this.stopResize)
    },
    // Window controls
    minimizeWindow() {
      // Minimize the window
      // if (this.$refs.windowRef.style.display === 'none') {
      //   this.$refs.windowRef.style.display = 'block'
      //   return
      // }
      // this.$refs.windowRef.style.display = 'none'
    },
    maximizeWindow() {
      if (this.$refs.windowRef.style.width === '100%') {
        this.$refs.windowRef.style.width = this.windowSize.width + 'px'
        this.$refs.windowRef.style.height = this.windowSize.height + 'px'
        return
      }
      this.$refs.windowRef.style.left = '50%'
      this.$refs.windowRef.style.top = '50%'
      this.$refs.windowRef.style.width = '100%'
      this.$refs.windowRef.style.height = '100%'
    },
    closeWindow() {
      onClose()
    },
  },
}
</script>

<style scoped>
.window {
  /* Window styles */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  overflow: hidden;
}

.title-bar {
  /* Title bar styles */
}

.title {
  /* Title styles */
}

.controls {
  /* Window controls styles */
}

.content {
  /* Window content styles */
  height: inherit;
  overflow: auto;
}

.resize-handle {
  /* Adiciona uma aparência de alça de redimensionamento */
  position: absolute;
  bottom: 0;
  right: 0;
  width: 16px;
  height: 16px;
  background-color: transparent;
  background-image: url('/box-resize.svg');
  border-radius: 0 0 4px;
  cursor: nwse-resize; /* Cursor de redimensionamento diagonal */
}
</style>
