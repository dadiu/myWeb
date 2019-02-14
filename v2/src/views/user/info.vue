<template>
  <div class="wrap">

    <div class="user-info">
      <!-- base -->
      <div class="user-info-base">
        <p class="user-info-avatar">
        </p>
        <div>
          <p class="user-info-nick">{{list.nick}}</p>
          <p class="user-info-username">{{list.username}}</p>
        </div>
      </div>

      <div class="user-info-main">
        <!-- <p class="user-info-title">统计信息</p> -->
        <!-- tool -->
        <div class="user-info-tool">

          <div class="user-info-item">
            <p class="user-info-label">
              <i class="iconfont">&#xe8ea;</i>积分：
              {{list.tool.point.count}}
            </p>

            <el-button size="mini" @click="historyFn('point')">记录</el-button>
            <el-button
              size="mini"
              disabled="true"
            >兑换</el-button>
          </div>

          <div class="user-info-item">
            <p class="user-info-label">
              <i class="iconfont">&#xe8eb;</i>补签卡：
              {{list.tool.pushCard.count}}
            </p>
            <el-button size="mini" @click="historyFn('pushCard')">记录</el-button>
          </div>

        </div>

        <!-- total -->
        <div class="user-info-total">

          <div class="user-info-item">
            <p class="user-info-label"><i class="el-icon-bell"></i>每日一清:</p>

            <el-tag
              size="medium"
              type="success"
            >已完成 {{list.todolist.success}}</el-tag>
            <el-tag size="medium">搁置 {{list.todolist.wait}}</el-tag>
            <el-tag
              size="medium"
              type="danger"
            >未完成 {{list.todolist.danger}}</el-tag>

          </div>

          <div class="user-info-item">
            <p class="user-info-label"><i class="el-icon-document"></i>便签 :</p>

            <el-tag
              size="medium"
              type="danger"
            >紧急 {{list.message.danger}}</el-tag>
            <el-tag
              size="medium"
              type="info"
            >普通 {{list.message.default}}</el-tag>

          </div>

        </div>

        <!-- time -->
        <div class="user-info-time">
          <p class="user-info-time-item">
            <i class="el-icon-time"></i>
            注册时间： {{list.createTime | dateDetailFormat("-")}}
          </p>
          <p class="user-info-time-item">
            <i class="el-icon-time"></i>
            最近登录 ： {{list.lastLoginTime | dateDetailFormat("-")}}
          </p>
        </div>
      </div>
    </div>

    <!-- dialog -->
    <ViewHistory
      :title="title"
      :dialogTableVisible="historyVisible"
      :tableData="tableData"
    />


  </div>
</template>

<script>
import getData from "@/assets/js/getData";
import filters from "@/assets/js/filters";
import {ViewHistory} from '@/components';
export default {
  components:{ViewHistory},
  data() {
    return {
      list: {
        nick: "",
        username: "",
        lastLoginTime: "",
        createTime: "",
        todolist: {},
        message: {},
        tool: {
          point: 0,
          pushCard: 0
        }
      },
      title:'',
      historyVisible : false,
      tableData:[]
    };
  },
  filters: {
    dateDetailFormat: filters.dateDetailFormat
  },

  mounted() {
    this.init();
  },

  methods: {
    init() {
      getData.userTotal(res => {
        this.list = res.data;
      });
    },

    historyFn(type){
      let unType = {
        'point' : '积分',
        'pushCard':'补签卡'
      };

      getData.userHistory({name : type},(res)=>{
        this.title = unType[type] + ' - 仅显示最新30条';
        this.historyVisible = true;
        this.tableData = res.list;
      })
    }
  }
};
</script>
