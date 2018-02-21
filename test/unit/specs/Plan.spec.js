import { shallow } from '@vue/test-utils'
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

  expect(labelEl.exists()).toBe(false)
})

it('icon correctly rendered', () => {
  const iconEl = wrapper.find('.qa-plan__icon')
  const src = iconEl.attributes().src

  expect(src).toEqual(propsData.icon)
})

it('title correctly rendered', () => {
  const titleEl = wrapper.find('.qa-plan__title')

  expect(titleEl.text()).toEqual(propsData.title)
})

it('does not render description when not passed description prop', () => {
  const descriptionEl = wrapper.find('.qa-plan__description')

  expect(descriptionEl.exists()).toBe(false)
})

it('does not render advantages when not passed advantages prop', () => {
  const advantagesEl = wrapper.find('.qa-plan__advantages')

  expect(advantagesEl.exists()).toBe(false)
})

it('price correctly rendered', () => {
  const priceEl = wrapper.find('.qa-plan__price')

  expect(priceEl.text()).toEqual(`${propsData.real}, ${propsData.cents}`)
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
  expect(advantagesEl.exists()).toBe(true)

  const advantagesItemsEl = wrapper.find('.qa-plan__advantages__items')
  expect(advantagesItemsEl.text()).toEqual(advantages.join(''))
})

it('label correctly rendered when passed label prop', () => {
  const label = 'mais vendido'

  wrapper.setProps({
    label: label
  })

  const labelEl = wrapper.find('.qa-plan__label')

  expect(labelEl.exists()).toBe(true)
  expect(labelEl.text()).toEqual(label)
})

it('description correctly rendered when passed description prop', () => {
  const description = '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'

  wrapper.setProps({
    description: description
  })

  const descriptionEl = wrapper.find('.qa-plan__description > *')
  expect(descriptionEl.html()).toEqual(description)
})

it('does not render when not passed title prop', () => {
  const newWrapper = shallow(Plan, {
    propsData: Object.assign({}, propsData, {
      title: ''
    })
  })

  expect(newWrapper.isEmpty()).toBe(true)
})

it('does not render advantages when passed advantages prop as empty', () => {
  const newWrapper = shallow(Plan, {
    propsData: Object.assign({}, propsData, {
      advantages: []
    })
  })

  const advantagesEl = newWrapper.find('.qa-plan__advantages__items')
  // expect(advantagesEl.text()).to.be.empty
})
