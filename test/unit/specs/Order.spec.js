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

  it('not disabled |> classes()', () => {
    const orderItemsEl = wrapper.find('.qa-orders')

    expect(orderItemsEl.classes()).to.not.include('disabled')
  })

  it('icon |> attributes()', () => {
    const iconEl = wrapper.find('.qa-orders__plan__icon')
    const src = iconEl.attributes().src

    expect(src).to.deep.equal(propsData.plan.icon)
  })

  it('title |> text()', () => {
    const titleEl = wrapper.find('.qa-orders__plan__title')

    expect(titleEl.text()).to.deep.equal(propsData.plan.title)
  })

  it('actions |> exists()', () => {
    const actionsEl = wrapper.find('.qa-orders__actions')

    expect(actionsEl.exists()).to.be.true
  })

  it('proposal |> findAll(), filter(), text(), attributes(), at()', () => {
    const documentsAnchorEl = wrapper.findAll('.qa-orders__actions__documents > a')
    const proposalEl = documentsAnchorEl.filter(i => i.text() === 'Ver Proposta').at(0)
    const href = proposalEl.attributes().href

    expect(href).to.deep.equal(propsData.documents.proposal)
  })

  it('contract |> findAll(), filter(), text(), attributes(), at()', () => {
    const documentsAnchorEl = wrapper.findAll('.qa-orders__actions__documents > a')
    const contractEl = documentsAnchorEl.filter(i => i.text() === 'Ver Contrato').at(0)
    const href = contractEl.attributes().href

    expect(href).to.deep.equal(propsData.documents.contract)
  })

  it('not cancel |> exists()', () => {
    const cancelEl = wrapper.find('.qa-orders__actions__cancel-plan')

    expect(cancelEl.exists()).to.be.false
  })

  it('disabled text |> exists()', () => {
    const canceledEl = wrapper.find('.qa-orders__canceled-text')

    expect(canceledEl.exists()).to.be.false
  })

  it('main |> text()', () => {
    const nameEl = wrapper.find('.qa-orders__life-main__name')

    expect(nameEl.text()).to.deep.equal(propsData.beneficiaries.main)
  })

  it('not dependents |> exists()', () => {
    const dependentsEl = wrapper.find('.qa-orders__dependents__items')
    expect(dependentsEl.exists()).to.be.false

    const dependentsEmptyEl = wrapper.find('span.qa-orders__dependents__items__item')
    expect(dependentsEmptyEl.exists()).to.be.true
  })

  it('cancel |> exists()', () => {
    wrapper.setProps({
      orderStatus: 'complete'
    })

    const cancelEl = wrapper.find('.qa-orders__actions__cancel-plan')
    expect(cancelEl.exists()).to.be.true
  })

  it('dependents |> exists(), text()', () => {
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

    const dependentsEmptyEl = newWrapper.find('span.qa-orders__dependents__items__item')
    expect(dependentsEmptyEl.exists()).to.be.false
  })

  it('click |> trigger()', () => {
    const clickHandler = sinon.stub()

    const newWrapper = mount(Order, {
      propsData: Object.assign({}, propsData, {
        orderStatus: 'complete',
        handleCancel: clickHandler
      })
    })

    expect(clickHandler.called).to.be.false

    const buttonEl = newWrapper.find('.qa-orders__actions__cancel-plan button')
    buttonEl.trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('canceled |> classes(), exists()', () => {
    const newWrapper = mount(Order, {
      propsData: Object.assign({}, propsData, {
        orderStatus: 'canceled'
      })
    })

    const orderItemEl = newWrapper.find('.qa-orders')
    expect(orderItemEl.classes()).to.include('disabled')

    const actionsEl = newWrapper.find('.qa-orders__actions')
    expect(actionsEl.exists()).to.be.false

    const canceledEl = newWrapper.find('.qa-orders__canceled-text')
    expect(canceledEl.exists()).to.be.true
  })
})
