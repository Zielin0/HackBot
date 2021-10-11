const Database = require('better-sqlite3')

const db = new Database(`${process.cwd()  }/data/db.sqlite`);

db.pragma('synchronous = 1');

db.pragma('journal_mode = wal');

/**
 * Create guild table in database
 */
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS settings (
    guild_id TEXT PRIMARY KEY,
    guild_name TEXT,
    is_banned BOOLEAN NOT NULL DEFAULT 0
  )
  `,
).run();

/**
 * Create users table in database
 */
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    user_id TEXT,
    user_name TEXT,
    user_discriminator TEXT,
    is_gbanned BOOLEAN NOT NULL DEFAULT 0
  )
  `,
).run();

// Bot settings table
const settings = {
  insertRow: db.prepare(`
    INSERT OR IGNORE INTO settings (
      guild_id,
      is_banned
    ) VALUES (?, 0);
  `),

  // Selects
  selectRow: db.prepare('SELECT * FROM settings WHERE guild_id = ?;'),
  selectGuilds: db.prepare('SELECT guild_id FROM settings'),
  selectGuildBan: db.prepare('SELECT is_banned FROM settings WHERE guild_id = ?;'),

  // Updates
  updateGuildBan: db.prepare('UPDATE settings SET is_banned = ? WHERE guild_id = ?;'),
};

// Users table
const users = {
  insertRow: db.prepare(`
    INSERT OR IGNORE INTO users (
      user_id,
      is_gbanned
    ) VALUES (?, 0)
  `),

  // Selects
  selectRow: db.prepare('SELECT * FROM users WHERE user_id = ?;'),
  selectGban: db.prepare('SELECT is_gbanned FROM users WHERE user_id = ?;'),

  // Updates
  updateGban: db.prepare('UPDATE users SET is_gbanned = ? WHERE user_id = ?;'),
};

module.exports = {
  settings,
  users,
};
