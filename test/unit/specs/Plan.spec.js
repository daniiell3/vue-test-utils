import { shallow } from '@vue/test-utils'
import { expect } from 'chai'
import Plan from '@/components/Plan/Index.vue'

const propsData = {
  title: 'Dental Estética',
  real: 'R$ 115',
  cents: '00',
  icon: 'https://loja.odontoprevonline.com.br/pub/media/catalog/product//e/s/estetica_2.png'
}

const wrapper = shallow(Plan, {
  propsData
})

it('does not render label when not passed label prop', () => {
  const labelEl = wrapper.find('.qa-plan__label')

  expect(labelEl.exists()).to.be.false
})

it('icon correctly rendered', () => {
  const iconEl = wrapper.find('.qa-plan__icon')
  const src = iconEl.attributes().src

  expect(src).to.deep.equal(propsData.icon)
})

it('title correctly rendered', () => {
  const titleEl = wrapper.find('.qa-plan__title')

  expect(titleEl.text()).to.deep.equal(propsData.title)
})

it('does not render description when not passed description prop', () => {
  const descriptionEl = wrapper.find('.qa-plan__description')

  expect(descriptionEl.exists()).to.be.false
})

it('does not render advantages when not passed advantages prop', () => {
  const advantagesEl = wrapper.find('.qa-plan__advantages')

  expect(advantagesEl.exists()).to.be.false
})

it('price correctly rendered', () => {
  const priceEl = wrapper.find('.qa-plan__price')

  expect(priceEl.text()).to.deep.equal(`${propsData.real}, ${propsData.cents}`)
})

it('advantages correctly rendered when passed advantages prop', () => {
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

it('label correctly rendered when passed label prop', () => {
  const label = 'mais vendido'

  wrapper.setProps({
    label: label
  })

  const labelEl = wrapper.find('.qa-plan__label')

  expect(labelEl.exists()).to.be.true
  expect(labelEl.text()).to.deep.equal(label)
})

it('description correctly rendered when passed description prop', () => {
  const description = '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'

  wrapper.setProps({
    description: description
  })

  const descriptionEl = wrapper.find('.qa-plan__description > *')
  expect(descriptionEl.html()).to.deep.equal(description)
})

it('does not render when not passed title prop', () => {
  const newWrapper = shallow(Plan, {
    propsData: Object.assign({}, propsData, {
      title: ''
    })
  })

  expect(newWrapper.isEmpty()).to.be.true
})

it('does not render advantages when passed advantages prop as empty', () => {
  const newWrapper = shallow(Plan, {
    propsData: Object.assign({}, propsData, {
      advantages: []
    })
  })

  const advantagesEl = newWrapper.find('.qa-plan__advantages__items')
  expect(advantagesEl.text()).to.be.empty
})
