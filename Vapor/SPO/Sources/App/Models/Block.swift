//
//  Block.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/10.
//

import Fluent
import FluentMySQL
import Vapor

enum BlockType: String {
    
    case Normal = "Normal"
    case Red = "Red"
    case Yellow = "Yellow"
    case Green = "Green"
    case Blue = "Blue"
    case Purple = "Purple"
    case Dark = "Dark"
}

final class Block: MySQLModel, Content {
    
    var id: Int?
    
    /// Puzzle序号
    var puzzleId: Int
    
    /// 类型
    var type: String
    
    /// Cell的坐标
    var cellX: Int
    var cellY: Int
    
    /// 地砖上放置的物品种类
    var item: String
    
    init(pid: Int, _ type: BlockType, x: Int, y: Int, item: ItemType) {
        self.id = nil
        self.puzzleId = pid
        self.type = type.rawValue
        self.cellX = x
        self.cellY = y
        self.item = item.rawValue
    }
}

extension Block: Migration { }

/// Allows to be used as a dynamic parameter in route definitions.
extension Block: Parameter { }
