# Swift Playground Online

项目开发中……

已经完成一个测试用网页；

即将进行前端重构……

（运行前请先导入数据库）

（下述Docker部署的Vapor部分有几率失效，若遇到失效的情况，`docker-compose build`  之后直接用`docker start swift_playground_online_mysql_1`开启MySQL，再进入SPO目录使用`vapor build` `vapor run` ）

### 部署

- 打开 Docker Desktop

- 终端进入目录：SPO

- 命令行输入：

  - 创建MySQL镜像“aldebarain/spo-mysql:0.1”与SPO项目镜像“aldebarain/spo-vapor:0.1”

    `docker-compose build`  

  - 创建两个镜像的容器并运行

    `docker-compose up` 

- 可以使用MySQL可视化工具（如Navicat），建立连接：

  - Host：127.0.0.1

  - POST：3306
  - USER：aldebarain
  - PASSWORD：mysql



### 数据库文件导入与导出

（当前数据库已经引入一份测试用数据）

- 导出

  命令行输入：

  `docker exec -i swift_playground_online_mysql_1 mysqldump -ualdebarain -pmysql spo > ./MySQL/spo.sql`

- 导入

  命令行输入：

  `docker exec -i swift_playground_online_mysql_1 mysql -ualdebarain -pmysql spo < ./MySQL/spo.sql`

