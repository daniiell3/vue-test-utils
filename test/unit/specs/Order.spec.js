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

it('icon correctly rendered', () => {
  const iconEl = wrapper.find('.qa-orders__icon')
  const src = iconEl.attributes().src

  expect(src).to.deep.equal(propsData.plan.icon)
})

it('title correctly rendered', () => {
  const titleEl = wrapper.find('.qa-orders__title')

  expect(titleEl.text()).to.deep.equal(propsData.plan.title)
})

it('proposal correctly rendered', () => {
  const documentsAnchorEl = wrapper.findAll('.qa-orders__documents > a')
  const proposalEl = documentsAnchorEl.filter(i => i.text() === 'Ver Proposta').at(0)
  const href = proposalEl.attributes().href

  expect(href).to.deep.equal(propsData.documents.proposal)
})

it('does not render dependents when not passed dependents prop', () => {
  const dependentsEl = wrapper.find('.qa-orders__dependents__items')
  expect(dependentsEl.exists()).to.be.false

  const dependentsEmptyEl = wrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).to.be.true
})

it('dependents correctly rendered when passed dependents prop', () => {
  const dependents = ['Daniela Souza', 'Maria Tereza']

  const newProps = Object.assign({}, propsData, {
    beneficiaries: Object.assign({}, propsData.beneficiaries, {
      dependents: dependents
    })
  })

  const newWrapper = shallow(Order, {
    propsData: newProps
  })

  const dependentItemsEl = newWrapper.find('.qa-orders__dependents__items')
  expect(dependentItemsEl.exists()).to.be.true
  expect(dependentItemsEl.text()).to.deep.equal(dependents.join(''))

  const dependentsEmptyEl = newWrapper.find('span.qa-orders__dependents__item')
  expect(dependentsEmptyEl.exists()).to.be.false
})
