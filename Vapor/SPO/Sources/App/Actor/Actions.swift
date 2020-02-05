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
    /// （此属性可能废弃并交给前端判断）动画是否合法（比如超出画面范围）
    var isLegal: Bool
    /// 是否是正确答案
    var isRight: Bool
    /// 动画步骤
    var paces: [Pace]
    /// 描述整个动画
    var description: String
    
    init(isLegal: Bool, isRight: Bool, paces: [Pace], description: String) {
        self.isCompiled = true
        self.isLegal = isLegal
        self.isRight = isRight
        self.paces = paces
        self.description = description
    }
    
    init(paces: [Pace]) {
        self.isCompiled = true
        self.isLegal = true
        self.isRight = true
        self.paces = paces
        self.description = ""
    }
    
    init() {
        self.isCompiled = false
        self.isLegal = false
        self.isRight = false
        self.paces = []
        self.description = "Invalid"
    }
}
