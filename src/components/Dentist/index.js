// modules
import { mapGetters } from 'vuex'

// components
import Specialty from '../Specialty/Index.vue'

// attrs
import computed from './attrs/computed'

export default {
  name: 'Dentist',
  components: {
    Specialty
  },
  computed: Object.assign(
    mapGetters({
      isActive: 'dentist/isActive',
      dentist: 'dentist/item',
      color: 'dentist/color'
    }),
    computed
  )
}
