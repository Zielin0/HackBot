const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('guildDelete');
  }

  run(client, guild) {
    client.logger.info(`${client.user.username} has left \`${guild.name}\``);
  }
};
