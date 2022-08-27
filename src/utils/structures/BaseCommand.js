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

  /**
   *
   * @param {String} string
   * @returns Capitalized String
   */
  capitalize(string) {
    return string.toLowerCase().charAt(0).toUpperCase() + string.toLowerCase().slice(1);
  }

  /**
   *
   * @param {String} phoneNumber
   * @returns parsed phone number
   */
  parsePhoneNumber(phoneNumber) {
    let phoneRaw;
    let phoneDirect;
    let phoneAreaCode;
    let phonePrefix;
    let phoneRest;
    let outPhone;
    if (phoneNumber.startsWith('+1')) {
      phoneRaw = phoneNumber.replace('.', ' ');
      phoneDirect = phoneRaw.substring(0, 2);
      phoneAreaCode = phoneRaw.substring(3, 6);
      phonePrefix = phoneRaw.substring(6, 9);
      phoneRest = phoneRaw.substring(9, 13);

      outPhone = `${phoneDirect} (${phoneAreaCode}) ${phonePrefix}-${phoneRest}`;
    } else if (phoneNumber.length === 10) {
      phoneAreaCode = phoneNumber.substring(0, 3);
      phonePrefix = phoneNumber.substring(3, 6);
      phoneRest = phoneNumber.substring(6, 10);

      outPhone = `(${phoneAreaCode}) ${phonePrefix}-${phoneRest}`;
    } else if (phoneNumber.length === 9) {
      phoneAreaCode = phoneNumber.substring(0, 3);
      phonePrefix = phoneNumber.substring(3, 6);
      phoneRest = phoneNumber.substring(6, 9);

      outPhone = `${phoneAreaCode} ${phonePrefix} ${phoneRest}`;
    } else {
      outPhone = phoneNumber;
    }
    return outPhone;
  }
};
