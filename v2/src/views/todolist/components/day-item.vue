<template>
  <ul class="todo-day-list">
    <li v-for="item in list" :key="item.list" :class="['todo-day-item', {'fn-ok': item.status == 1}, {'fn-lay': item.status == 2}]">

      <span class="todo-day-status" @click="$emit('changeStatus',item)">
        <i class="el-icon-check" v-if="item.status == 1"></i>
        <i class="el-icon-close" v-if="item.status == 2"></i>
      </span>

      <p class="todo-day-info">
        <span class="todo-day-info-name" @click="$emit('editFn', item)"> {{item.info}} </span>

        <!-- delete -->
        <i class="el-icon-delete"  v-if="item.status != 1" @click="$emit('deleteFn', item)"></i>
        <!-- edit -->
        <i class="el-icon-edit"  @click="$emit('editFn', item)"></i>
      </p>

      <p class="todo-day-type" v-if="item.types">
        <el-tag size="medium" v-for="type in item.types" :key="type.k" v-if="item.status == 0">
          {{type}}
        </el-tag>
        <el-tag size="medium" type="info" v-for="type in item.types" :key="type.k"  v-if="item.status != 0">
          {{type}}
        </el-tag>
      </p>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    list: { type: Array },
    changeStatus: { type: Function },
    editFn: { types: Function },
    deleteFn: { types: Function },
  },
  data() {
    return {};
  }
};
</script>

<style>
</style>
