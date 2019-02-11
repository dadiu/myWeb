<template>
  <div>

    <!-- breadcrumb -->
    <el-breadcrumb
      separator="/"
      class="m-breadcrumb"
    >
      <el-breadcrumb-item :to="{ name: 'admin.awardLog' }">道具日志</el-breadcrumb-item>
      <el-breadcrumb-item>所有</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table -->
    <el-table
      :data="tableData"
      stripe
      height="82vh"
      border
    >

      <el-table-column
        type="index"
        label="序号"
        width="50"
        fixed
      ></el-table-column>

      <el-table-column
        label="用户"
        width="180"
        fixed
      >
        <template slot-scope="scope">
          {{nickData[scope.row.author]}}
        </template>
      </el-table-column>

      <el-table-column label="途径">
        <template slot-scope="scope">
          <el-tag>{{scope.row.list.type | unAwardType}}</el-tag>
          <el-tag
            type="success"
            v-if="scope.row.list.count > 0"
          >获得</el-tag>
          <el-tag
            type="info"
            v-else
          >消耗</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="道具">
        <template slot-scope="scope">
          {{scope.row.list.name == 'pushCard'?'补签卡' : '积分'}}
        </template>
      </el-table-column>

      <el-table-column label="数量">
        <template slot-scope="scope">
          {{scope.row.list.count}}
        </template>
      </el-table-column>

      <el-table-column label="时间">
        <template slot-scope="scope">
          {{scope.row.createAt | dateDetailFormat('-')}}
        </template>
      </el-table-column>
    </el-table>

    <!-- pagination -->
    <el-pagination
      v-if="pages.total && pages.total > 0"
      background
      layout="prev, pager, next"
      :current-page="pages.crt"
      :page-size="pages.size"
      :total="pages.total"
      @current-change="changePageFn"
    >
    </el-pagination>

  </div>
</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/admin/js/getData";
import toolData from "@/assets/js/tool";

export default {
  data() {
    return {
      isLoading: true,
      tableData: [],
      pages: {},
      nickData: {}
    };
  },

  filters: {
    dateDetailFormat: filters.dateDetailFormat,
    unAwardType: filters.unAwardType,
    filterTool(val, type) {
      return toolData[val] && toolData[val][type];
    }
  },

  mounted() {
    this.getList();
  },

  methods: {
    getList(data = { type: "tool" }) {
      this.isLoading = true;

      getData.awardLogList(data, res => {
        this.isLoading = false;
        if (res.code == 0) {
          this.tableData = res.data;
          this.nickData = res.nick;
          this.pages = res.pages;
        }
      });
    },

    changePageFn(item) {
      this.getList({
        pageCrt: item,
        type: "todolist"
      });
    }
  }
};
</script>

