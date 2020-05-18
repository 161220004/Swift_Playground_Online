func goForward() { // Trace
    SAVE_RESULT_ON_SERVER_SIDE("GO: 1")
    switch CURRENT_DIRECTION_RAW {
    case 0: // Left
        LAPPLAND_CURRENT_POSITION_X -= 1
    case 1: // Up
        LAPPLAND_CURRENT_POSITION_Y -= 1
    case 2: // Right
        LAPPLAND_CURRENT_POSITION_X += 1
    case 3: // Down
        LAPPLAND_CURRENT_POSITION_Y += 1
    default: break
    }
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() { // 更新条件判断
        isOnYellowBlock = currentBlock.IS_YELLOW_BLOCK()
        isOnDarkBlock = currentBlock.IS_DARK_BLOCK()
        isOnGem = currentBlock.HAS_DIAMOND_ON_BLOCK()
    } else {
        isOnYellowBlock = false
        isOnDarkBlock = false
        isOnGem = false
    }
    hasBlockForward = JUDGE_CURRENT_LAPPLAND_FORWARD_BLOCK()
}
