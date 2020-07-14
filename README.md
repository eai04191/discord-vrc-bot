discord-vrc-bot
===

![screenshot](https://i.imgur.com/yHnCIyL.png)

公式のカードの代わりにすこし見栄えの良いカードを付けるbot

APIを叩く練習として作ったけど、思った以上に載せるべき情報がなかったので実際に稼働させる予定はありません。

## 使いたい人のための使い方

必要なもの: `yarn`

1. 準備  
    .env.exampleをコピーして.envを作る  
    https://discordapp.com/developers/applications/me  
    でアプリケーションを作成して、アプリケーションの中でbotを作成し、botの`token`を.env の `DISCORD_TOKEN` に入れる  

    `VRCHAT_USERNAME`にVRChatアカウントのユーザー名、`VRCHAT_PASSWORD`にパスワードを入れる  
    非公式にAPIを叩くのでサブアカウントとかのほうがいいと思います

    .envの`CHANNEL_NAME`に該当する名前のチャンネルでのみ動作するので必要に応じて変更

1. 招待  
    `https://discordapp.com/oauth2/authorize?&client_id=アプリケーションのClient ID&scope=bot`  
    を開いてbotを使用するサーバーに招待する

1. 実行  
    ```
    yarn
    yarn start
    ```

起動後、該当するチャンネルに`https://vrchat.com/home/user/usr_1efa121a-124e-4fa7-a0b5-e07dc1be56da`のようなURLを貼るとそのURLのカードが消えてbotがカードを投稿するはずです。

## How to use it for those who want to use it.

Required: `yarn` Install it first!

1. Setup  
    Copy .env.example to create a .env  
    Create an application in https://discordapp.com/developers/applications/me .  
    Create a bot in your application and copy the token. Paste it into `DISCORD_TOKEN` in .env.  

    `VRCHAT_USERNAME` is the user name of the VRChat account, and `VRCHAT_PASSWORD` is the password of the VRChat account.  
    I recommend to use a alt account or something like that because it unofficially use the API.

    It only works on channels with names corresponding to the `CHANNEL_NAME` in .env, so you need to change if necessary.

1. Invite  
    Open `https://discordapp.com/oauth2/authorize?&client_id=APPLICATION_CLIENT_ID_HERE&scope=bot`.  
    Don't forget to replace `APPLICATION_CLIENT_ID_HERE` with your Application Client ID!  
    When you open it, invite the bot to the server where you want to use it.


1. Run  
    ```
    yarn
    yarn start
    ```

After launching, if you post a URL like `https://vrchat.com/home/user/usr_1efa121a-124e-4fa7-a0b5-e07dc1be56da` to the channel you specified in `CHANNEL_NAME`, the card will be removed and the bot should post the card.


## LICENSE

MIT
