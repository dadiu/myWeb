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
        label="序号"
        type="index"
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

      <el-table-column
        fixed="right"
        label="操作"
        width="150"
      >
        <template slot-scope="scope">
          <el-button
            size="small"
            type="danger"
            @click="removeShow(scope.row, scope.$index)"
          >删除</el-button>
          {{index}}
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

    <!-- dialog -->
    <ViewDelete
      :dialogVisible="deleteVisible"
      :item="removeData"
      @closeFn="deleteVisible = false"
      @deleteNow="removeFn"
    />
  </div>
</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/admin/js/getData";
import toolData from "@/assets/js/tool";

import ViewDelete from "@/admin/components/delete";

export default {
  components: { ViewDelete },
  data() {
    return {
      loading: true,
      deleteVisible: false,
      removeData: {},
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
    },

    removeShow(item,idx) {

      let desc = `序号 ${idx + 1}`;
      this.removeData = {
        id: item._id,
        desc
      };

      this.deleteVisible = true;
    },

    // delete
    removeFn(id) {
      this.loading = true;

      getData.toolDelete({ id }, res => {
        this.loading = false;

        this.deleteVisible = false;

        if (res.code == 0) {
          this.$message({
            type: "success",
            message: res.msg
          });

          this.getList();
        }
      });
    }
  }
};
</script>

