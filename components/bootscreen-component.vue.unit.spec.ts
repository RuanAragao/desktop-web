import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import BootscreenComponent from './bootscreen-component.vue'

const wrapper = mount(BootscreenComponent)

describe('Bootscreen Compoenent unit test', () => {
  test('should render', () => {
    expect(wrapper.vm).toBeDefined()
    expect(wrapper.find('.bootscreen__loading').exists()).toBe(true)
  })

  test('should render with loading start with 0 percent', () => {
    expect(wrapper.vm.loadingPercentage).toBe(0)
  })

  test('should render with loading percentage change percentage', () => {
    const wrapper = mount(BootscreenComponent, {
      propsData: {
        loadingPercentage: 42,
      },
    })

    expect(wrapper.vm.loadingPercentage).toBe(42)
  })
})
