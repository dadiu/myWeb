/*
 * @Author: whj 
 * @Date: 2018-11-23 15:06:42 
 * @Last Modified by: whj
 * @Last Modified time: 2019-02-13 13:29:10
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
    },
    award: {
        type: 'awardlist',
        desc: '奖励配置',
        path: 'admin.awardlist'
    },
    awardLog: {
        type: 'awardLog',
        desc: '道具日志',
        path: 'admin.awardLog'
    },
    signInLog: {
        type: 'signInLog',
        desc: '签到日志',
        path: 'admin.signInLog'
    },
    auntLog: {
        type: 'auntLog',
        desc: '秘密基地',
        path: 'admin.auntLog'
    }
};