export default {
  set: (key, value) => {
    const localStorage = window.localStorage;
    if (localStorage && key && value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    } else {
      alert("LocalStorage isn't support!");
      return false;
    }
  },
  get: key => {
    const localStorage = window.localStorage;
    if (localStorage && key) {
      return JSON.parse(window.localStorage.getItem(key));
    } else {
      alert("LocalStorage isn't support!");
      return false;
    }
  },
  empty: () => {
    const localStorage = window.localStorage;
    if (localStorage) {
      window.localStorage.clear();
      return true;
    } else {
      alert("LocalStorage isn't support!");
      return false;
    }
  },
  remove: key => {
    const localStorage = window.localStorage;
    if (localStorage && key) {
      window.localStorage.removeItem(key);
      return true;
    } else {
      alert("LocalStorage isn't support!");
      return false;
    }
  }
};
