import createFetchMock from 'vitest-fetch-mock'
import { beforeEach, describe, expect, test, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Main from './index.vue'
import type { App } from '~/components/launcher-grid.vue'

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
] as App[]

// const appsJson = JSON.stringify(apps)
// console.log(appsJson)

const fetchMocker = createFetchMock(vi)
// fetchMocker.enableMocks()

describe('Main page integrations', () => {
  beforeEach(() => {
    // fetchMocker.resetMocks()
    // fetchMocker.doMock()
  })

  test('Should mount Main page', () => {
    const wrapper = mount(Main)
    expect(wrapper.exists()).toBe(true)
  })

  test('Should load applications on list', async () => {
    // fetchMocker.mockResponseOnce(JSON.stringify(apps))
    // fetchMocker.mockResponse(appsJson)
    fetchMocker.dontMock()

    // fetchMock.enableMocks()
    // vi.fn()
    //   .mockResolvedValue({
    //     ok: true,
    //     text: () => {
    //       return Promise.resolve(appsJson);
    //     },
    //   })
    // global.fetch = vi.fn().mockResolvedValue({
    //   ok: true,
    //   text: () => {
    //     return Promise.resolve(appsJson);
    //   },
    // })

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
