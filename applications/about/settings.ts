import defineApplication from '@/utils/define-application'

export default defineApplication({
  name: 'About',
  version: '1.0.0',
  description: 'About this project',
  author: 'Ruan',
  main: 'index.vue',
  slug: 'about',
  icon: 'icon.png',
  command: "echo 'Hello World'",
  windowSize: {
    width: 300,
    height: 460,
  },
})
