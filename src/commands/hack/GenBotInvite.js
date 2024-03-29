/**
 *  @type {AUTHOR} - https://github.com/PjooteRek
 */

const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

const rgx = /^(?:<@!?)?(\d+)>?$/;

module.exports = class GenBotInviteCommand extends BaseCommand {
  constructor() {
    super('genbotinvite', 'Hack', ['gbi']);
  }

  run(_client, message, args) {
    const botId = args[0];
    if (!botId) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide bot ID')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    if (!rgx.test(botId)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid bot ID').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }
    const embed = new MessageEmbed()
      .setTitle('Bot Invite')
      .addField(
        '**Invite (Admin):**',
        `[Permissions (8)](https://discord.com/oauth2/authorize?client_id=${botId}&scope=bot+applications.commands&permissions=8)`,
        true
      )

      .addField(
        '**Invite (Basic):**',
        `[Permissions (403008599)](https://discord.com/oauth2/authorize?client_id=${botId}&scope=bot+applications.commands&permissions=403008599)`,
        true
      )
      .addField(
        '**Invite (None):**',
        `[Permissions (0)](https://discord.com/oauth2/authorize?client_id=${botId}&scope=bot+applications.commands&permissions=0)`,
        true
      )
      .addField('**Bot ID:**', `\`${botId}\``)
      .setColor(0x2f3136);
    message.reply({
      embeds: [embed],
      allowedMentions: {
        repliedUser: false,
      },
    });
  }
};
