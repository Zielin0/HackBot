/* eslint-disable max-lines-per-function */
/* eslint-disable arrow-parens */
/* eslint-disable class-methods-use-this */
const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js')

const rgx = /^(?:<@!?)?(\d+)>?$/

module.exports = class InviteCommand extends BaseCommand {
  constructor() {
    super('invite', 'Owner', [], true)
  }

  async run(client, message, args) {
    const guildId = args[0]
    if (!guildId) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide server ID')
        .setColor(0x2f3136)
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    }

    if (!rgx.test(guildId)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid server ID').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false }
      })
    }

    try {
      await client.guilds.cache
        .get(guildId)
        .invites.create(
          client.guilds.cache
            .get(guildId)
            .channels.cache.filter(c => c.type === 'GUILD_TEXT')
            .find(x => x.position === 0)
        )
        .then(invite => {
          const embed = new MessageEmbed()
            .setTitle(`Invite from \`${client.guilds.cache.get(guildId).name}\``)
            .setDescription(
              `**Invite URL:** [https://discord.gg/${invite.code}](https://discord.gg/${invite.code})
              **Server ID:** ${guildId}`
            )
            .setColor(0x2f3136)
          message.reply({
            embeds: [embed],
            allowedMentions: {
              repliedUser: false
            }
          })
        })
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed to create invite')
        .setDescription(
          `Server: \`${client.guilds.cache.get(guildId).name}\`\nServer ID: ${guildId}`
        )
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``)
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })
    }
  }
}
