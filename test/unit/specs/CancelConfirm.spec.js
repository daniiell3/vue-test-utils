import { mount } from '@vue/test-utils'
import { expect } from 'chai'
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
    expect(wrapper.find('.confirm-cancel__title').text()).to.include(propsData.title.toUpperCase())
  })

  it('not dependents |> exists()', () => {
    expect(wrapper.find('.confirm-cancel__dependents-wrap').exists()).to.be.false
  })

  it('dependents |> exists(), text()', () => {
    const dependents = ['Daniela Souza', 'Maria Tereza']

    wrapper.setProps({
      dependents: dependents
    })

    const element = wrapper.find('.confirm-cancel__dependents-wrap__items')

    expect(element.exists()).to.be.true
    expect(element.text()).to.deep.equal(dependents.join(''))
  })

  it('cancel |> trigger()', () => {
    let clicked = false

    wrapper.setProps({
      cancel: () => {
        clicked = true
      }
    })

    wrapper.find('.confirm-cancel__actions__action--no button').trigger('click')

    expect(clicked).to.be.true
  })

  it('proceed |> trigger()', () => {
    let clicked = false

    wrapper.setProps({
      proceed: () => {
        clicked = true
      }
    })

    wrapper.find('.confirm-cancel__actions__action--yes button').trigger('click')

    expect(clicked).to.be.true
  })

  it('active |> exists()', () => {
    wrapper.setProps({
      isActive: false
    })

    expect(wrapper.find('.confirm-cancel').exists()).to.be.false
  })
})
