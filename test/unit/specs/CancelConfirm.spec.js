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
    expect(wrapper.find('.qa-confirm-cancel__title').text()).to.include(propsData.title.toUpperCase())
  })

  it('not dependents |> exists()', () => {
    expect(wrapper.find('.qa-confirm-cancel__dependents-wrap').exists()).to.be.false
  })

  it('dependents |> exists(), text()', () => {
    const dependents = ['Daniela Souza', 'Maria Tereza']

    wrapper.setProps({
      dependents: dependents
    })

    const element = wrapper.find('.qa-confirm-cancel__dependents-wrap__items')

    expect(element.exists()).to.be.true
    expect(element.text()).to.deep.equal(dependents.join(''))
  })

  it('cancel |> trigger()', () => {
    const clickHandler = sinon.stub()

    wrapper.setProps({
      cancel: clickHandler
    })

    expect(clickHandler.called).to.be.false

    wrapper.find('.qa-confirm-cancel__actions__action--no button').trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('proceed |> trigger()', () => {
    const clickHandler = sinon.stub()

    wrapper.setProps({
      proceed: clickHandler
    })

    expect(clickHandler.called).to.be.false

    wrapper.find('.qa-confirm-cancel__actions__action--yes button').trigger('click')

    expect(clickHandler.called).to.be.true
  })

  it('active |> exists()', () => {
    wrapper.setProps({
      isActive: false
    })

    expect(wrapper.find('.qa-confirm-cancel').exists()).to.be.false
  })
})
