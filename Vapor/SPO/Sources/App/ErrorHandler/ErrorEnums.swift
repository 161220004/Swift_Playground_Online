//
//  ErrorEnums.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/4.
//

import Foundation

/// 存取本地文件时可能发生的错误
enum FileManagerError: Error {
    
    case SaveCodeFileFailed
    case SaveStampFileFailed
    case ReadResultFileFailed
    case RemoveOldFileFailed
}

/// 强行对固定格式进行类型转换时可能发生的错误
enum TransformError: Error {
    
    case TypeCastingFailed
    
}
