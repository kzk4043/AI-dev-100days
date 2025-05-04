# Day 1: シンプルTODOリストアプリ

単純なUI要素を使用し、タスクの追加・完了マーク・削除ができる基本的なTODOリストアプリ。ローカルストレージでデータを保存します。

## 最低クリア要件

- タスクの追加機能の実装
- タスクの完了/未完了の切り替え機能の実装
- タスクの削除機能の実装
- ローカルストレージを使用したデータの永続化
- 基本的なUIとスタイリングの適用

## 進め方

1. Claudeに上記要件を突っ込んで、仕様書を作ってもらう
   1. 要件定義.md
2. Claudeに上記要件を突っ込んで、技術仕様書を作ってもらう
   1. 技術選定.md
   2. ディレクトリ構成.md
3. Claude Code?に上記mdを読ませて構築
4. Cursorで微修正

## ログ

1. Claudeに上記要件を突っ込んで、仕様書を作ってもらう

```
# Role and Objective

- you are a professional IT project manager.
- create requirement definition document (RDD) of the following requirements.

# Basic requirements

- todo app with add/complete/delete tasks
- necessary functions
   - add tasks
   - switch complete/incomplete status
   - delete tasks
- use localStorage to store data
- simple and stylish ui and styling

# Instructions

- create RDD with basic requirements
- ask me if more info is necessary

# Output Format

- markdown

# Final instructions and prompt to think step by step

create simple todo app's RDD with me.
```

2. Claudeに上記要件を突っ込んで、技術仕様書を作ってもらう

```
# Role and Objective

- you are a professional programmer.
- create technical specification (TS) of the following requirements.

# Instructions

- read requirement definition document(RDD)

# Output Format

- technical_specification.md
  - mainly for technology stack
- folder_structure.md

# Context

- these files will be the input of AI.
- followings are the RDD.

```
copy of RDD
```

# Final instructions and prompt to think step by step
create simple todo app's TS with me.
```