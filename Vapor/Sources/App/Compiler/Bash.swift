//
//  bash.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/2.
//

import Foundation

final class Bash {
    
    static var tasks: [String: Process] = [:]
    
    /// 调用bash执行命令行
    static public func run(_ command: String, _ stamp: String) -> String? {
        
        let task = Process()
        tasks.updateValue(task, forKey: stamp)
        task.launchPath = "/bin/bash"
        task.arguments = ["-c", command]
        let pipe = Pipe()
        task.standardOutput = pipe
        task.standardError = pipe
        task.launch()
        // self.task.waitUntilExit()
        
        let data = pipe.fileHandleForReading.readDataToEndOfFile()
        let output = String(data: data, encoding: String.Encoding.utf8)
        return output
    }
    
    /// 强制终止一个进程
    static public func forceTerminate(_ stamp: String) {
        if let task = tasks[stamp] {
            if task.isRunning {
                print("Timeout! Force to Terminate Current Process " + stamp)
                task.terminate() // 强制退出
            }
        }
    }
    
    /// 彻底移除所有stamp之前的进程
    static public func removeOldProcess(_ stamp: Double) {
        for task in tasks {
            if let doubleKey = Double(task.key) {
                if (doubleKey < stamp) {
                    self.forceTerminate(task.key)
                    tasks.removeValue(forKey: task.key)
                    print("- Process \(stamp)")
                }
            }
        }
    }
}
