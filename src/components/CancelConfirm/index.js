import VButton from '../VButton/Index.vue'

export default {
  name: 'CancelConfirm',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    dependents: {
      type: Array,
      required: false
    },
    cancel: {
      type: Function,
      required: true
    },
    proceed: {
      type: Function,
      required: true
    }
  },
  components: {
    VButton
  },
  computed: {
    finalTitle () {
      return `Tem certeza que deseja cancelar o seu plano ${this.title.toUpperCase()} ?`
    },
    dependentsExists () {
      return this.dependents.length > 0
    }
  }
}
