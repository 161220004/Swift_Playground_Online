//
//  BlockSeeder.swift
//  App
//
//  Created by 曹洋笛 on 2020/2/10.
//

import Fluent
import FluentMySQL
import Vapor

final class BlockSeeder: Migration {
    
    typealias Database = MySQLDatabase
    
    static func prepare(on conn: Database.Connection) -> Future<Void> {
        var blocks = [Future<Block>]()
        print("BlockSeeder: Create Blocks")
        // Blocks in Puzzle 1-1
        let blocksP1 = [Block(pid: 1, .Normal, x: 0, y: 0, item: .None),
                        Block(pid: 1, .Normal, x: 1, y: 0, item: .None),
                        Block(pid: 1, .Normal, x: 2, y: 0, item: .None),
                        Block(pid: 1, .Purple, x: 3, y: 0, item: .Diamond),
        ]
        for i in 0..<blocksP1.count {
            blocks.append(blocksP1[i].create(on: conn))
        }
        
        // Blocks in Puzzle 1-2
        let blocksP2 = [Block(pid: 2, .Purple, x: 2, y: -2, item: .Diamond),
                        Block(pid: 2, .Normal, x: 2, y: -1, item: .None),
                        Block(pid: 2, .Normal, x: 0, y: 0, item: .None),
                        Block(pid: 2, .Normal, x: 1, y: 0, item: .None),
                        Block(pid: 2, .Normal, x: 2, y: 0, item: .None),
                        Block(pid: 2, .Normal, x: 3, y: 0, item: .None),
                        Block(pid: 2, .Normal, x: 4, y: 0, item: .None),
                        Block(pid: 2, .Normal, x: 2, y: 1, item: .None),
                        Block(pid: 2, .Normal, x: 2, y: 2, item: .None),
                        ]
        for i in 0..<blocksP2.count {
            blocks.append(blocksP2[i].create(on: conn))
        }
        
        // Blocks in Puzzle 1-3
        let blocksP3 = [Block(pid: 3, .Normal, x: 0, y: -3, item: .None),
                        Block(pid: 3, .Normal, x: -1, y: -2, item: .None),
                        Block(pid: 3, .Dark, x: 0, y: -2, item: .None),
                        Block(pid: 3, .Normal, x: 1, y: -2, item: .None),
                        Block(pid: 3, .Normal, x: 2, y: -2, item: .None),
                        Block(pid: 3, .Purple, x: 2, y: -1, item: .Diamond),
                        Block(pid: 3, .Normal, x: 0, y: 0, item: .None),
                        Block(pid: 3, .Normal, x: 1, y: 0, item: .None),
                        Block(pid: 3, .Normal, x: 2, y: 0, item: .None),
                        ]
        for i in 0..<blocksP3.count {
            blocks.append(blocksP3[i].create(on: conn))
        }
        
        // Blocks in Puzzle 0 (Test)
        let blocksP0 = [Block(pid: 0, .Normal, x: 4, y: -3, item: .None),
                        Block(pid: 0, .Purple, x: 5, y: -3, item: .Diamond),
                        Block(pid: 0, .Normal, x: 6, y: -3, item: .None),
                        Block(pid: 0, .Normal, x: 7, y: -3, item: .None),
                        Block(pid: 0, .Normal, x: 4, y: -2, item: .None),
                        Block(pid: 0, .Purple, x: 7, y: -2, item: .Diamond),
                        Block(pid: 0, .Purple, x: 4, y: -1, item: .Diamond),
                        Block(pid: 0, .Normal, x: 7, y: -1, item: .None),
                        Block(pid: 0, .Normal, x: 0, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 1, y: 0, item: .None),
                        Block(pid: 0, .Purple, x: 2, y: 0, item: .Diamond),
                        Block(pid: 0, .Normal, x: 3, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 4, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 5, y: 0, item: .None),
                        Block(pid: 0, .Purple, x: 6, y: 0, item: .Diamond),
                        Block(pid: 0, .Normal, x: 7, y: 0, item: .None)
                       ]
        for i in 0..<blocksP0.count {
            blocks.append(blocksP0[i].create(on: conn))
        }
        
        return blocks
            .flatten(on: conn)          // [Future<Block>] -> Future<[Block]>
            .transform(to: Void())      // Future<[Block]> -> Future<Void>
    }
    
    static func revert(on conn: Database.Connection) -> Future<Void> {
        // 清空Block表
        return conn.query("truncate table `Block`").transform(to: Void())
    }
    
}
