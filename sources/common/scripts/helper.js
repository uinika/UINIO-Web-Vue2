import echarts from 'echarts';

export const chart = (selector = '', option = {}) => {
  echarts.init(document.querySelector(selector)).setOption(option);
};
