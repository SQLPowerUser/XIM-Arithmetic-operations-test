export default {
  state: {
    flags: {
      showMinus:  false,
      showMulti:  true,
      showDivide: false,
    },
    signs: {
      plus:   '+',
      minus:  '−',
      multi:  '×',
      divide: '÷'
    },
    num01: '',
    num02: '',
    currentOperation: 'plus',
    errLevel: {},
    msgText: {},
    result: ''
  }, // state

  mutations: {
    setFlag(state, data) {
      state.flags[data.flag] = data.checked;
    },
    setCurrentOperation(state, data) {
      state.currentOperation = data;
    },
    setMsgKey(state,data) {
      state.msgKey = data;
    },
    setNums(state,data) {
      state[data.num] = data.value.replace(/ /g,'');
    },
    setMessages(state,num) {
      let errLevel = '';
      let msgText = '';
      let value = state[num];

      if(!value) {
        errLevel = 'error';
        msgText = 'Required field';
      }
      else
      if(!isFinite(value)) {
        errLevel = 'error';
        msgText = 'Value is not a number';
      }
      else
      if(state.num02 == 0 && num == 'num02' && state.currentOperation == 'divide') {
        errLevel = 'error';
        msgText = 'Cannot be divided by zero';
        setTimeout(function() {alert(msgText)}, 20);
      }
      else
      if(value == 0 && state.currentOperation == 'multi') {
        errLevel = 'warning';
        msgText = 'Multiplying by zero will be zero';
      }

      state.errLevel[num] = errLevel;
      state.msgText[num] = msgText;
    },
    runOperation(state) {
      let res = 0;
      let n1 = state.num01 ^ 0;
      let n2 = state.num02 ^ 0;
      switch (state.currentOperation) {
        case 'plus':
          res = n1 + n2;
          break;
        case 'minus':
          res = n1 - n2;
          break;
        case 'multi':
          res = n1 * n2;
          break;
        case 'divide':
          res = n1 / n2;
          break;
      } // switch

      let yesError = Object.values(state.errLevel).some(el => el == 'error');
      let parts = `${res}`.split('.');

      state.result = yesError || !isFinite(res) ? ''
      : parts[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ') + (parts[1] ? '.'+ parts[1] : '');
    } // runOperation
  }, // mutations
}

