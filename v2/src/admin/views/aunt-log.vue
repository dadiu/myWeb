<template>
  <div>
    <!-- breadcrumb -->
    <el-breadcrumb
      separator="/"
      class="m-breadcrumb"
    >
      <el-breadcrumb-item :to="{ name: 'admin.auntLog' }">秘密基地</el-breadcrumb-item>
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
          {{scope.row.date}}
        </template>
      </el-table-column>

      <el-table-column>
        <!-- th -->
        <template slot="header" slot-scope="scope">
          <p class="admin-point-preview">详情 :
            <span class="admin-point-default danger"></span> 大姨妈
          </p>
        </template>

        <!-- td -->
        <template slot-scope="scope">
          <ul class="admin-point-ul">
            <li
              class="admin-point-li"
              v-for="(item, idx) in scope.row.list"
              :key="item.point"
            >
              <span :class="['admin-point-default', {'danger' : item == 1}]">
                {{idx + 1}}
              </span>
            </li>
          </ul>
        </template>
      </el-table-column>

      
      <el-table-column
        label="最近更新"
        width="200"
      >
        <template slot-scope="scope">
          {{scope.row.updateTime | dateDetailFormat('-')}}
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
export default {
  data() {
    return {
      nickData: {},
      tableData: [],
      pages: {}
    };
  },

  mounted() {
    this.getList();
  },

  filters: {

    dateDetailFormat: filters.dateDetailFormat
  },

  methods: {
    getList(data = {}) {
      getData.auntList(data, res => {
        this.tableData = res.data;
        this.nickData = res.nick;
        this.pages = res.pages;
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
