import Foundation

// Block数组在global文件中：PUZZLE_SCENE_BLOCK_ARRAY

// 用户声明的Block个数
var NEW_INITED_BLOCK_NUMBER = 0

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
    
    // 是否被收集过一次，仅对item为Diamond的生效
    var isCollected: Bool
    
    // 用户专用，只需要定义位置
    init(x: Int, y: Int) {
        NEW_INITED_BLOCK_NUMBER += 1
        self.id = NEW_INITED_BLOCK_NUMBER
        self.x = x
        self.y = y
        self.type = 0 // 普通
        self.item = ""
        self.isCollected = false
    }
    
    // 后端专用
    init(id: Int, x: Int, y: Int, type: Int, item: String) {
        self.id = id
        self.x = x
        self.y = y
        self.type = type
        self.item = item
        self.isCollected = false
    }
    
    public func isAt(x: Int, y: Int) -> Bool { // 是否处于某位置
        return (self.x == x && self.y == y)
    }
    
    public func canCollect() -> Bool { // 是否可以执行 collect()
        return (self.item == "Diamond" && !self.isCollected)
    }
    
    public func canSwitch() -> Bool { // 是否可以执行 switchIt()
        return (self.type == 2 || self.type == 6)
    }
    
    public func canSwitchOn() -> Bool { // 是否可以执行 switchIt() (off -> on)
        return (self.type == 6)
    }
    
    public func canSwitchOff() -> Bool { // 是否可以执行 switchIt() (on -> off)
        return (self.type == 2)
    }
    
    public func SET_THIS_BLOCK_DIAMOND_COLLECTED() { // 收集宝石
        if self.canCollect() {
            self.isCollected = true
        }
    }
    
    public func SET_THIS_BLOCK_SWITCHED() { // 切换砖块
        if self.canSwitchOn() {
            self.type = 2
        } else if self.canSwitchOff() {
            self.type = 6
        }
    }
    
}
