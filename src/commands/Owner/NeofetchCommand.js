const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');

module.exports = class NeofetchCommand extends BaseCommand {
  constructor() {
    super('neofetch', 'Owner', [], true);
  }

  run(client, message, args) {
    const si = require('systeminformation');

    si.get({
      users: 'user',
      osInfo: 'hostname, distro, release, arch, kernel',
      system: 'model, version',
      time: 'uptime',
      graphics: 'displays, controllers',
      cpu: 'manufacturer, brand, cores, speedMax',
      mem: 'total, used',
    })
      .then(data => {
        const header = `${data.users[0].user}@${data.osInfo.hostname}`;
        const upHr = Math.floor(data.time.uptime / 3600);
        const upMin = Math.floor(data.time.uptime / 60 - upHr * 60);

        const output =
          `${header}\n${'-'.repeat(header.length)}\n` +
          `OS: ${data.osInfo.distro} ${data.osInfo.release} ${data.osInfo.arch}\n` +
          `Host: ${data.system.model} ${data.system.version}\n` +
          `Kernel: ${data.osInfo.kernel}\n` +
          `Uptime: ${upHr} hour(s), ${upMin} min(s)` +
          '\n' +
          `Resolution: ${data.graphics.displays
            .map(x => `${x.resolutionX}x${x.resolutionY}`)
            .join(', ')}\n` +
          `CPU: ${data.cpu.manufacturer} ${data.cpu.brand} (${data.cpu.cores}) @ ${data.cpu.speedMax}GHz` +
          '\n' +
          `GPU: ${data.graphics.controllers.map(x => `${x.vendor} ${x.model}`).join(', ')}\n` +
          `Memory: ${Math.floor(data.mem.used / 1024 / 1024)}MiB / ${Math.floor(
            data.mem.total / 1024 / 1024
          )}MiB`;

        message.reply({
          embeds: [
            new MessageEmbed()
              .setTitle('Neofetch')
              .setDescription(`\`\`\`${output}\`\`\``, { code: 'yaml' })
              .setColor(0x2f3136),
          ],
          allowedMentions: { repliedUser: false },
        });
      })
      .catch(error => {
        const embed = new MessageEmbed()
          .setTitle('❗ An error ocurred')
          .addField('Error message', error.message)
          .addField('Stack', `\`\`\`js\n${error.stack}\`\`\``);
        message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      });
  }
};
