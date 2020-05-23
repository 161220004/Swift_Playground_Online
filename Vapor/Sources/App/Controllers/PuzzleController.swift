//
//  PuzzleController.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/31.
//

import Vapor
import HTTP

struct RunInfo: Codable, Content {
    var code: String
    var scene: Scene
}

final class PuzzleController: RouteCollection {
    
    /// Router
    func boot(router: Router) throws {
        
        router.get("welcome", use: getWelcome)
        
        router.get("chapter", Int.parameter, use: getChapter)
        
        router.group("puzzle") { group in
            
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
    
    /// 从Json文件获取SceneInfo对象
    func readSceneInfo(pid: Int) throws -> Scene {
        let jsonFile = SCENE_PATH + "Puzzle\(pid).json"
        var jsonContent = ""
        do {
            jsonContent = try String(contentsOf: URL(fileURLWithPath: jsonFile), encoding: .utf8)
        } catch {
            print("[ Error ] PuzzleController.readSceneInfo: Failed to Read Result in " + jsonFile)
            throw FileManagerError.ReadSceneFileFailed
        }
        var sceneInfo: Scene
        do {
            sceneInfo = try JSONDecoder().decode(Scene.self, from: jsonContent)
        } catch {
            print("[ Error ] PuzzleController.readSceneInfo: Failed to Decode Json Data to Object")
            throw TransformError.DecodeJsonFailed
        }
        return sceneInfo
    }
    
    /// Get: Puzzle Scene
    func getScene(_ req: Request) throws -> Scene {
        // 获取Pid
        let pid = try req.parameters.next(Int.self)
        print("\nGet Puzzle \(pid) Scene")
        // 读取Json文件并解码为对象
        return try readSceneInfo(pid: pid)
    }
    
    /// Post: User Code
    func postCode(_ req: Request) -> Actions {
        var pid: Int = 0
        var dependencies: [String] = []
        do { // 获取当前PuzzleId，并根据pid获取所需依赖
            pid = try req.parameters.next(Int.self)
            dependencies = PuzzleDependency.use(pid: pid)
            print("\nSet Puzzle \(pid) Dependencies: \(dependencies)")
        } catch {
            print("[ Error ] PuzzleController.postCode: Failed to Get Pid From URL")
            return Actions("Server Error")
        }
        if let dataJson = req.http.body.data {
            // 从Json转换为Object
            var runInfo: RunInfo
            do {
                runInfo = try JSONDecoder().decode(RunInfo.self, from: String(data: dataJson, encoding:.utf8)!)
            } catch {
                print("[ Error ] PuzzleController.postCode: Failed to Decode Json Data to Object")
                return Actions("Server Error")
            }
            // 编译运行
            let stamp = RunManager.getStamp() // 获取时间戳
            print("Get Stamp: " + stamp)
            // 编译运行
            let output = RunManager.compile(code: runInfo.code, stamp: stamp, scene: runInfo.scene, dependencies: dependencies)
            // 清除旧文件
            DispatchQueue.global(qos: .background).async {
                sleep(5)
                RunManager.clear()
            }
            // 获取运行结果
            return RunManager.translateActions(stamp: stamp, description: output)
        } else {
            print("[ Error ] PuzzleController.postCode: Failed to Get Data from Request")
            return Actions("Server Error")
        }
    }
    
}
