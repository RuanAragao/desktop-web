import { expect, test } from 'vitest'
import { mount } from '@vue/test-utils'
import WindowComponent from './window-component.vue'

const findByRef = (wrapper: any, ref: string) => wrapper.find({ ref })

test('should render window component', () => {
  const props = {
    title: 'Window' as string,
    onClose: () => {},
  }

  const wrapper = mount(WindowComponent, { props })

  const windowRef = findByRef(wrapper, 'windowRef')

  expect(windowRef.exists()).toBe(true)
  expect(wrapper.find('header').text()).toBe(props.title)
  expect(wrapper.find('button.close').exists()).toBe(true)
  expect(wrapper.find('button.maximize').exists()).toBe(true)
  expect(wrapper.find('button.minimize').exists()).toBe(true)
})
