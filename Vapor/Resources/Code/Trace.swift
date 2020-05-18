// 在这里，对Lappland所在的砖块进行跟踪，以便条件判断
var LAPPLAND_CURRENT_POSITION_X = 0
var LAPPLAND_CURRENT_POSITION_Y = 0

// （这是用户可以使用的条件判断）判断Lappland当前是否位于黄色的砖块上
var isOnYellowBlock = { () -> Bool in
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        return currentBlock.IS_YELLOW_BLOCK()
    } else {
        return false
    }
}()

// （这是用户可以使用的条件判断）判断Lappland当前是否位于黑色的砖块上
var isOnDarkBlock = { () -> Bool in
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        return currentBlock.IS_DARK_BLOCK()
    } else {
        return false
    }
}()

// （这是用户可以使用的条件判断）判断Lappland当前是否位于宝石上
var isOnGem = { () -> Bool in 
    if let currentBlock = GET_CURRENT_LAPPLAND_AT_BLOCK() {
        return currentBlock.HAS_DIAMOND_ON_BLOCK()
    } else {
        return false
    }
}()

// （这是用户可以使用的条件判断）判断Lappland当前方是否有砖块
var hasBlockForward = { () -> Bool in
    return JUDGE_CURRENT_LAPPLAND_FORWARD_BLOCK()
}()

// 获取当前Lappland所在的砖块
func GET_CURRENT_LAPPLAND_AT_BLOCK() -> Block? {
    for block in PUZZLE_SCENE_BLOCK_ARRAY {
        if block.isAt(x: LAPPLAND_CURRENT_POSITION_X, y: LAPPLAND_CURRENT_POSITION_Y) {
            return block
        }
    }
    return nil
}

// 判断当前Lappland所在的砖块的前方是否有砖块
func JUDGE_CURRENT_LAPPLAND_FORWARD_BLOCK() -> Bool {
    var forwardX = LAPPLAND_CURRENT_POSITION_X
    var forwardY = LAPPLAND_CURRENT_POSITION_Y
    switch CURRENT_DIRECTION_RAW {
    case 0: // Left
        forwardX -= 1
    case 1: // Up
        forwardY -= 1
    case 2: // Right
        forwardX += 1
    case 3: // Down
        forwardY += 1
    default: break
    }
    for block in PUZZLE_SCENE_BLOCK_ARRAY {
        if block.isAt(x: forwardX, y: forwardY) {
            return true
        }
    }
    return false
}
