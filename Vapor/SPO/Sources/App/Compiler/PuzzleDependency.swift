//
//  PuzzleDependency.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/11.
//

import Foundation

enum FunctionDependency: String {
    
    case None = ""
    case Log = "Log.swift"
    case Move = "Move.swift"
    case MoveMore = "MoveMore.swift"
    case Turn = "Turn.swift"
    case TurnLeft = "TurnLeft.swift"
    case TurnRight = "TurnRight.swift"
    case Collect = "Collect.swift"
    case Test = "Hello.swift"
    
}

final class PuzzleDependency {
    
    static private func generate(functions: FunctionDependency...) -> [String] {
        var dependencies: [String] = []
        for function in functions {
            dependencies.append(function.rawValue)
        }
        return dependencies
    }
    
    static public func use(pid: Int) -> [String] {
        switch pid {
        case 0: // Test
            return self.generate(functions: .Log, .Move, .MoveMore, .Turn, .TurnLeft, .TurnRight, .Collect, .Test)
        case 1: // Puzzle 1-1
            return self.generate(functions: .Log, .Move, .Collect)
        case 2: // Puzzle 1-2
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft)
        default:
            return self.generate(functions: .Log, .Test)
        }
    }
}
