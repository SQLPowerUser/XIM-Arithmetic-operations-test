<template>
  <div class="main" id="main">

    <div class="main-header">
      <p class="main-header--title">Show additional buttons:</p>
      <label v-for="(value,flag) in this.$store.state.flags">
        <input type="checkbox" :value="flag" @input="toggleButton" :checked="value">
        {{ flag.slice(4) }}
      </label>
    </div>

    <div class="main-operations-list" @click="runOperation">
      <button class="operation-button" data-operation="plus"> + </button>
      <otherOperations></otherOperations>
    </div> <!-- class="main-operations-list" -->

    <div class="main-fields">
      <numberField data-num="num01"></numberField>
      <div class="main-fields--sign-text"> {{ signs[currentOperation] }} </div>
      <numberField data-num="num02"></numberField>
      <div class="main-fields--sign-text"> = </div>
      <resultField></resultField>
    </div> <!-- class="main-fields" -->

  </div> <!-- class="main" -->
</template>


<style>
.main {
  position: relative;
  display: grid;
  grid-template-areas:
    'header header'
    'operations-list fields'
  ;
  grid-template-columns: [operations-list] 50px [fields] 1fr;
  margin: auto;
  width: 90%;
}

.main-header {
  grid-area: header;
  margin-bottom: 5px;
  color: #555;
}

.main-header--title {
  margin-bottom: 7px;
  padding: 5px;
  box-shadow: 1px 1px 5px #ccc;
  border-radius:5px;
}

.main-operations-list {
  grid-column: operations-list;
}

.main-fields {
  grid-column: fields;
  text-align: right;
  padding-left: 20px;
}

.main-fields--sign-text {
  font-size: 2em;
  margin: 9px 0;
}
</style>


<script>
import { mapState } from 'vuex';

import numberField from './components/numberField.vue';
import resultField from './components/resultField.vue';
import otherOperations from './components/otherOperations.vue';

export default {
  computed: {
    ...mapState([
      'flags',
      'currentOperation',
      'signs'
    ])
  }, // computed

  methods: {
    toggleButton(e) {
      this.$store.commit({
        type: 'setFlag',
        flag:  e.target.value,
        checked: e.target.checked
      });
    },

    runOperation(e) {
      this.$store.commit('setCurrentOperation', e.target.dataset.operation);
      this.$store.commit('setMessages', 'num01');
      this.$store.commit('setMessages', 'num02');
      this.$store.commit('runOperation');
    }
  }, // methods

  components: {
    numberField,
    resultField,
    otherOperations
  }
}
</script>