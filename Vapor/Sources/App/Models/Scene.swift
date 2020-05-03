//
//  Scene.swift
//  App
//
//  Created by 曹洋笛 on 2020/5/3.
//

import Vapor

struct Scene: Codable, Content {
    
    /// 关卡信息
    var puzzle: Puzzle
    
    /// 砖块位置信息
    var blocks: [Block]
    
}
