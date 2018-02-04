import VButton from '../VButton/Index.vue'

export default {
  name: 'Order',
  props: {
    orderStatus: {
      type: String,
      required: true
    },
    plan: {
      type: Object,
      required: true
    },
    beneficiaries: {
      type: Object,
      required: true
    },
    documents: {
      type: Object,
      required: true
    },
    handleCancel: {
      type: Function,
      required: true
    }
  },
  components: {
    VButton
  },
  computed: {
    isDisabled () {
      return this.orderStatus === 'canceled'
    },
    actionsActive () {
      return ['complete', 'payment_review'].includes(this.orderStatus)
    },
    isComplete () {
      return this.orderStatus === 'complete'
    },
    dependentsExists () {
      return this.beneficiaries.dependents.length > 0
    }
  }
}
