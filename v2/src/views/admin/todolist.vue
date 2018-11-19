<template>
  <div class="wrap">
    <el-table :data="tableData" style="width: 100%" v-if="tableData">
      <el-table-column prop="date" label="日期">
      </el-table-column>
      <el-table-column prop="info" label="内容">
      </el-table-column>
      <el-table-column label="作者">
        <template slot-scope="scope">
          {{userData[scope.row.author] && userData[scope.row.author].nick}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="danger" @click="removeFn(scope.row)">remove</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import getData from "@/assets/js/getData";
export default {
  data() {
    return {
      tableData: false,
      userData:{}
    };
  },

  mounted() {

    let self = this;
    
    getData.todoList({ istoday: "all" }, res => {
      this.tableData = res.data.reverse();
    });

    getData.http.get('/user/list', {}, res=>{
      self.userData = self.resetUserList(res.data)
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

