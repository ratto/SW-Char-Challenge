<template>
  <div id="app">
    <img id="logo" class="img-fluid" alt="Star Wars" src="./assets/star_wars_logo.jpg">
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <StarWarsCharacters />
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// import HelloWorld from './components/HelloWorld.vue'
import StarWarsCharacters from './components/StarWarsCharacters.vue'

export default {
  name: 'App',

  components: {
    // HelloWorld
    StarWarsCharacters
  },

  // once the app is created, it calls the procedure to store swapi data
  created() {
    this.$store.dispatch('START_CHARACTER_STORE');
  },
}
</script>

<style>


body,
html {
  background-color: black;
}

#logo {
  height: 10rem;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
