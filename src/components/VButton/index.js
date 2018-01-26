export default {
  name: 'Button',
  props: {
    label: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: false,
      default: ''
    },
    effect: {
      type: String,
      required: false,
      default: 'waves-effect waves-light'
    },
    onClick: {
      type: Function,
      required: false
    },
    beforeClick: {
      type: Function,
      required: false
    },
    disabled: {
      type: Boolean,
      required: false
    },
    arrowRight: {
      type: Boolean,
      required: false,
      default: false
    },
    eventData: {
      required: false,
      default: false
    },
    bg: {
      type: String,
      required: false
    }
  },
  data () {
    return {
      btn: 'btn'
    }
  },
  methods: {
    handleClick (event) {
      if (this.beforeClick) {
        this.beforeClick().then(status => {
          if (status) {
            this.onClick(this.eventData)
          }
        })
      } else {
        this.onClick(this.eventData)
      }
    }
  }
}
