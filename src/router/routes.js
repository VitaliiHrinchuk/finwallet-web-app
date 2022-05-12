import Home from '../views/Home.vue';

let routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login.index',

    component: () =>
      import(
        /* webpackChunkName: "login.index" */
        '../views/auth/AuthLogin.vue'
      ),
  },
  {
    path: '/accounts/',
    name: 'account.index',
    meta: {
      auth: true,
    },
    component: () =>
      import(
        /* webpackChunkName: "accounts.index" */
        '../views/account/AccountsList.vue'
      ),
  },
  {
    path: '/categories/',
    name: 'category.list',
    meta: {
      auth: true,
    },
    component: () =>
        import(
            /* webpackChunkName: "category.list" */
            '../views/category/CategoryList.vue'
            ),
  },
  // {
  //   path: '/register',
  //   name: 'register.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "Register.index" */
  //
  //       '../views/Register.vue'
  //     ),
  // },
  // {
  //   path: '/containers/',
  //   name: 'containers.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "containers.index" */
  //
  //       '../views/containers/ContainersIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'containers.list',
  //       meta: {
  //         auth: true,
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "containers.list" */
  //
  //           '../views/containers/ContainersList.vue'
  //         ),
  //     },
  //     {
  //       path: 'create',
  //       name: 'containers.create',
  //       meta: {
  //         auth: true,
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "containers.create" */
  //
  //           '../views/containers/ContainersCreate.vue'
  //         ),
  //     },
  //     {
  //       path: 'inspect/{id}',
  //       name: 'containers.inspect',
  //       meta: {
  //         auth: true,
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "containers.inspect" */
  //
  //           '../views/containers/ContainersInspect.vue'
  //         ),
  //     },
  //     {
  //       path: 'show/{id}',
  //       name: 'containers.show',
  //       meta: {
  //         auth: true,
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "containers.show" */
  //
  //           '../views/containers/ContainersShow.vue'
  //         ),
  //     },
  //     {
  //       path: 'stats/{id}',
  //       name: 'containers.stats',
  //       meta: {
  //         auth: true,
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "containers.stats" */
  //
  //           '../views/containers/ContainersStats.vue'
  //         ),
  //     },
  //   ],
  //   // children: [
  //   //   {
  //   //     path: 'list',
  //   //     name: 'users.list',
  //   //     component: () =>
  //   //       import(
  //   //         /* webpackChunkName: "users.list" */
  //
  //   //         '../views/users/UsersList.vue'
  //   //       ),
  //   //   },
  //   //   {
  //   //     path: 'show/:uuid',
  //   //     name: 'users.show',
  //   //     component: () =>
  //   //       import(
  //   //         /* webpackChunkName: "users.show" */
  //
  //   //         '../views/users/UsersShow.vue'
  //   //       ),
  //   //   },
  //   // ],
  // },
  //

  // {
  //   path: '/images/create',
  //   name: 'images.create',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "images.create" */
  //
  //       '../views/images/ImagesCreate.vue'
  //     ),
  // },
  //
  // {
  //   path: '/volumes/',
  //   name: 'volumes.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "volumes.index" */
  //
  //       '../views/volumes/VolumesIndex.vue'
  //     ),
  // },
  //
  // {
  //   path: '/volumes/create',
  //   name: 'volumes.create',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "volumes.create" */
  //
  //       '../views/volumes/VolumesCreate.vue'
  //     ),
  // },
  //
  // {
  //   path: '/networks/',
  //   name: 'networks.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "networks.index" */
  //
  //       '../views/network/NetworksIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'networks.list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "networks.list" */
  //
  //           '../views/network/NetworksList.vue'
  //         ),
  //     },
  //     {
  //       path: 'create',
  //       name: 'networks.create',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "networks.create" */
  //
  //           '../views/network/NetworksCreate.vue'
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: '/preset/',
  //   name: 'presets.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "presets.index" */
  //
  //       '../views/presets/PresetsIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'presets.list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "presets.list" */
  //           '../views/presets/PresetsList.vue'
  //         ),
  //     },
  //     {
  //       path: 'custom',
  //       name: 'presets.custom',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "presets.custom" */
  //           '../views/presets/PresetCustomCreate.vue'
  //         ),
  //     },
  //   ],
  // },
  //
  // {
  //   path: '/users/',
  //   name: 'users.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "users.index" */
  //
  //       '../views/users/UsersIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'users.list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "users.list" */
  //           '../views/users/UsersList.vue'
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: '/domains/',
  //   name: 'domains.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "domains.index" */
  //
  //       '../views/domains/DomainsIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'domains.list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "domains.list" */
  //           '../views/domains/DomainsList.vue'
  //         ),
  //     },
  //     {
  //       path: 'create',
  //       name: 'domains.create',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "domains.create" */
  //           '../views/domains/DomainsCreate.vue'
  //         ),
  //     },
  //   ],
  // },
  // {
  //   path: '/projects/',
  //   name: 'projects.index',
  //   meta: {
  //     auth: true,
  //   },
  //   component: () =>
  //     import(
  //       /* webpackChunkName: "projects.index" */
  //
  //       '../views/projects/ProjectsIndex.vue'
  //     ),
  //   children: [
  //     {
  //       path: 'list',
  //       name: 'projects.list',
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "projects.list" */
  //
  //           '../views/projects/ProjectsList.vue'
  //         ),
  //     },
  //   ],
  // },
];

export default routes;
