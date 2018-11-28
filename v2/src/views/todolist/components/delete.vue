<template>
  <!-- dialog delete -->
  <el-dialog
    :visible.sync="isShow"
    width="300px"
    :before-close="cancelFn"
  >
    <p class="mb-10">
      删除 <strong>{{item.info}}</strong> 吗?
    </p>
    <el-tag
      size="medium"
      v-for="type in item.types"
      :key="type.k"
    >
      {{type}}
    </el-tag>
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button
        @click="cancelFn"
        size="small"
      >取 消</el-button>
      <el-button
        type="primary"
        size="small"
        @click="$emit('deleteNow', item._id)"
      >
        <i class="el-icon-delete"></i>
        删除
      </el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    item: { type: Object },
    dialogVisible: { type: Boolean },
    closeFn: { type: Function },
    deleteNow:{type:Function}
  },

  data() {
    return {
      isShow: false
    };
  },

  mounted() {
    this.isShow = this.dialogVisible;
  },

  methods: {
    cancelFn() {
      this.$emit("closeFn");
    }
  }
};
</script>

<style>
</style>
