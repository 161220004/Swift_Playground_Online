import Foundation

enum Direction: Int {
    case Left = 0
    case Up = 1
    case Right = 2
    case Down = 3
}

// 当前的朝向 CURRENT_DIRECTION_RAW 需在其他文件中定义为全局变量

func turn(to: Direction) {
    CURRENT_DIRECTION_RAW = to.rawValue
    saveResult("TURN: \(CURRENT_DIRECTION_RAW)")
}

func turnLeft() {
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 3) % 4
    saveResult("TURN: \(CURRENT_DIRECTION_RAW)")
}

func turnRight() {
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 1) % 4
    saveResult("TURN: \(CURRENT_DIRECTION_RAW)")
}
