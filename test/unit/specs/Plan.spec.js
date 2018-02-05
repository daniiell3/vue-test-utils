import { shallow } from '@vue/test-utils'
import { assert } from 'chai'
import Plan from '@/components/Plan/Index.vue'

describe('Plan.vue', () => {
  const propsData = {
    title: 'Dental Estética',
    real: 'R$ 115',
    cents: '00',
    icon: 'https://loja.odontoprevonline.com.br/pub/media/catalog/product//e/s/estetica_2.png'
  }

  const wrapper = shallow(Plan, {
    propsData
  })

  it('not label |> exists()', () => {
    assert.isFalse(wrapper.find('.plan__label').exists())
  })

  it('icon |> attributes()', () => {
    assert.strictEqual(wrapper.find('.plan__icon').attributes().src, propsData.icon)
  })

  it('title |> text()', () => {
    assert.strictEqual(wrapper.find('.plan__title').text(), propsData.title)
  })

  it('not description |> exists()', () => {
    assert.isFalse(wrapper.find('.plan__description').exists())
  })

  it('not advantages |> exists()', () => {
    assert.isNotTrue(wrapper.find('.plan__advantages').exists())
  })

  it('price |> text()', () => {
    assert.strictEqual(wrapper.find('.plan__price').text(), `${propsData.real}, ${propsData.cents}`)
  })

  it('advantages |> exists(), text()', () => {
    const advantages = [
      'Placa de Clareamento + Gel',
      'Limpezas Periódicas',
      'Emergência 24h'
    ]

    wrapper.setProps({
      advantages: advantages
    })

    assert.isTrue(wrapper.find('.plan__advantages').exists())
    assert.strictEqual(wrapper.find('.plan__advantages__items').text(), advantages.join(''))
  })

  it('label |> exists(), text()', () => {
    const label = 'mais vendido'

    wrapper.setProps({
      label: label
    })

    assert.isTrue(wrapper.find('.plan__label').exists())
    assert.strictEqual(wrapper.find('.plan__label').text(), 'mais vendido')
  })

  it('description |> html()', () => {
    const description = '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'

    wrapper.setProps({
      description: description
    })

    assert.strictEqual(wrapper.find('.plan__description > *').html(), description)
  })

  it('not title |> isEmpty()', () => {
    const newWrapper = shallow(Plan, {
      propsData: Object.assign({}, propsData, {
        title: ''
      })
    })

    assert.isTrue(newWrapper.isEmpty())
  })

  it('not advantages |> text()', () => {
    const newWrapper = shallow(Plan, {
      propsData: Object.assign({}, propsData, {
        advantages: []
      })
    })

    assert.isEmpty(newWrapper.find('.plan__advantages__items').text())
  })
})
