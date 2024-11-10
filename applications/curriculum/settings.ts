import defineApplication from '@/utils/define-application'

export default defineApplication({
  name: 'Curriculum',
  version: '1.0.0',
  description: 'Curriculum Vitae',
  author: 'Ruan',
  main: 'index.vue',
  slug: 'curriculum',
  icon: 'icon.png',
  command: "echo 'Hello World'",
  windowSize: {
    width: 800,
    height: 600,
  },
})
