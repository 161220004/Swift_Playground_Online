//
//  Actions.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

final class Actions: Codable, Content {
    var isLegal: Bool
    var isRight: Bool
    var paces: [Pace]
    var description: String
    
    init(isLegal: Bool, isRight: Bool, paces: [Pace], description: String) {
        self.isLegal = isLegal
        self.isRight = isRight
        self.paces = paces
        self.description = description
    }
    
    init(isLegal: Bool, isRight: Bool, paces: [Pace]) {
        self.isLegal = isLegal
        self.isRight = isRight
        self.paces = paces
        self.description = ""
    }
    
    init(paces: [Pace]) {
        self.isLegal = true
        self.isRight = true
        self.paces = paces
        self.description = ""
    }
    
    init() {
        self.isLegal = false
        self.isRight = false
        self.paces = []
        self.description = "Invalid"
    }
}
