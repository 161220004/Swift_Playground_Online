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
    
    // 临时当做属性；考虑到多个用户同时Run的问题，以后会废弃
    /// Actions ToDo in the Last Run
    var currentActions: Actions = Actions(isLegal: true, isRight: true, steps: [Pace(dx: 0, dy: 0)])
    
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
            let code = codeObj.lines
            // TODO: 编译运行
            compile()
        }
        return currentActions
    }
    
    /// Compile & Run User's Code
    func compile() {
        
        let path = PROJECT_PATH + "/Resources/Code/"
        let fileMain = path + "main.swift"
        let fileCode = path + "code.swift"
        let fileUtils = ["hello.swift", "move.swift"].map() { util in
            return path + util
        }
        let projName = path + "spo-proj"
        
        var compileLine = "swiftc "
        for fileUtil in fileUtils {
            compileLine += fileUtil + " "
        }
        compileLine += fileCode + " " + fileMain + " -o " + projName
        let runLine = projName
        
//        print(Bash.run(command: "pwd")!)
        print(Bash.run(command: compileLine)!)
//        print(Bash.run(command: runLine)!)
        currentActions.log = Bash.run(command: runLine)
        print("Compile & Run Finished")
    }
    
}
