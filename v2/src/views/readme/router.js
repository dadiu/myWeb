export default [{
    path: '/md',
    component: (resolve) => require(['./index.vue'], resolve),
    name: 'md',
    children: [{
            path: 'mongodb',
            name: 'md.mongodb',
            component: (resolve) => require(['./md/mongodb.md'], resolve)
        }, {
            path: 'mongodb-user',
            name: 'md.mongodb-user',
            component: (resolve) => require(['./md/mongodb-user.md'], resolve)
        }, {
            path: 'mongodb-dump',
            name: 'md.mongodb-dump',
            component: (resolve) => require(['./md/mongodb-dump.md'], resolve)
        }, {
            path: 'centos7-node',
            name: 'md.centos7-node',
            component: (resolve) => require(['./md/centos7-node.md'], resolve)
        },

        // 前端备忘 
        {
            path: 'vue-compress',
            name: 'md.vue-compress',
            component: (resolve) => require(['./md/desc/vue-compress.md'], resolve)
        },

        // 接口文档
        {
            path: 'user',
            name: 'md.user',
            component: (resolve) => require(['./md/api/user.md'], resolve)
        }, {
            path: 'todo',
            name: 'md.todo',
            component: (resolve) => require(['./md/api/todo.md'], resolve)
        }, {
            path: 'message',
            name: 'md.message',
            component: (resolve) => require(['./md/api/message.md'], resolve)
        }, {
            path: 'aunt',
            name: 'md.aunt',
            component: (resolve) => require(['./md/api/aunt.md'], resolve)
        }, {
            path: 'admin',
            name: 'md.admin',
            component: (resolve) => require(['./md/api/admin.md'], resolve)
        }
    ]
}]