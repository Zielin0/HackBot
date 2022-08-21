const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const ping = require('ping');

const expression =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
const regex = new RegExp(expression);

module.exports = class PingIpCommand extends BaseCommand {
  constructor() {
    super('ping-ip', 'Hack', ['pingip', 'pip', 'ping']);
  }

  async run(_client, message, args) {
    const input = args.join(' ');

    if (!regex.test(input)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid IP').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    if (!input) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide IP to ping')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    try {
      ping.sys.probe(input, function (isAlive) {
        const msg = isAlive ? `Host ${input} *is alive*` : `Host ${input} *is dead*`;
        const embed = new MessageEmbed()
          .setTitle('Ping IP')
          .setDescription(
            `
          **IP**: ${input}
          **Response**: ${msg}
          `
          )
          .setColor(0x2f3136);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed to lookup domain')
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
};
