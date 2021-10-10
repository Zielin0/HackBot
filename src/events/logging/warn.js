const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('warn');
  }

  run(client, info) {
    client.logger.warn(info);
  }
};
