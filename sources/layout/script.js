import Http from '../common/helper/http.js';
import Encrypt from '../common/helper/encrypt.js';
export default {
  data() {
    return {
      search: '',
      type: ''
    }
  },
  methods: {
    onSearch() {
      console.log('on Search!');
    }
  }
};
