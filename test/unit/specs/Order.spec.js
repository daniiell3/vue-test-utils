import { shallow, mount } from '@vue/test-utils'
import sinon from 'sinon'
import Order from '@/components/Order/Index.vue'

const propsData = {
  orderStatus: 'payment_review',
  plan: {
    icon: 'https://odontoprevonline.com.br/sites/default/files/styles/thumbnail/public/2017-08/odontoprev-dental-estetica.png?itok=93uFTNDG',
    title: 'Dental Estética'
  },
  beneficiaries: {
    main: 'Daniel Santos',
    dependents: []
  },
  documents: {
    proposal: 'https://vue-test-utils.vuejs.org/en/api/wrapper',
    contract: 'https://vue-test-utils.vuejs.org/en/api/wrapper-array/'
  },
  handleCancel: () => {}
}

const wrapper = shallow(Order, {
  propsData
})

it('icon correctly rendered', () => {
  const iconEl = wrapper.find('.qa-orders__icon')
  const src = iconEl.attributes().src

  expect(src).toEqual(propsData.plan.icon)
})

it('title correctly rendered', () => {
  const titleEl = wrapper.find('.qa-orders__title')

  expect(titleEl.text()).toEqual(propsData.plan.title)
})

it('proposal correctly rendered', () => {
  const documentsAnchorEl = wrapper.findAll('.qa-orders__documents > a')
  const proposalEl = documentsAnchorEl.filter(i => i.text() === 'Ver Proposta').at(0)
  const href = proposalEl.attributes().href

  expect(href).toEqual(propsData.documents.proposal)
})

it('does not render dependents when not passed dependents prop', () => {
  const dependentsEl = wrapper.find('.qa-orders__dependents__items')
  expect(dependentsEl.exists()).toBe(false)

  const dependentsEmptyEl = wrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).toBe(true)
})

it('dependents correctly rendered when passed dependents prop', () => {
  const dependents = ['Daniela Souza', 'Maria Tereza']

  const newWrapper = shallow(Order, {
    propsData: Object.assign({}, propsData, {
      beneficiaries: Object.assign({}, propsData.beneficiaries, {
        dependents: dependents
      })
    })
  })

  const dependentItemsEl = newWrapper.find('.qa-orders__dependents__items')
  expect(dependentItemsEl.exists()).toBe(true)
  expect(dependentItemsEl.text()).toEqual(dependents.join(''))

  const dependentsEmptyEl = newWrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).toBe(false)
})

it('calls clickHandler when cancel button is clicked', () => {
  const clickHandler = sinon.stub()

  const newProps = Object.assign({}, propsData, {
    orderStatus: 'complete',
    handleCancel: clickHandler
  })

  const newWrapper = mount(Order, {
    propsData: newProps
  })

  expect(clickHandler.called).toBe(false)

  const buttonEl = newWrapper.find('.qa-orders__cancel-plan button')
  buttonEl.trigger('click')

  expect(clickHandler.called).toBe(true)
})

it('correctly rendered when passed order status prop as canceled', () => {
  wrapper.setProps({
    orderStatus: 'canceled'
  })

  const orderItemsEl = wrapper.find('.qa-orders')
  expect(orderItemsEl.classes()).toEqual(expect.arrayContaining(['disabled']))

  const actionsEl = wrapper.find('.qa-orders__actions')
  expect(actionsEl.exists()).toBe(false)

  const canceledEl = wrapper.find('.qa-orders__canceled-text')
  expect(canceledEl.exists()).toBe(true)
})
