import Vue from 'vue';
import Router from 'vue-router';
import routes from './routes';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        ...routes,
        {
            path: '*',
            component: () => import(/* webpackChunkName: "404" */ '../views/NotFound.vue'),
        },
    ],
});

// This callback runs before every route change, including on page load.
router.beforeEach(function (to, from, next) {

    next();
});

// Register global after hooks. Cannot affect the navigation
router.afterEach(() => {
    // ...
});

export default router;
