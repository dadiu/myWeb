import Index from './index.vue';
import List from './list.vue';

export default [{
    path: '/todolist',
    component: Index,
    children: [{
        path: 'list',
        name: 'todolist.list',
        component: List
    }]
}]