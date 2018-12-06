import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

import User from '@/views/user/router'
import Todolist from '@/views/todolist/router'
import MessageRouter from '@/views/message/router'
import SecretRouter from '@/views/secret/router'

import MdRouter from '@/views/readme/router'
import Admins from '@/admin/router'


Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: Layout
        },
        ...User,
        ...Todolist,
        ...Admins,
        ...MessageRouter,
        ...MdRouter,
        ...SecretRouter
    ]
})