const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const request = require('request');

const expression =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/;
const regex = new RegExp(expression);

module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super('redirect', 'Hack', []);
  }

  async run(client, message, args) {
    const input = args.join(' ');

    if (!regex.test(input)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid URL').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    if (!input) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide an URL')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    try {
      await request.get(input, function (err, res, body) {
        const uri = this.uri.href;
        const embed = new MessageEmbed()
          .setTitle('Redirect')
          .setDescription(
            `
        **Original URL**: [${input}](${input})
        **Redirect URL**: [${uri}](${uri})
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
