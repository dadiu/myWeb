export default [{
    path: '/forget',
    name: 'forget',
    component: (resolve) => require(['./forget.vue'], resolve)
}, {
    path: '/login',
    name: 'login',
    component: (resolve) => require(['./login.vue'], resolve)
}, {
    path: '/register',
    name: 'register',
    component: (resolve) => require(['./register.vue'], resolve)
}, {
    path: '/user',
    name: 'user',
    component: (resolve) => require(['./info.vue'], resolve)
}]