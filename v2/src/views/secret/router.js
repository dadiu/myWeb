import Index from './index.vue';
import Aunt from './aunt.vue'

export default [{
    path: '/secret',
    component: Index,
    children: [{
        path: 'aunt',
        name: 'secret.aunt',
        component: Aunt
    }]
}]