const { MessageEmbed } = require("discord.js");
require('discord-reply');

exports.run = async (bot, msg, args) => {

  const helpembed = new MessageEmbed()
  .setTitle(`명령어`)
  .setDescription(`이 봇은 두 오픈소스의 도움으로 만들어졌습니다.
  글리치 호스트를 써서 서버가 불안정하여 핑이튀거나 다운될 수도 있습니다.
  [학교식단 API](https://github.com/5d-jh/school-menu-api), [NEIS](https://github.com/5d-jh/neis-code-finder)
  [봇초대하기](https://discord.com/oauth2/authorize?client_id=450177137857789972&scope=bot&permissions=3072)
  [디스코드서버](https://discord.gg/tuQE6wJhPK)에서 새로운 소식을 받거나 불편한점을 제보해주세요
  [KOREANBOTS](https://koreanbots.dev/bots/450177137857789972), [Top.gg](https://top.gg/bot/450177137857789972)`)
  .setColor('#0099ff')
  .setTimestamp()
  .addFields(
    {name: '기능', value: '`ping`,`invite`'},
    {name: '급식', value: '`급식`,`석식`,`밥추천`'},
    {name: 'Prefix(접두사)', value: '`$`'}
  )
  .setFooter('흑곰#4972', 'https://media.discordapp.net/attachments/703139424606617691/787263896163057684/15.png')
  msg.lineReply(helpembed).catch(console.error);

}

exports.help = {
  name: '도움',
  aliases: "명령어"
};
