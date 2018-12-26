/*
 * @Author: whj 
 * @Date: 2018-11-22 16:17:53 
 * @Last Modified by: whj
 * @Last Modified time: 2018-12-26 13:47:41
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
    }
}