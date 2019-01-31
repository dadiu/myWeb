<template>
  <div>

    <!-- breadcrumb -->
    <el-breadcrumb
      separator="/"
      class="m-breadcrumb"
    >
      <el-breadcrumb-item :to="{ name: 'admin.userlist' }">用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>所有用户</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- table -->
    <el-table
      :data="tableData"
      stripe
      height="82vh"
      border
    >
      <el-table-column
        fixed
        type="index"
        width="50"
        label="序号"
      ></el-table-column>
      <el-table-column
        fixed
        prop="nick"
        label="昵称"
      ></el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
      ></el-table-column>

      <el-table-column
        label="每日一清"
        width="300"
      >
        <template
          slot-scope="scope"
          v-if="scope.row.todoData"
        >

          <el-tag type="info">
            已完成
            {{scope.row.todoData[1]}}
          </el-tag>
          <el-tag type="success">
            未完成
            {{scope.row.todoData[0]}}
          </el-tag>
          <el-tag>
            搁置
            {{scope.row.todoData[2]}}
          </el-tag>

        </template>
      </el-table-column>

      <el-table-column
        label="便签"
        width="150"
      >
        <template
          slot-scope="scope"
          v-if="scope.row.messageData"
        >

          <el-tag type="danger">
            急
            {{scope.row.messageData.lv1 || 0}}
          </el-tag>
          <el-tag type="warning">
            缓
            {{scope.row.messageData.lv2 || 0}}
          </el-tag>

        </template>
      </el-table-column>
      
      <el-table-column label="积分">
        <template slot-scope="scope" v-if="scope.row.tool">
          {{scope.row.tool.point.count}}
        </template>
      </el-table-column>
      
      <el-table-column label="补签卡">
        <template slot-scope="scope" v-if="scope.row.tool">
          {{scope.row.tool.pushCard.count}}
        </template>
      </el-table-column>

      <el-table-column label="权限">
        <template slot-scope="scope">
          <!-- {{scope.row.power | isPower}} -->
          <!-- 0 -->
          <el-tag
            type="info"
            v-if="scope.row.power[0] == 0"
          >
            用户
          </el-tag>

          <!-- 99 -->
          <el-tag v-else-if="scope.row.power[0] == 99">
            管理员
          </el-tag>

          <el-tag
            type="danger"
            v-else
            v-for="item in scope.row.power"
            :key="item.p"
          >
            {{item}}
          </el-tag>

        </template>
      </el-table-column>

      <el-table-column
        prop="phone"
        label="手机"
        width="160"
      ></el-table-column>

      <el-table-column
        label="最新登录"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.lastLoginTime | dateDetailFormat('-')}}
        </template>
      </el-table-column>

      <el-table-column
        label="注册时间"
        width="180"
      >
        <template slot-scope="scope">
          {{scope.row.createTime | dateDetailFormat('-')}}
        </template>
      </el-table-column>

      <!-- <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button size="small" @click="editFn(scope.row)">编辑</el-button>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/admin/js/getData";
import event from "@/util/event";

export default {
  data() {
    return {
      tableData: []
    };
  },

  filters: {
    dateDetailFormat: filters.dateDetailFormat
  },

  mounted() {
    getData.userList({ type: "userlist" }, res => {
      this.tableData = res.data;
    });
  },

  methods: {
    editFn(data) {
      console.log(data);
    }
  }
};
</script>
