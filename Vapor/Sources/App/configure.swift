import Leaf
import Vapor

/// 若使用Xcode的Run将给出一个不恰当的路径：/Users/aldebarain/Library/Developer/Xcode/DerivedData/...
/// 使用命令行“vapor run”则会得到想要的项目地址，如：/Users/aldebarain/Vapor/Swift_Playground_Online/Vapor/SPO
var PROJECT_PATH = FileManager.default.currentDirectoryPath
/// 用户代码相关文件的路径
var CODE_PATH = PROJECT_PATH + "/Resources/Code/"
/// 运行结果相关文件的路径
var RESULT_PATH = PROJECT_PATH + "/Resources/Results/"
/// 场景相关文件的路径
var SCENE_PATH = PROJECT_PATH + "/Resources/Scene/"


/// Called before your application initializes.
public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    // Register providers first
    try services.register(LeafProvider())
    
    // Register routes to the router
    let router = EngineRouter.default()
    try routes(router)
    services.register(router, as: Router.self)
    
    // Use Leaf for rendering views
    config.prefer(LeafRenderer.self, for: ViewRenderer.self)
    
    // Register middleware
    var middlewares = MiddlewareConfig() // Create _empty_ middleware config
    middlewares.use(FileMiddleware.self) // Serves files from `Public/` directory
    middlewares.use(ErrorMiddleware.self) // Catches errors and converts to HTTP response
    services.register(middlewares)
    
    // 确认运行环境
    if (Environment.get("ENVIRONMENT") == "docker") {
        print("Run in Docker")
        PROJECT_PATH = "/app"
        CODE_PATH = PROJECT_PATH + "/Resources/Code/"
        RESULT_PATH = PROJECT_PATH + "/Resources/Results/"
        SCENE_PATH = PROJECT_PATH + "/Resources/Scene/"
        print("Reset PROJECT_PATH to WORKDIR: " + PROJECT_PATH)
        print("Reset CODE_PATH to " + CODE_PATH)
        print("Reset RESULT_PATH to " + RESULT_PATH)
        print("Reset SCENE_PATH to " + SCENE_PATH)
    } else {
        print("Run in Vapor")
        print("Set PROJECT_PATH to " + PROJECT_PATH)
        print("Set CODE_PATH to " + CODE_PATH)
        print("Set RESULT_PATH to " + RESULT_PATH)
        print("Set SCENE_PATH to " + SCENE_PATH)
    }
    
}
