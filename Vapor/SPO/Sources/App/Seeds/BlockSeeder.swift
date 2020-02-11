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
        // Blocks in Puzzle 0 (Test)
        let blocksP0 = [Block(pid: 0, .Normal, x: 4, y: -3, item: .None),
                        Block(pid: 0, .Normal, x: 5, y: -3, item: .Diamond),
                        Block(pid: 0, .Normal, x: 6, y: -3, item: .None),
                        Block(pid: 0, .Normal, x: 7, y: -3, item: .None),
                        Block(pid: 0, .Normal, x: 4, y: -2, item: .None),
                        Block(pid: 0, .Normal, x: 7, y: -2, item: .Diamond),
                        Block(pid: 0, .Normal, x: 4, y: -1, item: .Diamond),
                        Block(pid: 0, .Normal, x: 7, y: -1, item: .None),
                        Block(pid: 0, .Normal, x: 0, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 1, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 2, y: 0, item: .Diamond),
                        Block(pid: 0, .Normal, x: 3, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 4, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 5, y: 0, item: .None),
                        Block(pid: 0, .Normal, x: 6, y: 0, item: .Diamond),
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
