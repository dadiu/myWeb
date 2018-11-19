/*
 * @Author: whj 
 * @Date: 2018-11-12 11:47:12 
 * @Last Modified by: whj
 * @Last Modified time: 2018-11-19 17:54:16
 */
import Vue from 'vue';
import router from '../../router.js';
import ElementUI from 'element-ui';

export default {

    // 通用 > get
    http: {
        get(url, data = {}, cb) {

            Vue.prototype.$http.get(url, {
                params: data
            }).then(res => {
                // console.log(res.data);

                res = res.data;

                // 未登录
                if (res.code === 403) {

                    ElementUI.Message({
                        type: 'warning',
                        message: `提示：请先登录`
                    })

                    router.push({
                        name: "login"
                    });

                    return;
                }

                cb && cb(res);

            }).catch(error => {
                alert(error);
            })
        },

        post(url, data = {}, cb) {

            Vue.prototype.$http.post(url, data).then(res => {
                console.log(res.data);
                res = res.data;
                cb && cb(res);
            }).catch(error => {
                alert(error);
            })
        },
    },

    /////////////////////////////////////////////////
    // 注册 
    userRegister(data, cb) {
        this.http.post('/user/register', data, cb);
    },

    // 登录
    userLogin(data, cb) {
        this.http.post('/user/login', data, cb);
    },

    // 获取用户信息
    userInfo(cb) {
        this.http.get('/user/info', {}, cb);
    },

    // 注销
    userLogout(cb) {
        this.http.get('/user/logout', {}, cb);
    },


    /////////////////////////////////////////////////
    // 添加todo
    todoAdd(data, cb) {
        this.http.get('/todo/add', data, cb);
    },

    // 今天 未来 过去
    todoList(data, cb) {
        this.http.get('/todo/list', data, cb);
    },

    // 改变状态
    todoChangeStatus(data, cb) {
        this.http.get('/todo/status', data, cb);
    },

    // 删除
    todoDelete(data, cb) {
        this.http.get('/todo/delete', data, cb);
    },

    // 更新
    todoUpdate(data, cb) {
        this.http.get('/todo/update', data, cb);
    },


    /////////////////////////////////////////////////
    // 基础信息
    baseInfo(cb) {
        this.http.get('/base/info', {}, cb);
    },
}