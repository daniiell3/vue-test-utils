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
    expect(wrapper.find('.qa-orders__item').classes()).to.not.include('disabled')
  })

  it('icon |> attributes()', () => {
    expect(wrapper.find('.qa-orders__item__plan__icon').attributes().src).to.deep.equal(propsData.plan.icon)
  })

  it('title |> text()', () => {
    expect(wrapper.find('.qa-orders__item__plan__title').text()).to.deep.equal(propsData.plan.title)
  })

  it('actions |> exists()', () => {
    expect(wrapper.find('.qa-orders__item__actions').exists()).to.be.true
  })

  it('proposal |> findAll(), filter(), attributes(), at()', () => {
    const documentsAnchor = wrapper.findAll('.qa-orders__item__actions__documents > a')
    const proposal = documentsAnchor.filter(item => item.text() === 'Ver Proposta').at(0)

    expect(proposal.attributes().href).to.deep.equal(propsData.documents.proposal)
  })

  it('contract |> findAll(), filter(), attributes(), at()', () => {
    const documentsAnchor = wrapper.findAll('.qa-orders__item__actions__documents > a')
    const contract = documentsAnchor.filter(item => item.text() === 'Ver Contrato').at(0)

    expect(contract.attributes().href).to.deep.equal(propsData.documents.contract)
  })

  it('not cancel |> exists()', () => {
    expect(wrapper.find('.qa-orders__item__actions__cancel-plan').exists()).to.be.false
  })

  it('disabled text |> exists()', () => {
    expect(wrapper.find('.qa-orders__item__canceled-text').exists()).to.be.false
  })

  it('main |> text()', () => {
    expect(wrapper.find('.qa-orders__item__life-main__name').text()).to.deep.equal(propsData.beneficiaries.main)
  })

  it('not dependents |> exists()', () => {
    expect(wrapper.find('.qa-orders__item__dependents__items').exists()).to.be.false
    expect(wrapper.find('span.qa-orders__item__dependents__items__item').exists()).to.be.true
  })

  it('cancel |> exists()', () => {
    wrapper.setProps({
      orderStatus: 'complete'
    })

    expect(wrapper.find('.qa-orders__item__actions__cancel-plan').exists()).to.be.true
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
    
    const dependentsItems = newWrapper.find('.qa-orders__item__dependents__items')

    expect(dependentsItems.exists()).to.be.true
    expect(newWrapper.find('span.qa-orders__item__dependents__items__item').exists()).to.be.false
    expect(dependentsItems.text()).to.deep.equal(dependents.join(''))
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

    newWrapper.find('.qa-orders__item__actions__cancel-plan button').trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('canceled |> classes(), exists()', () => {
    const newWrapper = mount(Order, {
      propsData: Object.assign({}, propsData, {
        orderStatus: 'canceled'
      })
    })

    expect(newWrapper.find('.qa-orders__item').classes()).to.include('disabled')
    expect(newWrapper.find('.qa-orders__item__actions').exists()).to.be.false
    expect(newWrapper.find('.qa-orders__item__canceled-text').exists()).to.be.true
  })
})
