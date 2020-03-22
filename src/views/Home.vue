<template>
  <div class="home">
    <div v-if="!error">
      <div v-if="pixels.length > 0">
        <div v-for="pixel in pixels" :key="pixel.id" class="pixel"></div>
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
        .get('https://pixels.apo.pm/api/pixels')
        .then(response => {
          let data = response.data;
          let pixels = JSON.parse(data);
          
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
  .pixel {
    height: 20px;
    width: 20px;
  }
</style>
