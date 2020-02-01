//
//  PuzzleController.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/31.
//

import Vapor
import HTTP

struct Code: Codable, Content {
    var lines: String?
}

struct Pace: Content {
    var dx: Int
    var dy: Int
}
struct Actions: Content {
    var isLegal: Bool
    var isRight: Bool
    var steps: [Pace]
}

final class PuzzleController: RouteCollection {
    
    func boot(router: Router) throws {
        
        router.group("spo") { group in
            
            group.get("list", use: getPuzzleList)
            
            group.get("p0", use: getPuzzle0)
            
            group.post("p0", "code", use: postCode)
            
            group.get("p0", "result", use: getResult)
            
        }
    }
}

extension PuzzleController {
    
    /// Get: a list of all puzzles
    func getPuzzleList(_ req: Request) throws -> Future<[Puzzle]> {
        return Puzzle.query(on: req).all()
    }
    
    /// Get: one puzzle
    func getPuzzle0(_ req: Request) throws -> Future<View> {
        return try req.view().render("spo_p0")
    }
    
    /// Post: User Code
    func postCode(_ req: Request) throws -> Future<HTTPStatus> {
        if let codeJson = req.http.body.data {
            let codeObj = try JSONDecoder().decode(Code.self, from: String(data: codeJson, encoding:.utf8)!)
            let code = codeObj.lines
            // TODO: 编译运行
            sleep(5)
            print("I Am Awaked Now")
        }
        return try req.content.decode(Code.self).transform(to: HTTPStatus.created)
    }
    
    /// Get: Result
    func getResult(_ req: Request) throws -> Actions {
        let actions: Actions = Actions(isLegal: true, isRight: true, steps: [Pace(dx: 0, dy: 0)])
        return actions
    }
    
}
