discord-vrc-bot
===

![screenshot](https://i.imgur.com/yHnCIyL.png)

公式のカードの代わりにすこし見栄えの良いカードを付けるbot

APIを叩く練習として作ったけど、思った以上に載せるべき情報がなかったので実際に稼働させる予定はありません。

## 使いたい人のための使い方


1. .env.exampleをコピーして.envを作る

    https://discordapp.com/developers/applications/me
    でアプリケーションを作成して、アプリケーションの中でbotを作成し、botの`token`を
    `.env` の `DISCORD_TOKEN` に入れる

    `https://discordapp.com/oauth2/authorize?&client_id=アプリケーションのClient ID&scope=bot`
    を開いてbotを使用するサーバーに招待する

    `VRCHAT_USERNAM`EにVRChatアカウントのユーザー名、`VRCHAT_PASSWORD`にパスワードを入れる
    非公式にAPIを叩くのでサブアカウントとかのほうがいいと思います

    `.env`の`CHANNEL_NAME`に該当する名前のチャンネルでのみ動作するので必要に応じて変更

1. ```
    yarn
    yarn start
    ```

起動後、該当するチャンネルに`https://vrchat.com/home/user/usr_1efa121a-124e-4fa7-a0b5-e07dc1be56da`のようなURLを貼るとそのURLのカードが消えてbotがカードを投稿するはずです。
