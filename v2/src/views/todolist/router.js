import Index from './index.vue';
import List from './list.vue';

export default [{
    path: '/todo',
    component: Index,
    children: [{
        path: 'list',
        name: 'todo.list',
        component: List
    }]
}]