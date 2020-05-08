func goForward(step: Int) { // Trace
    SAVE_RESULT_ON_SERVER_SIDE("GO: \(step)")
    switch CURRENT_DIRECTION_RAW {
    case 0: // Left
        LAPPLAND_CURRENT_POSITION_X -= step
    case 1: // Up
        LAPPLAND_CURRENT_POSITION_Y -= step
    case 2: // Right
        LAPPLAND_CURRENT_POSITION_X += step
    case 3: // Down
        LAPPLAND_CURRENT_POSITION_Y += step
    default: break
    }
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() { // 更新条件判断
        isOnYellowBlock = currentBlock.canSwitchOff()
        isOnDarkBlock = currentBlock.canSwitchOn()
        isOnGem = currentBlock.canCollect()
    } else {
        isOnYellowBlock = false
        isOnDarkBlock = false
        isOnGem = false
    }
    
}
