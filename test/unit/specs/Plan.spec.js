import { shallow } from '@vue/test-utils'
import Plan from '@/components/Plan/Index.vue'

describe('Plan.vue', () => {
  const propsData = {
    label: '',
    title: 'Dental Estética',
    description: '',
    advantages: [
      'Placa de Clareamento + Gel',
      'Limpezas Periódicas',
      'Emergência 24h'
    ],
    real: 'R$ 115',
    cents: '00',
    icon: 'https://loja.odontoprevonline.com.br/pub/media/catalog/product//e/s/estetica_2.png'
  }

  const wrapper = shallow(Plan, {
    propsData
  })

  it('title', () => {
    expect(wrapper.find('.plan__title').text()).toEqual(propsData.title)
  })
})
