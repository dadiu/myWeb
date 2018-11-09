<template>
  <div class="todo-future">
    <p class="todo-hd-tips">
      <i class="el-icon-info"></i>
      计划最多7天
    </p>
    <div class="todo-bar">
      <div class="todo-item" v-for="item in list" :key="item.f">
        <ViewToday :list=item class="todo-item-bar" />
      </div>
    </div>
  </div>

</template>

<script>
import ViewToday from "./today.vue";
export default {
  components: { ViewToday },
  data() {
    return {
      list: [
        [
          {
            status: 0,
            info: "你是魔鬼么1",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 0,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么2",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么3",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么4",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么5",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么6",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ],
        [
          {
            status: 0,
            info: "你是魔鬼么7",
            stamp: "2018-11-08 13:00",
            types: ["布小蛮", "11.19上线"]
          },
          {
            status: 1,
            info: "不是",
            stamp: "2018-11-08",
            types: ["不烦", "wgc", "逻辑"]
          },
          {
            status: 0,
            info: "是的是的",
            stamp: "2018-11-08"
          },
          {
            status: 0,
            info: "11月版本",
            stamp: "2018-11-08",
            types: ["不烦"]
          }
        ]
      ]
    };
  },
  mounted() {},
  methods: {}
};
</script>

