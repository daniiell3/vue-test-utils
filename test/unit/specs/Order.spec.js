import { shallow, mount } from '@vue/test-utils'
import { expect } from 'chai'
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

it('does not render with disabled class when not passed orderStatus canceled', () => {
  const orderItemsEl = wrapper.find('.qa-orders')

  expect(orderItemsEl.classes()).to.not.include('disabled')
})

it('icon correctly rendered', () => {
  const iconEl = wrapper.find('.qa-orders__icon')
  const src = iconEl.attributes().src

  expect(src).to.deep.equal(propsData.plan.icon)
})

it('title correctly rendered', () => {
  const titleEl = wrapper.find('.qa-orders__title')

  expect(titleEl.text()).to.deep.equal(propsData.plan.title)
})

it('buttons correctly rendered when passed not orderStatus canceled', () => {
  const actionsEl = wrapper.find('.qa-orders__actions')

  expect(actionsEl.exists()).to.be.true
})

it('proposal correctly rendered', () => {
  const documentsAnchorEl = wrapper.findAll('.qa-orders__documents > a')
  const proposalEl = documentsAnchorEl.filter(i => i.text() === 'Ver Proposta').at(0)
  const href = proposalEl.attributes().href

  expect(href).to.deep.equal(propsData.documents.proposal)
})

it('contract correctly rendered', () => {
  const documentsAnchorEl = wrapper.findAll('.qa-orders__documents > a')
  const contractEl = documentsAnchorEl.filter(i => i.text() === 'Ver Contrato').at(0)
  const href = contractEl.attributes().href

  expect(href).to.deep.equal(propsData.documents.contract)
})

it('does not render cancel button when not passed orderStatus complete', () => {
  const cancelEl = wrapper.find('.qa-orders__cancel-plan')

  expect(cancelEl.exists()).to.be.false
})

it('does not render disabled text when not passed orderStatus canceled', () => {
  const canceledEl = wrapper.find('.qa-orders__canceled-text')

  expect(canceledEl.exists()).to.be.false
})

it('name of main life correctly rendered', () => {
  const nameEl = wrapper.find('.qa-orders__main__name')

  expect(nameEl.text()).to.deep.equal(propsData.beneficiaries.main)
})

it('does not render dependents when not passed dependents', () => {
  const dependentsEl = wrapper.find('.qa-orders__dependents__items')
  expect(dependentsEl.exists()).to.be.false

  const dependentsEmptyEl = wrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).to.be.true
})

it('cancel button correctly rendered when passed orderStatus complete', () => {
  wrapper.setProps({
    orderStatus: 'complete'
  })

  const cancelEl = wrapper.find('.qa-orders__cancel-plan')
  expect(cancelEl.exists()).to.be.true
})

it('dependents correctly rendered when passed dependents', () => {
  const dependents = ['Daniela Souza', 'Maria Tereza']

  const newWrapper = shallow(Order, {
    propsData: Object.assign({}, propsData, {
      beneficiaries: Object.assign({}, propsData.beneficiaries, {
        dependents: dependents
      })
    })
  })

  const dependentItemsEl = newWrapper.find('.qa-orders__dependents__items')
  expect(dependentItemsEl.exists()).to.be.true
  expect(dependentItemsEl.text()).to.deep.equal(dependents.join(''))

  const dependentsEmptyEl = newWrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).to.be.false
})

it('calls clickHandler when cancel button is clicked', () => {
  const clickHandler = sinon.stub()

  const newWrapper = mount(Order, {
    propsData: Object.assign({}, propsData, {
      orderStatus: 'complete',
      handleCancel: clickHandler
    })
  })

  expect(clickHandler.called).to.be.false

  const buttonEl = newWrapper.find('.qa-orders__cancel-plan button')
  buttonEl.trigger('click')

  expect(clickHandler.called).to.be.true
})

it('correctly rendered with disabled class when passed orderStatus canceled', () => {
  wrapper.setProps({
    orderStatus: 'canceled'
  })

  const orderItemsEl = wrapper.find('.qa-orders')

  expect(orderItemsEl.classes()).to.include('disabled')
})

it('does buttons not render when passed orderStatus canceled', () => {
  const actionsEl = wrapper.find('.qa-orders__actions')

  expect(actionsEl.exists()).to.be.false
})

it('correctly rendered disabled text when passed orderStatus canceled', () => {
  const canceledEl = wrapper.find('.qa-orders__canceled-text')

  expect(canceledEl.exists()).to.be.true
})
