import { expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLauncher from './app-launcher.vue'

it('can render AppLauncher', () => {
    const wrapper = mount(AppLauncher, {
      props: {
        name: 'App Launcher' as string,
        slug: 'app-launcher' as string,
        icon: new URL(`/applications/app-launcher/icon.png`, import.meta.url).href,
        command: 'echo "Hello world"',
      }
    })

    expect(wrapper.find('figure').exists()).toBe(true)
    expect(wrapper.find('img').attributes('src')).toBe('file:///applications/app-launcher/icon.png')
    expect(wrapper.find('figcaption').text()).toBe('App Launcher')
})
