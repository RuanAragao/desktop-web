<template>
  <div class="flex flex-col">
    <div class="flex justify-center items-center p-8">
      <img
        src="/Avatar.jpg"
        alt="Ruan Aragão Illustration"
        class="Avatar w-44 h-44"
      />
    </div>
    <div class="flex flex-col text-center">
      <h1 class="text-title text-gray-900 text-3xl font-bold">Web Desktop</h1>
      <p class="text-gray-700 text-md">My professional website</p>
    </div>
    <div class="flex flex-col">
      <p>Version: {{ version }}</p>
    </div>
    <div class="flex flex-col text-center">
      <a
        href="https://github.com/RuanAragao/desktop-web"
        class="bg-slate-200 border border-slate-300 text-slate-700 rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-slate-300 focus:outline-none focus:shadow-outline"
        >Mais informações...</a
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      version: '0.2.5',
    }
  },
}
</script>
