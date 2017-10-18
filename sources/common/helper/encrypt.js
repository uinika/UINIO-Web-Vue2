import SHA from 'sha.js';

export default {
  token: {
    set(token) {
      if (token)
        sessionStorage.setItem('token', token);
    },
    get() {
      const token = sessionStorage.getItem('token')
      return token ? token : undefined;
    },
    empty() {
      sessionStorage.removeItem('token');
    }
  },
  sha(string) {
    return SHA('sha256').update(string, 'utf8').digest('hex');
  }
}
