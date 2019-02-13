/*
 * @Author: whj 
 * @Date: 2018-11-22 16:17:53 
 * @Last Modified by: whj
 * @Last Modified time: 2019-02-13 13:45:31
 */

import http from '@/assets/js/https';

export default {

    userPower(cb) {
        http.get('admin/userPower', {}, cb);
    },

    userList(data, cb) {
        http.get('admin/userList', data, cb);
    },

    todoList(data, cb) {
        http.get('admin/todoList', data, cb);
    },

    messageList(data, cb) {
        http.get('admin/messageList', data, cb);
    },

    // 创建签到奖励
    awardCreate(data, cb) {
        http.post('admin/award/daily/add', data, cb);
    },
    awardList(data, cb) {
        http.get('admin/award/daily/list', data, cb);
    },
    awardUpdate(data, cb) {
        http.post('admin/award/daily/update', data, cb);
    },
    awardLogList(data, cb) {
        http.get('admin/award/log', data, cb);
    },

    // 签到记录
    signInList(data, cb) {
        http.get('admin/signIn/list', data, cb);
    },

    // 姨妈日记记录
    auntList(data, cb) {
        http.get('admin/aunt/list', data, cb);
    }
}