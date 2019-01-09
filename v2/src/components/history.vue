<template>
  <el-dialog
    :title=title
    :visible.sync="dialogTableVisible"
  >
    <el-table
      :data="tableData"
      border
      stripe
       height="385px"
    >
      <el-table-column
        label="日期"
      >
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          {{ scope.row.createAt | dateDetailFormat('-') }}
        </template>
      </el-table-column>
      
      <el-table-column label="途径">
        <template slot-scope="scope">{{ scope.row.list.type == 'signIn' ? '签到':'其他' }}</template>
      </el-table-column>

      <el-table-column
        prop=""
        label="数量"
      >
        <template slot-scope="scope">{{ scope.row.list.count }}</template>
      </el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import filters from "@/assets/js/filters";
export default {
  props: {
    title: { type: String },
    dialogTableVisible: { type: Boolean },
    tableData: { type: Array }
  },

  filters: {
    dateDetailFormat : filters.dateDetailFormat
  }
};
</script>

<style>
</style>
