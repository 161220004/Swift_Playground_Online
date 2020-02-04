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
    
    /// 保存用户的代码文件，并生成时间戳定义文件
    static private func saveCode(_ content: String, stamp: String) {
        
        let fileURL = getCodeFilename(stamp: stamp)
        let stampURL = getStampFilename(stamp: stamp)
        let stampLine = "let CURRENT_STAMP = \"" + stamp + "\""
        do {
            try content.write(to: URL(fileURLWithPath: fileURL), atomically: true, encoding: .utf8)
        } catch { print("Error: Failed to Write Code in " + fileURL) }
        do {
            try stampLine.write(to: URL(fileURLWithPath: stampURL), atomically: true, encoding: .utf8)
        } catch { print("Error: Failed to Write Stamp in " + stampURL) }
    }
    
    /// 读取运行结果文件
    static private func readResult(stamp: String) -> [String] {
        
        let fileResult = RESULT_PATH + "result-" + stamp
        var resultContent = ""
        do {
            resultContent = try String(contentsOf: URL(fileURLWithPath: fileResult), encoding: .utf8)
        } catch {
            print("Error: Failed to Read Result in " + fileResult)
            return []
        }
        return resultContent.components(separatedBy: "\n")
    }
    
    /// 编译运行
    static public func compile(code mainbody: String, stamp: String) -> String {
        print(mainbody)
        
        // 使用用户代码组装main函数
        let funcHead = "func main() {\n"
        let funcTail = "\n}"
        let code = funcHead + mainbody + funcTail
        
        // 保存组装后的代码为code-$(stamp).swift文件
        self.saveCode(code, stamp: stamp)
        
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
        let runLine = projName
        
        // 打印编译结果/返回运行结果
        print(Bash.run(command: compileLine) ?? "")
        return Bash.run(command: runLine) ?? ""
    }
    
    /// 根据运行结果的输出文件，得到动画动作
    static public func translateActions(stamp: String, description: String) -> Actions {
        let actions = self.readResult(stamp: stamp)
        
        // 初始方向为：Right
        var direction = Direction.Right
        var paces: [Pace] = []
        
        for action in actions {
            if (action.count <= 3) { continue }
            print(action)
            if (action.contains(Keyword.GO.rawValue)) {
                // GO: $(Int)
                if let step = Int(action.dropFirst(4)) {
                    paces.append(Pace(step: step, dir: direction))
                }
            } else if (action.contains(Keyword.LOG.rawValue)) {
                // LOG: $(String)
                let log = action.dropFirst(5)
                paces.append(Pace(log: String(log)))
                
            } else if (action.contains(Keyword.TURN.rawValue)) {
                // TURN: $(Direction)
                if let dir = Direction(rawValue: String(action.dropFirst(6))) {
                    paces.append(Pace(dir: dir))
                    direction = dir
                }
            }
        }
        return Actions(isLegal: true, isRight: true, paces: paces, description: description)
    }
    
}
