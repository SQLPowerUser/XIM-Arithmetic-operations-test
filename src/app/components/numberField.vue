<template>
  <div>
    <input
      type="text"
      @input="checkValues"
      v-model="value"
      @keydown="validateKeys"
    >

    <p class="message">
      <svg width="16" height="16" viewBox="0 0 16 16" v-show="msg().errLevel == 'error'">
        <path fill="red" d="M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z" />
      </svg>
      <svg  width="20" height="24" viewBox="0 0 320 320" v-show="msg().errLevel == 'warning'">
        <path style="fill:#fc0;" d="M21.617,290.246h277.604c9.469,0,17.013-4.553,20.168-12.184c2.904-7.011,1.36-14.8-4.107-21.212 L180.497,39.684l-1.333-1.333c-5.009-5.009-11.667-7.767-18.748-7.767c-7.082,0-13.739,2.758-18.743,7.767l-1.333,1.333 L5.55,256.844c-5.466,6.413-7.016,14.207-4.106,21.212C4.603,285.688,12.142,290.246,21.617,290.246z M160.416,69.213 l116.934,188.393H43.487L160.416,69.213z"/>
        <path style="fill:#fc0;" d="M160.416,105.345c-9.197,0-16.654,7.457-16.654,16.654v71.388c0,9.197,7.457,16.654,16.654,16.654 s16.654-7.457,16.654-16.654v-71.388C177.076,112.802,169.619,105.345,160.416,105.345z"/>
        <circle style="fill:#fc0;" cx="160.248" cy="234.903" r="16.486"/>
      </svg>

      <sup :class="msg().errLevel"> {{ msg().msgText }} </sup>
    </p>
  </div>
</template>


<style>
.message {
  position: absolute;
  display: flex;
  align-items: center;
}
.error {
  color: red;
}
.warning {
  color: #fc0;
}
</style>


<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      value: '',
      keys: ['0','1','2','3','4','5','6','7','8','9','Backspace','Del','Delete','F5','Tab','Home','End'],
    }
  }, // data

  computed: {
    ...mapState([
      'errLevel',
      'msgText'
    ]),
    num() {
      return this.$attrs['data-num'];
    }
  }, // computed

  methods: {
    msg() {
      return {
        errLevel: this.errLevel[this.num],
        msgText: this.msgText[this.num]
      }
    },

    validateKeys(e) {
      if (!this.keys.includes(e.key)) {
        e.preventDefault();
        return false;
      }
    },

    checkValues() {
      this.value = this.value.replace(/ /g,'').replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");

      this.$store.commit({
        type:  'setNums',
        num:   this.num,
        value: this.value.trim()
      });
      this.$store.commit('setMessages', this.num);
      this.$store.commit('runOperation');
    }
  }, // methods

  created() {
    this.$store.commit('setMessages', this.num);
  }
} // export default
</script>