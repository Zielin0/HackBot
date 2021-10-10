const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class ShutdownCommand extends BaseCommand {
  constructor() {
    super('shutdown', 'Owner', [], true);
  }

  async run(client, message) {
    await message.reply({
      embeds: [new MessageEmbed().setTitle('❗ Shutting down...').setColor(0x2f3136)],
      allowedMentions: {
        repliedUser: false,
      },
    });
    client.logger.error('❗❌ SHUTTING DOWN ❌❗');
    process.exit(1);
  }
};
