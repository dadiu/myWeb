import Index from './index.vue';
import Mounth from './mounth.vue'

export default [{
    path: '/secret',
    component: Index,
    children: [{
        path: 'mounth',
        name: 'secret.mounth',
        component: Mounth
    }]
}]