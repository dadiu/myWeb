<template>
  <div class="secret-bar wrap">
    <p>2018</p>
    <el-table
      :data="tableData">
      <el-table-column
        v-for="item in 31"
        :key="item.n"
        prop="date"
        :label="item + ''"
        width="32px"
      >
      <template slot-scope="scope">
        <span class="secret-circle secret-circle-red" v-if="scope.row.date">1</span>
        
        <span class="secret-circle secret-circle-red" v-else>0</span>
      </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data(){
    return{
      tableData :[]
    }
  }
};
</script>

<style>
</style>
