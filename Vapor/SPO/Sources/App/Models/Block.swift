//
//  Block.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/10.
//

import Fluent
import FluentMySQL
import Vapor

enum BlockType: Int {
    
    case Normal = 0
    case Red = 1
    case Yellow = 2
    case Green = 3
    case Blue = 4
    case Purple = 5
    case Dark = 6
}

final class Block: MySQLModel, Content {
    
    var id: Int?
    
    /// Puzzle序号
    var puzzleId: Int
    
    /// 类型
    var type: Int
    
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
