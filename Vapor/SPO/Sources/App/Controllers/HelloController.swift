//
//  HelloController.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/31.
//

import Vapor

final class HelloController: RouteCollection {
    
    func boot(router: Router) throws {
        
        router.get("hello", use: hello)
        
        router.get("welcome", use: welcome)
        
    }
}

extension HelloController {
    
    func hello(_ req: Request) throws -> Future<View> {
        struct OneGreeting: Content {
            var name: String?
            var greeting: String?
        }
        let greeting = OneGreeting(name: "Tom", greeting: "How are you?")
        return try req.view().render("hello", greeting)
    }
    
    func welcome(_ req: Request) throws -> Future<View> {
        return try req.view().render("welcome")
    }
    
}
