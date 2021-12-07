import Vue from 'vue'
import App from './App.vue'
import Echo from 'laravel-echo';
import axios from 'axios';

Vue.config.productionTip = true


window.Pusher = require('pusher-js');
//use .env instead for token and baseUrl
const baseUrl = 'http://localhost:8000/api';
const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODAwMFwvYXBpXC91c2Vyc1wvbG9naW4iLCJpYXQiOjE2Mzg1MTU5MTksImV4cCI6MTY0MTE0MzkxOSwibmJmIjoxNjM4NTE1OTE5LCJqdGkiOiJ3ejI0SUlEMnVDendGc3JqIiwic3ViIjoiVVA4NTc3NDk3NjIwMDExMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.qAU5XQqQAAX-nbEEBabymqQ0xFbVxq9PHP6j-5iGd8A"; 

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: "Kp8mUw.DDCTHQ",//app public key: format='APP_KEY.APP_ID'
  wsHost: 'realtime-pusher.ably.io',
  wsPort: 443,
  disableStats: true,
  encrypted: true,
  // authEndpoint: `${baseUrl}/broadcasting/auth`,
  authorizer: (channel) => {
    return {
        authorize: (socketId, callback) => {
            axios.post(`${baseUrl}/broadcasting/auth`, {
                socket_id: socketId,
                channel_name: channel.name
            },
            {
                headers: {
                  'Authorization': token,
                  'key': "kamasupaul", 
                }
            }
            )
            .then(response => {
                callback(false, response.data);
            })
            .catch(error => {
                callback(true, error);
            });
        }
    };
},
});
new Vue({
  render: h => h(App),
}).$mount('#app')
