import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import AuctionList from '@/components/AuctionList.vue'

const localVue = createLocalVue()

localVue.use(Vuex)

const storeMock = Object.freeze({
  state: {},
  actions: {
    getAuctions: jest.fn().mockName('getAuctions')
  },
})

describe('AuctionList.vue', () => {
  let options

  beforeEach(() => {
    jest.clearAllMocks()
    const store = new Vuex.Store(storeMock)
    options = { store, localVue }
  })

  it('dispatches action "getAuctions" when component is mounted', () => {
    shallowMount(AuctionList, options)
    expect(storeMock.actions.getAuctions).toHaveBeenCalled()
  })
})
