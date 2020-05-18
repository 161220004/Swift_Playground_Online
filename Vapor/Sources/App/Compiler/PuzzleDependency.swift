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
    case SwitchIt = "SwitchIt.swift"
    
    case Trace = "Trace.swift"
    case TLog = "TraceLog.swift"
    case TMove = "TraceMove.swift"
    case TMoveMore = "TraceMoveMore.swift"
    case TTurnLeft = "TraceTurnLeft.swift"
    case TTurnRight = "TraceTurnRight.swift"
    case TCollect = "TraceCollect.swift"
    case TSwitchIt = "TraceSwitchIt.swift"
    
    case BlockClass = "Block.swift"
    case BlockObject = "BlockObject.swift"
    
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
        case 1: // Puzzle 1-1
            return self.generate(functions: .Log, .Move, .Collect)
        case 2: // Puzzle 1-2
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft)
        case 3: // Puzzle 1-3
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .SwitchIt)
        case 4: // Puzzle 2-1
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .SwitchIt)
        case 5: // Puzzle 2-2
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .TurnRight)
        case 6: // Puzzle 2-3
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .TurnRight)
        case 7: // Puzzle 3-1
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .TurnRight, .SwitchIt)
        case 8: // Puzzle 3-2
            return self.generate(functions: .Log, .Trace, .BlockClass, .TMove, .TTurnLeft, .TTurnRight, .TCollect, .TSwitchIt)
        case 9: // Puzzle 3-3
            return self.generate(functions: .Log, .Trace, .BlockClass, .TMove, .TTurnLeft, .TTurnRight, .TCollect)
        case 10: // Puzzle 4-1
            return self.generate(functions: .Log, .Trace, .BlockClass, .TMove, .TTurnLeft, .TTurnRight, .TCollect, .TSwitchIt)
        case 11: // Puzzle 4-2
            return self.generate(functions: .Log, .Move, .Collect, .TurnLeft, .TurnRight)
        case 12: // Puzzle 4-3
            return self.generate(functions: .Log, .Trace, .BlockClass, .TLog, .TMove, .TMoveMore, .TTurnLeft, .TTurnRight, .TCollect, .TSwitchIt)
        case 13: // Puzzle 5-1
            return self.generate(functions: .Log, .Trace, .BlockClass, .BlockObject, .TLog, .TMove, .TMoveMore, .TTurnLeft, .TTurnRight, .TSwitchIt)
        case 14: // Puzzle 5-2
            return self.generate(functions: .Log, .Trace, .BlockClass, .TLog, .TMove, .TMoveMore, .TTurnLeft, .TTurnRight, .TCollect)
        default:
            return self.generate(functions: .Log)
        }
    }
    
    static public func has(dep: FunctionDependency, inAll: [String]) -> Bool {
        return inAll.contains(dep.rawValue)
    }
}
