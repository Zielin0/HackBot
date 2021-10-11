module.exports = class BaseCommand {
  constructor(name, category, aliases, ownerOnly) {
    this.name = name;
    this.category = category;
    this.aliases = aliases;
    this.ownerOnly = ownerOnly || false;
  }
};
