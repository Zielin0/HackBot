const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class UnGuildBanCommand extends BaseCommand {
  constructor() {
    super('unguildban', 'Owner', ['unglban'], true);
  }

  run(client, message, args) {
    const guildId = args[0];
    if (!guildId) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide a server ID')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    if (!rgx.test(guildId)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid server ID').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    const isGuildBan = client.db.settings.selectGuildBan.pluck().get(guildId);
    if (isGuildBan === 0) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('This guild is not banned')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    try {
      client.db.settings.updateGuildBan.run(0, guildId);
      const embed = new MessageEmbed()
        .setTitle('💎 Success')
        .setDescription('Successfully unbanned guild')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed Guild unBan')
        .setDescription(
          `Server: \`${client.guilds.cache.get(guildId).name}\`\nServer ID: ${guildId}`
        )
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
};
