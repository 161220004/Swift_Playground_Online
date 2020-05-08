//
//  bash.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/2.
//

import Foundation

final class Bash {
    
    static var task = Process()
    
    static public func run(command cmd: String) -> String? {
        
        self.task = Process()
        self.task.launchPath = "/bin/bash"
        self.task.arguments = ["-c", cmd]
        let pipe = Pipe()
        self.task.standardOutput = pipe
        self.task.standardError = pipe
        self.task.launch()
        // self.task.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let output = String(data: data, encoding: String.Encoding.utf8)
        return output
    }
    
    static public func forceTerminate() -> Bool {
        if task.isRunning {
            print("Timeout! Force to Terminate Current Process")
            task.terminate() // 强制退出
            return true
        }
        return false
    }
}
