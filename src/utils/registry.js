const path = require('path')
const fs = require('fs').promises
const BaseCommand = require('./structures/BaseCommand')
const BaseEvent = require('./structures/BaseEvent')

async function registerCommands(client, dir = '') {
  const filePath = path.join(__dirname, dir)
  const files = await fs.readdir(filePath)
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file))
    if (stat.isDirectory()) {
      registerCommands(client, path.join(dir, file))
    }
    if (file.endsWith('.js')) {
      // eslint-disable-next-line global-require
      const Command = require(path.join(filePath, file))
      if (Command.prototype instanceof BaseCommand) {
        const cmd = new Command()
        client.commands.set(cmd.name, cmd)
        // eslint-disable-next-line arrow-parens
        cmd.aliases.forEach(alias => {
          client.commands.set(alias, cmd)
        })
      }
    }
  }
}

async function registerEvents(client, dir = '') {
  const filePath = path.join(__dirname, dir)
  const files = await fs.readdir(filePath)
  for (const file of files) {
    const stat = await fs.lstat(path.join(filePath, file))
    if (stat.isDirectory()) {
      registerEvents(client, path.join(dir, file))
    }
    if (file.endsWith('.js')) {
      // eslint-disable-next-line global-require
      const Event = require(path.join(filePath, file))
      if (Event.prototype instanceof BaseEvent) {
        const event = new Event()
        client.events.set(event.name, event)
        client.on(event.name, event.run.bind(event, client))
      }
    }
  }
}

module.exports = {
  registerCommands,
  registerEvents
}
