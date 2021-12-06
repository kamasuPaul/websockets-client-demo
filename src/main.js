import Vue from 'vue'
import App from './App.vue'
import Echo from 'laravel-echo';

Vue.config.productionTip = true


window.Pusher = require('pusher-js');

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "Kp8mUw.DDCTHQ",//app public key: format='APP_KEY.APP_ID'
  wsHost: 'realtime-pusher.ably.io',
  wsPort: 443,
  disableStats: true,
  encrypted: true,
});
new Vue({
  render: h => h(App),
}).$mount('#app')
