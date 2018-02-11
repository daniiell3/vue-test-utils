import { mount, createLocalVue } from '@vue/test-utils'
import { expect } from 'chai'
import Vuex from 'vuex'
import Dentist from '@/components/Dentist/Index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('CancelConfirm.vue', () => {
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

  describe('Default', () => {
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
  
    it('name |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.find('.qa-dentist__h-title').text()).to.deep.equal(`Dr(a). ${state.item.name}`)
    })
  
    it('info |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
      const text = wrapper.find('.qa-dentist__h-info').text()
  
      expect(text).to.include(state.item.cro)
      expect(text).to.include(state.item.providerType)
    })
    
    it('specialties |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.find('.qa-dentist__b-specialties__items').text()).to.deep.equal(state.item.specialties.map(i => i.title).join(' '))
    })
  
    it('address |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.findAll('.qa-dentist__b-address__info').at(0).text()).to.include(state.item.address.description)
      expect(wrapper.findAll('.qa-dentist__b-address__info').at(0).text()).to.include(state.item.address.neighborhood)
    })
  
    it('postcode |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.findAll('.qa-dentist__b-address__info').at(1).text()).to.include(state.item.address.postcode)
    })
  
    it('city - state |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.find('.qa-dentist__b-address__info--last').text()).to.include(state.item.address.city)
      expect(wrapper.find('.qa-dentist__b-address__info--last').text()).to.include(state.item.address.state)
    })
  
    it('phone |> text()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.find('.qa-dentist__b-contact__info').text()).to.deep.equal(state.item.phone)
    })
  
    it('scheduleUrl |> exists(), attributes()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })
  
      expect(wrapper.find('.qa-dentist__b-boaconsulta').exists()).to.be.true
      expect(wrapper.find('.qa-dentist__b-boaconsulta > a').attributes().href).to.deep.equal(state.item.scheduleUrl)
    })
  })

  describe('not scheduleUrl', () => {
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

    it('scheduleUrl |> exists()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })

      expect(wrapper.find('.qa-dentist__b-boaconsulta').exists()).to.be.false
    })
  })

  describe('not active', () => {
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

    it('active |> exists()', () => {
      const wrapper = mount(Dentist, {
        store,
        localVue
      })

      expect(wrapper.find('.qa-dentist').exists()).to.be.false
    })
  })
})
