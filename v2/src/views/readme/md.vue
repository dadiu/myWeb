<template>
  <vue-markdown :source="content" class="page-container">
  </vue-markdown>
</template>

<script>
import VueMarkdown from "vue-markdown";

export default {
  components: {
    "vue-markdown": VueMarkdown
  },
  data() {
    return {
      content: ""
    };
  },

  watch: {
    $route(val) {
      this.watchRoute();
    }
  },

  mounted() {
    this.watchRoute();
  },

  methods: {
    watchRoute() {
      console.log(page);
      let page = this.$route.params.page;
      this.$http.get("../static/readme/" + page + ".md").then(res => {
        this.content = res.data;
      });
    }
  }
};
</script>
