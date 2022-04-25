import store from '../../store';
import _ from 'lodash';

export default {
  type: 'request',
  handler: (config) => {
    //config.headers['Accept-Language'] = locale;
    let token = _.get(store.state, 'auth.token');
    config.headers['Authorization'] = 'Bearer ' + token;

    return config;
  },
};
