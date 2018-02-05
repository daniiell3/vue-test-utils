import { shallow, mount } from '@vue/test-utils'
import { assert } from 'chai'
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
    assert.notInclude(wrapper.find('.orders__item').classes(), 'disabled')
  })

  it('icon |> attributes()', () => {
    assert.strictEqual(wrapper.find('.orders__item__plan__icon').attributes().src, propsData.plan.icon)
  })

  it('title |> text()', () => {
    assert.strictEqual(wrapper.find('.orders__item__plan__title').text(), propsData.plan.title)
  })

  it('actions |> exists()', () => {
    assert.isTrue(wrapper.find('.orders__item__actions').exists())
  })

  it('proposal |> findAll(), filter(), attributes(), at()', () => {
    const documentsAnchor = wrapper.findAll('.orders__item__actions__documents > a')
    const proposal = documentsAnchor.filter(item => item.text() === 'Ver Proposta').at(0)

    assert.strictEqual(proposal.attributes().href, propsData.documents.proposal)
  })

  it('contract |> findAll(), filter(), attributes(), at()', () => {
    const documentsAnchor = wrapper.findAll('.orders__item__actions__documents > a')
    const contract = documentsAnchor.filter(item => item.text() === 'Ver Contrato').at(0)

    assert.strictEqual(contract.attributes().href, propsData.documents.contract)
  })

  it('not cancel |> exists()', () => {
    assert.isNotTrue(wrapper.find('.orders__item__actions__cancel-plan').exists())
  })

  it('disabled text |> exists()', () => {
    assert.isNotTrue(wrapper.find('.orders__item__canceled-text').exists())
  })

  it('main |> text()', () => {
    assert.strictEqual(wrapper.find('.orders__item__life-main__name').text(), propsData.beneficiaries.main)
  })

  it('not dependents |> exists()', () => {
    assert.isNotTrue(wrapper.find('.orders__item__dependents__items').exists())
    assert.isTrue(wrapper.find('span.orders__item__dependents__items__item').exists())
  })

  it('cancel |> exists()', () => {
    wrapper.setProps({
      orderStatus: 'complete'
    })

    assert.isTrue(wrapper.find('.orders__item__actions__cancel-plan').exists())
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
    
    const dependentsItems = newWrapper.find('.orders__item__dependents__items')

    assert.isTrue(dependentsItems.exists())
    assert.isNotTrue(newWrapper.find('span.orders__item__dependents__items__item').exists())
    assert.strictEqual(dependentsItems.text(), dependents.join(''))
  })

  it('click |> trigger()', () => {
    let clicked = false
    const newWrapper = mount(Order, {
      propsData: Object.assign({}, propsData, {
        orderStatus: 'complete',
        handleCancel: () => {
          clicked = true
        }
      })
    })

    newWrapper.find('.orders__item__actions__cancel-plan button').trigger('click')

    assert.isTrue(clicked)
  })

  it('canceled |> classes(), exists()', () => {
    const newWrapper = mount(Order, {
      propsData: Object.assign({}, propsData, {
        orderStatus: 'canceled'
      })
    })

    assert.include(newWrapper.find('.orders__item').classes(), 'disabled')
    assert.isNotTrue(newWrapper.find('.orders__item__actions').exists())
    assert.isTrue(newWrapper.find('.orders__item__canceled-text').exists())
  })
})
