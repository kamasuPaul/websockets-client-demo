<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      topup:{
        id: 1,
        amount: 0,
      },
      }
    },
  components: {
    HelloWorld
  },
  mounted() {
    console.log('App mounted.')
    window.Echo.channel('top-up-status-updated')
      .listen('.top-up-status-updated', (e) => {
        console.log("event received")
        console.log(e)
      })
    //listen to private channel
    console.log("topup id: " + this.topup.id)
    window.Echo.private(`topups.${this.topup.id}`)
      .listen('.topup-updated', (e) => {
        console.log("update topup event received")
        console.log(e)
      }
      )	 
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
