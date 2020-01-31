import Vapor

/// Register your application's routes here.
public func routes(_ router: Router) throws {
    
    try router.register(collection: HelloController())
    
//    try router.register(collection: PuzzleController())
    
    
    
    router.get("spo") { req -> Future<View> in
        return try req.view().render("spo_p0")
    }
    
}
