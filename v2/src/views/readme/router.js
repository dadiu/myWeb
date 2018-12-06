import Index from './index.vue';
import Md from './md.vue';

export default [{
    path: '/md',
    component: Index,
    name: 'md',
    children: [{
        path: ':page',
        name: 'md.list',
        component: Md,
    }, ]
}]