const { MessageEmbed } = require('discord.js');
const BaseCommand = require('../../utils/structures/BaseCommand');
const emojis = require('../../utils/emojis.json');

module.exports = class NeofetchCommand extends BaseCommand {
  constructor() {
    super('neofetch', 'Owner', ['nf'], true);
  }

  run(client, message, args) {
    const si = require('systeminformation');

    si.get({
      users: 'user',
      osInfo: 'hostname, distro, release, arch, kernel',
      system: 'model, version',
      time: 'uptime',
      graphics: 'displays, controllers',
      cpu: 'manufacturer, brand, cores, speed',
      mem: 'total, used',
    }).then(data => {
      const header = `${data.users[0].user}@${data.osInfo.hostname}`;
      const upHr = Math.floor(data.time.uptime / 3600);
      const upMin = Math.floor(data.time.uptime / 60 - upHr * 60);
      // memory usage
      const memoryUsed = data.mem.used / 1024 / 1024;
      const memoryTotal = data.mem.total / 1024 / 1024;
      // get first gpu
      const controllers = data.graphics.controllers;
      const firstController = controllers[Object.keys(controllers)[0]];

      const hardwareInfo =
        // host
        `${emojis.host} ${emojis.arrow} ${data.system.model}\n` +
        // cpu
        `${emojis.cpu} ${emojis.arrow} ${data.cpu.brand} (${data.cpu.cores}) @ ${data.cpu.speed}GHz\n` +
        // gpu
        `${emojis.gpu} ${emojis.arrow} ${
          firstController[Object.keys(firstController)[1]] ?
          firstController[Object.keys(firstController)[1]] :
          'Unknown'
        }\n` +
        // memory usage
        `${emojis.memory} ${emojis.arrow} ${Math.floor(memoryUsed)}MiB / ${Math.floor(
          memoryTotal
        )}MiB (${Math.round((memoryUsed * 100) / memoryTotal)}%)\n` +
        // resolution
        `${emojis.resolution} ${emojis.arrow} ${data.graphics.displays
          .map(x => `${x.currentResX}x${x.currentResY}`)
          .join(', ')}`;

      const softwareInfo =
        // distro
        `${emojis.os} ${emojis.arrow} ${data.osInfo.distro} ${data.osInfo.arch}\n` +
        // kernel
        `${emojis.os} ${emojis.arrow} ${data.osInfo.kernel}\n` +
        // uptime
        `${emojis.uptime} ${emojis.arrow} ${upHr} hour(s), ${upMin} min(s)`;

      message.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('Neofetch')
            .setDescription(`***${header}***`)
            .addField('Hardware Information', hardwareInfo)
            .addField('Software Information', softwareInfo)
            .setColor(0x2f3136),
        ],
        allowedMentions: { repliedUser: false },
      });
    });
  }
};
