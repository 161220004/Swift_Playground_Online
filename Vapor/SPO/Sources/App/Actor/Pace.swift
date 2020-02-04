//
//  Pace.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

final class Pace: Codable, Content {
    
    var dx: Int
    var dy: Int
    var dir: String
    var log: String
    
    /// 用于对话
    init(log: String) {
        self.dx = 0
        self.dy = 0
        self.dir = ""
        self.log = log
    }
    
    /// 用于改变方向：不前进，仅表示方向
    init(dir: Direction) {
        self.dx = 0
        self.dy = 0
        self.dir = dir.rawValue
        self.log = ""
    }
    
    /// 用于前进：向某个方向前进step步
    init(step: Int, dir: Direction) {
        self.dx = 0
        self.dy = 0
        switch dir {
        case .Right: self.dx = 1
        case .Left: self.dx = -1
        case .Up: self.dy = -1
        case .Down: self.dy = 1
        case .None: break
        }
        self.dx *= step
        self.dy *= step
        self.dir = ""
        self.log = ""
    }
    
    /// 用于前进
    init(dx: Int, dy: Int) {
        self.dx = dx
        self.dy = dy
        self.dir = ""
        self.log = ""
    }
    
    /// 用于前进
    init(dx: Int) {
        self.dx = dx
        self.dy = 0
        self.dir = ""
        self.log = ""
    }
    
    /// 用于前进
    init(dy: Int) {
        self.dx = 0
        self.dy = dy
        self.dir = ""
        self.log = ""
    }
    
    /// 仅制造对象
    init() {
        self.dx = 0
        self.dy = 0
        self.dir = ""
        self.log = ""
    }
    
}
