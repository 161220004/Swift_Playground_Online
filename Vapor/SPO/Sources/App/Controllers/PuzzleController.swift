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

final class PuzzleController: RouteCollection {
    
    /// Router
    func boot(router: Router) throws {
        
        router.group("spo") { group in
            
            group.get("list", use: getPuzzleList)
            
            group.get("p0", use: getPuzzle0)
            
            group.post("p0", "code", use: postCode)
            
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
    func postCode(_ req: Request) throws -> Actions {
        
        if let codeJson = req.http.body.data {
            let codeObj = try JSONDecoder().decode(Code.self, from: String(data: codeJson, encoding:.utf8)!)
            // TODO: 编译运行
            if let codeStr  = codeObj.lines {
                // 获取时间戳
                let stamp = RunManager.getStamp()
                // 编译运行
                let output = RunManager.compile(code: codeStr, stamp: stamp)
                // 获取运行结果
                return RunManager.translateActions(stamp: stamp, description: output)
            }
        }
        return Actions()
    }
    
}
