//
//  Pace.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

/// 表示动画的一个步骤
final class Pace: Codable, Content {
    
    /// 前进的步数（当前方向由前端维护）
    var d: Int
    /// 转向后的方向
    var dir: String
    /// 一个对话气泡
    var log: String
    
    /// 用于对话（--*）
    init(log: String) {
        self.d = 0
        self.dir = ""
        self.log = log
    }
    
    /// 用于改变方向（-*-）：不前进，仅表示方向
    init(dir: Direction) {
        self.d = 0
        self.dir = dir.rawValue
        self.log = ""
    }
    
    /// 用于前进（*--）：向当前方向前进step步（当前方向由前端负责维护）
    init(step: Int) {
        self.d = step
        self.dir = ""
        self.log = ""
    }
    
    /// 仅制造对象
    init() {
        self.d = 0
        self.dir = ""
        self.log = ""
    }
    
}
