/*
 * @Author: whj 
 * @Date: 2018-11-12 11:34:13 
 * @Last Modified by: whj
 * @Last Modified time: 2018-11-26 13:33:08
 */

module.exports = {

    // 时间格式化 'yyyy-mm-dd'
    dateFormat(val, format = "") {
        // console.log(val);
        let date = val ? new Date(val) : new Date();
        let _y = date.getFullYear().toString();
        let _m = date.getMonth() + 1;
        let _d = date.getDate();

        _m = _m < 10 ? '0' + _m : _m.toString();
        _d = _d < 10 ? '0' + _d : _d.toString();

        // return _y + format + _m + format + _d;
        return [_y, _m, _d].join(format);
    },

    // 星期格式化
    weekFormat(val, format = "星期") {
        let date = new Date(val);
        let week = date.getDay();
        let unWeek = ["日", "一", "二", "三", "四", "五", "六"];

        return format + unWeek[week];
    },

    // 时间详细格式化 'yyyy-mm-dd hh:mm:ss'
    dateDetailFormat(val, format = "") {
        // console.log(val);
        if (!val) {
            return '无';
        }

        let date = new Date(val);
        let _y = date.getFullYear();
        let _m = date.getMonth() + 1;
        let _d = date.getDate();
        let _h = date.getHours();
        let _minute = date.getMinutes();
        let _s = date.getSeconds();

        _m = _m < 10 ? '0' + _m : _m;
        _d = _d < 10 ? '0' + _d : _d;
        _h = _h < 10 ? '0' + _h : _h;
        _minute = _minute < 10 ? '0' + _minute : _minute;
        _s = _s < 10 ? '0' + _s : _s;

        // return _y + format + _m + format + _d;
        return [_y, _m, _d].join(format) + ' ' + [_h, _minute, _s].join(':');
    },

    // 表单排序
    todoListReset(list) {
        let status_0 = [];
        let status_1 = [];
        let status_2 = [];

        list.forEach(element => {
            if (element.status == 0) {
                status_0.push(element);
            } else if (element.status == 1) {
                status_1.push(element);
            } else if (element.status == 2) {
                status_2.push(element);
            }
        });

        return [].concat(status_0, status_2, status_1);
    },

    // 去掉空格
    trimFn(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
}