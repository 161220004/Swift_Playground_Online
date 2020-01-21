# SPO

 Swift Playground Online



### 部署

- 打开 Docker Desktop

- 终端进入目录：SPO

- 命令行输入：

  `docker-compose build`   # 创建MySQL镜像“aldebarain/spo-mysql:0.1”

  `docker-compose up`  # 创建容器“spo_mysql_1”并运行

- 可以使用MySQL可视化工具（如Navicat），建立连接：

  - Host：127.0.0.1

  - POST：3306
  - USER：aldebarain
  - PASSWORD：mysql



### 数据库文件导入与导出

- 导出

  命令行输入：

  `docker exec -i spo_mysql_1 mysqldump -ualdebarain -pmysql spo > ./MySQL/spo.sql`

- 导入

  命令行输入：

  `docker exec -i spo_mysql_1 mysql -ualdebarain -pmysql spo < ./MySQL/spo.sql`

