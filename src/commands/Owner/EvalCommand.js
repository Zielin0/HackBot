const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');

module.exports = class EvalCommand extends BaseCommand {
  constructor() {
    super('eval', 'Owner', [], true);
  }

  run(client, message, args) {
    const input = args.join(' ');

    if (!input) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide code to eval')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }

    if (!input.toLowerCase().includes('token')) {
      const embed = new MessageEmbed();
      try {
        let output = eval(input);
        if (typeof output !== 'string') {
          output = require('util').inspect(output, { depth: 0 });
        }

        embed
          .addField(
            'Input',
            `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``
          )
          .addField(
            'Output',
            `\`\`\`js\n${output.length > 1024 ? 'Too large to display.' : output}\`\`\``
          )
          .setColor(0x2f3136);
      } catch (err) {
        embed
          .addField(
            'Input',
            `\`\`\`js\n${input.length > 1024 ? 'Too large to display.' : input}\`\`\``
          )
          .addField(
            'Output',
            `\`\`\`js\n${err.length > 1024 ? 'Too large to display.' : err}\`\`\``
          )
          .setColor(0x2f3136);
      }
      message.channel.send({ embeds: [embed] });
    } else {
      message.channel.send('(╯°□°)╯︵ ┻━┻ ');
    }
  }
};
