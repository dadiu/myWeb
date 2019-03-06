<template>
  <div v-loading.fullscreen="loading">
<!-- 
    <vue-markdown
      :source="content"
      class="page-container"
    >
    </vue-markdown> -->
   <div v-html="content"></div>
  </div>
</template>

<script>
// import counter from './md/admin.md'
export default {

  components: {
  },
  data() {
    return {
      loading: false,
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
      this.loading = true;
      // console.log(page);
      let page = this.$route.params.page;
      this.$http.get("../static/readme/" + page + ".md").then(res => {
        this.loading = false;
        this.content = res.data;
      });
    }
  }
};
</script>
