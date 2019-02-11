<template>
  <div>
    <!-- breadcrumb -->
    <el-breadcrumb separator="/" class="m-breadcrumb">
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
}
</script>
