// 定义一个场景上 (2, 0) 处的砖块对象
// 仅供Puzzle5-1使用
let block = { () -> Block in
    for blockTmp in PUZZLE_SCENE_BLOCK_ARRAY {
        if blockTmp.isAt(x: 2, y: 0) {
            return blockTmp
        }
    }
    return PUZZLE_SCENE_BLOCK_ARRAY[0] // 不应进入此情况
}()
