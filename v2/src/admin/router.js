import Index from './index.vue';
import Todolist from './views/todolist.vue';
import UserList from './views/userlist.vue';
import MessageList from './views/message.vue';

export default [{
    path: '/admin',
    component: Index,
    name: 'admin',
    children: [{
        path: 'todolist',
        name: 'admin.todolist',
        component: Todolist
    }, {
        path: 'userlist',
        name: 'admin.userlist',
        component: UserList
    }, {
        path: 'messagelist',
        name: 'admin.messagelist',
        component: MessageList
    }]
}]