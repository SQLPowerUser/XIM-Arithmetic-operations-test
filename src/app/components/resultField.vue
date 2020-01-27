<template>
  <input type="text" readonly class="resultField" :value="result">
</template>

<style>
  .resultField {
    background: linear-gradient(to bottom, #fff,#f2f2f2);
  }
</style>

<script>
import { mapState } from 'vuex';

export default {
    computed: {
    ...mapState([
      'result'
    ])
  }
}
</script>