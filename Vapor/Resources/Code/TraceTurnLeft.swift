func turnLeft() {
    SAVE_RESULT_ON_SERVER_SIDE("TURN: -1")
    CURRENT_DIRECTION_RAW = (CURRENT_DIRECTION_RAW + 3) % 4
    hasBlockForward = JUDGE_CURRENT_LAPPLAND_FORWARD_BLOCK()
}
