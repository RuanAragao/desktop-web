import { describe, expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Main from './index.vue'
import type { Application } from '@/types'

const apps = [
  {
    name: 'About',
    version: '1.0.0',
    description: 'About this project',
    author: 'Ruan',
    main: 'index.vue',
    slug: 'about',
    icon: 'icon.png',
    command: 'about',
  },
] as Application[]

describe('Main page integrations', () => {
  test('Should mount Main page', () => {
    const wrapper = mount(Main)
    expect(wrapper.exists()).toBe(true)
  })

  test('Should load applications on list', async () => {
    const wrapper = mount(Main, {
      setup() {
        return {
          apps,
        }
      },
    })

    await new Promise((resolve) => setTimeout(resolve, 0))
    await wrapper.vm.$nextTick()
    await wrapper.vm.$nextTick()

    // console.log(wrapper.vm.apps)
    expect(wrapper.vm.apps).toHaveLength(apps.length)
  })
})
