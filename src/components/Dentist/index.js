import Specialty from '../Specialty/Index.vue'

export default {
  name: 'Dentist',
  components: {
    Specialty
  },
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    dentist: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      required: false,
      default: '#DA4980'
    }
  },
  filters: {
    address (address) {
      return `${address.description} - ${address.neighborhood}`
    },
    postcode (postcode) {
      return `CEP ${postcode}`
    },
    city (address) {
      return `${address.city} - ${address.state}`
    },
    name (dentist) {
      return `Dr(a). ${dentist.name}`
    },
    phone (phone) {
      const phoneArr = phone.split(' ')

      return `(${phoneArr[0]}) ${phoneArr[1]}`
    }
  }
}
