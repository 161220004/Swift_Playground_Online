//
//  Keyword.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/3.
//

import Foundation

/// 代表一个动画动作的关键词，在解析运行结果时使用
enum Keyword: String {
    
    case GO = "GO"
    case LOG = "LOG"
    case TURN = "TURN"
    case COLLECT = "COLLECT"
    case SWITCHIT = "SWITCHIT"
    
    case BLOCK = "BLOCK"
    case BLOCKSWITCH = "SWITCH"
    case BLOCKINIT = "INIT"
}
