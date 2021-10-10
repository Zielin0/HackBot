const BaseEvent = require('../../utils/structures/BaseEvent');

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('error');
  }

  run(client, error) {
    client.logger.error(error);
  }
};
