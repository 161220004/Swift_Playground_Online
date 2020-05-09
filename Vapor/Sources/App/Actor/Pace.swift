//
//  Pace.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

/// 表示动画的一个步骤
final class Pace: Codable, Content {
    
    /// 行动类型
    var type: String
    /// 前进的步数（当前方向由前端维护）
    var d: Int
    /// 转向后的方向
    var dir: Int
    /// 一个对话气泡
    var log: String
    /// Block位置
    var pos: [Int]
    /// Block执行的动作
    var b: String
    
    /// 用于对话（--*）
    init(log: String) {
        self.type = Keyword.LOG.rawValue
        self.d = 0
        self.dir = 0
        self.log = log
        self.pos = []
        self.b = ""
    }
    
    /// 用于改变方向（-*-）：不前进，仅表示方向
    init(dir: Int) {
        self.type = Keyword.TURN.rawValue
        self.d = 0
        self.dir = dir
        self.log = ""
        self.pos = []
        self.b = ""
    }
    
    /// 用于前进（*--）：向当前方向前进step步（当前方向由前端负责维护）
    init(step: Int) {
        self.type = Keyword.GO.rawValue
        self.d = step
        self.dir = 0
        self.log = ""
        self.pos = []
        self.b = ""
    }
    
    /// 用于取宝石/切换砖块（---）
    init(type: String) {
        self.type = type
        self.d = 0
        self.dir = 0
        self.log = ""
        self.pos = []
        self.b = ""
    }
    
    /// 用于Block类行为
    init(pos: [Int], b: String) {
        self.type = Keyword.BLOCK.rawValue
        self.d = 0
        self.dir = 0
        self.log = ""
        self.pos = pos
        self.b = b
    }
    
}
