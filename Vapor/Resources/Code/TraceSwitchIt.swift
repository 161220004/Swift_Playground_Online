func switchIt() { // Trace
    SAVE_RESULT_ON_SERVER_SIDE("SWITCHIT")
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        if (currentBlock.IS_YELLOW_BLOCK() || currentBlock.IS_DARK_BLOCK()) {
            currentBlock.SET_THIS_BLOCK_SWITCHED()
            isOnYellowBlock = !isOnYellowBlock
            isOnDarkBlock = !isOnDarkBlock
        }
    }
}
