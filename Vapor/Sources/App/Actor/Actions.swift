//
//  Actions.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

/// 表示运行结果转化成的整个动画
/// 分为多个步骤，表现为[Pace]
final class Actions: Codable, Content {
    
    /// 是否编译运行成功所得的结果
    var isCompiled: Bool
    
    /// 动画步骤
    var paces: [Pace]
    
    /// 描述整个动画
    var description: String
    
    init(_ paces: [Pace], description: String) {
        self.isCompiled = true
        self.paces = paces
        self.description = description
    }
    
    init() {
        self.isCompiled = false
        self.paces = []
        self.description = "Invalid"
    }
}
