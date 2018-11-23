/*
 * @Author: whj 
 * @Date: 2018-11-21 17:51:13 
 * @Last Modified by: whj
 * @Last Modified time: 2018-11-22 09:41:04
 */
import Vue from 'vue';
import router from '../../router.js';
import {
    Message,
    MessageBox
} from 'element-ui';
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

// import ElementUI from 'element-ui';

export default {
    get(url, data = {}, cb) {

        Vue.prototype.$http.get(url, {
            params: data
        }).then(res => {
            console.log(res.data);

            res = res.data;

            // 未登录
            if (res.code === 403) {

                Message({
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
}