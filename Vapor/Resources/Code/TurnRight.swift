import Foundation

func turnRight() {
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 1) % 4
    saveResult("TURN: \(CURRENT_DIRECTION_RAW)")
}
