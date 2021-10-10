/* eslint-disable class-methods-use-this */
const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('debug')
  }

  run(client, info) {
    client.logger.debug(info)
  }
}
