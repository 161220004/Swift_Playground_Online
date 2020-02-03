//
//  bash.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/2.
//

import Foundation

// 若使用Xcode的Run将给出一个不恰当的路径：/Users/aldebarain/Library/Developer/Xcode/DerivedData/...
// 使用命令行“vapor run”则会得到想要的项目地址，如：/Users/aldebarain/Vapor/Swift_Playground_Online/Vapor/SPO
let PROJECT_PATH = FileManager.default.currentDirectoryPath

final class Bash {

    static public func run(command cmd: String) -> String? {
        
        let task = Process()
        task.launchPath = "/bin/bash"
        task.arguments = ["-c", cmd]
        let pipe = Pipe()
        task.standardOutput = pipe
        task.launch()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let output = String(data: data, encoding: String.Encoding.utf8)
        return output
    }
}
