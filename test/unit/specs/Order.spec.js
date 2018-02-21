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
