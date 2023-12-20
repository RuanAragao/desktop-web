<template>
  <div id="terminal"></div>
</template>

<script lang="ts">
import { Terminal } from 'xterm'
import 'xterm/css/xterm.css'

export default {
  name: 'XTerm',
  data() {
    return {
      command: '',
      output: '',
    }
  },

  mounted() {
    const term = new Terminal({
      cursorBlink: true,
      rows: 30,
      cols: 100,
      theme: {
        background: '#000',
        foreground: '#fff',
      },
    })

    term.open(document.getElementById('terminal') as HTMLElement)

    term.write('ghost \x1B[1;3;31mxterm\x1B[0m $ ')
  },

  methods: {},
}
</script>

<style scoped>
#terminal {
  height: 100%;
  width: 100%;
}
</style>
