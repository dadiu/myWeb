<template>
  <div>

    <!-- breadcrumb -->
    <el-breadcrumb separator="/" class="m-breadcrumb">
      <el-breadcrumb-item :to="{ name: 'admin.messagelist' }">便签</el-breadcrumb-item>
      <el-breadcrumb-item>全部</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- table -->
    <el-table :data="tableData" stripe height="82vh" border >
      <el-table-column type="index" label="序号" width="50" fixed></el-table-column>

      <el-table-column prop="nick" label="用户" fixed>
        <template slot-scope="scope">
         {{nickData[scope.row.author]}}
        </template>
        </el-table-column>
      
      <el-table-column label="状态">
        <template slot-scope="scope">
           <el-tag type="danger" v-if="scope.row.level == 1">
            急
          </el-tag>
          <el-tag type="warning" v-if="scope.row.level == 2">
            缓
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="info" label="便签" width="500"></el-table-column>

      <el-table-column label="开工时间" width="120">
        <template slot-scope="scope">
          {{scope.row.todoTime | dateFormat('-')}}
        </template>
      </el-table-column>

      <el-table-column label="创建时间" width="180">
        <template slot-scope="scope">
          {{scope.row.createTime | dateDetailFormat('-')}}
        </template>
      </el-table-column>

      <el-table-column label="更新时间" width="180">
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

  </div>
</template>

<script>
import filters from "@/assets/js/filters";
import getData from "@/admin/js/getData";
export default {
  data() {
    return {
      nickData:{},
      tableData: [
        {
          status:'',
          info:'',
          todoTime:'',  // 开始时间
          createTime:'',  // 创建时间
          updateTime:'',  // 更新时间
          types:[], // 标签
          nick:'',  // 昵称
          author:'' // 作者id
        }
      ]
    };
  },

  filters : {
    dateDetailFormat : filters.dateDetailFormat,
    dateFormat: filters.dateFormat
  },

  mounted() {

    let self = this;
    
    getData.messageList({ type:'message'}, res => {
      this.tableData = res.data;
      this.nickData = res.nick;
    });
  },

  methods: {

    resetUserList(list){

      let backData = {};

      list.forEach(element => {
        backData[element._id] = element;
      });

      return backData;
    },

    removeFn(item) {
      getData.todoDelete({ id:item._id }, res => {
        console.log('delete')
      });
    }
  }
};
</script>

