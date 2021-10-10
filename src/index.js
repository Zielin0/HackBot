const { Client, Intents } = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');

const { prefix, token } = require('../config.json');
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_BANS,
    Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_INVITES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  ws: { properties: { $browser: 'Discord iOS' } }
});

global.__basedir = __dirname;
global.ImageURLOptions = { dynamic: true, size: 1024, format: 'png' };
(async () => {
  client.commands = new Map();
  client.events = new Map();
  client.prefix = prefix;
  client.logger = require('./utils/logger');
  client.db = require('./utils/db');
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(token);
})();
