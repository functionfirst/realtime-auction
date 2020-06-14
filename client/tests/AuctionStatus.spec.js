import { shallowMount, createLocalVue } from '@vue/test-utils'
import AuctionStatus from '@/components/AuctionStatus.vue'

const localVue = createLocalVue()

const factory = (propsData) => {
  return shallowMount(AuctionStatus, {
    propsData
  })
}

describe('AuctionStatus.vue', () => {
  it('auction has a pending status', () => {
    const cmp = factory({
      hasStarted: false,
      hasFinished: false
    })
    expect(cmp.vm.status.label).toBe("Pending")
    expect(cmp.vm.status.colour).toBe("blue")
    expect(cmp.find('div').text()).toBe("Pending")
    expect(cmp.find('div').classes()).toContain('bg-blue-300')
  })

  it('auction has a live status', () => {
    const cmp = factory({
      hasStarted: true,
      hasFinished: false
    })

    expect(cmp.vm.status.label).toBe("Live")
    expect(cmp.vm.status.colour).toBe("green")
    expect(cmp.find('div').text()).toBe("Live")
    expect(cmp.find('div').classes()).toContain('bg-green-300')
  })

  it('auction has an expired status', () => {
    const cmp = factory({
      hasStarted: true,
      hasFinished: true
    })

    expect(cmp.vm.status.label).toBe("Expired")
    expect(cmp.vm.status.colour).toBe("red")
    expect(cmp.find('div').text()).toBe("Expired")
    expect(cmp.find('div').classes()).toContain('bg-red-300')
  })

  it('auction has an expired status ', () => {
    const cmp = factory({
      hasStarted: false,
      hasFinished: true
    })

    expect(cmp.vm.status.label).toBe("Expired")
    expect(cmp.vm.status.colour).toBe("red")
    expect(cmp.find('div').text()).toBe("Expired")
    expect(cmp.find('div').classes()).toContain('bg-red-300')
  })
})
