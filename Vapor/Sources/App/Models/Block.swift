//
//  Block.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/10.
//

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

struct Block: Codable, Content {
    
    /// 绘制顺序
    var id: Int
    
    /// 类型
    var type: Int
    
    /// Cell的坐标
    var cellX: Int
    var cellY: Int
    
    /// 地砖上放置的物品种类
    var item: String
    
}
