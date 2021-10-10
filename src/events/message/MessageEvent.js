/* eslint-disable class-methods-use-this */
const { MessageEmbed } = require('discord.js')
const BaseEvent = require('../../utils/structures/BaseEvent')
const { ownerId } = require('../../../config.json')

module.exports = class MessageEvent extends BaseEvent {
  constructor() {
    super('messageCreate')
  }

  // eslint-disable-next-line max-lines-per-function
  run(client, message) {
    if (message.author.bot) {
      return
    }
    if (message.content.startsWith(client.prefix)) {
      const [cmdName, ...cmdArgs] = message.content.slice(client.prefix.length).trim().split(/\s+/)
      const command = client.commands.get(cmdName)
      if (!command) {
        return message.react('❌')
      }
      if (command.ownerOnly === true && message.author.id !== ownerId) {
        message.reply({
          embeds: [
            new MessageEmbed().setTitle('❌ This is a `ownerOnly` command').setColor(0x2f3136)
          ],
          allowedMentions: {
            repliedUser: false
          }
        })
        client.logger.warn(
          `${message.author.tag} in \`${message.guild.name}\`: Tried to use *ownerOnly* command: ${
            client.prefix + command.name
          }`
        )
        return
      }
      if (command) {
        command.run(client, message, cmdArgs)
        client.logger.warn(
          `${message.author.tag} in \`${message.guild.name}\`: ${client.prefix + command.name}`
        )
      }
    } else if (
      (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) &&
      message.channel.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {
      const embed = new MessageEmbed()
        .setAuthor(client.user.username, client.user.avatarURL({ size: 1024, dynamic: true }))
        .setThumbnail(client.user.displayAvatarURL({ size: 512 }))
        .setDescription(
          `
	  HackBot - Discord Bot with Network commands such as Redirect checking\n
          **Links:
          [Support](https://discord.gg/upmNHg5U) | [Invite](https://discord.com/api/oauth2/authorize?client_id=886585147573555210&permissions=403008599&scope=bot)**
        `
        )
        .setColor(0x2f3136)
      message.channel.send({ embeds: [embed] })
      client.logger.warn(`${message.author.tag} in '${message.guild.name}': @HackBot`)
    }
  }
}
