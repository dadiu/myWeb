/*
 * @Author: whj 
 * @Date: 2018-11-21 17:51:13 
 * @Last Modified by: whj
 * @Last Modified time: 2018-12-24 16:02:33
 */
import Vue from 'vue';

import axios from 'axios';

import router from '../../router.js';
import {
    Message,
    MessageBox
} from 'element-ui';

Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// 默认请求
Vue.prototype.$http = axios.create({
    baseURL: process.env.API_ROOT,
    timeout: 5000,
    withCredentials: true,
    headers: {}
})

// 自定义请求
var httpJson = axios.create({
    baseURL: process.env.API_ROOT,
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default {
    get(url, data = {}, cb) {

        Vue.prototype.$http.get(url, {
            params: data
        }).then(res => {
            // console.log(res.data);

            res = res.data;

            // 未登录
            if (res.code === 403) {

                // 获取基础信息接口 => 不提示
                if (url != '/user/info') {

                    Message({
                        type: 'warning',
                        message: `提示：请先登录`
                    })
                }

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

    postJson(url, data = {}, cb) {

        httpJson.post(url, data).then(res => {
            console.log(res.data);
            res = res.data;
            cb && cb(res);
        }).catch(error => {
            alert(error);
        })
    }
}