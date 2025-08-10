

const fs = require('fs');
const config = require('../settings');
const { lite, commands } = require('../lite');
const axios = require('axios');

lite({
    pattern: "menu",
    react: "🤖",
    alias: ["allmenu"],
    desc: "Get command list",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, pushname, reply
}) => {
    try {
        let menu = {
            download: '', group: '', fun: '', owner: '',
            ai: '', anime: '', convert: '', reaction: '',
            main: '', other: ''
        };

        for (let i = 0; i < commands.length; i++) {
            let cmd = commands[i];
            if (cmd.pattern && !cmd.dontAddCommandList && menu.hasOwnProperty(cmd.category)) {
                menu[cmd.category] += `│ ⬡ ${cmd.pattern}\n`;
            }
        }

        let madeMenu = `
╭─❍ *${config.BOT_NAME} MENU*
│ 👤 User: ${pushname}
│ 🌐 Mode: [${config.MODE}]
│ ✨ Prefix: [${config.PREFIX}]
│ 📦 Total Commands: ${commands.length}
│ 📌 Version: ${config.version} BETA
╰─────────────

┌───『 🛠️ Admin Commands 』
${menu.group || '│ (No commands found)'}
${menu.main || ''}
${menu.other || ''}
└─────────────

『 ᴅᴏᴡɴʟᴏᴀᴅᴇʀ 📥 』
┌─────────────
${menu.download || '│ (No commands found)'}
└─────────────

『 ᴏᴡɴᴇʀ 👤 』
┌─────────────
${menu.owner || '│ (No commands found)'}
└─────────────

『 ᴀɪ 🤖 』 
┌─────────────
${menu.ai || '│ (No commands found)'}
└─────────────

『 ʟᴏɢᴏ/ᴀɴɪᴍᴇ ✨ 』 
┌─────────────
${menu.anime || '│ (No commands found)'}
└─────────────

『 ᴄᴏɴᴠᴇʀᴛ ♻️ 』 
┌─────────────
${menu.convert || '│ (No commands found)'}
└─────────────

『 ʀᴇᴀᴄᴛɪᴏɴ 🎭 』 
┌─────────────
${menu.reaction || '│ (No commands found)'}
└─────────────

『 ꜰᴜɴ 🎉 』 
┌─────────────
${menu.fun || '│ (No commands found)'}
└─────────────

> ${config.DESCRIPTION}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402507750390@newsletter',
                        newsletterName: 'ɴᴏᴠᴀ xᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        await conn.sendMessage(from, {
            audio: fs.readFileSync('./all/menu.m4a'),
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
