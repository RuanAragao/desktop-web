<template>
  <div>
    <input v-model="command" @keydown.enter="executeCommand" />
    <pre>{{ output }}</pre>
  </div>
</template>

<script>
export default {
  name: 'XTerm',
  data() {
    return {
      command: '',
      output: '',
    }
  },
  methods: {
    executeCommand() {
      // Execute the command and update the output
      // You can replace this with your own logic
      this.output += `$ ${this.command}\n`
      this.command = ''
    },
  },
}
</script>
