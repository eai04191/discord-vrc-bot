import { Client, TextChannel, MessageEmbed, EmbedField } from "discord.js";
import { VRChat } from "vrchat";
import { VRChatUser } from "../node_modules/vrchat/build/types/user";
require("dotenv").config();

const client = new Client();

client.on("ready", () => {
    console.log("Discord Bot is Ready!");
    client.user.setActivity("github.com/eai04191/discord-vrc-bot");
});

const vrchat = new VRChat();
vrchat
    .login(process.env.VRCHAT_USERNAME, process.env.VRCHAT_PASSWORD)
    .then(() => console.log("VRChat API is Ready!"))
    .catch(console.error);

// どこかのチャンネルにメッセージが投稿されたら
client.on("message", message => {
    console.log("ping");
    // 投稿されたのがテキストチャンネル かつ
    // チャンネル名が監視するチャンネル かつ
    // VRCのUUID なら
    if (
        message.channel instanceof TextChannel &&
        message.channel.name === process.env.CHANNEL_NAME &&
        /^https:\/\/vrchat\.com\/home\/user\/usr_[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}$/.test(
            message.content
        )
    ) {
        const id = message.content.match(
            /^https:\/\/vrchat\.com\/home\/user\/(?<id>usr_[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12})$/
        ).groups.id;
        console.log(`VRC ID Posted: ${id}`);

        vrchat
            .get(`users/${id}`)
            .then(response => response.data)
            .then((data: VRChatUser) => {
                console.log(data.username, data);
                const url = `https://vrchat.com/home/user/${data.id}`;

                const trustColors = {
                    Visitor: "#CCCCCC",
                    "New User": "#1778FF",
                    User: "#2BCF5C",
                    "Known User": "#FF7B42",
                    "Trusted User": "#8143E6"
                };

                const trustNo = data.tags
                    .filter(tag => tag.startsWith("system_trust"))
                    .map(tag => {
                        console.log(tag);
                        switch (tag) {
                            // case "system_trust_legend":
                            //     trust = "Legend";
                            //     break;
                            // case "system_trust_intermediate":
                            case "system_trust_veteran":
                                // return "Trusted User";
                                return 4;
                            case "system_trust_trusted":
                                // return "Known User";
                                return 3;
                            case "system_trust_known":
                                // return "User";
                                return 2;
                            case "system_trust_basic":
                                // return "New User";
                                return 1;
                            default:
                                // return "Visitor";
                                return 0;
                        }
                    })
                    .reduce((a, b) => Math.max(a, b), -Infinity);
                console.log(trustNo);

                const trust = (() => {
                    switch (trustNo) {
                        case 0:
                            return "Visitor";
                        case 1:
                            return "New User";
                        case 2:
                            return "User";
                        case 3:
                            return "Known User";
                        case 4:
                            return "Trusted User";
                    }
                })();
                console.log(trust);

                const otherTags = data.tags.filter(
                    tag => !tag.startsWith("system_trust")
                );

                return new MessageEmbed()
                    .setColor(trustColors[trust])
                    .setTitle(data.displayName)
                    .setURL(url)
                    .setAuthor(data.username, null, url)
                    .setDescription((data as any).bio)
                    .addField(":crown: Trust Levels", trust, true)
                    .addField(":notepad_spiral: Other Tags", otherTags, true)
                    .setImage(
                        `https://images.weserv.nl/?url=${data.currentAvatarThumbnailImageUrl}&w=256`
                    )
                    .setTimestamp();
            })
            .then(embed => message.channel.send(null, embed))
            .then(
                // もとのURLプレビューを無効にする
                () =>
                    message
                        .suppressEmbeds(true)
                        .then(message => console.log(`Embed is Suppressed.`))
            )
            .catch(console.error);
    }
});

client.login(process.env.DISCORD_TOKEN);
