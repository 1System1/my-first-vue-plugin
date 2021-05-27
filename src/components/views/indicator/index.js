import Indicator from './src';

/* istanbul ignore next */
Indicator.install = function(Vue) {
  Vue.component(Indicator.name, Indicator);
};

export default Indicator;
