/*
 * @Author: whj 
 * @Date: 2018-11-23 15:06:42 
 * @Last Modified by: whj
 * @Last Modified time: 2018-12-03 17:43:54
 */
module.exports = {
    userlist: {
        type: 'userlist', // 开通权限名
        desc: '用户管理', // 菜单名
        path: 'admin.userlist' // 路由名
    },
    todolist: {
        type: 'todolist',
        desc: '每日一清',
        path: 'admin.todolist'
    },
    message: {
        type: 'messagelist',
        desc: '便签',
        path: 'admin.messagelist'
    }
};