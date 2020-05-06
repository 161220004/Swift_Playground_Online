//
//  PuzzleController.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/31.
//

import Vapor
import HTTP

struct RunInfo: Codable, Content {
    var code: String?
    var dir: Int
}

final class PuzzleController: RouteCollection {
    
    /// Router
    func boot(router: Router) throws {
        
        router.group("spo") { group in
            
            group.get("welcome", use: getWelcome)
            
            group.get("chapter", Int.parameter, use: getChapter)
            
            group.get(Int.parameter, use: getPuzzle)
            
            group.post(Int.parameter, "code", use: postCode)
            
            group.get(Int.parameter, "scene", use: getScene)
            
        }
    }
}

extension PuzzleController {
    
    /// Get: Welcome
    func getWelcome(_ req: Request) throws -> Future<View> {
        return try req.view().render("spo_welcome")
    }
    
    /// Get: One Chapter
    func getChapter(_ req: Request) throws -> Future<View> {
        let cid = try req.parameters.next(Int.self)
        return try req.view().render("spo_c\(cid)")
    }
    
    /// Get: One Puzzle
    func getPuzzle(_ req: Request) throws -> Future<View> {
        let pid = try req.parameters.next(Int.self)
        return try req.view().render("spo_\(pid)")
    }
    
    /// Get: Puzzle Scene
    func getScene(_ req: Request) throws -> Scene {
        _ = Bash.forceTerminate() // 刷新页面时，此前的编译进程强制终止
        
        let pid = try req.parameters.next(Int.self)
        print("get Puzzle \(pid) Scene")
        let jsonFile = SCENE_PATH + "Puzzle\(pid).json"
        var jsonContent = ""
        do {
            jsonContent = try String(contentsOf: URL(fileURLWithPath: jsonFile), encoding: .utf8)
        } catch {
            print("[ Error ] PuzzleController.getScene: Failed to Read Result in " + jsonFile)
            throw FileManagerError.ReadSceneFileFailed
        }
        var sceneInfo: Scene
        do {
            sceneInfo = try JSONDecoder().decode(Scene.self, from: jsonContent)
        } catch {
            print("[ Error ] PuzzleController.getScene: Failed to Decode Json Data to Object")
            throw TransformError.DecodeJsonFailed
        }
        return sceneInfo
    }
    
    /// Post: User Code
    func postCode(_ req: Request) -> Actions {
        _ = Bash.forceTerminate() // 重新运行用户代码时，此前的编译进程强制终止
        
        var dependencies: [String] = []
        do {
            // 获取当前PuzzleId
            let pid = try req.parameters.next(Int.self)
            // 根据pid获取所需依赖
            dependencies = PuzzleDependency.use(pid: pid)
            print("Set Puzzle \(pid) Dependencies: \(dependencies)")
        } catch {
            print("[ Error ] PuzzleController.postCode: Failed to Get Pid From URL")
            return Actions()
        }
        if let dataJson = req.http.body.data {
            // 从Json转换为Object
            var runInfo: RunInfo
            do {
                runInfo = try JSONDecoder().decode(RunInfo.self, from: String(data: dataJson, encoding:.utf8)!)
            } catch {
                print("[ Error ] PuzzleController.postCode: Failed to Decode Json Data to Object")
                return Actions()
            }
            // 编译运行
            if let codeStr  = runInfo.code {
                // 获取当前方向以控制行动
                if let dir = Direction(rawValue: runInfo.dir) {
                    // 获取时间戳
                    let stamp = RunManager.getStamp()
                    print("Get Stamp: " + stamp)
                    // 编译运行
                    let output = RunManager.compile(code: codeStr, dependencies: dependencies, direction: dir, stamp: stamp)
                    // 清除旧文件
                    DispatchQueue.global(qos: .background).async {
                        sleep(5)
                        RunManager.clear()
                    }
                    // 获取运行结果
                    return RunManager.translateActions(stamp: stamp, description: output)
                } else {
                    print("[ Error ] PuzzleController.postCode: Failed to Get Direction from Decoded Data")
                    return Actions()
                }
            } else {
                print("[ Error ] PuzzleController.postCode: Failed to Get Code from Decoded Data")
                return Actions()
            }
        } else {
            print("[ Error ] PuzzleController.postCode: Failed to Get Data from Request")
            return Actions()
        }
    }
    
}
