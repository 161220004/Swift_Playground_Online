func turnRight() {
    SAVE_RESULT_ON_SERVER_SIDE("TURN: 1")
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 1) % 4
}