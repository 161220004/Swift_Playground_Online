//
//  RunManager.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Foundation

final class RunManager {
    
    /// 获取当前系统时间的时间戳
    static public func getStamp() -> String {
        let time = Date().timeIntervalSince1970
        return String(time)
    }
    
    /// 根据时间戳，获取Code文件名
    static private func getCodeFilename(stamp: String) -> String {
        return CODE_PATH + "code-" + stamp + ".swift"
    }
    
    /// 根据时间戳，获取定义全局变量文件名
    static private func getGlobalFilename(stamp: String) -> String {
        return CODE_PATH + "global-" + stamp + ".swift"
    }
    
    /// 根据砖块数组生成场景定义代码
    static private func generateSceneCode(scene: Scene, deps: [String]) -> String {
        if (PuzzleDependency.has(dep: .Trace, inAll: deps) && PuzzleDependency.has(dep: .BlockClass, inAll: deps)) { // 可追踪，则定义场景
            let directionLine = "var CURRENT_DIRECTION_RAW = \(scene.puzzle.lappInitDir)\n"
            var sceneCode = directionLine + "var PUZZLE_SCENE_BLOCK_ARRAY = [\n"
            for block in scene.blocks {
                sceneCode += "Block(id: \(block.id), x: \(block.cellX), y: \(block.cellY), type: \(block.type), item: \"" + block.item + "\"),\n"
            }
            sceneCode = sceneCode.dropLast(2) + "]\n" // 删除最后的",\n"
            return sceneCode
        } else {
            return ""
        }
    }
    
    /// 保存用户的源代码，并生成时间戳等变量定义源代码
    static private func saveCode(_ content: String, stamp: String, scene: Scene, deps: [String]) throws {
        
        let fileURL = getCodeFilename(stamp: stamp)
        let globalURL = getGlobalFilename(stamp: stamp)
        // 时间戳定义源码
        let stampLine = "var CURRENT_STAMP = \"" + stamp + "\"\n"
        // 场景定义源码
        let sceneLines = generateSceneCode(scene: scene, deps: deps)
        let globalLines = stampLine + sceneLines
        do { // 用户源码保存
            try content.write(to: URL(fileURLWithPath: fileURL), atomically: true, encoding: .utf8)
        } catch {
            print("[ Error ] RunManager.saveCode: Failed to Write Code in " + fileURL)
            throw FileManagerError.SaveCodeFileFailed
        }
        do { // Global源码保存
            try globalLines.write(to: URL(fileURLWithPath: globalURL), atomically: true, encoding: .utf8)
        } catch {
            print("[ Error ] RunManager.saveCode: Failed to Write Stamp in " + globalURL)
            throw FileManagerError.SaveGlobalFileFailed
        }
    }
    
    /// 编译运行
    /// - Returns: 返回运行结果（失败或运行成功的bash输出内容）
    static public func compile(code: String, stamp: String, scene: Scene, dependencies: [String]) -> String {
        
        // 保存用户代码为code-$(stamp).swift文件
        do {
            try self.saveCode(code, stamp: stamp, scene: scene, deps: dependencies)
        } catch {
            print("[ Error ] RunManager.compile: Failed in Calling saveCode")
            return "Compile Failed"
        }
        
        // 用户代码及其依赖文件
        let fileMain = CODE_PATH + "main.swift" // main文件
        let fileCode = self.getCodeFilename(stamp: stamp) // 用户代码文件
        let fileGlobal = self.getGlobalFilename(stamp: stamp) // 定义全局变量
        let fileSave = CODE_PATH + "SaveResult.swift" // 运行结果的存储管理，以便展示动画
        // 其他依赖，不同的Puzzle的依赖不同
        let fileUtils = dependencies.map() { util -> String in
            if (util == "") { return "" }
            else { return CODE_PATH + util }
        }
        let projName = RESULT_PATH + "spo-proj-" + stamp
        
        // 命令行编译文件
        var compileLine = "swiftc "
        for fileUtil in fileUtils {
            compileLine += fileUtil + " "
        }
        compileLine += fileGlobal + " " + fileCode + " " + fileSave + " " + fileMain + " -o " + projName
        
        // 超时处理
        DispatchQueue.global(qos: .background).async {
            sleep(90)
            Bash.forceTerminate(stamp)
        }
        
        // 开始编译成可执行文件，并打印编译结果
        print("\nCompiling Files ...")
        let compileOutput = Bash.run(compileLine, stamp) ?? ""
        print(compileOutput)
        
        // 确认可运行项目是否存在，不存在说明编译失败
        if (!FileManager.default.fileExists(atPath: projName)) {
            print("[ Error ] RunManager.compile: Failed to Generate spo-proj")
            return compileOutput + "\nCompile Failed"
        }
        
        // 执行该可执行文件
        print("\nRunning Executable Project ...")
        let runOutput = Bash.run(projName, stamp) ?? ""
        
        return compileOutput + "\n" + runOutput
    }
    
    /// 读取并解析运行结果文件
    /// - Returns: 返回运行结果文件每一行作为一个String后合成的数组
    static private func readResult(stamp: String) throws -> [String] {
        
        let fileResult = RESULT_PATH + "result-" + stamp
        var resultContent = ""
        do {
            resultContent = try String(contentsOf: URL(fileURLWithPath: fileResult), encoding: .utf8)
        } catch {
            print("[ Error ] RunManager.readResult: Failed to Read Result in " + fileResult)
            throw FileManagerError.ReadResultFileFailed
        }
        return resultContent.components(separatedBy: "\n")
    }
    
    /// 根据运行结果的输出文件，得到动画动作
    /// - Parameters:
    ///   - description: 对整套动作的描述
    /// - Returns: 返回的Action将在前端被解析并转化为动画展示
    static public func translateActions(stamp: String, description: String) -> Actions {
        
        var actions: [String]
        do {
            actions = try self.readResult(stamp: stamp)
        } catch {
            print("[ Error ] RunManager.translateActions: Failed in Calling readResult")
            return Actions()
        }
        var paces: [Pace] = []
        print("\nActions to Perform: ")
        for action in actions {
            if (action.count <= 3) { continue }
            print("+ " + action)
            if (action.contains(Keyword.GO.rawValue)) {
                // GO: $(Int)
                if let step = Int(action.dropFirst(4)) {
                    paces.append(Pace(step: step))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse \"" + action + "\" Action")
                }
            } else if (action.contains(Keyword.LOG.rawValue)) {
                // LOG: $(String)
                let log = String(action.dropFirst(5))
                if (log.count > 0) {
                    paces.append(Pace(log: log))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse \"" + action + "\" Action")
                }
            } else if (action.contains(Keyword.TURN.rawValue)) {
                // TURN: $(Direction)
                if let dir = Int(action.dropFirst(6)) {
                    paces.append(Pace(dir: dir))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse \"" + action + "\" Action")
                }
            } else if (action.contains(Keyword.COLLECT.rawValue)) {
                // COLLECT
                paces.append(Pace(type: Keyword.COLLECT.rawValue))
            } else if (action.contains(Keyword.SWITCHIT.rawValue)) {
                // SWITCHIT
                paces.append(Pace(type: Keyword.SWITCHIT.rawValue))
            } else if (action.contains(Keyword.BLOCK.rawValue)) {
                // BLOCK x y INIT/SWITCH
                let actionStrs = action.components(separatedBy: " ")
                var blockPos: [Int] = []
                if let blockPosX = Int(actionStrs[1]), let blockPosY = Int(actionStrs[2]) {
                    blockPos.append(blockPosX)
                    blockPos.append(blockPosY)
                    paces.append(Pace(pos: blockPos, b: actionStrs[3]))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse \"" + action + "\" Action")
                }
            } else {
                print("[ Error ] RunManager.translateActions: Undefined Action \"" + action + "\" Appears")
            }
        }
        return Actions(paces, description: description)
    }
    
    /// 取到一个带时间戳文件名内的时间戳（code-..., stamp-..., spo-proj-..., result-...）
    /// - Returns: 返回Optional，当文件名中不存在时间戳时为nil，否则返回文件名上的时间戳
    static private func getStampInFilename(_ filename: String) -> String? {
        if (filename.contains("code-")) {
            return String(filename.dropFirst(5).dropLast(6))
        } else if (filename.contains("global-")) {
            return String(filename.dropFirst(7).dropLast(6))
        } else if (filename.contains("spo-proj-")) {
            return String(filename.dropFirst(9))
        } else if (filename.contains("result-")) {
            return String(filename.dropFirst(7))
        } else {
            return nil
        }
    }
    
    /// 删除过老的文件（仅供clear函数使用）
    static private func removeOld(_ path: String, _ filename: String, _ oldStamp: Double) throws {
        if let fileStampStr = self.getStampInFilename(filename) {
            if let fileStamp = Double(fileStampStr) {
                if (fileStamp < oldStamp) {
                    do {
                        try FileManager.default.removeItem(atPath: path + filename)
                        print("- " + filename)
                    } catch {
                        print("[ Error ] RunManager.removeOld: Failed to Remove Old File " + path + filename)
                        throw FileManagerError.RemoveOldFileFailed
                    }
                }
            } else {
                print("[ Error ] RunManager.removeOld: Failed to Fetch (Double)Stamp from " + filename)
                throw TransformError.TypeCastingFailed
            }
        }
    }
    
    /// 清除10分钟前的运行相关文件（code-..., stamp-..., spo-proj-..., result-...）
    static public func clear() {
        
        print("\nClearing Old Files: ")
        // 当前120秒之前的时间戳
        let oldStamp = Double(Date().timeIntervalSince1970.advanced(by: -120))
        // 删除此前的编译进程
        Bash.removeOldProcess(oldStamp)
        // 删除此前的文件
        var contentsOfCode: [String]
        var contentsOfResult: [String]
        do {
            contentsOfCode = try FileManager.default.contentsOfDirectory(atPath: CODE_PATH)
            contentsOfResult = try FileManager.default.contentsOfDirectory(atPath: RESULT_PATH)
        } catch {
            print("[ Error ] RunManager.clear: Failed to Get Content in Directory /Code or /Result")
            return
        }
        do {
            for filename in contentsOfCode {
                try self.removeOld(CODE_PATH, filename, oldStamp)
            }
            for filename in contentsOfResult {
                try self.removeOld(RESULT_PATH, filename, oldStamp)
            }
        } catch {
            print("[ Error ] RunManager.clear: Failed in Calling removeOld")
            return
        }
    }
    
}
