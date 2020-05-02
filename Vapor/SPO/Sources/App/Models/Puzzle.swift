//
//  Puzzle.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/28.
//

import Fluent
import FluentMySQL
import Vapor

/// 访问数据库的接口
final class Puzzle: MySQLModel, Content {
    
    /// Puzzle序号
    var id: Int?
    
    /// 描述
    var description: String
    
    /// Lappland初始方向(0: Left, 1: Up, 2: Right, 3: Down)
    var lappInitDir: Int
    
    /// 随机宝石数量
    var randDiamNum: Int
    
    /// 背景左上角初始的像素位置
    var backInitX: Double
    var backInitY: Double
    
    init(pid: Int? = nil, ld lappdir: Int, _ description: String) {
        self.id = pid
        self.description = description
        self.lappInitDir = lappdir
        self.randDiamNum = 0
        self.backInitX = -50
        self.backInitY = 0
    }
    
    init(pid: Int? = nil, ld lappdir: Int, rn randNum: Int, _ description: String) {
        self.id = pid
        self.description = description
        self.lappInitDir = lappdir
        self.randDiamNum = randNum
        self.backInitX = -50
        self.backInitY = 0
    }
    
    init(pid: Int? = nil, ld lappdir: Int, bx backx: Double, by backy: Double, _ description: String) {
        self.id = pid
        self.description = description
        self.lappInitDir = lappdir
        self.randDiamNum = 0
        self.backInitX = backx
        self.backInitY = backy
    }
    
    init(pid: Int? = nil, ld lappdir: Int, rn randNum: Int, bx backx: Double, by backy: Double, _ description: String) {
        self.id = pid
        self.description = description
        self.lappInitDir = lappdir
        self.randDiamNum = randNum
        self.backInitX = backx
        self.backInitY = backy
    }
}

extension Puzzle: Migration { }

/// Allows to be used as a dynamic parameter in route definitions.
extension Puzzle: Parameter { }
