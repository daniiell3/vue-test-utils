export default {
  name: 'Plan',
  props: {
    label: {
      type: String
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: false
    },
    advantages: {
      type: Array,
      required: true
    },
    real: {
      type: String,
      required: true
    },
    cents: {
      type: String,
      required: true
    },
    icon: {
      type: String,
      required: false
    }
  }
}
