func switchIt() { // Trace
    saveResult("SWITCHIT")
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        if currentBlock.canSwitch() {
            currentBlock.SET_THIS_BLOCK_SWITCHED()
            isOnYellowBlock = !isOnYellowBlock
            isOnDarkBlock = !isOnDarkBlock
        }
    }
}
