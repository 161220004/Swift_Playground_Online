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
    
    let mysqlConfig = MySQLDatabaseConfig(
        hostname: "127.0.0.1",
        port: 3306,
        username: "aldebarain",
        password: "mysql",
        database: "spo",
        transport: .unverifiedTLS)
    let mydb = MySQLDatabase(config: mysqlConfig)
    
    // 注册数据库
    var databases = DatabasesConfig()
    databases.add(database: mydb, as: .mysql)
    services.register(databases)
    
    // 注册migrations
    var migrations = MigrationConfig()
    migrations.add(model: Puzzle.self, database: .mysql)
    if (env == .development) { // 仅开发环境下使用Seed
        migrations.add(migration: PuzzleSeeder.self, database: .mysql)
    }
    services.register(migrations)
    
    // 注册Fluent中实现的命令
    var commands = CommandConfig.default()
    commands.useFluentCommands()
    services.register(commands)
}
