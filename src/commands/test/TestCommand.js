/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const BaseCommand = require('../../utils/structures/BaseCommand')
const { MessageEmbed } = require('discord.js')

module.exports = class TestCommand extends BaseCommand {
  constructor() {
    super('test', 'testing', [])
  }

  run(client, message, args) {
    message.reply('test command works')
  }
}
