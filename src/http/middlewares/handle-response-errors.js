import store from '../../store';
import _ from 'lodash';
export default {
  type: 'response',
  error: (error) => {
    let status = _.get(error, 'response.status', null);
    let messages = _.get(error, 'response.data.errors', null);
    let data = _.get(error, 'response.data', null);

    store.dispatch('message/put', {
      type: 'error',
      text: data.message || data.exception,
    });
    let auth = store.state.auth.authenticated;
    // let refreshing = store.state.auth.attempting;
    if (status == 401 && auth == true) {
      store.dispatch('auth/logout');

    }
    if (status == 401) {
      // let payload = {
      //   key: 'login',
      //   value: data.error_description,
      // };
      //   store.dispatch('errors/put', payload);
    }
    if (status == 403) {
      // client.cancelAll();

      // store.dispatch('errors/put', {
      //   key: 'error',
      //   value: 'You have no access to this page.',
      // });
      // return router.go(-1);
    }
    if (status == 404) {
      // client.cancelAll();
      // store.dispatch('errors/put', {
      //   key: 'error',
      //   value: '404',
      // });
    }
    if (status == 422) {
      /*
      store.dispatch('errors/put', {
        key: 'error',
        value: 'Your input is invalid.'
      });
      */
      store.dispatch('errors/fromResponse', error.response.data);
    }

    if (status == 500) {
      // store.dispatch('errors/put', {
      //   key: 'error',
      //   value: 'We have a problem on our server. Please try again later.',
      // });
    }

    if (messages != null) {
      // store.dispatch('errors/fromResponse', error.response.data);
    }

    return Promise.reject(error);
  },
};
