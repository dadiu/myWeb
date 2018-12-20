export default [{
    path: '/admin',
    component: (resolve) => require(['./index.vue'], resolve),
    name: 'admin',
    children: [{
        path: 'todolist',
        name: 'admin.todolist',
        component: (resolve) => require(['./views/todolist.vue'], resolve),
    }, {
        path: 'userlist',
        name: 'admin.userlist',
        component: (resolve) => require(['./views/userlist.vue'], resolve),
    }, {
        path: 'messagelist',
        name: 'admin.messagelist',
        component: (resolve) => require(['./views/message.vue'], resolve),
    }]
}]