# ①課題名
API活用メンタルコンディション判定アプリ

## ②課題内容（どんな作品か）
- Vision API、firebaseのAuthentication、firestore Database、MediaStreamライブラリ、chart.jsを利用してその時点の表情をキャプチャし、キャプチャー情報から表情分析を実施、分析結果をfirestoreデータベースに格納し、過去の平均と比較する。

## ③アプリのデプロイURL
 ＜さくらインターネットの対応中＞

## ④アプリのログイン用IDまたはPassword（ある場合）
- Googleアカウントによる認証。ログイン時に信頼されていないサイトに行くという項目を選択する。（ドメインの証明書がないため）

## ⑤工夫した点・こだわった点
- realtime データベースではなくfirestoreを利用することで複合的な情報を検索しやすくした。（その何倍も学習コストはかかったが。。）

## ⑥難しかった点・次回トライしたいこと（又は機能）
- chart表示については再現性がないため、改めてしっかりと学習したい。
- base64,blob,blobURL,file と画像データの状態が変化する中で、適切な状態にして関数に引き渡すことが難しかった。（本当はfirebase storageに保存したかったがデータの状態が正しくなく何度や手もテキスト情報がアップロードされてしまったため、画像保管機能はカットした）
- イメージに上に透明なcanvasのレイヤーを配置し、判定範囲の枠などを表示したかったが間に合わなかった。
- 表情認識は行えたが画像の本人確認（複数人が写っても対象者をピックアップする）をやろうしたら思いの外ハードルが高かった。
- 表情認識も精度がまだイマイチのため、メンタルダウンを検知するために使用するにはモデルの変更やアップデートが必須だと感じた。

## ⑦フリー項目（感想、シェアしたいこと等なんでも）
- [感想]
 ・firestore虎の巻ができたので、firestoreでどんなデータ処理も行える（気がする）
 ・世界中のAPIを列挙しているGithubを見つけた。（ Public APIs）あんまり中身を見れていないので、また確認してみたい。
 ・顔認識、表情認識のAPIは、無償、有償含めていろいろ調査してみた。表情認識自体はだいぶ枯れた技術らしい。（1978年に考え方の原型となる論文が発表されている）だが、表情認識の精度はVision APIの問題かもしれないがイマイチ。

 ・
- [参考記事]
  - 1. [Public APIs](https://github.com/public-apis/public-apis)
  - 2. 