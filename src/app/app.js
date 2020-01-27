import './styles/common.scss';
import Vue from 'vue';
import VueX from 'vuex';

import VXstore from './scripts/vxstore.js';
import App from './App.vue';
require.context('../public', true, /\.(png|woff)$/i);

Vue.use(VueX);
const store = new VueX.Store(VXstore);

new Vue({
  render: h => h(App),
  store,
}).$mount('#app');
