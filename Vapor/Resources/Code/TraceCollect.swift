func collect() { // Trace
    saveResult("COLLECT")
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        currentBlock.SET_THIS_BLOCK_DIAMOND_COLLECTED()
        isOnGem = false
    }
}
