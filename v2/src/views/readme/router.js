export default [{
    path: '/md',
    component: (resolve) => require(['./index.vue'], resolve),
    name: 'md',
    children: [{
        path: ':page',
        name: 'md.list',
        component: (resolve) => require(['./md.vue'], resolve)
    }, ]
}]