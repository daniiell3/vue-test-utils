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
    const labelEl = wrapper.find('.qa-plan__label')

    expect(labelEl.exists()).to.be.false
  })

  it('icon |> attributes()', () => {
    const iconEl = wrapper.find('.qa-plan__icon')
    const src = iconEl.attributes().src

    expect(src).to.deep.equal(propsData.icon)
  })

  it('title |> text()', () => {
    const titleEl = wrapper.find('.qa-plan__title')

    expect(titleEl.text()).to.deep.equal(propsData.title)
  })

  it('not description |> exists()', () => {
    const descriptionEl = wrapper.find('.qa-plan__description')

    expect(descriptionEl.exists()).to.be.false
  })

  it('not advantages |> exists()', () => {
    const advantagesEl = wrapper.find('.qa-plan__advantages')

    expect(advantagesEl.exists()).to.be.false
  })

  it('price |> text()', () => {
    const priceEl = wrapper.find('.qa-plan__price')

    expect(priceEl.text()).to.deep.equal(`${propsData.real}, ${propsData.cents}`)
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

    const advantagesEl = wrapper.find('.qa-plan__advantages')
    expect(advantagesEl.exists()).to.be.true

    const advantagesItemsEl = wrapper.find('.qa-plan__advantages__items')
    expect(advantagesItemsEl.text()).to.deep.equal(advantages.join(''))
  })

  it('label |> exists(), text()', () => {
    const label = 'mais vendido'

    wrapper.setProps({
      label: label
    })

    const labelEl = wrapper.find('.qa-plan__label')

    expect(labelEl.exists()).to.be.true
    expect(labelEl.text()).to.deep.equal(label)
  })

  it('description |> html()', () => {
    const description = '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'

    wrapper.setProps({
      description: description
    })

    const descriptionEl = wrapper.find('.qa-plan__description > *')
    expect(descriptionEl.html()).to.deep.equal(description)
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

    const advantagesEl = newWrapper.find('.qa-plan__advantages__items')
    expect(advantagesEl.text()).to.be.empty
  })
})
