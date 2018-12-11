# 接口文档-便签

## 1. 添加 便签

- 路径: message/add
- 方法: GET
- 参数：

  ```js
  {
    'info' : '', // 便签内容 [1,100]
    'level' : 1 // 便签标记 {1：急， 2：缓}
  }
  ```

- 成功：
  ```js
  {
      'code': 0,
      'msg': 'add message success'
  }
  ```

## 2. 获取 便签列表||筛选

- 路径: message/list
- 方法: GET
- 参数：

  ```js
  {
    'searchValue':'',        // 可选，预留筛选用
  }

  ```

- 成功：
  ```js
  {
      'code': 0,
      'data':[
        {
          'info':'',
          '_id':'',
        }
      ],
      'msg': 'message list'
  }
  ```

## 3. 编辑

- 路径: message/edit
- 方法: GET
- 参数：

  ```js
  {
    'id':'',          // list里的_id
    'info':''        // 内容
  }

  ```

- 成功：
  ```js
  {
      'code': 0,
      'msg': 'edit message success'
  }
  ```

## 4. 删除

- 路径: message/delete
- 方法: GET
- 参数：

  ```js
  {
    'id': ''; // list里的_id
  }
  ```

- 成功：
  ```js
  {
      'code': 0,
      'msg': 'delete message success'
  }
  ```

## 5. 转移 至 todolist => 创建 todolist 删除便签
