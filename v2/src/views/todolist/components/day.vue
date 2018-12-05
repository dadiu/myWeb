<template>
  <div v-if="istoday == 0">
    <!-- today -->
    <p class="todo-day">
      <i class="el-icon-date"></i>
      {{Date.parse(new Date()) | dateFormat('-')}}
      {{Date.parse(new Date()) | weekFormat}}
    </p>
    <el-progress
      :percentage=progress
      :text-inside="true"
      :stroke-width="16"
      class="mb-10 todo-between-progress"
    >
    </el-progress>
    <el-row class="todo-between">
      <el-col :span="12">
        <div class="todo-white">
          <ViewDayItem
            v-if="todayList.iswait.length>0"
            :list="todayList.iswait"
            @changeStatus="changeStatus"
            @editFn="editFn"
          />

          <!-- none -->
          <div
            class="m-none"
            v-else
          >
            <img src="~@/assets/img/todo-iswait-none.png" />
            <p>
              <el-button
                type="primary"
                @click="$emit('showCreatFn')"
              >ok</el-button>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="todo-gray">
          <ViewDayItem
            v-if="todayList.isok.length>0"
            :list="todayList.isok"
            @changeStatus="changeStatus"
            @editFn="editFn"
          />
          <!-- none -->
          <p
            class="m-none"
            v-else
          >
            <img src="~@/assets/img/todo-isok-none.png" />
          </p>
        </div>
      </el-col>
    </el-row>

  </div>

  <!-- future || history -->
  <div v-else>
    <div
      class="todo-day"
      v-if="list && list.length > 0"
    >
      <i class="el-icon-date"></i>
      {{list[0].todoTime | dateFormat('-')}}
      {{list[0].todoTime | weekFormat}}


      <!-- future -->
      <el-progress
        v-if="istoday == 1"
        color="#ccc"
        :percentage=progress
        class="todo-progress"
      >
      </el-progress>

      <!-- history -->
      <el-progress
        v-if="istoday == -1"
        :status=progressStatus
        :percentage=progress
        class="todo-progress"
      >
      </el-progress>
    </div>

    <ViewListItem
      :list="list"
      @changeStatus="changeStatus"
      @editFn="editFn"
    />

  </div>

</template>

<script>
import ViewDayItem from "./day-item.vue";
import ViewListItem from "./list-item.vue";
import getData from "@/assets/js/getData";
import filters from "@/assets/js/filters";
export default {
  components: { ViewDayItem, ViewListItem },
  props: {
    list: {
      type: [Array, Object],
      required: true
    },
    showEditFn: { type: Function },
    showCreatFn:{type:Function},
    resetList: { type: Function },
    istoday: { type: String }
  },
  data() {
    return {
      pst: "hd",
      progress: 0,
      progressStatus:'',
      todayList: {
        iswait: [], // 未完成
        isok: [] // 已完成 || 搁置
      }
    };
  },
  filters: filters,
  mounted() {
    this.progressFn();
    this.todayListInit();
  },

  methods: {
    todayListInit() {
      let self = this;
      let waitArr = [];
      let okArr = [];

      this.list.forEach(element => {
        if (element.status == 0) {
          waitArr.push(element);
        } else {
          okArr.push(element);
        }
      });

      this.todayList.iswait = waitArr;
      this.todayList.isok = okArr;
    },

    progressFn() {
      let total = this.list.length;
      if (total == 0) {
        this.progress = 0;
        return;
      }

      let successCount = 0;
      this.list.forEach(element => {
        if (element.status == 1) {
          successCount += 1;
        }
      });

      this.progress = Math.round((successCount / total) * 100);

      this.progressStatus = this.progress == 100 ? 'success' : 'exception';
    },

    changeStatus(item) {
      let self = this;

      let data = {
        status: item.status == 0 ? 1 : 0,
        id: item._id
      };

      getData.todoChangeStatus(data, res => {
        self.$emit("resetList");
      });
    },

    editFn(item) {
      this.$emit("showEditFn", item);
    }
  }
};
</script>

