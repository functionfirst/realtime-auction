import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AuctionList from '@/components/AuctionList.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const storeMock = Object.freeze({
  state: {
    auctions: [{
      name: 'Dummy Auction'
    }]
  },
  actions: {
    getAuctions: jest.fn().mockName('getAuctions')
  },
})

describe('AuctionList.vue', () => {
  let options
  let cmp

  beforeEach(() => {
    jest.clearAllMocks()
    const store = new Vuex.Store(storeMock)
    options = { store, localVue }
    cmp = shallowMount(AuctionList, options)
  })

  it('dispatches action "getAuctions" when component is mounted', () => {
    expect(storeMock.actions.getAuctions).toHaveBeenCalled()
  })

  it('gets auction list from state', () => {
    const expected = [{ name: 'Dummy Auction' }]
    expect(storeMock.state.auctions).toEqual(expect.arrayContaining(expected))
  })

  it('gets auction list from computed prop', () => {
    const expected = [{ name: 'Dummy Auction' }]
    cmp.setProps(storeMock.state.auctions)

    expect(cmp.vm.auctions).toEqual(expect.arrayContaining(expected))
  })
})
