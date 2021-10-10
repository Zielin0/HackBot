const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const whoiser = require('whoiser');

const expression =
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
const regex = new RegExp(expression);

module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super('whois', 'Hack', []);
  }

  async run(client, message, args) {
    const input = args.join(' ');

    if (!regex.test(input)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid Domain').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    if (!input) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide domain to lookup')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
    try {
      const domaininfo = await whoiser(input);
      const info = domaininfo[Object.keys(domaininfo)[0]];
      // console.log(info.text.join('\n').toString())
      const embed = new MessageEmbed()
        .setTitle('Whois lookup')
        .setDescription(
          info.text.join('\n').toString().length > 1024
            ? 'Too large to display'
            : info.text.join('\n').toString()
        )
        .setColor(0x2f3136);
      message.channel.send({ embeds: [embed] });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed to lookup domain')
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
};
