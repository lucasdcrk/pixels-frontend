<template>
  <div class="home">
    <div v-if="!error">
      <div v-if="pixels.length > 0">
        <div v-for="pixel in pixels" :key="pixel.id" class="pixel" v-bind:style="{ backgroundColor: '#'+pixel.color}">
<br v-if="pixel.x >= 1080 / 20">
        </div>
      </div>
      <div v-else>
        Chargement en cours ...
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
          
          this.pixels = pixels;
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
  .home {
    line-height: 0;
  }

  .pixel {
    height: 20px;
    width: 20px;
    display: inline-block;
    border: 1px solid;
    margin: 0;
  }
</style>
