// modules
import { mapGetters } from 'vuex'

// components
import Specialty from '../Specialty/Index.vue'

export default {
  name: 'Dentist',
  components: {
    Specialty
  },
  computed: mapGetters({
    isActive: 'dentist/isActive',
    dentist: 'dentist/item',
    color: 'dentist/color'
  }),
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
