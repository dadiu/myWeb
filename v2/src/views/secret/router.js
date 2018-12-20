export default [{
    path: '/secret',
    component: (resolve) => require(['./index.vue'], resolve),
    children: [{
        path: 'aunt',
        name: 'secret.aunt',
        component: (resolve) => require(['./aunt.vue'], resolve)
    }]
}]