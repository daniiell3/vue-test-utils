import { shallow } from '@vue/test-utils'
import { expect } from 'chai'
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
    expect(wrapper.find('.plan__label').exists()).to.be.false
  })

  it('icon |> attributes()', () => {
    expect(wrapper.find('.plan__icon').attributes().src).to.deep.equal(propsData.icon)
  })

  it('title |> text()', () => {
    expect(wrapper.find('.plan__title').text()).to.deep.equal(propsData.title)
  })

  it('not description |> exists()', () => {
    expect(wrapper.find('.plan__description').exists()).to.be.false
  })

  it('not advantages |> exists()', () => {
    expect(wrapper.find('.plan__advantages').exists()).to.be.false
  })

  it('price |> text()', () => {
    expect(wrapper.find('.plan__price').text()).to.deep.equal(`${propsData.real}, ${propsData.cents}`)
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

    expect(wrapper.find('.plan__advantages').exists()).to.be.true
    expect(wrapper.find('.plan__advantages__items').text()).to.deep.equal(advantages.join(''))
  })

  it('label |> exists(), text()', () => {
    const label = 'mais vendido'

    wrapper.setProps({
      label: label
    })

    const element = wrapper.find('.plan__label')

    expect(element.exists()).to.be.true
    expect(element.text()).to.deep.equal(label)
  })

  it('description |> html()', () => {
    const description = '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'

    wrapper.setProps({
      description: description
    })

    expect(wrapper.find('.plan__description > *').html()).to.deep.equal(description)
  })

  it('not title |> isEmpty()', () => {
    const newWrapper = shallow(Plan, {
      propsData: Object.assign({}, propsData, {
        title: ''
      })
    })

    expect(newWrapper.isEmpty()).to.be.true
  })

  it('not advantages |> text()', () => {
    const newWrapper = shallow(Plan, {
      propsData: Object.assign({}, propsData, {
        advantages: []
      })
    })

    expect(newWrapper.find('.plan__advantages__items').text()).to.be.empty
  })
})
