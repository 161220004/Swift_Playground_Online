import Foundation

// Block数组在global文件中：PUZZLE_SCENE_BLOCK_ARRAY

// Block个数
var CURRENT_BLOCK_NUMBER = 0

class Block {
    
    /// 绘制顺序
    var id: Int
    
    // 坐标
    var x: Int
    var y: Int
    
    // 类型
    var type: Int
    
    // Item
    var item: String
    
    // 是否记录SWITCH结果
    var DO_SAVE_RESULT = false
    
    // 是否点亮状态
    public var isOn: Bool { // 监听
        didSet { // 已经变成On
            if (isOn != oldValue) {
                if (self.type == 6 || self.type == 2) { // 同步 Switch On/Off 本砖块
                    self.type = 8 - self.type
                    if (self.DO_SAVE_RESULT) {
                        SAVE_RESULT_ON_SERVER_SIDE("Block \(self.x) \(self.y) SWITCH")
                    }
                    if self.isAt(x: LAPPLAND_CURRENT_POSITION_X, y: LAPPLAND_CURRENT_POSITION_Y) {
                        isOnYellowBlock = !isOnYellowBlock
                        isOnDarkBlock = !isOnDarkBlock
                    }
                } else { // 否则禁止更改
                    isOn = false
                }
            }
        }
    }
    
    // 用户专用，只需要定义位置
    init(x: Int, y: Int) {
        CURRENT_BLOCK_NUMBER += 1
        self.id = CURRENT_BLOCK_NUMBER
        self.x = x
        self.y = y
        self.type = 0 // 普通
        self.item = ""
        self.isOn = false
        SAVE_RESULT_ON_SERVER_SIDE("Block \(x) \(y) INIT")
    }
    
    // 后端专用
    init(id: Int, x: Int, y: Int, type: Int, item: String) {
        CURRENT_BLOCK_NUMBER += 1
        self.id = id
        self.x = x
        self.y = y
        self.type = type
        self.item = item
        self.isOn = (self.type == 2) // 初始化时不会调用监听
    }
    
    public func HAS_DIAMOND_ON_BLOCK() -> Bool { // 是否有宝石
        return (self.item == "Diamond")
    }
    
    public func IS_YELLOW_BLOCK() -> Bool { // 是否是黄色砖块
        return (self.type == 2)
    }
    
    public func IS_DARK_BLOCK() -> Bool { // 是否是黑色砖块
        return (self.type == 6)
    }
    
    public func SET_THIS_BLOCK_DIAMOND_COLLECTED() { // 收集宝石
        self.item = ""
    }
    
    public func SET_THIS_BLOCK_SWITCHED() { // 没有结果的Switch
        self.isOn = !self.isOn
    }
    
    public func switchMySelf() { // 打印结果的Switch
        self.DO_SAVE_RESULT = true
        self.isOn = !self.isOn
        self.DO_SAVE_RESULT = false
    }
    
    public func isAt(x: Int, y: Int) -> Bool { // 是否处于某位置
        return (self.x == x && self.y == y)
    }
    
}
