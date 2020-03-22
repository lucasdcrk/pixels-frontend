<template>
  <div class="putpixel">
    <h1>Put a pixel</h1>
    <small>Your modifications may take up to 60 seconds to appear.</small>
    <hr>
    <input type="number" v-model="x" placeholder="X">
    <input type="number" v-model="y" placeholder="Y">
    <input type="text" v-model="color" placeholder="Color (Hex)">
    <button @click="submit()">Send</button>
    <br>
    <router-link to="/">Back</router-link>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data() {
    return {
      x: null,
      y: null,
      color: '#000000'
    }
  },
  methods: {
    submit() {
      axios
        .post(`https://labs.apo.pm/docker/pixels-api/pixel/${window.line_size*this.x+this.y}/edit`, {
          color: this.color.replace('#', '')
        })
        .then(() => {
          this.x = null,
          this.y = null,
          this.color = '#000000'
        })
        .catch(error => {
          alert('Une erreur s\'est produite lors de l\'enregistrement, merci de réessayer.' + error.message);
        })
    }
  }
}
</script>
