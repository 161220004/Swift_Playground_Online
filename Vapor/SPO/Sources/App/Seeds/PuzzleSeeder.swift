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
        var puzzles = [Future<Puzzle>]()
        print("PuzzleSeeder: Create Puzzles")
        // Puzzle 1-1
        let puzzle1 = Puzzle(pid: 1, ld: 2, "Puzzle 1-1").create(on: conn)
        puzzles.append(puzzle1)
        
        // Puzzle 1-2
        let puzzle2 = Puzzle(pid: 2, ld: 2, "Puzzle 1-2").create(on: conn)
        puzzles.append(puzzle2)
        
        // Puzzle 1-3
        let puzzle3 = Puzzle(pid: 3, ld: 2, bx: -100, by: 0, "Puzzle 1-3").create(on: conn)
        puzzles.append(puzzle3)
        
        // Puzzle 0 (Test)
        let puzzle0 = Puzzle(pid: 0, ld: 2, "Puzzle 0 For Test").create(on: conn)
        puzzles.append(puzzle0)
        
        return puzzles
            .flatten(on: conn)          // [Future<Puzzle>] -> Future<[Puzzle]>
            .transform(to: Void())      // Future<[Puzzle]> -> Future<Void>
    }
    
    static func revert(on conn: Database.Connection) -> Future<Void> {
        // 清空Puzzle表
        return conn.query("truncate table `Puzzle`").transform(to: Void())
    }
    
}
