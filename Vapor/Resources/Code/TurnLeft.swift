import Foundation

func turnLeft() {
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 3) % 4
    saveResult("TURN: \(CURRENT_DIRECTION_RAW)")
}
