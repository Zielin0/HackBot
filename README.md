# HackBot

<div align="center">
  <img src="https://cdn.discordapp.com/avatars/886585147573555210/b290615a286c8b355947fe8cdc6197eb.png?size=256" alt="logo" width="200">
  <br>
  <img src="https://img.shields.io/badge/language-gray?logo=javascript&style=flat" alt="badge-lang">
  <img src="https://img.shields.io/github/issues/Zielin0/HackBot?style=flat" alt="badge-issues">
  <img src="https://img.shields.io/github/forks/Zielin0/HackBot?style=flat" alt="badge-forks">
  <img src="https://img.shields.io/github/stars/Zielin0/HackBot?style=flat" alt="badge-stars">
  <img src="https://img.shields.io/github/license/Zielin0/HackBot?style=flat" alt="badge-license">
  <img src="https://img.shields.io/github/commit-activity/m/Zielin0/HackBot?style=flat" alt="badge-activity">
  <img src="https://img.shields.io/github/repo-size/Zielin0/HackBot?style=flat" alt="badge-repoSize">
  <br><br>
</div>

> Zielino | 27-09-2021

---

### HackBot - Discord Bot with Networking utilities

#### HackBot is on outdated version of discord.js, and project is discontinued.

### Includes

<!-- - Small amount of commands (bc I'm lazy) -->

- Fancy & Useful Commands
- Database
- Logging

  - Debug, Warns, and Errors in pretty style
  - Events logging: guildCreate and guildDelete
  - Commands logging: Format: [UserName#ID] in \`[serverName]\`: {prefix}[command]

  Examples:

  If someone tries to use the _ownerOnly_ command:

  ```yaml
  2021-10-10 16:08:54 - warn [index.js]: pitus#3137 in `Zielino's Sever`: Tried to use *ownerOnly* command: ;eval
  ```

  If it is a normal command:

  ```yaml
  2021-10-10 16:14:33 - warn [index.js]: pitus#3137 in `Zielino's Sever`: ;redirect
  ```

## Requirements

- Node.js v16.11.0 or higher (Node.js v16.11.x should work as well)

- Yarn v1.22.15 or higher (Yarn v1.22.x should work as well)

## Installing & running

1. At first you need to clone the repo. To do this open your terminal/cmd and use this command.

```bash
$ git clone https://github.com/Zielin0/HackBot.git
```

2. Install all required dependencies.

```bash
$ yarn
```

3. Edit config.json (in root directory).

```JSON
{
  "name": "HackBot",
  "token": "BOT_TOKEN",
  "prefix": ";",
  "ownerId": "YOUR_ID"
}
```

4. Run the bot.

```bash
$ yarn start
```

## Issues

If you encounter any issues, please open an [ISSUE](https://github.com/Zielin0/HackBot/issues).

No known issues at the moment.

## Commands table

| Name         | Category | Usage                   | Examples                             |
| ------------ | :------- | :---------------------- | :----------------------------------- |
| Eval         | Owner    | ;eval [`code`]          | ;eval console.log('Hello, HackBot!') |
| GuildBan     | Owner    | ;guildban [`guildId`]   | ;guildban 694865553835163648         |
| Invite       | Owner    | ;invite [`guildId`]     | ;invite 694865553835163648           |
| LeaveGuild   | Owner    | ;leaveguild [`guildId`] | ;leaveguild 694865553835163648       |
| Neofetch     | Owner    | ;neofetch               | ;neofetch                            |
| Servers      | Owner    | ;servers                | ;servers                             |
| Shutdown     | Owner    | ;shutdown               | ;shutdown                            |
| UnGuildBan   | Owner    | ;unguildban [`guildId`] | ;unguildban 694865553835163648       |
| Whois        | Hack     | ;whois [`domain`]       | ;whois siurasowo.tk                  |
| Redirect     | Hack     | ;redirect [`url`]       | ;redirect https://dc.siurasowo.tk    |
| PingIp       | Hack     | ;pingip [`ip`]          | ;pingip 8.8.8.8                      |
| GenBotInvite | Hack     | ;genbotinvite [`botId`] | ;genbotinvite 886585147573555210     |

## License

This project is under the [MIT](./LICENSE) license.

### TODO

- [x] ~~_Logging_~~ [27-09-2021]
- [x] ~~_Emojis_~~
- [x] ~~_Implementing ownerOnly property for commands_~~ [28-09-2021]
- [x] ~~_Implementing Database (better-sqlite3)_~~ [30-09-2021]
- [x] ~~_Owner Commands_~~ [12-10-2021]
  - [x] ~~_Eval_~~ [28-09-2021]
  - [x] ~~_Shutdown_~~ [28-09-2021]
  - [x] ~~_Servers_~~ [28-09-2021]
  - [x] ~~_Invite_~~ [28-09-2021]
  - [x] ~~_LeaveGuild_~~ [28-09-2021]
  - [x] ~~_ServerBan_~~ [29-09-2021]
  - [x] ~~_Neofetch_~~ [29-09-2021]
- [x] ~~_Hack Commands_~~ [09-10-2021]
  - [x] ~~_Whois command_~~ [09-10-2021]
  - [x] ~~_Redirect command_~~ [09-10-2021]
  - [x] ~~_Ping command_~~ [09-10-2021]
- [ ] Help Command

<br />
<br />

## Contributors

<table>
  <tr>
    <td align="center"><a href="https://github.com/Zielin0"><img src="https://github.com/Zielin0.png" width="100px;" alt=""/><br /><sub><b>Zielin0</b></sub></a><br /><a href="https://github.com/Zielin0/HackBot/commits?author=Zielin0" title="Code">💻</a> <a href="https://github.com/Zielin0/HackBot/commits?author=Zielin0" title="Documentation">📖</a><a href="#Testing-Zielin0" title="Testing">🥊</a></td>
    <td align="center"><a href="https://github.com/PjooteRek"><img src="https://github.com/PjooteRek.png" width="100px;" alt=""/><br /><sub><b>PjooteRek</b></sub></a><br /><a href="./src/commands/hack/GenBotInvite.js" title="Code">💻</a><a href="#Testing-0h_P10t3r" title="Testing">🥊</a></td>
    <td align="center"><a href="https://github.com/ThomasTheTank69"><img src="https://github.com/ThomasTheTank69.png" width="100px;" alt=""/><br /><sub><b>ThomasTheTank69</b></sub></a><br /><a href="#Testing-ThomasTheTank69" title="Testing">🥊</a></td>
  </tr>
</table>

### Others

Feel free to star and fork the repo.

Also join my [discord server](https://dc.siurasowo.tk)
