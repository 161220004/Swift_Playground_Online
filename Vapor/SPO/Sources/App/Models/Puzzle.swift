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
    
    var id: Int?
    
    var description: String
    
    init(id: Int? = nil, description: String) {
        self.id = id
        self.description = description
    }
    
    init(description: String) {
        self.id = nil
        self.description = description
    }
}

extension Puzzle: Migration { }

/// Allows to be used as a dynamic parameter in route definitions.
extension Puzzle: Parameter { }
