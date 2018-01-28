import VButton from '../VButton/Index.vue'

export default {
  name: 'CancelConfirm',
  props: {
    isActive: {
      type: Boolean,
      required: true
    },
    item: {
      type: Object,
      required: true
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
  }
}
