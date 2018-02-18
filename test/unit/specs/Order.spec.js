import { shallow, mount } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import Order from '@/components/Order/Index.vue'

describe('Order.vue', () => {
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

  it('icon |> attributes()', () => {
    const iconEl = wrapper.find('.qa-orders__icon')
    const src = iconEl.attributes().src

    expect(src).to.deep.equal(propsData.plan.icon)
  })

  it('title |> text()', () => {
    const titleEl = wrapper.find('.qa-orders__title')

    expect(titleEl.text()).to.deep.equal(propsData.plan.title)
  })

  it('main |> text()', () => {
    const nameEl = wrapper.find('.qa-orders__main__name')

    expect(nameEl.text()).to.deep.equal(propsData.beneficiaries.main)
  })

  it('not dependents |> exists()', () => {
    const dependentsEl = wrapper.find('.qa-orders__dependents__items')
    expect(dependentsEl.exists()).to.be.false

    const dependentsEmptyEl = wrapper.find('span.qa-orders__dependents__item')
    expect(dependentsEmptyEl.exists()).to.be.true
  })
})
