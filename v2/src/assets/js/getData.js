/*
 * @Author: whj 
 * @Date: 2018-11-12 11:47:12 
 * @Last Modified by: whj
 * @Last Modified time: 2018-12-26 17:10:52
 */

import http from '@/assets/js/https';

export default {


    /////////////////////////////////////////////////
    // 基础信息
    baseInfo(cb) {
        http.get('base/info', {}, cb);
    },

    /////////////////////////////////////////////////
    // 注册 
    userRegister(data, cb) {
        http.post('user/register', data, cb);
    },

    // 登录
    userLogin(data, cb) {
        http.post('user/login', data, cb);
    },

    // 获取用户信息
    userInfo(cb) {
        http.get('user/info', {}, cb);
    },

    // 注销
    userLogout(cb) {
        http.get('user/logout', {}, cb);
    },


    /////////////////////////////////////////////////
    ////// - 每日一清
    // 添加
    todoAdd(data, cb) {
        http.get('todo/add', data, cb);
    },

    // 列表 = 今天 未来 过去
    todoList(data, cb) {
        http.get('todo/list', data, cb);
    },

    // 改变状态
    todoChangeStatus(data, cb) {
        http.get('todo/status', data, cb);
    },

    // 更新
    todoUpdate(data, cb) {
        http.get('todo/update', data, cb);
    },

    // 删除
    todoDelete(data, cb) {
        http.get('todo/delete', data, cb);
    },


    /////////////////////////////////////////////////
    ////// - 便签
    // 添加
    messageAdd(data, cb) {
        http.get('message/add', data, cb);
    },
    // 列表
    messageList(data, cb) {
        http.get('message/list', data, cb);
    },
    // 编辑
    messageUpdate(data, cb) {
        http.get('message/edit', data, cb);
    },
    // 删除
    messageDelete(data, cb) {
        http.get('message/delete', data, cb);
    },

    /////////////////////////////////////////////////
    ////// - 大姨妈
    // 列表
    auntList(cb) {
        http.get('aunt/list', {}, cb);
    },

    // 添加
    auntAdd(data, cb) {
        http.get('aunt/add', data, cb);
    },

    // 更新
    auntUpdate(data, cb) {
        http.get('aunt/update', data, cb);
    },

    // 搜索
    auntSearch(data, cb) {
        http.get('aunt/search', data, cb);
    },

    // 删除
    auntDelete(data, cb) {
        http.get('aunt/delete', data, cb);
    },

    /////////////////////////////////////////////////
    ////// - 签到

    // 签到奖励展示
    awardDaily(cb) {
        http.get('award/daily/list', {}, cb);
    }
}