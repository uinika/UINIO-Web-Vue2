const Login = () => import ("./login/index.vue");

export default {
  routes: [{
    path: '/',
    component: Login
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/layout',
    component: () => import ("./layout/index.vue"),
    children: [{
      path: 'dashboard',
      meta: {
        auth: true
      },
      component: () => import ("./dashboard/index.vue")
    }, {
      path: 'tool',
      meta: {
        auth: true
      },
      component: () => import ("./tool/index.vue")
    }, {
      path: 'demo',
      meta: {
        auth: true
      },
      component: () => import ("./demo/index.vue")
    }]
  }]
}
