const { MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('guildCreate');
  }

  run(client, guild) {
    client.logger.info(`${client.user.username} has joined \`${guild.name}\``);
    client.db.settings.insertRow.run(guild.id);
    const guildBan = client.db.settings.selectGuildBan.pluck().get(guild.id);
    if (guildBan === 1) {
      guild.channels.cache
        .filter(c => c.type === 'GUILD_TEXT')
        .find(x => x.position === 0)
        .send({
          embeds: [
            new MessageEmbed()
              .setTitle('Guild Ban')
              .setDescription('Leaving server in 2.5s because of *guild ban*...')
              .setColor(0x2f3136),
          ],
        });
      setTimeout(() => {
        guild.leave();
      }, 2500);
      client.logger.verbose(`Left \`[${guild.name}](${guild.id})\` because of guild ban`);
    }
  }
};
