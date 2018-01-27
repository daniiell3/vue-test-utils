import { storiesOf } from '@storybook/vue'
import Centered from '@storybook/addon-centered'

// Components
import Order from './Order/Index.vue'
import Plan from './Plan/Index.vue'
import CancelConfirm from './CancelConfirm/Index.vue'
import Dentist from './Dentist/Index.vue'

const orderProps = {
  item: {
    plan: {
      icon: 'https://odontoprevonline.com.br/sites/default/files/styles/thumbnail/public/2017-08/odontoprev-dental-estetica.png?itok=93uFTNDG',
      title: 'Dental Estética',
      proposalUrl: '',
      contractUrl: ''
    },
    orderStatus: 'complete',
    main: 'Daniel Santos',
    dependents: []
  },
  cancelPlan: () => {}
}

storiesOf('Order', module)
  .addDecorator(Centered)
  .add('Payment Review', () => ({
    render (h) {
      return h(Order, { props: Object.assign({}, orderProps, {
        item: Object.assign({}, orderProps.item, {
          orderStatus: 'payment_review'
        })
      })}, ['renders component: Order'])
    }
  }))
  .add('Complete', () => ({
    render (h) {
      return h(Order, { props: orderProps }, ['renders component: Order'])
    }
  }))
  .add('Dependents', () => ({
    render (h) {
      return h(Order, { props: Object.assign({}, orderProps, {
        item: Object.assign({}, orderProps.item, {
          dependents: ['Daniela Souza', 'Maria Tereza']
        })
      }) }, ['renders component: Order'])
    }
  }))
  .add('Canceled', () => ({
    render (h) {
      return h(Order, { props: Object.assign({}, orderProps, {
        item: Object.assign({}, orderProps.item, {
          orderStatus: 'canceled'
        }),
        disabled: true
      }) }, ['renders component: Order'])
    }
  }))

const planProps = {
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

storiesOf('Plan', module)
  .addDecorator(Centered)
  .add('Default', () => ({
    render (h) {
      return h(Plan, { props: planProps }, ['renders component: Plan'])
    }
  }))
  .add('Descripion', () => ({
    render (h) {
      return h(Plan, { props: Object.assign({}, planProps, {
        description: '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>'
      }) }, ['renders component: Plan'])
    }
  }))
  .add('Label', () => ({
    render (h) {
      return h(Plan, { props: Object.assign({}, planProps, {
        description: '<p>Aqui você encontra planos mensais, anuais e sem carência, para usar amanhã!</p>',
        label: 'Mais vendido'
      }) }, ['renders component: Plan'])
    }
  }))

const cancelConfirmProps = {
  active: true,
  item: {
    plan: {
      title: 'Dental Estética'
    },
    dependents: []
  },
  cancel: () => {},
  proceed: () => {}
}

storiesOf('CancelConfirm', module)
  .addDecorator(Centered)
  .add('Default', () => ({
    render (h) {
      return h(CancelConfirm, { props: cancelConfirmProps }, ['renders component: CancelConfirm'])
    }
  }))
  .add('Dependents', () => ({
    render (h) {
      return h(CancelConfirm, { props: Object.assign({}, cancelConfirmProps, {
        item: Object.assign({}, cancelConfirmProps.item, {
          dependents: ['Daniela Souza', 'Maria Tereza']
        })
      }) }, ['renders component: CancelConfirm'])
    }
  }))

const dentistProps = {
  activeDentist: true,
  dentist: {
    name: 'Cristina Yuri Shigenaga',
    cro: '44765',
    providerType: 'Consultório Isolado - Odontológico Pessoa Física',
    phone: '11 2041-0821',
    specialties: [
      {
        type: 'consultation',
        title: 'Clínico Geral'
      },
      {
        type: 'surgery',
        title: 'Cirurgia'
      },
      {
        type: 'pediatric-dentistry',
        title: 'Odontopediatria'
      }
    ],
    address: {
      postcode: '03881-170',
      city: 'São Paulo',
      state: 'SP',
      description: 'Rua Sargento Evangelista, 05 SL 02',
      neighborhood: 'Ponte Rasa'
    }
  }
}

storiesOf('Dentist', module)
  .addDecorator(Centered)
  .add('Default', () => ({
    render (h) {
      return h(Dentist, { props: dentistProps }, ['renders component: Dentist'])
    }
  }))
  .add('Color / Specialties', () => ({
    render (h) {
      return h(Dentist, { props: Object.assign({}, dentistProps, {
        secondaryColor: '#8149da',
        dentist: Object.assign({}, dentistProps.dentist, {
          specialties: [
            {
              type: 'prosthesis',
              title: 'Prótese Dentária'
            },
            {
              type: 'orthodontics',
              title: 'Ortodontia'
            }
          ]
        })
      }) }, ['renders component: Dentist'])
    }
  }))
  .add('Link / Color', () => ({
    render (h) {
      return h(Dentist, { props: Object.assign({}, dentistProps, {
        secondaryColor: '#1974ce',
        dentist: Object.assign({}, dentistProps.dentist, {
          specialties: [
            {
              type: 'prosthesis',
              title: 'Prótese Dentária'
            },
            {
              type: 'orthodontics',
              title: 'Ortodontia'
            }
          ],
          boaConsultaUrl: 'https://odontoprevonline.com.br/encontre-um-dentista'
        })
      }) }, ['renders component: Dentist'])
    }
  }))
