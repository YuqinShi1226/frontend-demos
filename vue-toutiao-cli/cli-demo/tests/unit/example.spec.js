import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
// import HelloWorld from '@/components/HelloWorld.vue'
import Tab from '@/components/tab.vue'

describe('HelloWorld.vue', () => {
  it('test if tab is properly rendered', () => {
    const wrapper = shallowMount(Tab, {
      propsData: { 
        innerTabs: [
          {
            title: '123',
            key: 123
          },
          {
            title: '222',
            key: 2222
          }
        ]
      }
    })
    expect(wrapper.contains('.item')).to.equal(true)
  })
})
