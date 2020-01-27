<template>
  <div>
    <button class="operation-button" v-show="flags.showMinus"  data-operation="minus">  {{ signs.minus }}  </button>
    <button class="operation-button" v-show="flags.showMulti"  data-operation="multi">  {{ signs.multi }}  </button>
    <button class="operation-button" v-show="flags.showDivide" data-operation="divide"> {{ signs.divide }} </button>
  </div>
</template>


<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState([
      'flags',
      'signs'
    ])
  }
}
</script>