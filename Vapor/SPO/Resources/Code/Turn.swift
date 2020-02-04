import Foundation

enum Direction: Int {
    case Left = 0
    case Up = 1
    case Right = 2
    case Down = 3
}

// 当前的朝向（初始为向右）
var CURRENT_DIRECTION_RAW = 2

func turn(to: Direction) {
    var resultLine = "TURN: "
    switch to {
    case .Left: resultLine += "Left"
    case .Up: resultLine += "Up"
    case .Right: resultLine += "Right"
    case .Down: resultLine += "Down"
    default: break
    }
    saveResult(resultLine)
}

func turnLeft() {
    var resultLine = "TURN: "
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 3) % 4
    switch CURRENT_DIRECTION_RAW {
    case 0: resultLine += "Left"
    case 1: resultLine += "Up"
    case 2: resultLine += "Right"
    case 3: resultLine += "Down"
    default: break
    }
    saveResult(resultLine)
}

func turnRight() {
    var resultLine = "TURN: "
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 1) % 4
    switch CURRENT_DIRECTION_RAW {
    case 0: resultLine += "Left"
    case 1: resultLine += "Up"
    case 2: resultLine += "Right"
    case 3: resultLine += "Down"
    default: break
    }
    saveResult(resultLine)
}
