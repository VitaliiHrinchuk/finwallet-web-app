import httpFactory from '../http/factory';
let URL = localStorage.getItem('API_URL');
if (!URL) URL = process.env.VUE_APP_API_URL;
const http = httpFactory(URL);

const api = {
  auth: {
    login: function(params) {
      return http.post('/auth/login', params);
    },
    // register: function(params) {
    //   return http.post('/register', params);
    // },

    // list: function() {
    //   return http.get('/users');
    // },
    // update: function(uuid, params) {
    //   return http.put(`/users/${uuid}`, params);
    // },
  },
  user: {
    iam: function() {
      return http.get('/user/iam');
    },
  },
  accounts: {

  },
  categories: {

  },
  tags: {

  },
  transactions: {

  },

};

export default api;
