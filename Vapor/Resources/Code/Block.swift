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
    
    // 能否Switch
    public var isOn: Bool
    public var isOff: Bool
    
    // 能否收集
    public var hasGem: Bool
    
    // 用户专用，只需要定义位置
    init(x: Int, y: Int) {
        CURRENT_BLOCK_NUMBER += 1
        self.id = CURRENT_BLOCK_NUMBER
        self.x = x
        self.y = y
        self.type = 0 // 普通
        self.item = ""
        self.isOn = false
        self.isOff = false
        self.hasGem = false
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
        self.isOn = (self.type == 2)
        self.isOff = (self.type == 6)
        self.hasGem = (self.item == "Diamond")
    }
    
    public func isAt(x: Int, y: Int) -> Bool { // 是否处于某位置
        return (self.x == x && self.y == y)
    }
    
    public func SET_THIS_BLOCK_DIAMOND_COLLECTED() { // 收集宝石
        if self.hasGem {
            self.hasGem = false
        }
    }
    
    public func SET_THIS_BLOCK_SWITCHED() { // 切换砖块
        if self.isOff {
            self.type = 2
            self.isOn = true
            self.isOff = false
        } else if self.isOn {
            self.type = 6
            self.isOn = false
            self.isOff = true
        }
    }
    
    public func switchMySelf() {
        SAVE_RESULT_ON_SERVER_SIDE("Block \(x) \(y) SWITCH")
        self.SET_THIS_BLOCK_SWITCHED()
        if self.isAt(x: LAPPLAND_CURRENT_POSITION_X, y: LAPPLAND_CURRENT_POSITION_Y) {
            isOnYellowBlock = !isOnYellowBlock
            isOnDarkBlock = !isOnDarkBlock
        }
    }
}
