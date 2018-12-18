## MongoDB 用户管理

### 权限

| roles                | 属性                     |
| :------------------- | :----------------------- |
| readAnyDatabase      | 任何数据库的只读权限     |
| userAdminAnyDatabase | 任何数据库的读写权限     |
| userAdminAnyDatabase | 任何数据库用户的管理权限 |
| dbAdminAnyDatabase   | 任何数据库的管理权限     |

- 创建管理员

  ```js
  db.grantRolesToUser({
    user: "username",
    pwd: "password",
    roles: [{ role: "userAdminAnyDatabase", db: "todo" }]
  });
  ```

- 登录管理员

  ```js
  use admin;
  
  db.auth('username','2018');
  ```

- 重新更改 role 属性

  ```js
  db.grantRolesToUser("username", [{ role: "read", db: "admin" }]);
  ```

- 查看用户

  ```js
  use admin;
  show users;
  ```

- 统计数据
  
  ```js
  db.stats()
  ```
