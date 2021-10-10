const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class LeaveGuildCommand extends BaseCommand {
  constructor() {
    super('leave', 'Owner', [], true);
  }

  async run(client, message, args) {
    const guildId = args[0];
    if (!rgx.test(guildId)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid guild ID').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    const guild = client.guilds.cache.get(guildId);
    if (!guild) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Cannot find a guild').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    await guild.leave();
    const embed = new MessageEmbed()
      .setTitle('💎 Left Server')
      .setDescription(
        `**ServerID:** ${guildId}
        **Server Name:** ${guild.name}
      `
      )
      .setColor(0x2f3136);
    message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
  }
};
