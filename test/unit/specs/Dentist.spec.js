import { shallow, mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
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

    expect(titleEl.text()).to.deep.equal(`Dr(a). ${state.item.name}`)
  })
})
