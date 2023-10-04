# Astro template

## 開発

```bash
node -v # v16.19.0
yarn
yarn dev
```

## ビルド

```bash
yarn build
```

## デプロイ

`deploy.yml` によって自動で FTP アップされるようになっています。

案件に応じてカスタマイズしてください。

また `main`ブランチは STG 環境、`production`ブランチは本番環境として扱っています。

本番反映する際は `pr-release.yml`によって作成された PR をマージしてください。

## GitHub Actions について

### deploy.yml

main、production ブランチに push したとき、`./dist` フォルダを FTP にアップロードします。

※デフォルトでは無効になっているので有効にする際は `branches` の行のコメントアウトを外してください。

`Copy other files` では `yarn build` 時に含まれないファイルを `./dist` にコピーします。

`.htaccess` は 本番と STG で異なることが多いので、本番は `.htaccess-prod` 、 STG は `.htaccess-stg` を使ってください。

また FTP アップする際に FTP 情報を GitHub の Secrets に登録する必要があります。

| 環境変数名          | 概要                                                               | 例                 |
| ------------------- | ------------------------------------------------------------------ | ------------------ |
| FTP_SERVER          | FTP のサーバー名                                                   | `xxx.sakura.ne.jp` |
| FTP_USERNAME        | FTP のユーザー名                                                   | `user`             |
| FTP_PASSWORD        | FTP のパスワード                                                   | `password`         |
| FTP_SERVER_DIR_STG  | FTP の STG ディレクトリ。末尾に必ずスラッシュを付けてください      | `dev.example.com/` |
| FTP_SERVER_DIR_PROD | FTP の 本番環境 ディレクトリ。末尾に必ずスラッシュを付けてください | `www.example.com/` |

サーバーディレクトリのみ本番と STG で分けていますが、もしサーバー自体異なる場合は適宜追加変更してください。

### test.yml

push したときに build や lint を実行してエラーがないか確認します。

### pr-release.yml

main ブランチに変更があったとき、production ブランチにマージするための PR を作成します。

### playwright.yml

playwright を使った E2E テストを実行します。

デフォルトでは無効になっています。

## ディレクトリ構成

### components

コンポーネントを配置します。

なるべくコンポーネント化することをおすすめします。

### layouts

共通のレイアウトを配置します。

各ページで共通な Header や Footer をここで定義していて、各ページで Layout コンポーネントをインポートしています。

### pages

ページを配置します。

動的ページを作成する場合は `pages/[id].astro` のようにすることで、`pages/1.astro` というファイルを作成することができます。

詳しくは[公式ドキュメント](https://docs.astro.build/en/core-concepts/routing/)を参照してください。

### public

画像などの静的ファイルを配置します。

public のファイルはビルド時に `./dist` 以下にコピーされます。

### libs

ライブラリの共通処理を配置します。

`dayjs.ts` では dayjs の設定をラップしています。
日付を生の Date で扱うのは考慮することが多く危険なため、出来るだけ dayjs などのライブラリを使うことをおすすめします。

### utils

共通の処理を配置します。

`pagePath.ts` は各ページのパスを定義しています。

リンクを a タグなどに書く場合は

```jsx
import { pagePath } from '~/utils/pagePath';

---

<a href={pagePath.home}>Home</a>
```

のように書いてください。

### styles

Tailwind CSS の設定を読み込んでいます。

グローバルな CSS を書きたい場合は `global.css` に書いてください。

## その他設定など

### TextLint

[textlint](https://textlint.github.io/) という文章のチェックをするためのツールを導入しています。

主に表記ゆれをチェックするために使っています。

`prh.yml` にルールを定義してください。
