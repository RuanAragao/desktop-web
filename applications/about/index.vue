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
      <p class="text-gray-700 text-xl">My professional website</p>
    </div>
    <div class="flex flex-col mt-2">
      <div class="flex flex-row justify-center gap-2">
        <span class="text-gray-700 text-md font-medium">Version</span>
        <span class="text-gray-700 text-md">{{ version }}</span>
      </div>
    </div>
    <div class="flex flex-row justify-center text-center mt-2">
      <a
        href="https://github.com/RuanAragao/desktop-web"
        target="_blank"
        tabindex="0"
        class="bg-slate-200 w-fit border border-slate-300 text-sm text-slate-700 rounded-md px-4 py-1 m-2 transition duration-500 ease select-none hover:bg-slate-300 focus:outline-none focus:shadow-outline"
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
