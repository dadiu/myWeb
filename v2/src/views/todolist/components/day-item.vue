<template>
  <ul class="todo-day-list">
    <li
      v-for="(item, idx) in list"
      :key="item.list"
      :class="['todo-day-item', {'fn-ok': item.status == 1}, {'fn-lay': item.status == 2}]"
    >

      <p
        class="todo-day-status"
        @click="$emit('changeStatus',item)"
      >
      <span v-if="item.status == 1">
        {{idx + 1}}
      </span>
        <!-- <i
          class="el-icon-check"
          v-if="item.status == 1"
        ></i> -->
        <i
          class="el-icon-close"
          v-if="item.status == 2"
        ></i>
      </p>

      <p class="todo-day-info">
        <span
          class="todo-day-info-name"
          @click="$emit('editFn', item)"
        > {{item.info}} </span>

        <!-- delete -->
        <i
          class="el-icon-remove-outline"
          v-if="item.status != 1"
          @click="deleteFn(item)"
        ></i>
        <!-- edit -->
        <i
          class="el-icon-edit"
          @click="$emit('editFn', item)"
        ></i>
      </p>

      <p
        class="todo-day-type"
        v-if="item.types"
      >
        <el-tag
          size="medium"
          v-for="type in item.types"
          :key="type.k"
          :class="[{'el-tag--info' : item.status != 0}]"
        >
          {{type}}
        </el-tag>
      </p>
    </li>
  </ul>
</template>

<script>
import event from "@/util/event";
export default {
  props: {
    list: { type: Array },
    changeStatus: { type: Function },
    editFn: { types: Function }
  },
  data() {
    return {};
  },
  methods: {
    deleteFn(item) {
      event.$emit("todoDelete", item);
    }
  }
};
</script>

<style>
</style>
