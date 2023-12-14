import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import Main from './index.vue'

test('Should mount Main page', () => {
  const wrapper = mount(Main)
  expect(wrapper.exists()).toBe(true)
})
