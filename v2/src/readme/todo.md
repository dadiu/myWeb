# 接口文档-每日一清


## 1. 添加 todo

- 路径: /todo/add
- 方法: GET
- 参数：

  ```js
  {
    todoTime : '',
    status : 0,     // 0 = 待完成、1=已完成、2=搁置
    info:'',        // 任务内容
    types : '标签1|标签2|', // 以英文|分割，最多5个
    date : ''       // 任务完成时间
  }

  ```

- 成功：
  ```js
  {
      'code': 0,
      'msg': '添加成功'
  }
  ```

## 2. todo 列表

- 路径: /todo/list
- 方法: GET
- 参数：

  ```js
  {
    istoday : 0,      // 必传，0 = 当日、-1=今天之前、1=今天之后
    searchType:0,           // 必传，默认0，筛选时使用 1=标签 2=任务 0=不筛选
    searchValue:'',        // 可不传，searchType !== 0 时使用
  }

  ```

- 成功：

  - 当日

  ```js
  {
      'code': 0,
      'msg': 'today list',
      'data' : [
        {
          'author':'',
          'creatTime':'',
          'date':'',
          'info':'',
          'status':'',
          'todoTime':'',
          'types':['type1,type2'],
          'updateTime':''
        }
      ]
  }
  ```

  - 今天之前 || 今天之后

  ```js
  {
      'code': 0,
      'msg': 'history/tomorrow list',
      'data' : [
          [{
            'author':'',
            'creatTime':'',
            'date':'',
            'info':'',
            'status':'',
            'todoTime':'',
            'types':['type1,type2'],
            'updateTime':''
          },
          {
            'author':'',
            'creatTime':'',
            'date':'',
            'info':'',
            'status':'',
            'todoTime':'',
            'types':['type1,type2'],
            'updateTime':''
          }
        ],
        [{...}]
      ]
  }
  ```
- 失败：
  ```js
    {
        'code': 1001,
        'msg': '参数错误'
    }

  ```

## 3. 改变状态

- 路径: /todo/status
- 方法: GET
- 参数：

  ```js
  {
    id: '',
    status: ''
  }

  ```
- 成功：
  ```js
  {
      'code': 0,
      'msg': '修改状态成功'
  }
  ```

  
## 4. 更新

- 路径: /todo/update
- 方法: GET
- 参数：

  ```js
  {
    _id: '',
    status: '',
    info: '',
    date: '',
    todoTime: '',
    author: '',
    types:'',
    createTime: '',
    updateTime: ''
  }

  ```
- 成功：
  ```js
  {
      'code': 0,
      'msg': '更新成功',
      'data':{
        ...
      }
  }
  ```

## 5. 删除

- 路径: /todo/delete
- 方法: GET
- 参数：

  ```js
  {
    id:''
  }

  ```
- 成功：
  ```js
  {
      'code': 0,
      'msg': '删除成功'
  }
  ```