# 接口文档-用户信息


## 0. 通用(无需登录)

### 基础信息

- 路径: base/info
- 方法: GET
- 参数：无

- 成功：

  ```js
  {
      'code': 0,
      'msg': 'base info',
      'data':{
        'user':'',
        'todo':'',
        'message':''
      }
  }
  ```


---

## 1. 用户

### 注册
- 路径: user/register
- 方法: POST
- 参数：

  ```js
  {
    'nick':'',
    'username' : '',
    'phone' :'',
    'pwd' :'',
    'sex' :''  // 性别 [目前已写死为0]  默认0 {0:保密; 1:女; 2：男}
  }
  ```

- 成功：

  ```js
  {
      'code': 0,
      'msg': '注册成功',
      'data': {
          'id' : '',
          'nick' : ''
      }
  }
  ```

- 失败：
  ```js
    {
        'code': 1001,
        'msg': '用户名不存在'
    }
  ```
  ```js
    {
        'code': 1002,
        'msg': '密码错误'
    }
  ```


### 登录

- 路径: user/login
- 方法: POST
- 参数：

  ```js
  {
    'username' : '',
    'pwd' : ''
  }
  ```

- 成功：

  ```js
  {
      'code': 0,
      'msg': '登录成功',
      'data': {
          id: '',
          nick: ''
      }
  }
  ```

- 失败：
  ```js
    {
        'code': 1001,
        'msg': '用户名不存在'
    }
  ```
  ```js
    {
        'code': 1002,
        'msg': '密码错误'
    }
  ```

### 获取用户信息

- 路径: user/info
- 方法: GET
- 参数：无

- 成功：
  ```js
  {
      'code': 0,
      'msg': '用户信息',
      'data': {
          'nick': '',
          'power': '',
          'sex':''  // 性别 [目前已写死为0]  默认0 {0:保密; 1:女; 2：男}
      }
  }
  ```

### 注销

- 路径: user/logout
- 方法: GET
- 参数：无

- 成功：
  ```js
  {
      'code': 0,
      'msg': '用户退出'
  }
  ```
