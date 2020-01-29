import Vapor

/// Register your application's routes here.
public func routes(_ router: Router) throws {
    // "It works" page
    router.get { req in
        return try req.view().render("welcome")
    }
    
    // Says hello
    router.get("hello", String.parameter) { req -> Future<View> in
        return try req.view().render("hello", [
            "name": req.parameters.next(String.self)
            ])
    }

    // Puzzles
    router.get("puzzles") { req in
        return Puzzle.query(on: req).all()
            .encode(status: .created, for: req)
    }
    
    // View
    router.get("view") { req -> Future<View> in
        return try req.view().render("Welcome")
    }
}
