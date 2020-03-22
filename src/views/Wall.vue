<template>
  <div class="home">
    <div v-if="!error">
      <div v-if="pixels.length > 0">
        <div v-for="pixel in pixels" :key="pixel.id" :id="pixel.id" class="pixel-container">
          <div class="pixel" v-bind:style="{ backgroundColor: '#'+pixel.color, }"></div>
          <br v-if="pixel.id % 96 == 1">
        </div>
      </div>
      <div v-else>
        <h3>Chargement en cours ...</h3>
      </div>
    </div>
    <div v-else>
      <h3>Erreur API</h3>
      {{error}}
    </div>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  name: 'Home',
  data() { 
    return {
      pixels: [],
      error: null
    }
  },
  methods: {
    getPixels() {
      axios
        .get('https://labs.apo.pm/docker/pixels-api/pixels')
        .then(response => {
          let pixels = response.data;
          
          this.pixels = pixels.reverse();
          setTimeout(this.getPixels(), 8000);
        })
        .catch(error => {
          this.error = error;
        });
    }
  },
  mounted() {
    this.getPixels();
  }
}
</script>

<style scoped>
  h3 {
    padding: 20px;
  }

  .home {
    line-height: 0;
    position: relative;
    overflow: auto;
    width: 1920.1px;
    height: 1080px;
    border: 1px solid;
  }

  .pixel-container {
    display: inline-block;
  }

  .pixel {
    height: 20px;
    width: 20px;
    display: inline-block;
    margin: 0;
  }
</style>
