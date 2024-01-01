import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LauncherGrid from './launcher-grid.vue'
import type { Application } from '@/types'

const installedApps = [
  {
    name: 'About',
    version: '1.0.0',
    description: 'About this project',
    author: 'Ruan',
    main: 'index.vue',
    slug: 'about',
    icon: 'icon.png',
    command: "echo 'Hello World'",
  },
] as Application[]

const props = {
  bootlist: installedApps,
}

const wrapper = mount(LauncherGrid, { props })

describe('components/launcher-grid.unit.spec.ts', () => {
  test('Should LauncherGrid component is initialized with a list of applications', () => {
    expect(wrapper.vm.installedApps).toEqual(installedApps)
  })

  test('Should all installed apps is rendered successfully', () => {
    expect(wrapper.findAll('figure').length).toBe(1)
  })
})
