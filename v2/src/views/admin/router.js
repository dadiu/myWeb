import Index from './index.vue';
import Todolist from './todolist.vue';

export default [{
    path: '/admin',
    component: Index,
    children: [{
        path: 'todolist',
        name: 'admin.todolist',
        component: Todolist
    }]
}]