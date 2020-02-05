//
//  RunManager.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Foundation

/// 用户代码相关文件的路径
let CODE_PATH = PROJECT_PATH + "/Resources/Code/"
/// 运行结果相关文件的路径
let RESULT_PATH = PROJECT_PATH + "/Resources/Results/"

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
    
    /// 根据时间戳，获取时间戳文件名
    static private func getStampFilename(stamp: String) -> String {
        return CODE_PATH + "stamp-" + stamp + ".swift"
    }
    
    /// 保存用户的源代码，并生成时间戳变量定义源代码
    static private func saveCode(_ content: String, stamp: String) throws {
        
        let fileURL = getCodeFilename(stamp: stamp)
        let stampURL = getStampFilename(stamp: stamp)
        let stampLine = "let CURRENT_STAMP = \"" + stamp + "\""
        do {
            try content.write(to: URL(fileURLWithPath: fileURL), atomically: true, encoding: .utf8)
        } catch {
            print("[ Error ] RunManager.saveCode: Failed to Write Code in " + fileURL)
            throw FileManagerError.SaveCodeFileFailed
        }
        do {
            try stampLine.write(to: URL(fileURLWithPath: stampURL), atomically: true, encoding: .utf8)
        } catch {
            print("[ Error ] RunManager.saveCode: Failed to Write Stamp in " + stampURL)
            throw FileManagerError.SaveStampFileFailed
        }
    }
    
    /// 编译运行
    /// - Returns: 返回运行结果（失败或运行成功的bash输出内容）
    static public func compile(code mainbody: String, stamp: String) -> String {
        
        // 使用用户代码组装main函数
        let funcHead = "func main() {\n"
        let funcTail = "\n}"
        let code = funcHead + mainbody + funcTail
        
        // 保存组装后的代码为code-$(stamp).swift文件
        do {
            try self.saveCode(code, stamp: stamp)
        } catch {
            print("[ Error ] RunManager.compile: Failed in Calling saveCode")
            return "Compile Failed"
        }
        
        // 用户代码及其依赖文件
        let fileMain = CODE_PATH + "main.swift" // main文件
        let fileCode = self.getCodeFilename(stamp: stamp) // 用户代码文件
        let fileStamp = self.getStampFilename(stamp: stamp) // 定义时间戳以便查询运行结果
        let fileSave = CODE_PATH + "SaveResult.swift" // 运行结果的存储管理，以便展示动画
        // 其他依赖，不同的Puzzle的依赖不同
        let fileUtils = ["Hello.swift", "Move.swift", "Turn.swift", "Log.swift"].map() { util in
            return CODE_PATH + util
        }
        let projName = CODE_PATH + "spo-proj-" + stamp
        
        // 命令行编译文件
        var compileLine = "swiftc "
        for fileUtil in fileUtils {
            compileLine += fileUtil + " "
        }
        compileLine += fileStamp + " " + fileCode + " " + fileSave + " " + fileMain + " -o " + projName
        
        // 打印编译结果
        print(Bash.run(command: compileLine) ?? "")
        
        // 确认可运行项目是否存在
        if (!FileManager.default.fileExists(atPath: projName)) {
            print("[ Error ] RunManager.compile: Failed to Generate spo-proj")
            return "Compile Failed"
        }
        return Bash.run(command: projName) ?? ""
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
                    print("[ Error ] RunManager.translateActions: Failed to Analyse GO Action")                }
            } else if (action.contains(Keyword.LOG.rawValue)) {
                // LOG: $(String)
                let log = String(action.dropFirst(5))
                if (log.count > 0) {
                    paces.append(Pace(log: log))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse LOG Action")
                }
            } else if (action.contains(Keyword.TURN.rawValue)) {
                // TURN: $(Direction)
                if let dir = Direction(rawValue: String(action.dropFirst(6))) {
                    paces.append(Pace(dir: dir))
                } else {
                    print("[ Error ] RunManager.translateActions: Failed to Analyse TURN Action")
                }
            }
        }
        return Actions(isLegal: true, isRight: true, paces: paces, description: description)
    }
    
    /// 取到一个带时间戳文件名内的时间戳（code-..., stamp-..., spo-proj-..., result-...）
    /// - Returns: 返回Optional，当文件名中不存在时间戳时为nil，否则返回文件名上的时间戳
    static private func getStampInFilename(_ filename: String) -> String? {
        if (filename.contains("code-")) {
            return String(filename.dropFirst(5).dropLast(6))
        } else if (filename.contains("stamp-")) {
            return String(filename.dropFirst(6).dropLast(6))
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
        // 当前600秒之前的时间戳
        let oldStamp = Double(Date().timeIntervalSince1970.advanced(by: -600))
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
