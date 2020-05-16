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

// 获取当前Lappland所在的砖块
func GET_CURRENT_LAPPLAND_AT_BLOCK() -> Block? {
    for block in PUZZLE_SCENE_BLOCK_ARRAY {
        if block.isAt(x: LAPPLAND_CURRENT_POSITION_X, y: LAPPLAND_CURRENT_POSITION_Y) {
            return block
        }
    }
    return nil
}
