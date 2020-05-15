//
//  Puzzle.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/28.
//

import Vapor

/// 访问Json
struct Puzzle: Codable, Content {
    
    /// Puzzle序号
    var id: Int
    
    /// 描述
    var description: String
    
    /// Lappland初始方向(0: Left, 1: Up, 2: Right, 3: Down)
    var lappInitDir: Int
    
    /// 目标宝石/开关数量
    var targetDiamNum: Int
    var targetOnNum: Int
    
    /// 背景左上角初始的像素位置
    var backInitX: Double
    var backInitY: Double
    
}
