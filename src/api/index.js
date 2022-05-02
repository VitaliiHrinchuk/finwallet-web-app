import httpFactory from '../http/factory';
let URL = localStorage.getItem('API_URL');
if (!URL) URL = process.env.VUE_APP_API_URL;
const http = httpFactory(URL);

const api = {
  auth: {
    login(params) {
      return http.post('/auth/login', params);
    },
    register: function(params) {
      return http.post('/auth/register', params);
    },

  },
  user: {
    iam() {
      return http.get('/user/iam');
    },
  },
  account: {
    browse(params = {}) {
      return http.get('/accounts', params)
    },
    create(body){
      return http.post(`/accounts`, body);
    },
    read(id) {
      return http.get(`/accounts/${id}`);
    },
    update(id, body) {
      return http.patch(`/accounts/${id}`, body);
    },
    remove(id){
      return http.delete(`/accounts/${id}`);
    },
  },
  analytics: {
    fetch(params = {}) {
      return http.get('/accounts/analytics', params)
    },

  },
  category: {
    browse(params = {}) {
      return http.get('/category', params)
    },
    create(body){
      return http.post(`/category`, body);
    },
    read(id) {
      return http.get(`/category/${id}`);
    },
    update(id, body) {
      return http.patch(`/category/${id}`, body);
    },
    remove(id){
      return http.delete(`/category/${id}`);
    }
  },
  tag: {
    browse(params = {}) {
      return http.get('/tag', { params })
    },
    create(body){
      return http.post(`/tag`, body);
    },
    read(id) {
      return http.get(`/tag/${id}`);
    },
    update(id, body) {
      return http.patch(`/tag/${id}`, body);
    },
    remove(id){
      return http.delete(`/tag/${id}`);
    }
  },
  transaction: {
    browse(params = {}) {
      return http.get('/transaction', params)
    },
    create(body){
      return http.post(`/transaction`, body);
    },
    read(id) {
      return http.get(`/transaction/${id}`);
    },
    update(id, body) {
      return http.patch(`/transaction/${id}`, body);
    },
    remove(id){
      return http.delete(`/transaction/${id}`);
    }
  },
};

export default api;
