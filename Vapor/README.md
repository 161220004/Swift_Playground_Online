# SPO

- 直接运行产品，则使用docker-compose命令进行部署和运行

- 若用于开发或测试，则使用Xcode打开此项目：

  - 在此目录下（“/SPO”）打开终端

  - 命令行输入以下指令分别构建和运行：

    `vapor build`

    `vapor run`

  - 若使用xcode，命令行输入：
  
    `swift package generate-xcodeproj`
  
    （若失败可尝试删除文件Package.resolved后重试）
  
    `vapor xcode -y`
  
    

