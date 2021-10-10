const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class GuildBanCommand extends BaseCommand {
  constructor() {
    super('guildban', 'Owner', ['glban'], true);
  }

  run(client, message, args) {
    const guildId = args[0];
    if (!guildId) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide server ID')
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
    if (isGuildBan === 1) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('This guild is already banned')
        .setColor(0x2f3136);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      return;
    }

    try {
      client.db.settings.updateGuildBan.run(1, guildId);
      const embed = new MessageEmbed()
        .setTitle('💎 Success')
        .setTitle('Successfully banned guild, leaving...')
        .setColor(0x2f3136);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      if (client.guilds.cache.get(guildId) !== undefined) {
        client.guilds.cache.get(guildId).leave();
        message.reply({ content: 'Left guild', allowedMentions: { repliedUser: false } });
      }
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed Guild Ban')
        .setDescription(
          `Server: \`${client.guilds.cache.get(guildId).name}\`\nServer ID: ${guildId}`
        )
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
};
