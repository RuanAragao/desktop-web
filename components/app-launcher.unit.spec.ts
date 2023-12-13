import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLauncher from './app-launcher.vue'

test('should render AppLauncher', () => {
  const icon = new URL(`/applications/app-launcher/icon.png`, import.meta.url)
    .href
  const props = {
    name: 'App Launcher' as string,
    slug: 'app-launcher' as string,
    icon,
    command: 'echo "Hello world"' as string,
  }

  const wrapper = mount(AppLauncher, { props })

  expect(wrapper.find('figure').exists()).toBe(true)
  expect(wrapper.find('img').attributes('src')).toBe(props.icon)
  expect(wrapper.find('figcaption').text()).toBe('App Launcher')
})
