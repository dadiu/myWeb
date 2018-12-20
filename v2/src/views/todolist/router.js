export default [{
    path: '/todo',
    component: (resolve) => require(['./index.vue'], resolve),
    children: [{
        path: 'list',
        name: 'todo.list',
        component: (resolve) => require(['./list.vue'], resolve)
    }]
}]