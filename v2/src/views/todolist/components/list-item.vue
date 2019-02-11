<template>

  <ul class="todo-day-list">
    <li
      v-for="item in list"
      :key="item.l"
      :class="['todo-day-item', {'fn-ok': item.status == 1}, {'fn-lay': item.status == 2}]"
    >
      <!-- status -->
      <span
        class="todo-day-status"
        @click="$emit('changeStatus',item)"
      >
        <i
          class="el-icon-check"
          v-if="item.status == 1"
        ></i>
        <i
          class="el-icon-close"
          v-if="item.status == 2"
        ></i>
      </span>

      <!-- info -->
      <p
        class="todo-day-info"
        @click="$emit('editFn', item)"
        v-html="descSplit(item.info)"
      ></p>

      <p class="todo-day-types">
        <el-tag
          size="medium"
          v-for="type in item.types"
          :key="type.k"
          :class="[{'el-tag--info' : item.status != 0}]"
        >
          {{type}}
        </el-tag>
      </p>

      <!-- delete -->
      <el-button
        size="mini"
        circle
        class="el-icon-minus"
        v-if="item.status != 1"
        @click="deleteFn(item)"
      >
      </el-button>
      <!-- edit -->
      <el-button
        size="mini"
        class="el-icon-edit"
        circle
        @click="$emit('editFn', item)"
      >
      </el-button>
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

  methods: {
    deleteFn(item) {
      event.$emit("todoDelete", item);
    }
  }
};
</script>

<style>
</style>
