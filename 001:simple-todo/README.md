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
3. Claudeに上記mdを読ませて構築
   1. githubにPRを作らせる
4. CLINE（gemini2.5 flash）でリファクタ
   1. リファクタできそうな内容を羅列
   2. ステップ・バイ・ステップで適用
5. 提案されたリファクタをClaudeにチェックしてもらう

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

3. Claudeに上記mdを読ませて構築

```
# Role and Objective

- you are a professional programmer.
- create pull request based on docs' requirements.

# Instructions

- read docs under `/docs`
- create required codes based on docs
- create pull request to the repository

# Output Format

- pull request with new branch (`feat/day001_base`)

# Context

- repository url
  - https://github.com/kzk4043/AI-dev-100days/tree/main/001%3Asimple-todo
- docs are under `/docs`

# Final instructions and prompt to think step by step

create simple todo app with me.
```

4. CLINE（gemini2.5 flash）でリファクタ

https://github.com/kzk4043/AI-dev-100days/pull/4/files
さくっとやってくれたし、20円くらいだった。金額がわかるのいいな。

5. 提案されたリファクタをClaudeにチェックしてもらう

思いつきでやってみたけどすごい検索してて時間かかってる…やっぱ一回の検索数限界がなくなってる？一回で300リンクくらい踏んでる。時間もかかるし。
勝手にトークン使いすぎてすぐリミットにかかる気がする。deep thinkしなけりゃいいのか？
なんか思考時間を指定するみたいなベスプラがどっかにあったが…deep thinkつけてもたいして長考しないときもあるし、どういう時に長考するのかいまいちわからない（わからない時？）。
システムプロンプトに最大思考時間だけ指定するか？

>I've analyzed common patterns in React Todo app refactoring. Your report examines the likely transformation from a monolithic class-based implementation

React使ってないのにReactとかいいだしたし、なんか一般的なリファクタメソッドみたいなのを提案してきた。
あー、ファイルを読めなかったのか…読めなかった時は止まるとかそういう縛りもいるな。
