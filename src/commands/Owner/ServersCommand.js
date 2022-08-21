const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const ReactionMenu = require('../../utils/ReactionMenu');

module.exports = class ServersCommand extends BaseCommand {
  constructor() {
    super('servers', 'Owner', [], true);
  }

  run(client, message) {
    const servers = client.guilds.cache.map(
      guild => `\`${guild.id}\` - **${guild.name}** - *${guild.members.cache.size}* user(s)`
    );
    const embed = new MessageEmbed().setTitle('ServerList').setColor(0x2f3136);

    if (servers.length <= 10) {
      const range = servers.length === 1 ? '[1]' : `[1 - ${servers.length}]`;
      message.reply({
        embeds: [
          embed
            .setTitle(`ServerList ${range}`)
            .setDescription(servers.join('\n'))
            .setColor(0x2f3136),
        ],
        allowedMentions: { repliedUser: false },
      });
    } else {
      new ReactionMenu(client, message.channel, message.member, embed, servers);
    }
  }
};
