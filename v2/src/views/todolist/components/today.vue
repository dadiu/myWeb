<template>
  <div>
    <p class="todo-day">
      <i class="el-icon-date"></i>
      2018-11-08 星期四
      <br />
      <!-- <el-progress :percentage=progress v-if="pst === 'hd'" :text-inside="true"></el-progress> -->
    </p>
    <ul class="todo-day-list">
      <li v-for="(item,idx) in today" :key="item.today" :class="['todo-day-item', {'fn-ok': item.status == 1}]" @click="changeStatus(idx)">

        <span class="todo-day-status" v-if="item.status == 0"></span>
        <span class="todo-day-status" v-if="item.status == 1">
          <i class="el-icon-check"></i>
        </span>

        <p class="todo-day-info">
          {{item.info}}
        </p>

        <p class="todo-day-type" v-if="item.types">
          <el-tag type="info" v-for="type in item.types" :key="type.k" size="mini">
            {{type}}
          </el-tag>
        </p>
        <p class="todo-day-type" v-else>
          <el-tag type="info" size="mini">无</el-tag>
        </p>
      </li>
    </ul>
    <el-progress :percentage=progress v-if="pst === 'ft'" :text-inside="true" :stroke-width="16" ></el-progress>
  </div>

</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      require: false
    }
  },
  data() {
    return {
      today: [
        {
          status: 0,
          info: "你是魔鬼么?",
          stamp: "2018-11-08 13:00",
          types: ["布小蛮", "11.19上线"]
        },
        {
          status: 1,
          info: "不是",
          stamp: "2018-11-08",
          types: ["不烦", "wgc", "逻辑"]
        },
        {
          status: 0,
          info: "是的是的",
          stamp: "2018-11-08"
        },
        {
          status: 0,
          info: "11月版本",
          stamp: "2018-11-08",
          types: ["不烦"]
        }
      ],
      pst: "hd",
      progress: 0
    };
  },
  mounted() {
    // console.log(this.list);
    if(this.list){
      this.today = this.list;
      this.pst = 'ft';
    }
    this.progressFn();
  },
  methods: {
    progressFn() {
      let total = this.today.length;
      let successCount = 0;
      this.today.forEach(element => {
        if (element.status == 1) {
          successCount += 1;
        }
      });

      this.progress = (successCount / total) * 100;
    },

    changeStatus(idx) {
      this.today[idx].status = !this.today[idx].status;
      this.progressFn();
    }
  }
};
</script>

