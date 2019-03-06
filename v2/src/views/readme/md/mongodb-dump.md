## MongoDB 数据库的备份和恢复

### 备份

- 所有表

  ```js
  mongodump -u <username>  -p <password>  --authenticationDatabase admin -h <dump ip> --port <port> -o D:\data\copy\dadadiu.cn
  ```

- 单个库

  ```js
  mongodump -u <username> -p <password> --authenticationDatabase admin -h <dump ip> --port <port>  -d todo -o D:\data\copy\dadadiu.cn
  ```

### 恢复

- 单个库

  ```js
  mongorestore -u <username> -p <password> --port <port> --authenticationDatabase admin -d todo D:\data\copy\dadadiu.cn\todo
  ```

- 所有库

  ```js
  mongorestore -u <username> -p <password> --port <port> --authenticationDatabase admin  D:\data\copy\dadadiu.cn
  ```
