const { lite } = require("../lite");  
const { sleep } = require("../lib/functions");  

lite({  
    pattern: "restart",  
    desc: "Restart Lite xd",  
    category: "owner",  
    filename: __filename  
},  
async (conn, mek, m, { reply, isCreator }) => {  
    try {  
        if (!isCreator) {  
            return reply("❌ sᴏʀʀʏ, ʙᴜᴅ ᴏᴡɴᴇʀ ᴏɴʟʏ.");  
        }  

        const { exec } = require("child_process");  
        reply("ʀᴇsᴛᴀʀᴛᴛɪɴɢ..sᴇᴇ ʏᴀ ᴡʜᴇɴ ɪ'ᴍ ʙᴀᴄᴋ.");  
        await sleep(1500);  
        exec("pm2 restart all");  
    } catch (e) {  
        console.error(e);  
        reply(`${e}`);  
    }  
});
