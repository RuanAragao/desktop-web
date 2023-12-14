import { mount } from '@vue/test-utils'
import { describe, expect, test } from 'vitest'
import LauncherGrid, { type App } from './launcher-grid.vue'

const installedApps = [
  {
    name: 'Moo',
    slug: 'app-moo',
    icon: 'icon.png',
    command: 'echo "Hello world"',
  },
] as App[]

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
