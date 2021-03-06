# vue-压缩文件过大 优化 vender.js app.js app.css 的打包文件

[参考地址>](http://www.cnblogs.com/wjunwei/p/9242142.html)

<br/>

### 1.把不常改变的库放到 index.html 中，通过 cdn 引入：

  [cdn获取地址 >](https://www.bootcdn.cn/)

  ```html
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <title>每日一清</title>

      <!-- cdn element-ui css -->
      <link
        rel="stylesheet"
        href="//cdn.bootcss.com/element-ui/2.4.9/theme-chalk/index.css"
      />
    </head>

    <body>
      <div id="app"></div>
      <!-- built files will be auto injected -->

      <!-- cdn js -->
      <script src=""></script>
    </body>
  </html>
  ```

  找到 build/webpack.base.conf.js 文件，在 module.exports = { } 中添加以下代码

  ```js
  externals: {
      'vue': 'Vue',
      'vue-router': 'VueRouter',
      'element-ui': 'ELEMENT',
      'axios': 'axios',
  }
  ```

  这样webpack就不会把vue.js, vue-router, element-ui库打包了。声明一下，我把main.js中对element的引入删掉了，不然我发现打包后的app.css还是会把element的css打包进去，删掉后就没了。


<br/>

### 2.vue 路由的懒加载

  原路由：

  ```js
  import Index from "./index.vue";
  import Md from "./md.vue";

  export default [
    {
      path: "/md",
      component: Index,
      name: "md",
      children: [
        {
          path: ":page",
          name: "md.list",
          component: Md
        }
      ]
    }
  ];
  ```

  更改后：

  ```js
  export default [
    {
      path: "/md",
      component: resolve => require(["./index.vue"], resolve),
      name: "md",
      children: [
        {
          path: ":page",
          name: "md.list",
          component: resolve => require(["./md.vue"], resolve)
        }
      ]
    }
  ];
  ```

  然后你打包就会发现，多了很多 1.xxxxx.js；2.xxxxx.js 等等


<br/>


### 3.取消生成 map 文件

  找到 config/index.js ，修改 " productionSourceMap " 为 false

  ```js
  /**
   * Source Maps
   */

  productionSourceMap: false, // 取消生成map文件 - 2018/12/18
  ```
