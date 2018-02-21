import { shallow, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import Dentist from '@/components/Dentist/Index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

let store

const state = {
  isActive: true,
  item: {
    name: 'Cristina Yuri Shigenaga',
    cro: '44765',
    providerType: 'Consultório Isolado - Odontológico Pessoa Física',
    phone: '(11) 2041-0821',
    specialties: [
      {
        type: 'consultation',
        title: 'Clínico Geral'
      },
      {
        type: 'surgery',
        title: 'Cirurgia'
      },
      {
        type: 'pediatric-dentistry',
        title: 'Odontopediatria'
      }
    ],
    address: {
      postcode: '03881-170',
      city: 'São Paulo',
      state: 'SP',
      description: 'Rua Sargento Evangelista, 05 SL 02',
      neighborhood: 'Ponte Rasa'
    },
    scheduleUrl: 'https://redeunna.boaconsulta.com/silvio-rogerio-falcao-monteiro?utm_source=odontoprev&utm_medium=button&utm_campaign=silvio-rogerio-falcao-monteiro'
  },
  color: '#1974ce'
}

const getters = {
  isActive: state => state.isActive,
  item: state => state.item,
  color: state => state.color
}

describe('default', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        dentist: {
          namespaced: true,
          state: state,
          getters: getters
        }
      },
      strict: false
    })
  })

  it('name correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const titleEl = wrapper.find('.qa-dentist__title')

    expect(titleEl.text()).toEqual(`Dr(a). ${state.item.name}`)
  })

  it('info correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const textEl = wrapper.find('.qa-dentist__info')
    const text = textEl.text()

    expect(text).toEqual(expect.stringContaining(state.item.cro))
    expect(text).toEqual(expect.stringContaining(state.item.providerType))
  })

  it('specialties correctly rendered', () => {
    const wrapper = mount(Dentist, {
      store,
      localVue
    })
    const itemsEl = wrapper.find('.qa-dentist__specialties__items')
    const specialties = state.item.specialties.map(i => i.title).join(' ')

    expect(itemsEl.text()).toEqual(specialties)
  })

  it('address correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const addressEl = wrapper.findAll('.qa-dentist__address__info')
    const text = addressEl.at(0).text()

    expect(text).toEqual(expect.stringContaining(state.item.address.description))
    expect(text).toEqual(expect.stringContaining(state.item.address.neighborhood))
  })

  it('postcode correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const addressEl = wrapper.findAll('.qa-dentist__address__info')
    const text = addressEl.at(1).text()

    expect(text).toEqual(expect.stringContaining(state.item.address.postcode))
  })

  it('city and state correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const addressEl = wrapper.find('.qa-dentist__address__info--last')
    const text = addressEl.text()

    expect(text).toEqual(expect.stringContaining(state.item.address.city))
    expect(text).toEqual(expect.stringContaining(state.item.address.state))
  })

  it('phone correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const contactEl = wrapper.find('.qa-dentist__contact__info')

    expect(contactEl.text()).toEqual(state.item.phone)
  })

  it('scheduleUrl correctly rendered', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })

    const consultEl = wrapper.find('.qa-dentist__boaconsulta')
    expect(consultEl.exists()).toBe(true)

    const anchorEl = wrapper.find('.qa-dentist__boaconsulta > a')
    expect(anchorEl.attributes().href).toEqual(state.item.scheduleUrl)
  })
})

describe('schedule anchor', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        dentist: {
          namespaced: true,
          state: Object.assign({}, state, {
            item: Object.assign({}, state.item, {
              scheduleUrl: ''
            })
          }),
          getters: getters
        }
      },
      strict: false
    })
  })

  it('does not render schedule anchor when url of schedule in store as empty', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const consultEl = wrapper.find('.qa-dentist__boaconsulta')

    expect(consultEl.exists()).toBe(false)
  })
})

describe('does not render', () => {
  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        dentist: {
          namespaced: true,
          state: Object.assign({}, state, {
            isActive: false
          }),
          getters: getters
        }
      },
      strict: false
    })
  })

  it('does not render when not active in store', () => {
    const wrapper = shallow(Dentist, {
      store,
      localVue
    })
    const dentistEl = wrapper.find('.qa-dentist')

    expect(dentistEl.exists()).toBe(false)
  })
})
