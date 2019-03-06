# CentOS7.4 - 安装node


### [参考地址> ](http://www.cnblogs.com/lpbottle/p/7733397.html)

### 安装版本：10.13.0

- 一、安装必要的编译软件包
  ```js
    sudo yum install gcc gcc-c++
  ```

- 二、从源码下载Nodejs
  ```js
    cd /usr/local/src

    wget https://npm.taobao.org/mirrors/node/v10.13.0/node-v10.13.0.tar.gz
  ```

- 三、解压 nodejs 安装包
  ```js
    tar xvf node-v10.13.0.tar.gz
  ```

- 四、进入解压的 node 文件夹，开始编译
  ```js
    cd node-v10.13.0/

    ./configure
    
    make
  ```
  注：make过程较为耗时，可能需要30分钟以上
  
  注： 如果编译过程中报 C++ Compiler too old, need g++ 4.9.4 or clang++ 3.4.2 (CXX=g++) ，那需要先升级一下 gcc，编译正常的话请忽略直接跳至第五步开始安装

- 五、检查 gcc 的版本
  ```js
    gcc -v
  ```

- 六、安装Nodejs
  ```js
    sudo make install
  ```

- 七、验证是否正确安装
  ```js
    node -v
  ```

