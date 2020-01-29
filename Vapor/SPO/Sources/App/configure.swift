import FluentMySQL
import Leaf
import Vapor

/// Called before your application initializes.
public func configure(_ config: inout Config, _ env: inout Environment, _ services: inout Services) throws {
    // Register providers first
    try services.register(FluentMySQLProvider())
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
    
    let mysqlHostname: String
    let mysqlPort: Int
    let mysqlDB: String
    let mysqlUser: String
    let mysqlPassword: String
    if (env == .development || env == .testing) {
        print("Under Development or Testing Mode")
        mysqlHostname = "127.0.0.1"
        mysqlPort = 3306
        mysqlDB = "spo"
        mysqlUser = "aldebarain"
        mysqlPassword = "mysql"
    } else {
        print("Under production mode")
        mysqlHostname = Environment.get("MYSQL_HOSTNAME")!
        mysqlPort = 3306
        mysqlDB = Environment.get("MYSQL_DATABASE")!
        mysqlUser = Environment.get("MYSQL_USER")!
        mysqlPassword = Environment.get("MYSQL_PASSWORD")!
    }
    let mysqlConfig = MySQLDatabaseConfig(
        hostname: mysqlHostname,
        port: mysqlPort,
        username: mysqlUser,
        password: mysqlPassword,
        database: mysqlDB,
        transport: .unverifiedTLS)
    let mydb = MySQLDatabase(config: mysqlConfig)
    
    // 注册数据库
    var databases = DatabasesConfig()
    databases.add(database: mydb, as: .mysql)
    services.register(databases)
    
    // 注册migrations
    var migrations = MigrationConfig()
    migrations.add(model: Puzzle.self, database: .mysql)
    if (Environment.get("ENVIRONMENT") == "docker") {
        print("Build & Run in Docker")
    } else if (env == .development) { // 仅开发环境下使用Seed
        print("Use Seed Under Development Mode")
        migrations.add(migration: PuzzleSeeder.self, database: .mysql)
    }
    services.register(migrations)
    
    // 注册Fluent中实现的命令
    var commands = CommandConfig.default()
    commands.useFluentCommands()
    services.register(commands)
}
