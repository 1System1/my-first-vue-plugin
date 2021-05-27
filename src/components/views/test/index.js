import TestIndex from './src/index';

/* istanbul ignore next */
TestIndex.install = function(Vue) {
  Vue.component(TestIndex.name, TestIndex);
};

export default TestIndex;
