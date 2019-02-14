<template>
  <div v-loading="loading">
    <!-- breadcrumb -->
    <el-breadcrumb
      separator="/"
      class="m-breadcrumb"
    >
      <el-breadcrumb-item :to="{ name: 'admin.signInLog' }">签到日志</el-breadcrumb-item>
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
      >
      </el-table-column>

      <el-table-column
        prop="nick"
        label="用户"
        width="180"
        fixed
      >
        <template slot-scope="scope">
          {{nickData[scope.row.author]}}
        </template>
      </el-table-column>

      <el-table-column
        label="年-月"
        width="100"
      >
        <template slot-scope="scope">
          {{scope.row.lastCheck | monthFormat}}
        </template>
      </el-table-column>

      <el-table-column
        label="已签"
        width="60"
      >
        <template slot-scope="scope">
          {{scope.row.list.length}}
        </template>
      </el-table-column>

      <el-table-column>
        <!-- th -->
        <template
          slot="header"
          slot-scope="scope"
        >
          <p class="admin-point-preview">签到详情 :
            <span class="admin-point-default"></span> 签到
            <span class="admin-point-default primary"></span> 补签
          </p>
        </template>

        <!-- td -->
        <template slot-scope="scope">
          <ul class="admin-point-ul">
            <li
              class="admin-point-li"
              v-for="item in scope.row.list"
              :key="item.point"
            >
              <span :class="['admin-point-default', {'primary' : item.type == 'push'}]">
                {{item.createAt | dateFormat("", "dd")}}
              </span>
            </li>
          </ul>
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
            @click="removeShow(scope.row)"
          >删除</el-button>
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

import ViewDelete from "@/admin/components/delete";

export default {
  components: { ViewDelete },
  data() {
    return {
      loading: true,
      deleteVisible: false,
      removeData: {},
      nickData: {},
      tableData: [],
      pages: {}
    };
  },

  mounted() {
    this.getList();
  },

  filters: {
    monthFormat(val) {
      return val.slice(0, 7);
    },
    dateFormat: filters.dateFormat
  },

  methods: {
    getList(data = {}) {
      this.loading = true;

      getData.signInList(data, res => {
        this.loading = false;
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

    removeShow(item) {
      let desc = `${this.nickData[item.author]} ${item.lastCheck.slice(0, 7)}`;
      this.removeData = {
        id: item._id,
        desc
      };

      this.deleteVisible = true;
    },

    // delete
    removeFn(id) {
      this.loading = true;

      getData.signInDelete({ id }, res => {
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
