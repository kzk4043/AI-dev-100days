# Day 1: シンプルTODOリストアプリ

単純なUI要素を使用し、タスクの追加・完了マーク・削除ができる基本的なTODOリストアプリ。ローカルストレージでデータを保存します。
001をreactでやり直してみる。

## 進め方

1. Claudeに要件定義書を突っ込んで、reactで技術仕様書を作ってもらう
   1. 技術選定.md
   2. ディレクトリ構成.md
2. Claudeに上記mdを読ませて構築
   1. githubにPRを作らせる
3. CLINE（gemini2.5 flash）でリファクタ
   1. リファクタできそうな内容を羅列
   2. ステップ・バイ・ステップで適用
4. 提案されたリファクタをClaudeにチェックしてもらう

## ログ

1. Claudeに上記要件を突っ込んで、技術仕様書を作ってもらう

```
# Role and Objective

- you are a professional programmer.
- create technical specification (TS) of the following requirements using react.

# Instructions

- read requirement definition document(RDD)
- create TS (ask me if you need more info)

# Output Format

- technical_specification.md
  - mainly for technology stack
- folder_structure.md

# Context

- use react
- these files will be the input of AI.
- followings are the RDD.

```
copy of RDD
```

# Final instructions and prompt to think step by step
create simple react todo app's TS with me.
```

質問された

```
To make sure I create the most effective technical specification for your React Todo app, I have a few clarifying questions:

1. Do you have any preference for UI libraries (Material UI, Chakra UI, Tailwind CSS) or would you prefer using plain CSS/SCSS?

no. it's up to you.

2. Are there any specific React patterns you'd like to implement (Context API, Redux, custom hooks)?

no. it's up to you.

3. Would you like to include any testing framework specifications in the technical specification?

no. it's up to you.
```

できた。Nodeのバージョン古いな


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

- pull request with new branch (`feat/day001_base-react`)

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
