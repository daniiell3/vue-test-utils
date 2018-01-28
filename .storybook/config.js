import { configure } from '@storybook/vue'

import Vue from 'vue'
import Vuex from 'vuex'

// Import your custom components.
import Order from '../src/components/Order/Index.vue'
import Plan from '../src/components/Plan/Index.vue'
import CancelConfirm from '../src/components/CancelConfirm/Index.vue'
import Dentist from '../src/components/Dentist/Index.vue'

// Register custom components.
Vue.component('order', Order)
Vue.component('plan', Plan)
Vue.component('cancel-confirm', CancelConfirm)
Vue.component('dentist', Dentist)

Vue.use(Vuex)

function loadStories() {
  // You can require as many stories as you need.
  require('../src/components')
}

configure(loadStories, module)