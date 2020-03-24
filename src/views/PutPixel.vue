<template>
  <div class="putpixel" style="margin: 20px;">
    <h1>Put a pixel</h1>
    <small>Your modifications may take up to 10 seconds to appear.</small>
    <hr>
    <input type="number" v-model="x" placeholder="X (between 0 and 96)">
    <input type="number" v-model="y" placeholder="Y (between 0 and 54)">
    <input type="text" v-model="color" placeholder="Color (Hex)">
    <div v-if="!sending">
      <button @click="submit()">Send</button>
    </div>
    <div v-else>
      <button disabled="disabled">Sending ...</button>
    </div>
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
      color: '#000000',
      sending: null
    }
  },
  methods: {
    pos_to_id(x, y) {
      return 96 * y + x + 1;
    },
    submit() {
      this.sending = true;
      this.x = parseInt(this.x);
      this.y = parseInt(this.y);
      
      axios
        .post(`https://labs.apo.pm/docker/pixels-api/pixels/${this.pos_to_id(this.x, this.y)}/edit?color=${this.color.replace('#', '')}`)
        .then(() => {
          this.sending = false;
        })
        .catch(error => {
          alert('Une erreur s\'est produite lors de l\'enregistrement, merci de réessayer.' + error.message);
        })
    }
  }
}
</script>
