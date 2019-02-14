<template>
  <!-- dialog delete -->
  <el-dialog
    :visible.sync="dialogVisible"
    width="300px"
    :before-close="cancelFn"
  >
    <p class="mb-10">
      确定删除 <span class="fc-danger">"{{item.desc}}"</span> 吗?
    </p>
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
        @click="$emit('deleteNow', item.id)"
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
    };
  },

  mounted() {
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
