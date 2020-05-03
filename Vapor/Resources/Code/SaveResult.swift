import Foundation

// CURRENT_STAMP 需在其他文件中定义为全局常量

func saveResult(_ content: String) {
    
    let result = content + "\n"
    
    let fileURL = "Resources/Results/result-" + CURRENT_STAMP
    
    if (FileManager.default.fileExists(atPath: fileURL)) {
        if let handler = FileHandle(forWritingAtPath: fileURL) {
            handler.seekToEndOfFile()
            handler.write(result.data(using: .utf8)!)
            handler.closeFile()
        }
    } else {
        do {
            try result.write(to: URL(fileURLWithPath: fileURL), atomically: true, encoding: .utf8)
        } catch { // error handling
            print("Error: Failed to Write Result in " + fileURL)
        }
    }
}
