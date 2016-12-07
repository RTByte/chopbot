'use strict';

class Command {
  constructor(description, usage, permissionLevel, inheritance, handler) {
    this.desc              = description;
    this.usage             = usage;
    this.handler           = handler;
    this.inheritance       = inheritance;
    this.permissionLevel   = permissionLevel;
    /*
        0: everyone
        1: voicestuff
        2: modstuff
        3: Owner (ras) only
    */
  }
}

module.exports = Command;
