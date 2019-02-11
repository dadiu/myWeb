/*
 * @Author: whj 
 * @Date: 2019-02-11 10:58:42 
 * @Last Modified by: whj
 * @Last Modified time: 2019-02-11 11:04:42
 */

import Vue from 'vue'

Array.prototype.remove = function(val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};

// todolist 内容换行
Vue.prototype.descSplit = function(val) {
    return val.split('\n').join('<br/>');
};