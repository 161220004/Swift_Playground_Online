//
//  PuzzleSeeder.swift
//  App
//
//  Created by 曹洋笛 on 2020/1/28.
//

import Fluent
import FluentMySQL
import Vapor

final class PuzzleSeeder: Migration {
    
    typealias Database = MySQLDatabase
    
    static func prepare(on conn: Database.Connection) -> Future<Void> {
        let dataNum = 5
        var puzzles = [Future<Puzzle>]()
        // 一个填充好数据的数组，并将其载入Puzzle表
        for i in 1...dataNum {
            //let puzzle = Puzzle(id: i, description: "The No.\(i) Puzzle").create(on: conn)
            let puzzle = Puzzle(description: "The No.\(i) Puzzle").create(on: conn)
            puzzles.append(puzzle)
        }
        return puzzles
            .flatten(on: conn)          // [Future<Puzzle>] -> Future<[Puzzle]>
            .transform(to: Void())      // Future<[Puzzle]> -> Future<Void>
    }
    
    static func revert(on conn: Database.Connection) -> Future<Void> {
        // 清空Puzzle表
        return conn.query("truncate table `Puzzle`").transform(to: Void())
    }
    
}
