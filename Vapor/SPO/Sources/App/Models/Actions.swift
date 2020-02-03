//
//  Actions.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Vapor

struct Pace: Content {
    var dx: Int
    var dy: Int
}

final class Actions: Content {
    var isLegal: Bool
    var isRight: Bool
    var steps: [Pace]
    var log: String?
    
    init(isLegal: Bool, isRight: Bool, steps: [Pace], log: String?) {
        self.isLegal = isLegal
        self.isRight = isRight
        self.steps = steps
        self.log = log
    }
    
    init(isLegal: Bool, isRight: Bool, steps: [Pace]) {
        self.isLegal = isLegal
        self.isRight = isRight
        self.steps = steps
        self.log = nil
    }
    
    init(steps: [Pace]) {
        self.isLegal = true
        self.isRight = true
        self.steps = steps
        self.log = nil
    }
}
