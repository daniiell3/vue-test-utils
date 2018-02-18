import { mount } from '@vue/test-utils'
import { expect } from 'chai'
import sinon from 'sinon'
import CancelConfirm from '@/components/CancelConfirm/Index.vue'

describe('CancelConfirm.vue', () => {
  const propsData = {
    isActive: true,
    title: 'Dental Estética',
    dependents: [],
    cancel: () => {},
    proceed: () => {}
  }

  const wrapper = mount(CancelConfirm, {
    propsData
  })

  it('title |> text()', () => {
    const titleEl = wrapper.find('.qa-confirm-cancel__title')

    expect(titleEl.text()).to.include(propsData.title.toUpperCase())
  })

  it('not dependents |> exists()', () => {
    const dependentsEl = wrapper.find('.qa-confirm-cancel__dependents-wrap')

    expect(dependentsEl.exists()).to.be.false
  })

  it('dependents |> exists(), text()', () => {
    const dependents = ['Daniela Souza', 'Maria Tereza']

    wrapper.setProps({
      dependents: dependents
    })

    const dependentItemsEl = wrapper.find('.qa-confirm-cancel__items')

    expect(dependentItemsEl.exists()).to.be.true
    expect(dependentItemsEl.text()).to.deep.equal(dependents.join(''))
  })

  it('cancel |> trigger()', () => {
    const clickHandler = sinon.stub()

    wrapper.setProps({
      cancel: clickHandler
    })

    expect(clickHandler.called).to.be.false

    const buttonEl = wrapper.find('.qa-confirm-cancel__action--no button')
    buttonEl.trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('proceed |> trigger()', () => {
    const clickHandler = sinon.stub()

    wrapper.setProps({
      proceed: clickHandler
    })

    expect(clickHandler.called).to.be.false

    const buttonEl = wrapper.find('.qa-confirm-cancel__action--yes button')
    buttonEl.trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('active |> exists()', () => {
    wrapper.setProps({
      isActive: false
    })

    const cancelEl = wrapper.find('.qa-confirm-cancel')
    expect(cancelEl.exists()).to.be.false
  })
})
