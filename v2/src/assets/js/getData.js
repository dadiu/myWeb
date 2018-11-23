/*
 * @Author: whj 
 * @Date: 2018-11-12 11:47:12 
 * @Last Modified by: whj
 * @Last Modified time: 2018-11-21 18:26:01
 */

import http from '@/assets/js/https';

export default {

    /////////////////////////////////////////////////
    // 注册 
    userRegister(data, cb) {
        http.post('/user/register', data, cb);
    },

    // 登录
    userLogin(data, cb) {
        http.post('/user/login', data, cb);
    },

    // 获取用户信息
    userInfo(cb) {
        http.get('/user/info', {}, cb);
    },

    // 注销
    userLogout(cb) {
        http.get('/user/logout', {}, cb);
    },


    /////////////////////////////////////////////////
    // 添加todo
    todoAdd(data, cb) {
        http.get('/todo/add', data, cb);
    },

    // 今天 未来 过去
    todoList(data, cb) {
        http.get('/todo/list', data, cb);
    },

    // 改变状态
    todoChangeStatus(data, cb) {
        http.get('/todo/status', data, cb);
    },

    // 更新
    todoUpdate(data, cb) {
        http.get('/todo/update', data, cb);
    },

    // 删除
    todoDelete(data, cb) {
        http.get('/todo/delete', data, cb);
    },

    /////////////////////////////////////////////////
    // 基础信息
    baseInfo(cb) {
        http.get('/base/info', {}, cb);
    },
}