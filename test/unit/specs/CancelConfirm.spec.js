import { mount } from '@vue/test-utils'
import { assert } from 'chai'
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
    assert.include(wrapper.find('.confirm-cancel__title').text(), propsData.title.toUpperCase())
  })

  it('not dependents |> exists()', () => {
    assert.isNotTrue(wrapper.find('.confirm-cancel__dependents-wrap').exists())
  })

  it('dependents |> exists(), text()', () => {
    const dependents = ['Daniela Souza', 'Maria Tereza']

    wrapper.setProps({
      dependents: dependents
    })

    const element = wrapper.find('.confirm-cancel__dependents-wrap__items')

    assert.isTrue(element.exists())
    assert.strictEqual(element.text(), dependents.join(''))
  })

  it('cancel |> trigger()', () => {
    let clicked = false

    wrapper.setProps({
      cancel: () => {
        clicked = true
      }
    })

    wrapper.find('.confirm-cancel__actions__action--no button').trigger('click')

    assert.isTrue(clicked)
  })

  it('proceed |> trigger()', () => {
    let clicked = false

    wrapper.setProps({
      proceed: () => {
        clicked = true
      }
    })

    wrapper.find('.confirm-cancel__actions__action--yes button').trigger('click')

    assert.isTrue(clicked)
  })

  it('active |> exists()', () => {
    wrapper.setProps({
      isActive: false
    })

    assert.isNotTrue(wrapper.find('.confirm-cancel').exists())
  })
})
