const Login = () =>
  import (['./login/index.vue']);

export default {
  routes: [{
    path: '/',
    component: Login
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/layout',
    component: () =>
      import (['./layout/index.vue']),
    children: [{
      path: 'dashboard',
      meta: {
        auth: true
      },
      component: () =>
        import (['./dashboard/index.vue'])
    }, {
      path: 'trial',
      meta: {
        auth: true
      },
      component: () =>
        import (['./trial/index.vue'])
    }, {
      path: 'judge',
      meta: {
        auth: true
      },
      component: () =>
        import (['./judge/index.vue'])
    }, {
      path: 'cases',
      meta: {
        auth: true
      },
      component: () =>
        import (['./cases/index.vue'])
    }, {
      path: 'demo',
      meta: {
        auth: true
      },
      component: () =>
        import (['./demo/index.vue'])
    }]
  }]
}
