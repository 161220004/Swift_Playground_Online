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
    
    var description: String
    
    /// Lappland初始Cell(0, 0)对应的像素位置
    var lappInitX: Double
    var lappInitY: Double
    
    /// Lappland初始方向(0: Left, 1: Up, 2: Right, 3: Down)
    var lappInitDir: Int
    
    /// 地砖Block在Cell(0, 0)处的像素位置
    var blockInitX: Double
    var blockInitY: Double
    
    /// 背景左上角初始的像素位置
    var backInitX: Double
    var backInitY: Double
    
    init(pid: Int? = nil, lx lappx: Double, ly lappy: Double, ld lappdir: Int, fx blockx: Double, fy blocky: Double, bx backx: Double, by backy: Double, _ description: String) {
        self.id = pid
        self.description = description
        self.lappInitX = lappx
        self.lappInitY = lappy
        self.lappInitDir = lappdir
        self.blockInitX = blockx
        self.blockInitY = blocky
        self.backInitX = backx
        self.backInitY = backy
    }
}

extension Puzzle: Migration { }

/// Allows to be used as a dynamic parameter in route definitions.
extension Puzzle: Parameter { }
