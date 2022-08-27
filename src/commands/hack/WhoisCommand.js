const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require('discord.js');
const whoiser = require('whoiser');
const moment = require('moment');

const expression =
  /^((?!-))(xn--)?[a-z0-9][a-z0-9-_]{0,61}[a-z0-9]{0,1}\.(xn--)?([a-z0-9\\-]{1,61}|[a-z0-9-]{1,30}\.[a-z]{2,})$/;
const regex = new RegExp(expression);

module.exports = class WhoisCommand extends BaseCommand {
  constructor() {
    super('whois', 'Hack', []);
  }

  async run(client, message, args) {
    const input = args.join(' ');

    if (!regex.test(input)) {
      return message.reply({
        embeds: [new MessageEmbed().setTitle('❗ Provide a valid Domain').setColor(0x2f3136)],
        allowedMentions: { repliedUser: false },
      });
    }

    if (!input) {
      const embed = new MessageEmbed()
        .setTitle('❌ Error')
        .setDescription('Provide domain to lookup')
        .setColor(0x2f3136);
      return message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
    try {
      const domainJSON = await whoiser(input);
      const domainInfo = domainJSON[Object.keys(domainJSON)[0]];

      let embed = new MessageEmbed().setTitle('🧭 Whois Lookup').setColor(0x2f3136);
      const domainInfoText = domainInfo.text.join('\n').toString();

      if (domainInfoText.toLowerCase().startsWith('no match for')) {
        const embed = new MessageEmbed()
          .setTitle('🧭 Whois Lookup')
          .setColor(0x2f3136)
          .setDescription(`❗ No match for **${input}**`);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        return;
      }

      if (domainInfoText.length <= 200) {
        const embed = new MessageEmbed()
          .setTitle('🧭 Whois Lookup')
          .setColor(0x2f3136)
          .setDescription(domainInfoText);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        return;
      }

      if (domainInfoText.toLowerCase().startsWith('request limit exceeded')) {
        const embed = new MessageEmbed()
          .setTitle('🧭 Whois Lookup')
          .setColor(0x2f3136)
          .setDescription('❗ Request limit exceeded.');
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        return;
      }

      // Domain
      const domainName = this.capitalize(domainInfo['Domain Name']);
      // Registrar
      const domainRegistrar = domainInfo.Registrar;
      const registrarURL = domainInfo['Registrar URL'];
      const registrarInfo = `${domainRegistrar}\n${registrarURL}`;
      // Abuse email & phone number
      const abuseEmail = domainInfo['Registrar Abuse Contact Email'];
      let abusePhone;

      if ('Registrar Abuse Contact Phone' in domainInfo) {
        abusePhone = this.parsePhoneNumber(domainInfo['Registrar Abuse Contact Phone']);
      } else {
        abusePhone = 'Not provided.';
      }

      // Dates
      const dateTimeFormat = 'YYYY-MM-DD';
      const createdDate = moment(domainInfo['Created Date'], dateTimeFormat)
        .toDate()
        .toLocaleDateString()
        .replaceAll('.', '-');

      const expiryDate = moment(domainInfo['Expiry Date'], dateTimeFormat)
        .toDate()
        .toLocaleDateString()
        .replaceAll('.', '-');

      const updatedDate = moment(domainInfo['Updated Date'], dateTimeFormat)
        .toDate()
        .toLocaleDateString()
        .replaceAll('.', '-');

      // status
      let statusList = '';
      domainInfo['Domain Status'].forEach(status => {
        statusList += status.split(' ')[0] + '\n';
      });

      // name servers
      let nameServerList = '';
      domainInfo['Name Server'].forEach(nameserver => {
        nameServerList += nameserver.toLowerCase() + '\n';
      });

      embed
        .setDescription(`__**${domainName}**__`)
        .addField('Registrar', registrarInfo)
        .addField('Abuse Contact', `Abuse Phone: ${abusePhone}\nAbuse Email: ${abuseEmail}`)
        .addField('Created On', createdDate, true)
        .addField('Expires On', expiryDate, true)
        .addField('Updated On', updatedDate, true)
        .addField('Domain Status', statusList)
        .addField('Name Server(s)', nameServerList);

      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle('❗ Failed to lookup a domain')
        .addField('Error message', error.message)
        .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
      message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
    }
  }
};
