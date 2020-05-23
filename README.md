# Swift Playground Online

Swift Playgrounds提供了一个实时呈现开发者代码的平台，然而该应用主要依托于macOS和iPad，导致Swift的学习很大程度上依赖于这些苹果设备和开发工具。
为了减少对平台的依赖，把Swift Playgrounds展现在Web网页上，本项目基于人物行为模型的编码技术，对用户输入的Swift代码进行重新编码以及解码，最终以Web动画的形式展现用户代码的编译运行结果。
本项目基于Vapor框架，在后端使用Swift工具链编译运行用户代码，在前端使用PixiJS技术实现动画，同时提供了14个循序渐进的关卡，通过规范场景格式的方式使其具有很强的可扩展性。

### 部署

- 打开 Docker Desktop

- 终端进入目录：Swift_Playground_Online

- 命令行输入：

  - 创建SPO项目镜像“aldebarain/spo:latest”

    `docker-compose build`  

  - 创建该镜像的容器并运行

    `docker-compose up` 


### 版本

- 当前使用的Vapor版本为：

  Vapor Toolbox: 3.1.10

  Vapor Framework: 3.3.3

- SPO项目容器中的版本：

  swift:4.1

  ubuntu:16.04

