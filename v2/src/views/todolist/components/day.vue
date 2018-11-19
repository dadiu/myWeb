<template>
  <div>
    <p class="todo-day" v-if="isbetween">
      <i class="el-icon-date"></i>
      {{Date.parse(new Date()) | dateFormat('-')}}
      {{Date.parse(new Date()) | weekFormat}}
      <br />
    </p>

    <p class="todo-day" v-if="!isbetween && list && list.length > 0">
      <i class="el-icon-date"></i>
      {{list[0].todoTime | dateFormat('-')}}
      {{list[0].todoTime | weekFormat}}
      <br />
    </p>
    <!-- today -->
    <el-progress :percentage=progress v-if="isbetween" :text-inside="true" :stroke-width="16" class="mb-10 todo-between-progress">
    </el-progress>
    <el-row class="todo-between" v-if="isbetween">
      <el-col :span="12">
        <div class="todo-white">
          <ViewDayItem v-if="todayList.iswait.length>0" :list="todayList.iswait" @changeStatus="changeStatus" @editFn="editFn" @deleteFn="deleteFn" />
          <!-- none -->
          <div class="todo-none" v-else>
            <img src="~@/assets/img/todo-iswait-none.png" />
            <p>
              <el-button type="primary" @click="$emit('showEditFn', false)">ojbk</el-button>
            </p>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="todo-gray">
          <ViewDayItem v-if="todayList.isok.length>0" :list="todayList.isok" @changeStatus="changeStatus" @editFn="editFn" @deleteFn="deleteFn" />
          <!-- none -->
          <p class="todo-none" v-else>
            <img src="~@/assets/img/todo-isok-none.png" />
          </p>
        </div>
      </el-col>
    </el-row>

    <!-- future || history -->
    <el-progress color="#ccc" type="circle" :percentage=progress v-if="!isbetween" :width="40" :stroke-width="3" class="todo-progress">
    </el-progress>
    <ViewDayItem v-if="!isbetween" :list="list" @changeStatus="changeStatus" @editFn="editFn" @deleteFn="deleteFn" />

    <!-- dialog delete -->
    <el-dialog :visible.sync="deleteDialogVisible" width="300px">
      <p class="mb-10">
        删除 <strong>{{deleteItem.info}}</strong> 吗?
      </p>
      <el-tag size="medium" v-for="type in deleteItem.types" :key="type.k">
        {{type}}
      </el-tag>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deleteDialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="deleteNow">
          <i class="el-icon-delete"></i>
          删除
        </el-button>
      </span>
    </el-dialog>
  </div>

</template>

<script>
import ViewDayItem from "./day-Item.vue";
import getData from "@/assets/js/getData";
import filters from "@/assets/js/filters";
export default {
  components: { ViewDayItem },
  props: {
    list: {
      type: [Array, Object],
      required: true
    },
    showEditFn: {
      type: Function
    },
    isbetween: {
      type: Boolean,
      default: false
    },
    resetList: {
      type: Function
    },
  },
  data() {
    return {
      pst: "hd",
      progress: 0,
      deleteDialogVisible: false,
      deleteItem: {},
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

      if (this.isbetween) {
        this.list.forEach(element => {
          if (element.status == 0) {
            waitArr.push(element);
          } else {
            okArr.push(element);
          }
        });
      }

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
    },

    changeStatus(item) {
      let self = this;
      let data = Object.assign({}, item, {
        status: item.status == 0 ? 1 : 0
      });

      getData.todoChangeStatus(data, res => {
        self.$emit("resetList");
        // this.list[idx].status = !this.list[idx].status;
        // this.progressFn();
      });
    },

    deleteFn(item) {
      this.deleteDialogVisible = true;
      this.deleteItem = item;
    },

    deleteNow() {
      let self = this;
      let id = this.deleteItem._id;
      // let idx = this.deleteItem.idx;

      getData.todoDelete({ id }, res => {
        self.deleteDialogVisible = false;
        self.$emit("resetList");
      });
    },

    editFn(item) {
      this.$emit("showEditFn", item);
    }
  }
};
</script>

