module.exports = class BaseCommand {
  constructor(name, category, aliases, ownerOnly) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.ownerOnly = ownerOnly || false;
  }

  /**
   * Gets member from mention
   * @param {Message} message
   * @param {string} mention
   */
  getMemberFromMention(message, mention) {
    if (!mention) return;
    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return;
    const id = matches[1];
    return message.guild.members.cache.get(id);
  }
};
