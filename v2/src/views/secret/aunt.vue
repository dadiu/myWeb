<template>
  <div class="aunt-bar wrap">

    <!-- hd -->
    <div class="aunt-hd">
      
      <div class="aunt-search">
        <span class="aunt-day aunt-day-today"></span>
        <p class="aunt-search-label">今天</p>

        <span class="aunt-day aunt-day-danger"></span>
        <p class="aunt-search-label">大姨妈</p>
        
        <!-- <span class="aunt-day aunt-day-papa"></span>
        <p class="aunt-search-label">啪啪（暂不开放）</p> -->
      </div>
      <!-- <strong>
        <i class="el-icon-warning"></i>
        预计下次开启时间 {{count}} 天 (暂时不知怎么计算，下次更新吧)
      </strong> -->
      <el-form :inline="true">
        <el-form-item>
          <el-date-picker
            size="small"
            v-model="createDate"
            :editable="false"
            type="daterange"
            value-format="timestamp"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="dateOptions"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button
            type="success"
            size="small"
            icon="el-icon-check"
            @click="createFn"
          >
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- bc -->
    <div class="aunt-bd">
      <ul
        class="aunt-list"
        v-for="(items,idx) in tableData"
        :key="items.f"
      >
        <!-- date -->
        <li class="aunt-list-date">
          {{items.date}}
        </li>

        <!-- list -->
        <li
          class="aunt-list-item"
          v-for="(item,idx) in items.list"
          :key="idx"
          @click="updateFn(items, idx)"
        >

          <!-- 当天 -->
          <span
            :class="['aunt-day','aunt-day-today', {'aunt-day-danger' : item == 1}]"
            v-if="items.date == crtDate && (idx+1) == crtDay"
          >{{idx + 1}}</span>
          
          <!-- 当天 -->
          <span
            class="aunt-day aunt-day-disable"
            v-else-if="items.date == crtDate && (idx+1) > crtDay"
          >{{idx + 1}}</span>

          <!-- 大姨妈 -->
          <span
            class="aunt-day aunt-day-danger"
            v-else-if="item == 1"
          >{{idx + 1}}</span>

          <!-- papa -->
          <span
            class="aunt-day aunt-day-papa"
            v-else-if="item == 2"
          >{{idx + 1}}</span>

          <!-- 无 -->
          <span
            class="aunt-day aunt-day-default"
            v-else
          >{{idx + 1}}</span>
        </li>

        <!-- delete -->
        <li class="aunt-list-delete" v-if="idx != 0">
          <i
            class="el-icon-remove-outline"
            @click="deleteFn(items)"
          ></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import filters from "@/assets/js/filters.js";
import getData from "@/assets/js/getData.js";
export default {
  data() {
    return {
      tableData: [],
      crtDay:new Date().getDate(),
      crtDate: filters.dateFormat(null, "-", "yyyy-mm"),
      crtMonth: filters.monthCount(),
      createDate: "",
      dateOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      },
      count: 0
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      let newTable = [];
      getData.auntList(res => {
        if (res.code == 0) {
          // 无记录
          if (res.data.length == 0) {
            this.noneFn();
            return;
          }

          // 有记录
          newTable = res.data;

          // 第一条是不是当月
          if (newTable[0].date != this.crtDate) {
            newTable.unshift({
              date: this.crtDate,
              list: new Array(this.crtMonth)
            });
          }

          this.tableData = newTable;
        }
      });
    },

    noneFn() {
      this.tableData.push({
        date: this.crtDate,
        list: new Array(this.crtMonth)
      });
    },

    listFn(list, start, end) {
      let i = 0;
      let len = list.length;
      let newList = [];

      for (; i < len; i++) {
        if (i >= start && i < end) {
          newList.push(1);
        } else {
          newList.push(list[i] ? list[i] : 0);
        }
      }

      return newList.join("|");
    },

    updateFn(item, idx) {
      let data = {};
      let list = [];

      // 是否是今天之后
      if(item.date == this.crtDate && (idx + 1) > this.crtDay ){
        console.log('future')
        return;
      }

      if (typeof item._id == "undefined") {
        // _id 不存在 => 创建
        list = this.listFn(new Array(this.crtMonth), idx, idx + 1);

        data = {
          date: this.crtDate,
          list
        };
        getData.auntAdd(data, res => {
          this.init();
        });
      } else {
        // _id 存在 => 更新
        item.list[idx] = item.list[idx] == 1 ? 0 : 1;
        list = item.list.join("|");

        data = {
          id: item._id,
          date: item.date,
          list
        };

        getData.auntUpdate(data, res => {
          this.init();
        });
      }
    },

    createFn() {
      let startDate = filters.dateFormat(this.createDate[0], null, "array");
      let endDate = filters.dateFormat(this.createDate[1], null, "array");

      // 同月
      if (startDate[1] == endDate[1]) {
        this.createDataFn(
          filters.dateFormat(this.createDate[0], "-", "yyyy-mm"),
          startDate,
          endDate
        );
        return;
      }

      // 跨月
      // 首月
      this.createDataFn(
        filters.dateFormat(this.createDate[0], "-", "yyyy-mm"),
        startDate,
        [
          startDate[0],
          startDate[1],
          filters.monthCount(startDate[0], startDate[1])
        ]
      );

      // 尾月
      this.createDataFn(
        filters.dateFormat(this.createDate[1], "-", "yyyy-mm"),
        [endDate[0], endDate[1], 1],
        endDate
      );
    },

    /**
     * date = yyyymm
     * startDate : [yyyy,mm,dd]
     * endDate : [yyyy,mm,dd]
     */
    createDataFn(date, startDate, endDate) {
      let list = [];

      // 查找是否存在
      getData.auntSearch({ date }, res => {
        if (res.code == 0) {
          // 存在 =>更新
          if (res.data.length > 0) {
            list = res.data[0].list;
            list = this.listFn(list, startDate[2] - 1, endDate[2]);

            console.log(list);
            console.log(res.data);
            getData.auntUpdate(
              {
                id: res.data[0]._id,
                list
              },
              res => {
                this.init();
              }
            );

            return;
          }

          // 不存在 创建
          list = new Array(filters.monthCount(startDate[0], startDate[1]));
          list = this.listFn(list, startDate[2] - 1, endDate[2]);

          getData.auntAdd(
            {
              date,
              list
            },
            res => {
              this.init();
            }
          );

          return;
        }

        // other
        this.$message(res.msg);
      });
    },

    deleteFn(item) {
      this.$confirm("确定删除 " + item.date + " 吗？", "", {
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(action => {
          getData.auntDelete(
            {
              id: item._id
            },
            res => {
              this.$message({
                message: "已删除 " + item.date,
                type: "success"
              });
              // this.init();
              this.tableData.remove(item);
            }
          );
        })
        .catch(() => {
          this.$message("已取消该操作");
        });
    }
  }
};
</script>

<style>
</style>
