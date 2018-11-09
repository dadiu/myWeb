import Forget from './forget.vue';
import Login from './login.vue';
import Register from './register.vue';


export default [{
    path: '/forget',
    name: 'forget',
    component: Forget
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/register',
    name: 'register',
    component: Register
}]