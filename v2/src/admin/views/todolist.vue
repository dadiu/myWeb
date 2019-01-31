<template>
  <div>

    <!-- breadcrumb -->
    <el-breadcrumb
      separator="/"
      class="m-breadcrumb"
    >
      <el-breadcrumb-item :to="{ name: 'admin.todolist' }">每日一清</el-breadcrumb-item>
      <el-breadcrumb-item>全部</el-breadcrumb-item>
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
        label="状态"
        width="100"
      >
        <template slot-scope="scope">
          <el-tag
            type="info"
            v-if="scope.row.status == 1"
          >
            已完成
          </el-tag>
          <el-tag
            type="success"
            v-if="scope.row.status == 0"
          >
            未完成
          </el-tag>
          <el-tag v-if="scope.row.status == 2">
            搁置
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="info"
        label="任务"
        width="400"
      ></el-table-column>

      <el-table-column label="标签">
        <template slot-scope="scope">
          <el-tag
            v-for="item in scope.row.types"
            :key="item.type"
          >
            {{item}}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        label="开工时间"
        width="120"
      >
        <template slot-scope="scope">
          {{scope.row.todoTime | dateFormat('-')}}
        </template>
      </el-table-column>

      <el-table-column
        label="创建时间"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.createTime | dateDetailFormat('-')}}
        </template>
      </el-table-column>

      <el-table-column
        label="更新时间"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.updateTime | dateDetailFormat('-')}}
        </template>
      </el-table-column>

      <!-- <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="small" type="primary" @click="editFn(scope.row._id)">编辑</el-button>
          <el-button size="small" type="danger" @click="editFn(scope.row._id)">删除</el-button>
        </template>
      </el-table-column> -->
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
      tableData: [
        {
          status: "",
          info: "",
          todoTime: "", // 开始时间
          createTime: "", // 创建时间
          updateTime: "", // 更新时间
          types: [], // 标签
          nick: "", // 昵称
          author: "" // 作者id
        }
      ],
      pages: {}
    };
  },

  filters: {
    dateDetailFormat: filters.dateDetailFormat,
    dateFormat: filters.dateFormat
  },

  mounted() {
    this.getList();
  },

  methods: {
    getList(data = { type: "todolist" }) {
      getData.todoList(data, res => {
        this.tableData = res.data;
        this.nickData = res.nick;
        this.pages = res.pages;
      });
    },

    resetUserList(list) {
      let backData = {};

      list.forEach(element => {
        backData[element._id] = element;
      });

      return backData;
    },

    removeFn(item) {
      getData.todoDelete({ id: item._id }, res => {
        console.log("delete");
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

