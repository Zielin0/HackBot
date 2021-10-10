/* eslint-disable class-methods-use-this */
const BaseEvent = require('../../utils/structures/BaseEvent')

module.exports = class ReadyEvent extends BaseEvent {
  constructor() {
    super('ready')
  }

  run(client) {
    client.logger.verbose('Preparing status... ⌚')
    client.user.setPresence({
      activities: [{ name: `${client.prefix}help`, type: 'PLAYING' }]
    })
    client.logger.verbose(`Status set to \`${client.user.presence.activities[0].name}\` 📋`)
    const token = `\`${client.token.split('.')[0]}.${client.token.split('.')[1]}.${client.token
      .split('.')[2]
      .replace(/[a-zA-Z0-9_-]/g, '*')}\``
    client.logger.warn(`❗ Logged in with TOKEN ${token} ❗`)
    client.logger.info('HackBot is now Online 🚀')
    client.logger.info(`HackBot is running on ${client.guilds.cache.size} server(s) 📺`)
  }
}
