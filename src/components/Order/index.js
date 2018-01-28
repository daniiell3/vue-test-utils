import VButton from '../VButton/Index.vue'

export default {
  name: 'Order',
  props: {
    item: {
      type: Object,
      required: true
    },
    handleCancel: {
      type: Function,
      required: true
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    VButton
  }
}
