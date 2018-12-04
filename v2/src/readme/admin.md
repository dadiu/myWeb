# 控制台说明

## 权限说明

| power | 说明               | 详情                               |
| :---- | :----------------- | :--------------------------------- |
| [0]     | 普通用户           | 长度为1且第一个值为0                         |
| [99]    | 最高管理员         | 长度为1且第一个值为99                             |
| ['todolist']  | 对应菜单的管理权限 | 哪个类别可以查看就写入哪个 |

## 接口文档

### 获取用户权限

- 路径: /admin/userList
- 方法: GET
- 参数：

  ```js
  {
    id: "", // 用户id
    type :"users" // 查看类别
  }
  ```

- 成功：

  ```js
    {
      'code':0,
      'data':[
        {
          nick:'',
          username:'',
          todoData:[0,0,0], // 每日一清 [待完成数量, 已完成数量, 搁置数量]
          messageData:{'lv1' : 0, 'lv2' : 0}, // 便签 {'lv1' : 急, 'lv2' : 缓}
          phone : '',
          power:'',
          createTime:'',
          lastLoginTime:''
        }
      ]
    }

  ```

### 获取所有用户

- 路径: /admin/userList
- 方法: GET
- 参数：

  ```js
  {
    type :"users" // 查看类别
  }
  ```

- 成功：

  ```js
    {
      'code':0,
      'data':[
        {
          nick:'',
          username:'',
          todoData:[0,0,0], // [待完成数量, 已完成数量, 搁置数量]
          phone : '',
          power:'',
          createTime:'',
          lastLoginTime:''
        }
      ]
    }

  ```

### 获取所有 todo

- 路径: /admin/todolist
- 方法: GET
- 参数：

  ```js
  {
    type :"todolist" // 查看类别
  }
  ```

- 成功：

  ```js
    {
      'code':0,
      'data':[
        {
          status:'',
          info:'',
          todoTime:'',  // 开始时间
          createTime:'',  // 创建时间
          updateTime:'',  // 更新时间
          types:[], // 标签
          nick:'',  // 昵称
          id:'' // 数据_id
        }
      ]
    }

  ```
